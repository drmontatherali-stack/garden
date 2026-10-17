// يرسل إشعارات الحديقة — يشتغل على GitHub Actions مرتين يومياً (مجاناً)
import admin from 'firebase-admin';
import { tasksFor, todayStr, waterNotifText, plantLabel } from './engine.js';

const slot = process.argv[2] || (new Date().getUTCHours() < 9 ? 'morning' : 'evening');
const sa = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT || '{}');
if (!sa.project_id) { console.error('FIREBASE_SERVICE_ACCOUNT secret مفقود'); process.exit(1); }
const APP_URL = process.env.APP_URL || '';

admin.initializeApp({ credential: admin.credential.cert(sa) });
const db = admin.firestore();
const fcm = admin.messaging();
const today = todayStr();

const userRefs = await db.collection('users').listDocuments();
let sent = 0;
for (const uref of userRefs) {
  const [plantsSnap, devSnap, setSnap, logsSnap] = await Promise.all([
    uref.collection('plants').get(), uref.collection('devices').get(), uref.collection('meta').doc('settings').get(),
    uref.collection('logs').where('date', '==', today).get(),
  ]);
  const tokens = devSnap.docs.map((d) => ({ ref: d.ref, token: d.data().token })).filter((t) => t.token);
  if (!tokens.length) continue;
  const settings = setSnap.data() || {};
  const plants = plantsSnap.docs.map((d) => ({ id: d.id, ...d.data() }));
  const tasks = tasksFor(plants, today, settings);
  const water = tasks.filter((t) => t.type === 'water');
  const feed = tasks.filter((t) => t.type === 'feed');
  const check = tasks.filter((t) => t.type === 'check');

  const msgs = [];
  if (slot === 'morning') {
    // إشعار مستقل لكل نبات يحتاج سقي (حتى 8)، ثم ملخص للباقي
    for (const t of water.slice(0, 8)) {
      const n = waterNotifText(t);
      msgs.push({ title: n.title, body: n.body, tag: `w-${t.plant.id}` });
    }
    if (water.length > 8) msgs.push({ title: `💧 و ${water.length - 8} نباتات أخرى تحتاج سقي`, body: water.slice(8).map((t) => plantLabel(t.plant)).join('، '), tag: 'w-more' });
    if (feed.length) msgs.push({ title: `🧪 تسميد اليوم (${feed.length})`, body: feed.map((t) => `${plantLabel(t.plant)}: ${t.feed.n} — ${t.feed.how}`).join('\n'), tag: 'feed' });
    if (check.length) msgs.push({ title: '📷 وقت الفحص بالصور', body: `صوّر ${check.map((t) => plantLabel(t.plant)).join('، ')} حتى أفحص صحتها.`, tag: 'check' });
  } else {
    // العصر: تذكير بالمتبقي فقط (ما انسجل سقيه اليوم)
    const doneIds = new Set(logsSnap.docs.map((d) => d.data().plantId));
    const pending = water.filter((t) => !doneIds.has(t.plant.id));
    if (pending.length) {
      msgs.push({
        title: `⏰ باقي ${pending.length} سقي ما انسجل اليوم`,
        body: pending.slice(0, 6).map((t) => `• ${plantLabel(t.plant)}: ${t.plan.unit === 'pot' ? 'افحص التربة' : t.plan.total + ' لتر'}`).join('\n') + '\nاسقِ بعد الغروب إذا ما سقيت الصبح، وسجّلها بالتطبيق.',
        tag: 'evening',
      });
    }
  }

  for (const m of msgs) {
    for (const t of tokens) {
      try {
        await fcm.send({
          token: t.token,
          notification: { title: m.title, body: m.body },
          webpush: {
            notification: { icon: APP_URL + 'icon.png', tag: m.tag, dir: 'rtl', lang: 'ar', renotify: true, requireInteraction: slot === 'morning' },
            fcmOptions: APP_URL ? { link: APP_URL } : undefined,
            headers: { Urgency: 'high', TTL: '43200' },
          },
          data: { tag: m.tag },
        });
        sent++;
      } catch (e) {
        if (/registration-token-not-registered|invalid-registration-token/.test(e.code || e.message)) { await t.ref.delete(); console.log('حذف رمز جهاز منتهي'); }
        else console.error('خطأ إرسال:', e.code || e.message);
      }
    }
  }
  console.log(`مستخدم ${uref.id.slice(0, 6)}…: ${water.length} سقي، ${feed.length} تسميد، ${check.length} فحص → ${msgs.length} إشعار`);
}
console.log(`[${slot}] ${today}: تم إرسال ${sent} إشعار`);
process.exit(0);
