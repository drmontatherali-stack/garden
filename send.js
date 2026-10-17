// إشعارات الحديقة — يشتغل كل ساعة على GitHub Actions (مجاناً)
// 1) كل نبتة يوصلها إشعار خاص بيها بساعتها (سقي / سماد / فحص)، مرة وحدة باليوم لكل مهمة
// 2) يراقب طقس النجف: مطر = يأجل سقي الخارجي، حر شديد = تنبيه تظليل، صقيع = تنبيه تغطية
import admin from 'firebase-admin';
import { tasksFor, todayStr, hourNow, plantNotif, plantLabel, fetchWeather, isOutdoor, isOutdoorGround, coldSensitive, heatSensitive, waterDue, HEAT_DAY, FROST_NIGHT } from './engine.js';

const sa = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT || '{}');
if (!sa.project_id) { console.error('FIREBASE_SERVICE_ACCOUNT secret مفقود'); process.exit(1); }
const APP_URL = process.env.APP_URL || '';
const FORCE = process.env.FORCE === 'true'; // تشغيل يدوي للتجربة: يرسل كل مهام اليوم فوراً
const MAX_LATE = 5; // لا نرسل إشعار متأخر أكثر من 5 ساعات عن موعده
const RAIN_SKIP = 8; // ملم مطر متوقع اليوم يكفي لتأجيل سقي الخارجي المزروع بالأرض

admin.initializeApp({ credential: admin.credential.cert(sa) });
const db = admin.firestore();
const fcm = admin.messaging();
const today = todayStr();
const H = hourNow();

let weather = null;
try { weather = await fetchWeather(); console.log('الطقس:', JSON.stringify(weather.today)); } catch (e) { console.log('تعذر جلب الطقس:', e.message); }

let sent = 0;
async function push(tokens, n) {
  let ok = false;
  for (const t of tokens) {
    try {
      await fcm.send({
        token: t.token,
        notification: { title: n.title, body: n.body },
        webpush: {
          notification: { icon: APP_URL + 'icon.png', tag: n.tag, dir: 'rtl', lang: 'ar', renotify: true, requireInteraction: true },
          fcmOptions: APP_URL ? { link: APP_URL } : undefined,
          headers: { Urgency: 'high', TTL: '21600' },
        },
        data: { tag: n.tag },
      });
      ok = true; sent++;
    } catch (e) {
      if (/registration-token-not-registered|invalid-registration-token/.test(e.code || e.message)) { await t.ref.delete(); console.log('حذف رمز جهاز منتهي'); }
      else console.error('خطأ إرسال:', e.code || e.message);
    }
  }
  if (ok) console.log('✓', n.title);
  return ok;
}
const names = (list) => list.map((p) => `• ${plantLabel(p)}${p.zone ? ' — ' + p.zone : ''}`).join('\n');

for (const uref of await db.collection('users').listDocuments()) {
  const [plantsSnap, devSnap, setSnap] = await Promise.all([
    uref.collection('plants').get(), uref.collection('devices').get(), uref.collection('meta').doc('settings').get(),
  ]);
  const tokens = devSnap.docs.map((d) => ({ ref: d.ref, token: d.data().token })).filter((t) => t.token);
  if (!tokens.length) continue;
  const settings = { ...(setSnap.data() || {}), weather };
  const wxFlags = { ...(settings.wxNotified || {}) };
  const setRef = uref.collection('meta').doc('settings');
  const plants = plantsSnap.docs.map((d) => ({ id: d.id, ...d.data() })).filter((p) => !p.archived);

  // ── المطر: تأجيل سقي النباتات الخارجية المزروعة بالأرض ──
  if (weather && !FORCE && weather.today.rain >= RAIN_SKIP && H >= 5 && wxFlags.rain !== today) {
    const skipped = plants.filter((p) => isOutdoorGround(p) && waterDue(p, today, settings));
    for (const p of skipped) {
      await uref.collection('plants').doc(p.id).update({ lastWatered: today, rainSkip: today });
      await uref.collection('logs').add({ plantId: p.id, type: 'rain', date: today, liters: 0, at: admin.firestore.FieldValue.serverTimestamp() });
      p.lastWatered = today;
    }
    if (skipped.length) {
      await push(tokens, { title: `🌧 مطر اليوم (${Math.round(weather.today.rain)} ملم) — لا تسقِ الخارجي`, body: `أجّلت سقي:\n${names(skipped)}\nإذا ما نزل مطر فعلاً لحد العصر، اسقِها واضغط "سقيته" بالتطبيق.\nالأصص والنباتات الداخلية تنسقى طبيعي.`, tag: 'wx-rain' });
    }
    wxFlags.rain = today; await setRef.set({ wxNotified: wxFlags }, { merge: true });
  }

  // ── الحر الشديد: تنبيه تظليل وفحص الأصص الخارجية ──
  if (weather && !FORCE && weather.today.tmax >= HEAT_DAY && H >= 6 && wxFlags.heat !== today) {
    const sens = plants.filter((p) => isOutdoor(p) && (heatSensitive(p) || p.potted));
    if (sens.length) {
      await push(tokens, { title: `🔥 حر شديد اليوم ${Math.round(weather.today.tmax)}°م`, body: `ظلّل هذي النباتات بشبك تظليل 50% من 11 الصبح لـ 4 العصر، وافحص تربة الأصص الخارجية العصر (تجف أسرع):\n${names(sens)}\nقرّبت مواعيد سقي النباتات الخارجية تلقائياً.`, tag: 'wx-heat' });
    }
    wxFlags.heat = today; await setRef.set({ wxNotified: wxFlags }, { merge: true });
  }

  // ── الصقيع: تنبيه العصر لتغطية النباتات الحساسة للبرد ──
  if (weather && !FORCE && weather.tomorrow.tmin <= FROST_NIGHT && H >= 16 && wxFlags.frost !== today) {
    const sens = plants.filter((p) => isOutdoor(p) && coldSensitive(p));
    if (sens.length) {
      await push(tokens, { title: `❄️ برد شديد الليلة (${Math.round(weather.tomorrow.tmin)}°م) — غطِّ النباتات`, body: `قبل الغروب: غطّ هذي النباتات بقماش أو نايلون على دعامة (لا يلمس الورق)، ودخّل الأصص لمكان محمي. لا تسقِها بالليل:\n${names(sens)}\nشيل الغطاء الصبح بعد ما تطلع الشمس.`, tag: 'wx-frost' });
    }
    wxFlags.frost = today; await setRef.set({ wxNotified: wxFlags }, { merge: true });
  }

  // ── مهام كل نبتة بساعتها ──
  const due = tasksFor(plants, today, settings).filter((t) => {
    if (t.plant.notifyOff) return false;
    if (t.plant.notified?.[t.type] === today) return false;
    if (FORCE) return true;
    return t.hour <= H && H - t.hour <= MAX_LATE;
  });
  const groups = {};
  for (const t of due) (groups[`${t.plant.id}|${FORCE ? 0 : t.hour}`] ||= []).push(t);
  for (const ts of Object.values(groups)) {
    const ok = await push(tokens, plantNotif(ts));
    if (ok && !FORCE) {
      const upd = {};
      for (const t of ts) upd[`notified.${t.type}`] = today;
      await uref.collection('plants').doc(ts[0].plant.id).update(upd);
    }
  }
  console.log(`مستخدم ${uref.id.slice(0, 6)}…: ${due.length} مهمة مستحقة الآن`);
}
console.log(`${today} الساعة ${H}: تم إرسال ${sent} إشعار`);
process.exit(0);
