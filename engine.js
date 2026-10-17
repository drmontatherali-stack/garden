// المحرك: قاعدة النباتات + الجدولة — يستخدمه التطبيق وسكربت الإشعارات
// قاعدة بيانات النباتات المدمجة — مضبوطة على مناخ النجف (صيف 45-50°م، شتاء بارد مع صقيع خفيف أحياناً، تربة كلسية قلوية، ماء مالح نسبياً)
// المواسم: S = الصيف (مايس–أيلول) | M = المعتدل (آذار، نيسان، تشرين الأول، تشرين الثاني) | W = الشتاء (كانون الأول–شباط)
// كل موسم: [كل كم يوم، الكمية]. الوحدة: L = لتر للنبتة الواحدة | Lm2 = لتر لكل متر مربع | pot = للأصص (حتى يخرج الماء من الأسفل)
// null = لا يُزرع/لا يعيش بهذا الموسم عادةً
// الأشجار: الكميات للشجرة الفتية (أول سنتين). للشجرة الكبيرة: mature = [مضاعف الفترة، مضاعف الكمية]

export const SEASON_NAMES = { S: 'الصيف', M: 'الربيع/الخريف', W: 'الشتاء' };

export function seasonOf(month) { // month 1..12
  if (month >= 5 && month <= 9) return 'S';
  if (month === 12 || month <= 2) return 'W';
  return 'M';
}

export const CATS = {
  indoor: 'نباتات داخلية', succulent: 'صباريات وعصاريات', flower: 'ورد وزهور', seasonal: 'زهور موسمية',
  shrub: 'شجيرات وأسيجة', climber: 'متسلقات', lawn: 'ثيل', tree: 'أشجار ظل', palm: 'نخيل زينة', herb: 'أعشاب ونعناع',
};

export const LIGHT = {
  full: 'شمس كاملة (6 ساعات أو أكثر)',
  fullpm: 'شمس صباحية كاملة مع ظل بعد الظهر صيفاً',
  partial: 'شمس جزئية / ظل جزئي',
  shade: 'ظل (تتحمل الظل)',
  bright: 'ضوء ساطع غير مباشر (قرب شباك بدون شمس مباشرة)',
  low: 'تتحمل الإضاءة الضعيفة',
};

export const METHODS = {
  base: 'بالصوندة على التربة عند قاعدة الساق، بتدفق هادئ (بدون ضغط) حتى لا تنجرف التربة، ووزّع الماء حول منطقة الجذور.',
  basin: 'املأ الحوض الترابي حول الجذع (قطره بعرض تاج الشجرة تقريباً) بالصوندة ببطء، واتركه يتشرب ثم أكمل الكمية — سقية عميقة تنزل للجذور.',
  lawn: 'رش متجانس على كامل مساحة الثيل بفوهة الرش (الدوش) ذهاباً وإياباً حتى يتشرب العمق المطلوب، بدون تجمع ماء.',
  ring: 'بالصوندة على دائرة حول الجذع بمسافة 20-30 سم منه — لا تصب الماء على الجذع نفسه.',
  can: 'بالمرشة (سقاية يدوية) على التربة ببطء حتى يخرج الماء من فتحات الأصيص، ثم أفرغ الصحن بعد 15-20 دقيقة.',
  soak: 'سقية غمر للتربة عند القاعدة ثم اتركها تجف تماماً قبل السقية التالية.',
  bottom: 'سقي من الأسفل: ضع الأصيص بصحن ماء 15-20 دقيقة حتى تتشرب التربة من فتحات التصريف، ثم ارفعه وصفّي الماء الزائد. لا تصب الماء على قلب النبتة.',
  orchid: 'اغمر الأصيص (أصيص الأوركيد الشفاف) بوعاء ماء مفلتر أو مترّك لمدة 10-15 دقيقة، ثم ارفعه وصفّه جيداً. لا يبقى ماء بين الأوراق أو بقلب النبتة.',
  vase: 'إذا مزروع بالماء: غيّر الماء كله بماء مفلتر أو مترّك 24 ساعة، واغسل الإناء والحصى، وخلّي الجذور مغطاة بالماء. إذا مزروع بتربة: اسقِ لما يجف أعلى 2-3 سم.',
};

export const LEAVES = {
  never: { t: 'ممنوع بلّ الأوراق', d: 'رش الأوراق يسبب الأمراض الفطرية (البياض الدقيقي/التبقع). اسقِ التربة فقط.' },
  ok: { t: 'الرش على الأوراق مسموح صباحاً فقط', d: 'رش خفيف الصبح الباكر لغسل الغبار أو مكافحة العنكبوت الأحمر، ولا ترش وقت الشمس القوية (يحرق الورق).' },
  mist: { t: 'رذاذ على الأوراق مفيد', d: 'رذاذ ماء ناعم على الأوراق صباحاً (يفضل ماء مفلتر/RO) لرفع الرطوبة، خصوصاً مع تشغيل المبردة/السبلت.' },
  wash: { t: 'امسح/اغسل الأوراق', d: 'امسح الأوراق بقطعة رطبة أو اغسلها بالرش مرة كل 2-4 أسابيع لإزالة الغبار، والتربة هي الأساس بالسقي.' },
  lawn: { t: 'رش على الثيل طبيعي', d: 'السقي بالرش على الثيل هو الطريقة الصحيحة، بشرط الصبح الباكر حتى يجف الورق قبل الليل.' },
};

// أسمدة شائعة متوفرة بالعراق
const F = {
  manure: (kg, mo = [12, 1]) => ({ n: 'سماد حيواني متخمر', f: 'عضوي', mo, d: 300, how: `${kg} توزع حول النبات وتخلط مع التربة السطحية ثم تسقى سقية غزيرة.` }),
  npk: (dose, mo, d = 30) => ({ n: 'سماد متوازن NPK 20-20-20', f: 'نتروجين/فسفور/بوتاسيوم + عناصر صغرى', mo, d, how: dose }),
  potash: (dose, mo, d = 21) => ({ n: 'سماد عالي البوتاسيوم 10-10-40 (أو 12-12-36)', f: 'يشجع التزهير والإثمار', mo, d, how: dose }),
  iron: (dose, mo, d = 90) => ({ n: 'حديد مخلبي EDDHA', f: 'يعالج اصفرار الأوراق بالتربة القلوية', mo, d, how: dose }),
  urea: (g, mo, d = 30) => ({ n: 'يوريا 46%', f: 'نتروجين للخضرة', mo, d, how: `${g} غم لكل م² تنثر بانتظام على ثيل جاف الورق ثم تسقى فوراً سقية غزيرة.` }),
  indoor: (mo = [3, 4, 5, 6, 7, 8, 9]) => ({ n: 'سماد سائل للنباتات الداخلية (أو NPK 20-20-20 نصف التركيز)', f: 'متوازن مخفف', mo, d: 30, how: 'نصف الجرعة المكتوبة على العبوة، يذاب بماء السقي ويضاف لتربة رطبة (ليس جافة).' }),
};

const P = (o) => o; // مساعد للقراءة

export const PLANTS = [
  // ───────────── الثيل ─────────────
  P({ id: 'bermuda', ar: 'ثيل محلي (برمودا)', alt: ['ثيل عراقي', 'نجيل', 'برمودا', 'ثيل محلي'], sci: 'Cynodon dactylon', cat: 'lawn', env: 'out', light: 'full',
    place: 'مكان مشمس بالكامل — يضعف ويخف تحت ظل الأشجار والجدران.', soil: 'تربة مزيجية جيدة التصريف، يتحمل الملوحة بدرجة جيدة.',
    w: { m: 'lawn', leaves: 'lawn', unit: 'Lm2', S: [2, 10], M: [4, 10], W: [10, 8], slot: { S: 'early', M: 'morning', W: 'midmorning' },
      est: { days: 21, every: 1, amount: 4 }, test: 'اغرز مفك براغي بالتربة: إذا دخل 10-15 سم بسهولة فالرطوبة كافية.',
      warn: 'لا تسقِ وقت الظهر ولا بالليل (يسبب فطريات). اصفراره بالشتاء سكون طبيعي وليس عطش — لا تزد السقي.' },
    feed: [F.urea(20, [4, 5, 6, 7, 8, 9]), F.npk('25-30 غم لكل م² نثراً ثم سقي.', [3, 10], 45)],
    tol: { heat: 'ممتاز', cold: 'يسكن ويصفر', salt: 'جيد' }, care: 'قص بارتفاع 2-4 سم أسبوعياً صيفاً. يحتاج 6 ساعات شمس على الأقل.', check: 14 }),
  P({ id: 'stenotaphrum', ar: 'ثيل هندي (عريض الورقة)', alt: ['ثيل هندي', 'سانت أوغستين', 'ثيل عريض'], sci: 'Stenotaphrum secundatum', cat: 'lawn', env: 'out', light: 'partial',
    place: 'يتحمل الظل الجزئي أفضل من المحلي — مناسب تحت الأشجار البعيدة ومحاذاة الجدران.', soil: 'تربة مزيجية خصبة، يحب الرطوبة المستمرة.',
    w: { m: 'lawn', leaves: 'lawn', unit: 'Lm2', S: [2, 12], M: [3, 10], W: [7, 8], slot: { S: 'early', M: 'morning', W: 'midmorning' },
      est: { days: 21, every: 1, amount: 5 }, test: 'إذا الورق ينطوي طولياً أو يبقى أثر القدم عليه طويلاً = عطشان.',
      warn: 'أكثر عطشاً من الثيل المحلي صيفاً. ملاحظة: بعض المشاتل تبيع "الباسبالوم" باسم الهندي أيضاً — صوّره للتأكد.' },
    feed: [F.urea(15, [4, 5, 6, 8, 9], 40), F.iron('5 غم حديد مخلبي لكل 10 م² مذاب بالماء ورش على الثيل.', [4, 9], 120)],
    tol: { heat: 'جيد', cold: 'متوسط', salt: 'متوسط' }, care: 'قص بارتفاع 6-8 سم — القص الواطئ يضعفه.', check: 14 }),
  P({ id: 'paspalum', ar: 'ثيل باسبالوم', alt: ['باسبالوم', 'ثيل ملحي'], sci: 'Paspalum vaginatum', cat: 'lawn', env: 'out', light: 'full',
    place: 'مشمس. أفضل نوع ثيل مع الماء المالح.', soil: 'يتحمل الملوحة العالية والتربة الكلسية.',
    w: { m: 'lawn', leaves: 'lawn', unit: 'Lm2', S: [2, 10], M: [4, 9], W: [10, 7], slot: { S: 'early', M: 'morning', W: 'midmorning' },
      est: { days: 21, every: 1, amount: 4 }, test: 'اغرز مفك براغي: 10-15 سم بسهولة = رطوبة كافية.', warn: 'لا تسقِ ظهراً أو ليلاً.' },
    feed: [F.urea(15, [4, 5, 6, 7, 8, 9])], tol: { heat: 'ممتاز', cold: 'متوسط', salt: 'ممتاز' }, care: 'قص بارتفاع 2-4 سم.', check: 14 }),

  // ───────────── أشجار ظل ─────────────
  P({ id: 'albizia', ar: 'البيزيا (اللبخ)', alt: ['البيزيا', 'لبخ', 'ألبيزيا'], sci: 'Albizia lebbeck', cat: 'tree', env: 'out', light: 'full',
    place: 'شمس كاملة، وبعيدة 4 أمتار على الأقل عن الجدران والمجاري والخزانات (جذورها قوية).', soil: 'تتحمل التربة الفقيرة والكلسية.',
    w: { m: 'basin', leaves: 'never', unit: 'L', S: [3, 30], M: [7, 30], W: [14, 25], mature: [2, 2], slot: { S: 'early', M: 'morning', W: 'midmorning' },
      est: { days: 30, every: 2, amount: 20 }, test: 'احفر بإصبعك 10 سم بجانب الحوض: إذا جافة اسقِ.', warn: 'تتساقط أوراقها وقرونها — طبيعي. السقي القليل والعميق أفضل من الكثير والسطحي.' },
    feed: [F.manure('10-15 كغم'), F.npk('100 غم حول الحوض ثم سقي.', [3, 6], 90)],
    tol: { heat: 'ممتاز', cold: 'جيد', salt: 'جيد' }, care: 'تقليم التربية بالشتاء لرفع التاج وتكوين جذع واحد.', check: 30 }),
  P({ id: 'acacia', ar: 'أكاسيا (السنط)', alt: ['أكاسيا', 'سنط', 'اكاسيا'], sci: 'Vachellia / Acacia spp.', cat: 'tree', env: 'out', light: 'full',
    place: 'شمس كاملة، 4 أمتار عن الجدران. شجرة صحراوية تتحمل العطش.', soil: 'أي تربة جيدة التصريف، تتحمل الملوحة.',
    w: { m: 'basin', leaves: 'never', unit: 'L', S: [4, 30], M: [10, 30], W: [20, 25], mature: [2, 2], slot: { S: 'early', M: 'morning', W: 'midmorning' },
      est: { days: 30, every: 3, amount: 20 }, test: 'احفر 10-15 سم: جافة = اسقِ.', warn: 'الإفراط بالسقي يضعف جذورها. بعض الأنواع شوكية.' },
    feed: [F.manure('8-10 كغم')], tol: { heat: 'ممتاز', cold: 'جيد', salt: 'ممتاز' }, care: 'تقليم الأغصان السفلية والجافة بالشتاء.', check: 30 }),
  P({ id: 'rubber', ar: 'المطاط', alt: ['مطاط', 'فيكس مطاط', 'شجرة المطاط'], sci: 'Ficus elastica', cat: 'tree', env: 'both', light: 'fullpm',
    place: 'بالحديقة: شمس صباحية وظل بعد الظهر (الشمس الغربية صيفاً تحرق الورق)، وبعيد 4 أمتار عن الأساسات. بالبيت: ضوء ساطع غير مباشر.',
    soil: 'تربة جيدة التصريف، لا يتحمل التغدق.',
    w: { m: 'ring', leaves: 'wash', unit: 'L', S: [3, 15], M: [6, 15], W: [12, 10], mature: [1.5, 2], slot: { S: 'early', M: 'morning', W: 'midmorning' },
      est: { days: 30, every: 2, amount: 10 }, test: 'اسقِ لما تجف أعلى 5 سم من التربة.', warn: 'غطّه بقماش ليالي الصقيع (أقل من 3°م). اصفرار وسقوط الأوراق السفلى غالباً = سقي زائد. العصارة البيضاء مهيجة للجلد.' },
    feed: [F.npk('50 غم للنبتة بالأرض (أو نصف جرعة سائلة للأصيص).', [4, 5, 6, 7, 8, 9], 30), F.manure('5 كغم')],
    tol: { heat: 'جيد بالظل الجزئي', cold: 'ضعيف (يتضرر بالصقيع)', salt: 'متوسط' }, care: 'لتربيته على جذع واحد (عمود): أزل الفروع الجانبية من الجذع واترك التاج بالأعلى، واربطه بدعامة أول سنة.', check: 21 }),
  P({ id: 'ficus_nitida', ar: 'الفايكس (فيكس نتدا)', alt: ['فايكس', 'فيكس', 'نتدا', 'سياج فايكس'], sci: 'Ficus microcarpa var. nitida', cat: 'shrub', env: 'out', light: 'full',
    place: 'شمس كاملة أو جزئية. ممتاز كسياج أو شجرة مشكّلة، بس جذوره عدوانية — 3-4 أمتار عن الأساسات والمجاري.', soil: 'يتحمل أغلب الأتربة.',
    w: { m: 'base', leaves: 'ok', unit: 'L', S: [3, 20], M: [7, 20], W: [14, 15], mature: [1.5, 2], slot: { S: 'early', M: 'morning', W: 'midmorning' },
      est: { days: 30, every: 2, amount: 15 }, test: 'احفر 5-10 سم: جافة = اسقِ.', warn: 'التفاف الأوراق الحديثة = حشرة التربس، رش مبيد مناسب.' },
    feed: [F.manure('5-8 كغم'), F.npk('50 غم للشجيرة.', [4, 6, 8], 60)], tol: { heat: 'ممتاز', cold: 'جيد', salt: 'جيد' }, care: 'تقليم تشكيلي ربيعاً وخريفاً.', check: 30 }),
  P({ id: 'conocarpus', ar: 'كونوكاربس', alt: ['كونوكاربس', 'دمس'], sci: 'Conocarpus lancifolius', cat: 'tree', env: 'out', light: 'full',
    place: '⚠️ جذوره تخرّب الأساسات وأنابيب الماء والمجاري — لا يُنصح بزراعته داخل حديقة دار. إذا زُرع: 6 أمتار على الأقل عن أي بناء.', soil: 'يتحمل الملوحة والعطش.',
    w: { m: 'basin', leaves: 'never', unit: 'L', S: [4, 30], M: [7, 30], W: [14, 20], mature: [2, 2], slot: { S: 'early', M: 'morning', W: 'midmorning' },
      est: { days: 30, every: 2, amount: 20 }, test: 'احفر 10 سم: جافة = اسقِ.', warn: 'لا تكثر السقي — يزيد انتشار جذوره بحثاً عن الماء.' },
    feed: [], tol: { heat: 'ممتاز', cold: 'جيد', salt: 'ممتاز' }, care: 'يحتاج تقليم مستمر.', check: 30 }),
  P({ id: 'callistemon', ar: 'فرشاة الزجاجة', alt: ['فرشاة الزجاجة', 'كاليستمون'], sci: 'Callistemon viminalis', cat: 'shrub', env: 'out', light: 'full',
    place: 'شمس كاملة. شجيرة/شجرة صغيرة مزهرة أحمر.', soil: 'جيدة التصريف.',
    w: { m: 'base', leaves: 'never', unit: 'L', S: [3, 15], M: [7, 15], W: [14, 10], mature: [1.5, 1.5], slot: { S: 'early', M: 'morning', W: 'midmorning' },
      est: { days: 30, every: 2, amount: 10 }, test: 'احفر 5-10 سم: جافة = اسقِ.', warn: 'تصفرّ أوراقها بالتربة القلوية — حديد مخلبي.' },
    feed: [F.iron('10 غم حول النبات مذاب بالماء.', [3, 9]), F.manure('3-5 كغم')], tol: { heat: 'جيد', cold: 'جيد', salt: 'متوسط' }, care: 'قص الأزهار الذابلة يجدد التزهير.', check: 30 }),


  // ───────────── ورد وشجيرات مزهرة ─────────────
  P({ id: 'rose', ar: 'ورد جوري', alt: ['جوري', 'ورد', 'ورد جوري', 'روز'], sci: 'Rosa × hybrida / Rosa damascena', cat: 'flower', env: 'out', light: 'fullpm',
    place: 'شمس الصبح كاملة (6 ساعات) مع ظل بعد الظهر بالصيف — جهة شرقية ممتازة. تهوية جيدة بين الشجيرات (60 سم).', soil: 'خصبة غنية بالسماد العضوي جيدة التصريف.',
    w: { m: 'base', leaves: 'never', unit: 'L', S: [2, 10], M: [3, 8], W: [7, 6], slot: { S: 'early', M: 'morning', W: 'midmorning' },
      est: { days: 21, every: 1, amount: 5 }, test: 'احفر 5 سم: إذا جافة اسقِ. ذبول الصبح (مو الظهر) = عطش.', warn: 'لا تبلل الورق أبداً (البياض الدقيقي والتبقع الأسود). اسقِ الصبح الباكر فقط.' },
    feed: [F.manure('3-5 كغم'), F.npk('15 غم للشجيرة حول القاعدة ثم سقي.', [3, 4, 5, 10, 11], 15), F.potash('10 غم للشجيرة.', [3, 4, 10], 21), F.iron('3-5 غم مذاب بالماء.', [3, 9])],
    tol: { heat: 'متوسط (يضعف تزهيره بتموز وآب)', cold: 'ممتاز', salt: 'ضعيف' }, care: 'تقليم جائر نهاية كانون الثاني/شباط، وتقليم خفيف بأيلول. قص الورد الذابل أولاً بأول. لا تسميد بتموز وآب.', check: 14 }),
  P({ id: 'bougainvillea', ar: 'جهنمية', alt: ['جهنمية', 'بوكانفيليا', 'ورد ورقي'], sci: 'Bougainvillea spp.', cat: 'climber', env: 'out', light: 'full',
    place: 'شمس كاملة طول اليوم = تزهير أكثر. تحتاج سند/جدار.', soil: 'جيدة التصريف، تحب الفقيرة نسبياً.',
    w: { m: 'base', leaves: 'never', unit: 'L', S: [4, 12], M: [7, 10], W: [14, 8], mature: [1.3, 1.5], slot: { S: 'early', M: 'morning', W: 'midmorning' },
      est: { days: 30, every: 2, amount: 6 }, test: 'اسقِ لما تجف أعلى 5-7 سم.', warn: 'السقي الزائد والسماد النتروجيني = ورق بدون ورد. لا تفكك جذورها عند الزراعة (حساسة جداً) — ازرعها بكتلة ترابها.' },
    feed: [F.potash('20 غم للنبتة.', [3, 4, 5, 6, 9, 10], 30)], tol: { heat: 'ممتاز', cold: 'متوسط (الصقيع يحرق الأطراف وتعود)', salt: 'جيد' }, care: 'تقليم بعد كل موجة تزهير يحفز موجة جديدة.', check: 21 }),
  P({ id: 'jasmine_sambac', ar: 'ياسمين عربي (فل / رازقي)', alt: ['فل', 'رازقي', 'ياسمين عربي', 'مشموم'], sci: 'Jasminum sambac', cat: 'shrub', env: 'both', light: 'full',
    place: 'شمس كاملة أو جزئية، محمي من الصقيع (يتضرر تحت 3°م).', soil: 'خصبة جيدة التصريف.',
    w: { m: 'base', leaves: 'ok', unit: 'L', S: [2, 8], M: [4, 6], W: [10, 4], slot: { S: 'early', M: 'morning', W: 'midmorning' },
      est: { days: 21, every: 1, amount: 4 }, test: 'احفر 3-5 سم: جافة = اسقِ.', warn: 'اصفرار الورق = نقص حديد أو سقي زائد.' },
    feed: [F.npk('15 غم.', [4, 5, 6, 7, 8, 9], 30), F.iron('3 غم مذاب.', [4, 8])], tol: { heat: 'ممتاز', cold: 'ضعيف', salt: 'متوسط' }, care: 'تقليم خفيف بعد التزهير.', check: 21 }),
  P({ id: 'jasmine_climb', ar: 'ياسمين متسلق', alt: ['ياسمين', 'ياسمين أبيض'], sci: 'Jasminum officinale / grandiflorum', cat: 'climber', env: 'out', light: 'full',
    place: 'شمس كاملة أو جزئية مع سند.', soil: 'جيدة التصريف.',
    w: { m: 'base', leaves: 'ok', unit: 'L', S: [3, 10], M: [5, 8], W: [14, 6], slot: { S: 'early', M: 'morning', W: 'midmorning' },
      est: { days: 21, every: 2, amount: 5 }, test: 'احفر 5 سم.', warn: '' },
    feed: [F.npk('20 غم.', [3, 5, 7, 9], 45)], tol: { heat: 'جيد', cold: 'جيد', salt: 'متوسط' }, care: 'تقليم بعد التزهير.', check: 30 }),
  P({ id: 'hibiscus', ar: 'ختمية (هبسكس)', alt: ['ختمية', 'هبسكس', 'ورد الصين'], sci: 'Hibiscus rosa-sinensis', cat: 'flower', env: 'both', light: 'full',
    place: 'شمس كاملة أو جزئية، محمي من الصقيع.', soil: 'خصبة جيدة التصريف.',
    w: { m: 'base', leaves: 'ok', unit: 'L', S: [2, 10], M: [4, 8], W: [10, 5], slot: { S: 'early', M: 'morning', W: 'midmorning' },
      est: { days: 21, every: 1, amount: 5 }, test: 'احفر 3-5 سم: جافة = اسقِ.', warn: 'سقوط البراعم قبل التفتح = عطش أو تغيير مكان. العنكبوت الأحمر شائع بالصيف — رش الماء على الورق صباحاً يقلله.' },
    feed: [F.potash('15 غم.', [4, 5, 6, 7, 8, 9, 10], 15), F.iron('3 غم.', [4, 8])], tol: { heat: 'جيد', cold: 'ضعيف', salt: 'ضعيف' }, care: 'تقليم ربيعي.', check: 21 }),
  P({ id: 'oleander', ar: 'دفلة', alt: ['دفلة', 'دفلى', 'الدفلة'], sci: 'Nerium oleander', cat: 'shrub', env: 'out', light: 'full',
    place: 'شمس كاملة. ⚠️ كل أجزائها سامة جداً — بعيداً عن الأطفال والحيوانات.', soil: 'أي تربة، تتحمل الملوحة.',
    w: { m: 'base', leaves: 'never', unit: 'L', S: [5, 15], M: [10, 12], W: [21, 10], slot: { S: 'early', M: 'morning', W: 'midmorning' },
      est: { days: 21, every: 2, amount: 8 }, test: 'احفر 10 سم.', warn: 'البس كفوف عند التقليم ولا تحرق مخلفاتها.' },
    feed: [F.potash('20 غم.', [4, 6], 60)], tol: { heat: 'ممتاز', cold: 'جيد', salt: 'ممتاز' }, care: 'تقليم بالخريف.', check: 30 }),
  P({ id: 'cestrum', ar: 'مسك الليل', alt: ['مسك الليل', 'ملكة الليل'], sci: 'Cestrum nocturnum', cat: 'shrub', env: 'out', light: 'partial',
    place: 'شمس جزئية، قرب الجلسات (عطره ليلي). ثماره سامة.', soil: 'خصبة.',
    w: { m: 'base', leaves: 'ok', unit: 'L', S: [3, 10], M: [5, 8], W: [12, 6], slot: { S: 'early', M: 'morning', W: 'midmorning' },
      est: { days: 21, every: 2, amount: 5 }, test: 'احفر 5 سم.', warn: '' },
    feed: [F.npk('20 غم.', [3, 5, 7, 9], 45)], tol: { heat: 'جيد', cold: 'متوسط', salt: 'متوسط' }, care: 'تقليم بعد التزهير لأنه سريع النمو.', check: 30 }),
  P({ id: 'lantana', ar: 'لانتانا', alt: ['لانتانا', 'أم كلثوم'], sci: 'Lantana camara', cat: 'shrub', env: 'out', light: 'full',
    place: 'شمس كاملة. ثمارها سامة.', soil: 'أي تربة جيدة التصريف.',
    w: { m: 'base', leaves: 'never', unit: 'L', S: [4, 6], M: [7, 5], W: [14, 4], slot: { S: 'early', M: 'morning', W: 'midmorning' },
      est: { days: 21, every: 2, amount: 3 }, test: 'احفر 5 سم: جافة = اسقِ.', warn: 'تتحمل العطش، السقي الزائد يقلل الورد.' },
    feed: [F.potash('10 غم.', [4, 6, 8], 60)], tol: { heat: 'ممتاز', cold: 'متوسط', salt: 'جيد' }, care: 'تقليم قوي نهاية الشتاء.', check: 30 }),
  P({ id: 'dodonaea', ar: 'ديدونيا (سياج)', alt: ['ديدونيا', 'دودونيا'], sci: 'Dodonaea viscosa', cat: 'shrub', env: 'out', light: 'full',
    place: 'شمس كاملة، ممتازة كسياج.', soil: 'تتحمل الملوحة والعطش.',
    w: { m: 'base', leaves: 'never', unit: 'L', S: [5, 10], M: [10, 10], W: [21, 8], slot: { S: 'early', M: 'morning', W: 'midmorning' },
      est: { days: 30, every: 2, amount: 6 }, test: 'احفر 10 سم.', warn: '' },
    feed: [F.manure('3 كغم')], tol: { heat: 'ممتاز', cold: 'جيد', salt: 'ممتاز' }, care: 'قص تشكيلي.', check: 30 }),
  P({ id: 'tecoma', ar: 'تيكوما (الجرس الأصفر)', alt: ['تيكوما', 'تكوما'], sci: 'Tecoma stans', cat: 'shrub', env: 'out', light: 'full',
    place: 'شمس كاملة.', soil: 'جيدة التصريف.',
    w: { m: 'base', leaves: 'never', unit: 'L', S: [3, 12], M: [7, 10], W: [14, 8], slot: { S: 'early', M: 'morning', W: 'midmorning' },
      est: { days: 21, every: 2, amount: 6 }, test: 'احفر 5-10 سم.', warn: '' },
    feed: [F.potash('20 غم.', [4, 6, 8], 60)], tol: { heat: 'ممتاز', cold: 'متوسط', salt: 'جيد' }, care: 'تقليم نهاية الشتاء.', check: 30 }),
  P({ id: 'gardenia', ar: 'كاردينيا', alt: ['كاردينيا', 'جاردينيا', 'غاردينيا'], sci: 'Gardenia jasminoides', cat: 'flower', env: 'both', light: 'partial',
    place: 'ظل جزئي (شمس صباح فقط). ⚠️ صعبة بالنجف لأنها تحتاج تربة حامضية — الأفضل بأصيص بتربة بيتموس.', soil: 'حامضية (بيتموس)، لا تتحمل الكلس.',
    w: { m: 'base', leaves: 'mist', unit: 'L', S: [2, 4], M: [3, 3], W: [7, 2], slot: { S: 'early', M: 'morning', W: 'midmorning' },
      est: { days: 21, every: 1, amount: 2 }, test: 'التربة رطبة دائماً بدون تغدق.', warn: 'استخدم ماء مفلتر أو ماء مترّك ليلة. الرذاذ على الورق لا على الأزهار. اصفرار = نقص حديد.' },
    feed: [F.iron('2 غم مذاب كل شهر.', [3, 4, 5, 6, 7, 8, 9], 30), { n: 'سماد للنباتات المحبة للحموضة', f: 'حامضي', mo: [3, 5, 7, 9], d: 45, how: 'حسب العبوة.' }],
    tol: { heat: 'ضعيف', cold: 'متوسط', salt: 'ضعيف جداً' }, care: 'لا تحركها وهي مبرعمة.', check: 14 }),

  // ───────────── زهور موسمية ─────────────
  P({ id: 'petunia', ar: 'بتونيا', alt: ['بتونيا', 'بيتونيا'], sci: 'Petunia × atkinsiana', cat: 'seasonal', env: 'out', light: 'full',
    place: 'شمس كاملة. موسمها بالنجف: تشرين الأول إلى مايس — تموت بحر الصيف.', soil: 'خصبة جيدة التصريف.',
    w: { m: 'base', leaves: 'never', unit: 'L', S: [1, 1], M: [2, 1], W: [4, 0.8], slot: { S: 'early', M: 'morning', W: 'midmorning' },
      est: { days: 14, every: 1, amount: 0.5 }, test: 'احفر 2-3 سم: جافة = اسقِ.', warn: 'بلّ الأزهار يتلفها.' },
    feed: [F.potash('ملعقة صغيرة (5 غم) لكل لتر ماء سقي.', [11, 12, 1, 2, 3, 4], 14)], tol: { heat: 'ضعيف', cold: 'جيد', salt: 'متوسط' }, care: 'قص الأزهار الذابلة.', check: 21 }),
  P({ id: 'marigold', ar: 'قطيفة (أبو خنجر)', alt: ['قطيفة', 'ماريغولد', 'أبو خنجر', 'جعفري'], sci: 'Tagetes erecta / patula', cat: 'seasonal', env: 'out', light: 'full',
    place: 'شمس كاملة. تتحمل الحر — موسمها ربيع وصيف وخريف.', soil: 'أي تربة جيدة التصريف.',
    w: { m: 'base', leaves: 'never', unit: 'L', S: [2, 1.5], M: [3, 1.2], W: [6, 1], slot: { S: 'early', M: 'morning', W: 'midmorning' },
      est: { days: 14, every: 1, amount: 0.5 }, test: 'احفر 2-3 سم.', warn: '' },
    feed: [F.potash('5 غم لكل لتر سقي.', [4, 5, 6, 7, 8, 9, 10], 21)], tol: { heat: 'ممتاز', cold: 'ضعيف', salt: 'متوسط' }, care: 'قص الذابل.', check: 21 }),
  P({ id: 'vinca', ar: 'ونكا', alt: ['ونكا', 'فنكا', 'عناقية'], sci: 'Catharanthus roseus', cat: 'seasonal', env: 'out', light: 'full',
    place: 'شمس كاملة — نجمة الصيف العراقي.', soil: 'جيدة التصريف جداً.',
    w: { m: 'base', leaves: 'never', unit: 'L', S: [3, 1.5], M: [5, 1.2], W: [10, 1], slot: { S: 'early', M: 'morning', W: 'midmorning' },
      est: { days: 14, every: 2, amount: 0.5 }, test: 'اسقِ لما تجف أعلى 3 سم.', warn: '⚠️ أكثر شي يقتلها السقي الزائد (تعفن الجذور). سامة إذا أُكلت.' },
    feed: [F.potash('5 غم لكل لتر.', [5, 6, 7, 8, 9], 21)], tol: { heat: 'ممتاز', cold: 'ضعيف', salt: 'جيد' }, care: '', check: 21 }),
  P({ id: 'chrysanthemum', ar: 'أقحوان (داودي)', alt: ['أقحوان', 'داودي', 'اقحوان'], sci: 'Chrysanthemum × morifolium', cat: 'seasonal', env: 'both', light: 'full',
    place: 'شمس كاملة. يزهر بالخريف.', soil: 'خصبة.',
    w: { m: 'base', leaves: 'never', unit: 'L', S: [2, 2], M: [3, 1.5], W: [7, 1], slot: { S: 'early', M: 'morning', W: 'midmorning' },
      est: { days: 14, every: 1, amount: 1 }, test: 'احفر 3 سم.', warn: '' },
    feed: [F.npk('5 غم لكل لتر.', [4, 5, 6, 7, 8], 21), F.potash('5 غم لكل لتر.', [9, 10], 14)], tol: { heat: 'متوسط', cold: 'جيد', salt: 'متوسط' }, care: 'قرط القمم بالربيع لتكثيف التفرع.', check: 21 }),
  P({ id: 'dianthus', ar: 'قرنفل', alt: ['قرنفل', 'ديانثس', 'قرنفل الزينة'], sci: 'Dianthus spp.', cat: 'seasonal', env: 'out', light: 'full',
    place: 'شمس كاملة. موسمها الشتاء والربيع.', soil: 'جيدة التصريف، يحب الكلس.',
    w: { m: 'base', leaves: 'never', unit: 'L', S: [3, 1], M: [3, 1], W: [6, 0.8], slot: { S: 'early', M: 'morning', W: 'midmorning' },
      est: { days: 14, every: 2, amount: 0.5 }, test: 'اسقِ لما تجف أعلى 3 سم.', warn: 'لا يتحمل التغدق.' },
    feed: [F.potash('5 غم لكل لتر.', [11, 12, 1, 2, 3, 4], 21)], tol: { heat: 'ضعيف', cold: 'ممتاز', salt: 'متوسط' }, care: '', check: 21 }),
  P({ id: 'stock', ar: 'شبوي', alt: ['شبوي', 'منثور'], sci: 'Matthiola incana', cat: 'seasonal', env: 'out', light: 'full',
    place: 'شمس كاملة. زهرة شتوية عطرية.', soil: 'خصبة.',
    w: { m: 'base', leaves: 'never', unit: 'L', S: [2, 1], M: [3, 1], W: [5, 0.8], slot: { S: 'early', M: 'morning', W: 'midmorning' },
      est: { days: 14, every: 1, amount: 0.5 }, test: 'احفر 2-3 سم.', warn: '' },
    feed: [F.potash('5 غم لكل لتر.', [12, 1, 2, 3], 21)], tol: { heat: 'ضعيف', cold: 'ممتاز', salt: 'متوسط' }, care: '', check: 21 }),
  P({ id: 'geranium', ar: 'جيرانيوم (عطرة)', alt: ['جيرانيوم', 'عطرة', 'غرنوقي'], sci: 'Pelargonium spp.', cat: 'flower', env: 'both', light: 'fullpm',
    place: 'شمس صباحية مع ظل الظهيرة صيفاً.', soil: 'جيدة التصريف جداً.',
    w: { m: 'base', leaves: 'never', unit: 'L', S: [3, 1.5], M: [5, 1.2], W: [10, 1], slot: { S: 'early', M: 'morning', W: 'midmorning' },
      est: { days: 14, every: 2, amount: 0.5 }, test: 'اسقِ لما تجف أعلى 3 سم.', warn: 'الرطوبة الزائدة تعفن الساق.' },
    feed: [F.potash('5 غم لكل لتر.', [3, 4, 5, 10, 11], 21)], tol: { heat: 'متوسط', cold: 'متوسط', salt: 'متوسط' }, care: 'قص الذابل.', check: 21 }),
  P({ id: 'portulaca', ar: 'بربين الزينة (شمسية)', alt: ['بربين الزينة', 'شمسية', 'بورتولاكا', 'ساعة عشرة'], sci: 'Portulaca grandiflora', cat: 'seasonal', env: 'out', light: 'full',
    place: 'شمس حارقة كاملة — تتفتح بالشمس.', soil: 'رملية جيدة التصريف.',
    w: { m: 'base', leaves: 'never', unit: 'L', S: [3, 0.8], M: [5, 0.6], W: null, slot: { S: 'early', M: 'morning', W: 'midmorning' },
      est: { days: 10, every: 1, amount: 0.3 }, test: 'اسقِ لما تجف التربة.', warn: 'نبات عصاري — الإفراط بالسقي يعفنه.' },
    feed: [], tol: { heat: 'ممتاز', cold: 'ضعيف', salt: 'جيد' }, care: '', check: 30 }),
  P({ id: 'zinnia', ar: 'زينيا', alt: ['زينيا', 'زنيا'], sci: 'Zinnia elegans', cat: 'seasonal', env: 'out', light: 'full',
    place: 'شمس كاملة. موسم صيفي.', soil: 'جيدة التصريف.',
    w: { m: 'base', leaves: 'never', unit: 'L', S: [2, 1.5], M: [3, 1.2], W: null, slot: { S: 'early', M: 'morning', W: 'midmorning' },
      est: { days: 14, every: 1, amount: 0.5 }, test: 'احفر 3 سم.', warn: 'بلّ الورق يسبب البياض الدقيقي.' },
    feed: [F.potash('5 غم لكل لتر.', [5, 6, 7, 8, 9], 21)], tol: { heat: 'ممتاز', cold: 'ضعيف', salt: 'متوسط' }, care: '', check: 21 }),
  P({ id: 'pansy', ar: 'بنفسج (بانسيه)', alt: ['بنفسج', 'بانسيه', 'زهرة الثالوث'], sci: 'Viola × wittrockiana', cat: 'seasonal', env: 'out', light: 'full',
    place: 'شمس كاملة شتاءً. موسمها تشرين الثاني إلى آذار.', soil: 'خصبة.',
    w: { m: 'base', leaves: 'never', unit: 'L', S: null, M: [2, 0.8], W: [4, 0.6], slot: { S: 'early', M: 'morning', W: 'midmorning' },
      est: { days: 14, every: 1, amount: 0.3 }, test: 'احفر 2 سم.', warn: '' },
    feed: [F.potash('5 غم لكل لتر.', [11, 12, 1, 2, 3], 21)], tol: { heat: 'ضعيف جداً', cold: 'ممتاز', salt: 'ضعيف' }, care: '', check: 21 }),

  // ───────────── متسلقات أخرى ─────────────
  P({ id: 'passiflora', ar: 'زهرة الساعة (باسيفلورا)', alt: ['زهرة الساعة', 'باسيفلورا', 'زهرة الآلام'], sci: 'Passiflora caerulea', cat: 'climber', env: 'out', light: 'full',
    place: 'شمس كاملة أو جزئية مع سند.', soil: 'جيدة التصريف.',
    w: { m: 'base', leaves: 'never', unit: 'L', S: [3, 10], M: [5, 8], W: [12, 6], slot: { S: 'early', M: 'morning', W: 'midmorning' },
      est: { days: 21, every: 2, amount: 5 }, test: 'احفر 5 سم.', warn: '' },
    feed: [F.potash('20 غم.', [4, 6, 8], 45)], tol: { heat: 'جيد', cold: 'جيد', salt: 'متوسط' }, care: 'تقليم نهاية الشتاء.', check: 30 }),
  P({ id: 'ivy', ar: 'لبلاب (هيدرا)', alt: ['لبلاب', 'هيدرا', 'حبل المساكين'], sci: 'Hedera helix', cat: 'climber', env: 'both', light: 'shade',
    place: 'ظل أو ظل جزئي — الشمس المباشرة صيفاً تحرقه.', soil: 'خصبة.',
    w: { m: 'base', leaves: 'ok', unit: 'L', S: [3, 4], M: [5, 3], W: [10, 2], slot: { S: 'early', M: 'morning', W: 'midmorning' },
      est: { days: 21, every: 2, amount: 2 }, test: 'احفر 3 سم.', warn: 'العنكبوت الأحمر بالجو الجاف.' },
    feed: [F.npk('5 غم لكل لتر.', [3, 5, 7, 9], 45)], tol: { heat: 'متوسط', cold: 'ممتاز', salt: 'متوسط' }, care: '', check: 30 }),

  // ───────────── أعشاب ─────────────
  P({ id: 'mint', ar: 'نعناع', alt: ['نعناع', 'نعنع'], sci: 'Mentha spp.', cat: 'herb', env: 'both', light: 'partial',
    place: 'شمس صباحية وظل الظهر. ينتشر بسرعة — الأفضل بحوض مستقل.', soil: 'رطبة خصبة.',
    w: { m: 'base', leaves: 'ok', unit: 'L', S: [1, 1.5], M: [2, 1.2], W: [4, 1], slot: { S: 'early', M: 'morning', W: 'midmorning' },
      est: { days: 10, every: 1, amount: 0.5 }, test: 'التربة رطبة دائماً.', warn: '' },
    feed: [F.npk('3 غم لكل لتر.', [3, 4, 5, 6, 7, 8, 9, 10], 30)], tol: { heat: 'متوسط', cold: 'جيد', salt: 'ضعيف' }, care: 'القطف المستمر يكثّفه.', check: 30 }),
  P({ id: 'basil', ar: 'ريحان', alt: ['ريحان', 'حبق'], sci: 'Ocimum basilicum', cat: 'herb', env: 'out', light: 'full',
    place: 'شمس كاملة. موسم دافئ (يموت بالبرد).', soil: 'خصبة جيدة التصريف.',
    w: { m: 'base', leaves: 'never', unit: 'L', S: [1, 1], M: [2, 0.8], W: [4, 0.5], slot: { S: 'early', M: 'morning', W: 'midmorning' },
      est: { days: 10, every: 1, amount: 0.5 }, test: 'احفر 2 سم.', warn: '' },
    feed: [F.npk('3 غم لكل لتر.', [4, 5, 6, 7, 8, 9], 30)], tol: { heat: 'جيد', cold: 'ضعيف جداً', salt: 'ضعيف' }, care: 'اقطف الأزهار حتى يستمر بالورق.', check: 30 }),
  P({ id: 'rosemary', ar: 'إكليل الجبل (روزماري)', alt: ['روزماري', 'إكليل الجبل', 'حصى البان'], sci: 'Salvia rosmarinus', cat: 'herb', env: 'out', light: 'full',
    place: 'شمس كاملة.', soil: 'جيدة التصريف جداً.',
    w: { m: 'soak', leaves: 'never', unit: 'L', S: [5, 3], M: [10, 3], W: [20, 2], slot: { S: 'early', M: 'morning', W: 'midmorning' },
      est: { days: 21, every: 3, amount: 1.5 }, test: 'اسقِ لما تجف التربة تماماً.', warn: 'يموت من السقي الزائد.' },
    feed: [], tol: { heat: 'ممتاز', cold: 'جيد', salt: 'جيد' }, care: '', check: 30 }),

  // ───────────── صباريات ─────────────
  P({ id: 'aloe', ar: 'صبار / ألوفيرا', alt: ['صبار', 'ألوفيرا', 'صبر', 'كاكتوس'], sci: 'Aloe vera / Cactaceae', cat: 'succulent', env: 'both', light: 'full',
    place: 'شمس كاملة أو ساطعة.', soil: 'رملية جيدة التصريف جداً.',
    w: { m: 'soak', leaves: 'never', unit: 'L', S: [10, 2], M: [14, 1.5], W: [30, 1], slot: { S: 'early', M: 'morning', W: 'midmorning' },
      est: { days: 14, every: 7, amount: 0.5 }, test: 'اسقِ فقط لما تجف التربة كلياً.', warn: 'لا تصب الماء وسط الوردة.' },
    feed: [], tol: { heat: 'ممتاز', cold: 'متوسط', salt: 'جيد' }, care: '', check: 45 }),
  P({ id: 'crassula', ar: 'كراسولا (شجرة اليشم)', alt: ['كراسولا', 'شجرة المال', 'يشم'], sci: 'Crassula ovata', cat: 'succulent', env: 'in', light: 'bright',
    place: 'ضوء ساطع أو شمس صباح.', soil: 'تربة صباريات.',
    w: { m: 'can', leaves: 'never', unit: 'pot', S: [10], M: [14], W: [21], slot: { S: 'morning', M: 'morning', W: 'midmorning' },
      test: 'اسقِ لما تجف التربة كلياً.', warn: 'تجعد الأوراق = عطش، طراوتها = سقي زائد.' },
    feed: [], tol: { heat: 'جيد', cold: 'متوسط', salt: 'متوسط' }, care: '', check: 45 }),

  // ───────────── نباتات داخلية (أصص) ─────────────
  P({ id: 'pothos', ar: 'بوتس', alt: ['بوتس', 'بوثوس', 'اللبلاب الذهبي'], sci: 'Epipremnum aureum', cat: 'indoor', env: 'in', light: 'low',
    place: 'داخل البيت، ضوء غير مباشر (يتحمل الضعيف).', soil: 'تربة أصص خفيفة.',
    w: { m: 'can', leaves: 'mist', unit: 'pot', S: [5], M: [7], W: [12], slot: { S: 'morning', M: 'morning', W: 'midmorning' },
      test: 'اسقِ لما تجف أعلى 2-3 سم (أدخل إصبعك).', warn: 'سام للقطط والأطفال إذا أُكل.' },
    feed: [F.indoor()], tol: { heat: 'جيد', cold: 'متوسط', salt: 'متوسط' }, care: '', check: 30 }),
  P({ id: 'sansevieria', ar: 'سانسيفيريا (جلد النمر)', alt: ['سانسيفيريا', 'جلد النمر', 'لسان الحماة', 'سيف'], sci: 'Dracaena trifasciata', cat: 'indoor', env: 'in', light: 'low',
    place: 'أي ضوء داخلي.', soil: 'تربة صباريات جيدة التصريف.',
    w: { m: 'can', leaves: 'never', unit: 'pot', S: [14], M: [21], W: [30], slot: { S: 'morning', M: 'morning', W: 'midmorning' },
      test: 'اسقِ فقط لما تجف التربة كلياً.', warn: 'لا تصب الماء بوسط الأوراق. السقي الزائد يعفن القاعدة.' },
    feed: [F.indoor([4, 6, 8])], tol: { heat: 'ممتاز', cold: 'متوسط', salt: 'جيد' }, care: '', check: 45 }),
  P({ id: 'zz', ar: 'زاميا (ZZ)', alt: ['زاميا', 'زز', 'ZZ'], sci: 'Zamioculcas zamiifolia', cat: 'indoor', env: 'in', light: 'low',
    place: 'أي ضوء داخلي غير مباشر.', soil: 'جيدة التصريف.',
    w: { m: 'can', leaves: 'wash', unit: 'pot', S: [12], M: [16], W: [25], slot: { S: 'morning', M: 'morning', W: 'midmorning' },
      test: 'اسقِ لما تجف التربة كلياً.', warn: 'اصفرار الأوراق = سقي زائد.' },
    feed: [F.indoor([4, 6, 8])], tol: { heat: 'ممتاز', cold: 'متوسط', salt: 'جيد' }, care: '', check: 45 }),
  P({ id: 'spathiphyllum', ar: 'سباثيفيلوم (زنبق السلام)', alt: ['سباثيفيلوم', 'زنبق السلام', 'ورد السلام'], sci: 'Spathiphyllum wallisii', cat: 'indoor', env: 'in', light: 'low',
    place: 'ضوء غير مباشر.', soil: 'خصبة رطبة.',
    w: { m: 'can', leaves: 'mist', unit: 'pot', S: [4], M: [6], W: [9], slot: { S: 'morning', M: 'morning', W: 'midmorning' },
      test: 'اسقِ لما يجف أعلى 2 سم — يذبل بوضوح لما يعطش ويرجع بعد السقي.', warn: 'أطراف بنية = ماء مالح أو جو جاف، استعمل ماء مفلتر.' },
    feed: [F.indoor()], tol: { heat: 'متوسط', cold: 'ضعيف', salt: 'ضعيف' }, care: '', check: 30 }),
  P({ id: 'dieffenbachia', ar: 'دفنباخيا', alt: ['دفنباخيا', 'ديفنباخيا'], sci: 'Dieffenbachia seguine', cat: 'indoor', env: 'in', light: 'bright',
    place: 'ضوء ساطع غير مباشر.', soil: 'جيدة التصريف.',
    w: { m: 'can', leaves: 'wash', unit: 'pot', S: [6], M: [8], W: [12], slot: { S: 'morning', M: 'morning', W: 'midmorning' },
      test: 'اسقِ لما يجف أعلى 3 سم.', warn: 'عصارتها سامة ومهيجة.' },
    feed: [F.indoor()], tol: { heat: 'جيد', cold: 'ضعيف', salt: 'متوسط' }, care: '', check: 30 }),
  P({ id: 'philodendron', ar: 'فيلودندرون', alt: ['فيلودندرون', 'فيلو'], sci: 'Philodendron spp.', cat: 'indoor', env: 'in', light: 'bright',
    place: 'ضوء ساطع غير مباشر.', soil: 'خفيفة جيدة التصريف.',
    w: { m: 'can', leaves: 'mist', unit: 'pot', S: [6], M: [8], W: [12], slot: { S: 'morning', M: 'morning', W: 'midmorning' },
      test: 'اسقِ لما يجف أعلى 3 سم.', warn: '' },
    feed: [F.indoor()], tol: { heat: 'جيد', cold: 'ضعيف', salt: 'متوسط' }, care: '', check: 30 }),
  P({ id: 'monstera', ar: 'مونستيرا', alt: ['مونستيرا', 'مونسترا'], sci: 'Monstera deliciosa', cat: 'indoor', env: 'in', light: 'bright',
    place: 'ضوء ساطع غير مباشر.', soil: 'خفيفة مع لحاء.',
    w: { m: 'can', leaves: 'wash', unit: 'pot', S: [6], M: [8], W: [12], slot: { S: 'morning', M: 'morning', W: 'midmorning' },
      test: 'اسقِ لما يجف أعلى 4-5 سم.', warn: '' },
    feed: [F.indoor()], tol: { heat: 'جيد', cold: 'ضعيف', salt: 'متوسط' }, care: 'دعامة للتسلق.', check: 30 }),
  P({ id: 'syngonium', ar: 'سينغونيوم', alt: ['سينغونيوم', 'سنجونيوم'], sci: 'Syngonium podophyllum', cat: 'indoor', env: 'in', light: 'bright',
    place: 'ضوء غير مباشر.', soil: 'خفيفة.',
    w: { m: 'can', leaves: 'mist', unit: 'pot', S: [5], M: [7], W: [10], slot: { S: 'morning', M: 'morning', W: 'midmorning' },
      test: 'اسقِ لما يجف أعلى 2 سم.', warn: '' },
    feed: [F.indoor()], tol: { heat: 'جيد', cold: 'ضعيف', salt: 'متوسط' }, care: '', check: 30 }),
  P({ id: 'dracaena', ar: 'خشب السعادة (دراسينا)', alt: ['خشب السعادة', 'دراسينا', 'دراسينا فراجرانس'], sci: 'Dracaena fragrans', cat: 'indoor', env: 'in', light: 'bright',
    place: 'ضوء غير مباشر.', soil: 'جيدة التصريف.',
    w: { m: 'can', leaves: 'wash', unit: 'pot', S: [7], M: [10], W: [14], slot: { S: 'morning', M: 'morning', W: 'midmorning' },
      test: 'اسقِ لما يجف أعلى 3-4 سم.', warn: 'حساسة للماء المالح والفلورايد (أطراف بنية) — استخدم ماء مفلتر/RO أو ماء حنفية مترّك 24 ساعة.' },
    feed: [F.indoor([4, 6, 8])], tol: { heat: 'جيد', cold: 'متوسط', salt: 'ضعيف' }, care: '', check: 30 }),
  P({ id: 'areca', ar: 'نخيل الأريكا', alt: ['أريكا', 'اريكا', 'نخلة داخلية'], sci: 'Dypsis lutescens', cat: 'indoor', env: 'in', light: 'bright',
    place: 'ضوء ساطع غير مباشر.', soil: 'جيدة التصريف.',
    w: { m: 'can', leaves: 'mist', unit: 'pot', S: [4], M: [6], W: [9], slot: { S: 'morning', M: 'morning', W: 'midmorning' },
      test: 'اسقِ لما يجف أعلى 2-3 سم.', warn: 'أطراف بنية = جو جاف أو ماء مالح. العنكبوت الأحمر مع المبردة الجافة.' },
    feed: [F.indoor()], tol: { heat: 'جيد', cold: 'ضعيف', salt: 'ضعيف' }, care: '', check: 30 }),
  P({ id: 'croton', ar: 'كروتون', alt: ['كروتون'], sci: 'Codiaeum variegatum', cat: 'indoor', env: 'both', light: 'bright',
    place: 'ضوء ساطع (ألوانه تبهت بالظل).', soil: 'خصبة جيدة التصريف.',
    w: { m: 'can', leaves: 'mist', unit: 'pot', S: [4], M: [6], W: [9], slot: { S: 'morning', M: 'morning', W: 'midmorning' },
      test: 'اسقِ لما يجف أعلى 2 سم.', warn: 'يسقط أوراقه إذا تغير مكانه أو جاه هواء بارد.' },
    feed: [F.indoor()], tol: { heat: 'جيد', cold: 'ضعيف', salt: 'متوسط' }, care: '', check: 30 }),
  P({ id: 'benjamina', ar: 'بنجامينا', alt: ['بنجامينا', 'فيكس بنجامينا'], sci: 'Ficus benjamina', cat: 'indoor', env: 'in', light: 'bright',
    place: 'ضوء ساطع ثابت — لا تحركها.', soil: 'جيدة التصريف.',
    w: { m: 'can', leaves: 'wash', unit: 'pot', S: [6], M: [8], W: [12], slot: { S: 'morning', M: 'morning', W: 'midmorning' },
      test: 'اسقِ لما يجف أعلى 3 سم.', warn: 'تسقط ورقها عند تغيير المكان أو تيار هواء.' },
    feed: [F.indoor()], tol: { heat: 'جيد', cold: 'متوسط', salt: 'متوسط' }, care: '', check: 30 }),
  P({ id: 'anthurium', ar: 'أنثوريوم', alt: ['أنثوريوم', 'انثوريوم', 'ورد الفلامنغو'], sci: 'Anthurium andraeanum', cat: 'indoor', env: 'in', light: 'bright',
    place: 'ضوء ساطع غير مباشر ورطوبة.', soil: 'خفيفة مع لحاء.',
    w: { m: 'can', leaves: 'mist', unit: 'pot', S: [5], M: [7], W: [10], slot: { S: 'morning', M: 'morning', W: 'midmorning' },
      test: 'اسقِ لما يجف أعلى 2-3 سم.', warn: 'استخدم ماء مفلتر.' },
    feed: [F.indoor()], tol: { heat: 'متوسط', cold: 'ضعيف', salt: 'ضعيف' }, care: '', check: 30 }),
  P({ id: 'aglaonema', ar: 'أكلونيما', alt: ['أكلونيما', 'اغلونيما', 'أجلونيما'], sci: 'Aglaonema spp.', cat: 'indoor', env: 'in', light: 'low',
    place: 'ضوء غير مباشر (يتحمل الضعيف).', soil: 'جيدة التصريف.',
    w: { m: 'can', leaves: 'wash', unit: 'pot', S: [6], M: [8], W: [12], slot: { S: 'morning', M: 'morning', W: 'midmorning' },
      test: 'اسقِ لما يجف أعلى 3 سم.', warn: '' },
    feed: [F.indoor()], tol: { heat: 'جيد', cold: 'ضعيف', salt: 'متوسط' }, care: '', check: 30 }),
  P({ id: 'schefflera', ar: 'شيفليرا', alt: ['شيفليرا', 'شفليرا', 'المظلة'], sci: 'Schefflera arboricola', cat: 'indoor', env: 'both', light: 'bright',
    place: 'ضوء ساطع غير مباشر.', soil: 'جيدة التصريف.',
    w: { m: 'can', leaves: 'wash', unit: 'pot', S: [6], M: [8], W: [12], slot: { S: 'morning', M: 'morning', W: 'midmorning' },
      test: 'اسقِ لما يجف أعلى 3 سم.', warn: '' },
    feed: [F.indoor()], tol: { heat: 'جيد', cold: 'متوسط', salt: 'متوسط' }, care: '', check: 30 }),
  P({ id: 'spider', ar: 'نبتة العنكبوت (كلوروفيتم)', alt: ['كلوروفيتم', 'نبتة العنكبوت', 'عنكبوتية'], sci: 'Chlorophytum comosum', cat: 'indoor', env: 'both', light: 'bright',
    place: 'ضوء غير مباشر.', soil: 'أي تربة أصص.',
    w: { m: 'can', leaves: 'never', unit: 'pot', S: [5], M: [7], W: [10], slot: { S: 'morning', M: 'morning', W: 'midmorning' },
      test: 'اسقِ لما يجف أعلى 2-3 سم.', warn: 'أطراف بنية = ماء مالح/فلورايد.' },
    feed: [F.indoor()], tol: { heat: 'جيد', cold: 'جيد', salt: 'ضعيف' }, care: '', check: 30 }),
  // ───────────── نباتات داخلية إضافية ─────────────
  P({ id: 'ficus_lyrata', ar: 'فيكس ليراتا (الكمان)', alt: ['كمان', 'فيكس كمان', 'ليراتا', 'تين الكمان'], sci: 'Ficus lyrata', cat: 'indoor', env: 'in', light: 'bright',
    place: 'أقرب مكان لشباك مضيء بدون شمس ظهر مباشرة، وثابت — يكره النقل وتيار هواء المبردة/السبلت.', soil: 'تربة أصص جيدة التصريف مع بيرلايت.',
    w: { m: 'can', leaves: 'wash', unit: 'pot', S: [6], M: [8], W: [12], slot: { S: 'morning', M: 'morning', W: 'midmorning' },
      test: 'اسقِ لما يجف أعلى 4-5 سم (أدخل إصبعك كاملاً).', warn: 'بقع بنية من الوسط = سقي زائد. أطراف بنية جافة = عطش أو جو جاف. تسقط أوراقها إذا نقلتها.' },
    feed: [F.indoor()], tol: { heat: 'جيد', cold: 'ضعيف', salt: 'ضعيف' }, care: 'لفّ الأصيص ربع لفة كل أسبوعين حتى ينمو مستقيم. امسح الأوراق الكبيرة من الغبار.', check: 21 }),
  P({ id: 'calathea', ar: 'كالاثيا', alt: ['كالاثيا', 'نبتة الصلاة', 'مارانتا'], sci: 'Calathea / Goeppertia spp.', cat: 'indoor', env: 'in', light: 'low',
    place: 'ظل ساطع بعيد عن الشمس المباشرة (تبهت ألوانها وتحترق).', soil: 'تربة رطبة خفيفة غنية بالمادة العضوية.',
    w: { m: 'can', leaves: 'mist', unit: 'pot', S: [3], M: [5], W: [7], slot: { S: 'morning', M: 'morning', W: 'midmorning' },
      test: 'التربة رطبة دائماً بدون تغدق — اسقِ لما يجف أعلى 2 سم.', warn: 'حساسة جداً لملوحة ماء الإسالة والكلور (أطراف بنية) — استعمل ماء RO أو ماء مترّك 24 ساعة. التفاف الأوراق = عطش أو جو جاف.' },
    feed: [F.indoor([4, 6, 8])], tol: { heat: 'متوسط', cold: 'ضعيف', salt: 'ضعيف جداً' }, care: 'تحب الرطوبة: ضعها فوق صينية حصى وماء.', check: 14 }),
  P({ id: 'peperomia', ar: 'بيبروميا', alt: ['بيبروميا', 'بيبروميا البطيخ'], sci: 'Peperomia spp.', cat: 'indoor', env: 'in', light: 'bright',
    place: 'ضوء ساطع غير مباشر، مكتب أو رف قرب شباك.', soil: 'تربة خفيفة جيدة التصريف جداً.',
    w: { m: 'can', leaves: 'never', unit: 'pot', S: [7], M: [10], W: [14], slot: { S: 'morning', M: 'morning', W: 'midmorning' },
      test: 'اسقِ لما تجف التربة تقريباً كلياً — أوراقها تخزن الماء.', warn: 'السقي الزائد يعفن الساق بسرعة.' },
    feed: [F.indoor([4, 6, 8])], tol: { heat: 'جيد', cold: 'ضعيف', salt: 'متوسط' }, care: '', check: 30 }),
  P({ id: 'chamaedorea', ar: 'نخلة الصالون (شاميدوريا)', alt: ['نخلة الصالون', 'شاميدوريا', 'كاميدوريا', 'نخيل الصالون'], sci: 'Chamaedorea elegans', cat: 'indoor', env: 'in', light: 'low',
    place: 'زوايا البيت بإضاءة غير مباشرة — تتحمل الضوء الضعيف.', soil: 'تربة أصص جيدة التصريف.',
    w: { m: 'can', leaves: 'mist', unit: 'pot', S: [5], M: [7], W: [10], slot: { S: 'morning', M: 'morning', W: 'midmorning' },
      test: 'اسقِ لما يجف أعلى 2-3 سم.', warn: 'العنكبوت الأحمر بالجو الجاف (نقط صفراء وخيوط) — رش الأوراق بالماء أسبوعياً.' },
    feed: [F.indoor()], tol: { heat: 'جيد', cold: 'متوسط', salt: 'ضعيف' }, care: '', check: 30 }),
  P({ id: 'rhapis', ar: 'نخيل رابيس', alt: ['رابيس', 'نخلة رابيس', 'نخيل الخيزران'], sci: 'Rhapis excelsa', cat: 'indoor', env: 'both', light: 'low',
    place: 'داخل البيت بإضاءة متوسطة، أو بالحديقة بظل كامل.', soil: 'جيدة التصريف.',
    w: { m: 'can', leaves: 'wash', unit: 'pot', S: [6], M: [8], W: [12], slot: { S: 'morning', M: 'morning', W: 'midmorning' },
      test: 'اسقِ لما يجف أعلى 3 سم.', warn: 'أطراف بنية = ملوحة الماء أو جفاف.' },
    feed: [F.indoor([4, 6, 8])], tol: { heat: 'جيد', cold: 'جيد', salt: 'متوسط' }, care: '', check: 30 }),
  P({ id: 'dracaena_marginata', ar: 'دراسينا مارجيناتا', alt: ['مارجيناتا', 'دراسينا حمراء', 'شجرة التنين'], sci: 'Dracaena marginata', cat: 'indoor', env: 'in', light: 'bright',
    place: 'ضوء ساطع غير مباشر.', soil: 'جيدة التصريف.',
    w: { m: 'can', leaves: 'wash', unit: 'pot', S: [8], M: [10], W: [14], slot: { S: 'morning', M: 'morning', W: 'midmorning' },
      test: 'اسقِ لما يجف نصف التربة تقريباً.', warn: 'حساسة للفلورايد وملوحة الماء — ماء مفلتر أو مترّك.' },
    feed: [F.indoor([4, 6, 8])], tol: { heat: 'جيد', cold: 'متوسط', salt: 'ضعيف' }, care: '', check: 30 }),
  P({ id: 'lucky_bamboo', ar: 'خيزران الحظ (بامبو)', alt: ['بامبو', 'خيزران الحظ', 'بامبو الحظ', 'لاكي بامبو'], sci: 'Dracaena sanderiana', cat: 'indoor', env: 'in', light: 'low',
    place: 'ضوء غير مباشر — الشمس المباشرة تصفّر سيقانه.', soil: 'ماء مع حصى، أو تربة أصص.',
    w: { m: 'vase', leaves: 'never', unit: 'pot', S: [7], M: [7], W: [10], slot: { S: 'morning', M: 'morning', W: 'midmorning' },
      test: 'بالماء: الماء صافي وبدون رائحة. بالتربة: يجف أعلى 2 سم.', warn: 'اصفرار الساق من الأسفل = تعفن، اقطع الجزء المصاب. ماء الإسالة مباشرة يصفّر الأوراق.' },
    feed: [{ n: 'سماد سائل مخفف جداً', f: 'للنباتات المائية', mo: [4, 7], d: 60, how: 'قطرة أو قطرتين من السماد السائل بماء الإناء فقط.' }], tol: { heat: 'جيد', cold: 'ضعيف', salt: 'ضعيف' }, care: '', check: 30 }),
  P({ id: 'orchid', ar: 'أوركيد (فلينوبسس)', alt: ['أوركيد', 'اوركيد', 'السحلبية', 'فلينوبسس'], sci: 'Phalaenopsis spp.', cat: 'indoor', env: 'in', light: 'bright',
    place: 'شباك شرقي بضوء صباحي خفيف، بعيد عن شمس الظهر وهواء السبلت.', soil: 'لحاء صنوبر (ليس تربة عادية).',
    w: { m: 'orchid', leaves: 'never', unit: 'pot', S: [6], M: [8], W: [12], slot: { S: 'morning', M: 'morning', W: 'midmorning' },
      test: 'الجذور داخل الأصيص الشفاف صارت فضية/رمادية = يحتاج سقي. خضراء = بعده رطب.', warn: 'لا تخلي ماء بقلب النبتة (يعفن). الجذور البنية الطرية = سقي زائد.' },
    feed: [{ n: 'سماد أوركيد (أو 20-20-20 ربع التركيز)', f: 'متوازن مخفف', mo: [3, 4, 5, 6, 7, 8, 9, 10], d: 14, how: 'ربع الجرعة المكتوبة بماء النقع، مرة كل أسبوعين.' }], tol: { heat: 'متوسط', cold: 'ضعيف', salt: 'ضعيف جداً' }, care: 'بعد ذبول الزهور اقطع الساق فوق ثاني عقدة.', check: 21 }),
  P({ id: 'fern', ar: 'سرخس (فيرن)', alt: ['سرخس', 'فيرن', 'خنشار', 'سرخس بوسطن'], sci: 'Nephrolepis exaltata', cat: 'indoor', env: 'both', light: 'low',
    place: 'ظل ساطع ورطوبة — حمام مضيء أو قرب شباك شمالي.', soil: 'تربة رطبة غنية.',
    w: { m: 'can', leaves: 'mist', unit: 'pot', S: [2], M: [4], W: [6], slot: { S: 'morning', M: 'morning', W: 'midmorning' },
      test: 'التربة رطبة دائماً — لا تخليها تجف.', warn: 'جفاف التربة مرة وحدة يحرق الأوراق. رذاذ يومي بالصيف مع المبردة/السبلت.' },
    feed: [F.indoor([4, 5, 6, 7, 8])], tol: { heat: 'متوسط', cold: 'متوسط', salt: 'ضعيف' }, care: '', check: 14 }),
  P({ id: 'alocasia', ar: 'ألوكاسيا (أذن الفيل)', alt: ['ألوكاسيا', 'الوكاسيا', 'أذن الفيل', 'كلوكاسيا'], sci: 'Alocasia spp.', cat: 'indoor', env: 'in', light: 'bright',
    place: 'ضوء ساطع غير مباشر ورطوبة.', soil: 'خفيفة جيدة التصريف.',
    w: { m: 'can', leaves: 'wash', unit: 'pot', S: [5], M: [7], W: [12], slot: { S: 'morning', M: 'morning', W: 'midmorning' },
      test: 'اسقِ لما يجف أعلى 3 سم.', warn: 'بالشتاء ممكن تدخل سكون وتسقط أوراقها — قلل السقي ولا ترميها. سامة إذا أُكلت.' },
    feed: [F.indoor()], tol: { heat: 'جيد', cold: 'ضعيف', salt: 'ضعيف' }, care: '', check: 21 }),
  P({ id: 'begonia', ar: 'بيغونيا', alt: ['بيغونيا', 'بيجونيا'], sci: 'Begonia spp.', cat: 'indoor', env: 'both', light: 'bright',
    place: 'ضوء ساطع غير مباشر.', soil: 'خفيفة جيدة التصريف.',
    w: { m: 'can', leaves: 'never', unit: 'pot', S: [4], M: [6], W: [9], slot: { S: 'morning', M: 'morning', W: 'midmorning' },
      test: 'اسقِ لما يجف أعلى 2 سم.', warn: 'لا ترش الأوراق (بياض دقيقي). السقي الزائد يعفن الساق.' },
    feed: [F.indoor()], tol: { heat: 'متوسط', cold: 'ضعيف', salt: 'ضعيف' }, care: 'قص الأزهار الذابلة.', check: 21 }),
  P({ id: 'cyclamen', ar: 'سيكلامن (بخور مريم)', alt: ['سيكلامن', 'بخور مريم'], sci: 'Cyclamen persicum', cat: 'indoor', env: 'in', light: 'bright',
    place: 'مكان بارد مضيء (يحب 10-18°م) — بعيد عن المدفأة. موسمه الشتاء.', soil: 'خفيفة.',
    w: { m: 'bottom', leaves: 'never', unit: 'pot', S: null, M: [5], W: [5], slot: { S: 'morning', M: 'morning', W: 'midmorning' },
      test: 'اسقِ لما يجف أعلى 2 سم أو يخف وزن الأصيص.', warn: 'لا تصب الماء على الدرنة (يعفن). بالصيف يسكن ويذبل — طبيعي.' },
    feed: [F.indoor([11, 12, 1, 2, 3])], tol: { heat: 'ضعيف جداً', cold: 'جيد', salt: 'ضعيف' }, care: 'اقلع الأزهار الذابلة من أساسها.', check: 21 }),
  P({ id: 'hoya', ar: 'هويا (زهرة الشمع)', alt: ['هويا', 'زهرة الشمع'], sci: 'Hoya carnosa', cat: 'indoor', env: 'in', light: 'bright',
    place: 'ضوء ساطع، معلقة أو على سند.', soil: 'خفيفة جداً.',
    w: { m: 'can', leaves: 'never', unit: 'pot', S: [8], M: [10], W: [14], slot: { S: 'morning', M: 'morning', W: 'midmorning' },
      test: 'اسقِ لما تجف التربة تقريباً كلياً.', warn: 'لا تقص سيقان الزهور القديمة — تزهر منها مرة ثانية.' },
    feed: [F.indoor([4, 6, 8])], tol: { heat: 'جيد', cold: 'ضعيف', salt: 'متوسط' }, care: '', check: 30 }),
  P({ id: 'kalanchoe', ar: 'كالانشو', alt: ['كالانشو', 'كلانشو'], sci: 'Kalanchoe blossfeldiana', cat: 'succulent', env: 'both', light: 'bright',
    place: 'ضوء ساطع أو شمس صباح.', soil: 'تربة صباريات.',
    w: { m: 'can', leaves: 'never', unit: 'pot', S: [7], M: [10], W: [14], slot: { S: 'morning', M: 'morning', W: 'midmorning' },
      test: 'اسقِ لما تجف التربة كلياً.', warn: 'نبات عصاري — السقي الزائد يقتله.' },
    feed: [F.indoor([3, 5, 9])], tol: { heat: 'جيد', cold: 'متوسط', salt: 'متوسط' }, care: 'قص الأزهار الذابلة.', check: 30 }),
  P({ id: 'yucca', ar: 'يوكا', alt: ['يوكا', 'يوكا الفيل'], sci: 'Yucca elephantipes', cat: 'indoor', env: 'both', light: 'full',
    place: 'داخل البيت بأقوى ضوء، أو بالحديقة شمس كاملة.', soil: 'جيدة التصريف جداً.',
    w: { m: 'can', leaves: 'never', unit: 'pot', S: [10], M: [14], W: [21], slot: { S: 'morning', M: 'morning', W: 'midmorning' },
      test: 'اسقِ لما يجف ثلثين التربة.', warn: 'أكثر ما يقتلها السقي الزائد.' },
    feed: [F.indoor([4, 7])], tol: { heat: 'ممتاز', cold: 'جيد', salt: 'جيد' }, care: '', check: 45 }),

  // ───────────── زينة خارجية إضافية ─────────────
  P({ id: 'strelitzia', ar: 'عصفور الجنة (ستريليتزيا)', alt: ['عصفور الجنة', 'ستريليتزيا', 'طائر الجنة'], sci: 'Strelitzia reginae / nicolai', cat: 'shrub', env: 'both', light: 'fullpm',
    place: 'بالحديقة: شمس صباح وظل الظهر. بالبيت: أقوى ضوء ممكن.', soil: 'خصبة جيدة التصريف.',
    w: { m: 'base', leaves: 'wash', unit: 'L', S: [3, 10], M: [5, 8], W: [10, 6], slot: { S: 'early', M: 'morning', W: 'midmorning' },
      est: { days: 21, every: 2, amount: 6 }, test: 'اسقِ لما يجف أعلى 5 سم.', warn: 'تشقق الأوراق طبيعي مع الهواء. احمها من الصقيع.' },
    feed: [F.npk('30 غم للنبتة.', [3, 5, 7, 9], 45), F.manure('3 كغم')], tol: { heat: 'جيد', cold: 'متوسط', salt: 'متوسط' }, care: 'أزل الأوراق اليابسة.', check: 30 }),
  P({ id: 'cycas', ar: 'سيكاس', alt: ['سيكاس', 'سيكس', 'نخلة الساغو'], sci: 'Cycas revoluta', cat: 'palm', env: 'both', light: 'full',
    place: 'شمس كاملة أو جزئية. ⚠️ سام جداً للأطفال والحيوانات.', soil: 'جيدة التصريف جداً.',
    w: { m: 'base', leaves: 'never', unit: 'L', S: [5, 12], M: [10, 10], W: [21, 8], slot: { S: 'early', M: 'morning', W: 'midmorning' },
      est: { days: 30, every: 3, amount: 6 }, test: 'اسقِ لما يجف أعلى 5-7 سم.', warn: 'لا تصب الماء على قلب النبتة. اصفرار الأوراق الجديدة = نقص منغنيز.' },
    feed: [{ n: 'سماد نخيل (مع منغنيز ومغنيسيوم)', f: 'للنخيل', mo: [4, 7], d: 90, how: '50 غم حول النبتة ثم سقي.' }], tol: { heat: 'ممتاز', cold: 'جيد', salt: 'جيد' }, care: 'قص الأوراق اليابسة فقط.', check: 45 }),
  P({ id: 'washingtonia', ar: 'نخيل واشنطونيا', alt: ['واشنطونيا', 'نخلة واشنطن', 'نخيل مروحي'], sci: 'Washingtonia robusta / filifera', cat: 'palm', env: 'out', light: 'full',
    place: 'شمس كاملة، 3 أمتار عن الجدران.', soil: 'تتحمل أغلب الأتربة والملوحة.',
    w: { m: 'basin', leaves: 'never', unit: 'L', S: [4, 30], M: [8, 25], W: [15, 20], mature: [1.5, 2], slot: { S: 'early', M: 'morning', W: 'midmorning' },
      est: { days: 45, every: 2, amount: 20 }, test: 'احفر 10-15 سم: جافة = اسقِ.', warn: 'لا تغمر قلب النخلة.' },
    feed: [F.manure('10 كغم'), { n: 'سماد نخيل', f: 'للنخيل', mo: [3, 6], d: 90, how: '150 غم حول الحوض.' }], tol: { heat: 'ممتاز', cold: 'جيد', salt: 'جيد' }, care: 'إزالة السعف اليابس بالشتاء.', check: 45 }),
  P({ id: 'duranta', ar: 'ديورانتا (سياج)', alt: ['ديورانتا', 'دورانتا', 'ديورانتا ذهبية'], sci: 'Duranta erecta', cat: 'shrub', env: 'out', light: 'full',
    place: 'شمس كاملة — ممتازة للأسيجة والتشكيل.', soil: 'أي تربة جيدة التصريف.',
    w: { m: 'base', leaves: 'ok', unit: 'L', S: [3, 8], M: [6, 6], W: [12, 5], slot: { S: 'early', M: 'morning', W: 'midmorning' },
      est: { days: 21, every: 2, amount: 4 }, test: 'احفر 5 سم: جافة = اسقِ.', warn: 'ثمارها سامة.' },
    feed: [F.npk('20 غم للشجيرة.', [3, 5, 7, 9], 45)], tol: { heat: 'ممتاز', cold: 'متوسط', salt: 'جيد' }, care: 'قص تشكيلي كل شهر بالصيف.', check: 30 }),
  P({ id: 'myrtus', ar: 'ياس (آس)', alt: ['ياس', 'آس', 'مرسين', 'ريحان الآس'], sci: 'Myrtus communis', cat: 'shrub', env: 'out', light: 'full',
    place: 'شمس كاملة أو جزئية، ممتاز كسياج عطري.', soil: 'جيدة التصريف، يتحمل الكلس.',
    w: { m: 'base', leaves: 'never', unit: 'L', S: [4, 8], M: [7, 6], W: [14, 5], slot: { S: 'early', M: 'morning', W: 'midmorning' },
      est: { days: 21, every: 2, amount: 4 }, test: 'احفر 5 سم.', warn: '' },
    feed: [F.manure('3 كغم')], tol: { heat: 'ممتاز', cold: 'جيد', salt: 'جيد' }, care: 'قص تشكيلي.', check: 30 }),
  P({ id: 'gazania', ar: 'جازانيا', alt: ['جازانيا', 'غازانيا'], sci: 'Gazania rigens', cat: 'seasonal', env: 'out', light: 'full',
    place: 'شمس كاملة — تتفتح بالشمس. تتحمل الحر والعطش.', soil: 'رملية جيدة التصريف.',
    w: { m: 'base', leaves: 'never', unit: 'L', S: [4, 1], M: [6, 0.8], W: [10, 0.6], slot: { S: 'early', M: 'morning', W: 'midmorning' },
      est: { days: 14, every: 1, amount: 0.5 }, test: 'اسقِ لما تجف التربة.', warn: 'السقي الزائد يعفنها.' },
    feed: [F.potash('5 غم لكل لتر.', [3, 4, 9, 10], 30)], tol: { heat: 'ممتاز', cold: 'جيد', salt: 'جيد' }, care: '', check: 30 }),
  P({ id: 'agave', ar: 'أغاف', alt: ['أغاف', 'اغاف', 'صبار الأغاف'], sci: 'Agave spp.', cat: 'succulent', env: 'out', light: 'full',
    place: 'شمس كاملة، بعيد عن ممرات الأطفال (أطرافه شوكية).', soil: 'رملية جيدة التصريف جداً.',
    w: { m: 'soak', leaves: 'never', unit: 'L', S: [14, 5], M: [21, 4], W: [30, 3], slot: { S: 'early', M: 'morning', W: 'midmorning' },
      est: { days: 21, every: 7, amount: 2 }, test: 'اسقِ فقط لما تجف التربة كلياً.', warn: '' },
    feed: [], tol: { heat: 'ممتاز', cold: 'جيد', salt: 'جيد' }, care: '', check: 60 }),
];

export const PLANT_BY_ID = Object.fromEntries(PLANTS.map((p) => [p.id, p]));

// مطابقة الاسم العلمي القادم من PlantNet مع القاعدة
export function matchScientific(sciName) {
  if (!sciName) return null;
  const s = sciName.toLowerCase();
  const genus = s.split(/\s+/)[0];
  const genusHits = new Set();
  for (const p of PLANTS) {
    const names = p.sci.toLowerCase().replace(/var\.\s*\S+/g, '').split(/[\/,]|×/).map((x) => x.trim()).filter(Boolean);
    for (const n of names) {
      const parts = n.split(/\s+/);
      if (parts.length >= 2 && !parts[1].startsWith('spp') && s.startsWith(parts[0] + ' ' + parts[1])) return p; // نوع مطابق
      if (parts[0] === genus) genusHits.add(p);
    }
  }
  // نعتمد الجنس فقط إذا كان في القاعدة نبات واحد من هذا الجنس (مثلاً Citrus) — غير ذلك نتركه للذكاء الاصطناعي
  return genusHits.size === 1 ? [...genusHits][0] : null;
}


// محرك الجدولة — مشترك بين التطبيق وسكربت الإشعارات (بدون DOM)

export const TZ = 'Asia/Baghdad';

export const SLOTS = {
  early: 'الصبح الباكر (5:30–7:30) — أو بعد الغروب إذا فاتك الصبح',
  morning: 'الصبح (6:00–9:00)',
  midmorning: 'الضحى (9:00–11:00) حتى تجف التربة السطحية قبل برد الليل',
};

// ─── الطقس الحقيقي للنجف (Open-Meteo مجاني بدون مفتاح) ───
export const NAJAF = { lat: 32.03, lon: 44.35 };
export async function fetchWeather() {
  const u = `https://api.open-meteo.com/v1/forecast?latitude=${NAJAF.lat}&longitude=${NAJAF.lon}&daily=temperature_2m_max,temperature_2m_min,precipitation_sum,wind_speed_10m_max&timezone=Asia%2FBaghdad&forecast_days=2`;
  const r = await fetch(u);
  if (!r.ok) throw new Error('weather ' + r.status);
  const d = (await r.json()).daily;
  const day = (i) => ({ date: d.time[i], tmax: d.temperature_2m_max[i], tmin: d.temperature_2m_min[i], rain: d.precipitation_sum[i], wind: d.wind_speed_10m_max[i] });
  return { today: day(0), tomorrow: day(1) };
}
export const HEAT_DAY = 45; // °م
export const RAIN_DAY = 4; // ملم — يكفي لتأجيل سقي الخارجي المزروع بالأرض
export const FROST_NIGHT = 3; // °م
export function isOutdoorGround(plant) { const p = profileOf(plant); return !(p?.env === 'in' || plant.indoor) && !plant.potted; }
export function isOutdoor(plant) { const p = profileOf(plant); return !(p?.env === 'in' || plant.indoor); }
export function coldSensitive(plant) { return /ضعيف|متوسط/.test(profileOf(plant)?.tol?.cold || ''); }
export function heatSensitive(plant) { return /ضعيف|متوسط/.test(profileOf(plant)?.tol?.heat || ''); }

// تاريخ اليوم بتوقيت بغداد بصيغة YYYY-MM-DD
export function todayStr(d = new Date()) {
  return new Intl.DateTimeFormat('en-CA', { timeZone: TZ, year: 'numeric', month: '2-digit', day: '2-digit' }).format(d);
}
export function parseDate(s) { const [y, m, d] = s.split('-').map(Number); return Date.UTC(y, m - 1, d); }
export function addDays(s, n) { const t = new Date(parseDate(s) + n * 86400000); return t.toISOString().slice(0, 10); }
export function diffDays(a, b) { return Math.round((parseDate(b) - parseDate(a)) / 86400000); } // b - a
export function monthOf(s) { return Number(s.slice(5, 7)); }

export function profileOf(plant) {
  return plant.profile || PLANT_BY_ID[plant.speciesId] || null;
}

// حجم أصيص تقريبي (لتر) من قطره بالسنتيمتر
export function potLiters(cm) { const d = Number(cm) || 25; return Math.max(0.5, Math.round(d * d * d * 0.00055 * 10) / 10); }

function round1(x) { return Math.round(x * 10) / 10; }

// خطة السقي لنبتة بتاريخ معيّن
export function waterPlan(plant, date, settings = {}) {
  const p = profileOf(plant);
  if (!p || !p.w) return null;
  const w = p.w;
  const season = seasonOf(monthOf(date));
  const base = w[season];
  const flow = Number(settings.flowLpm) || 0;
  const count = Math.max(1, Number(plant.count) || 1);
  if (!base) return { inactive: true, season, seasonName: SEASON_NAMES[season], note: 'هذا النبات خارج موسمه — غالباً انتهى عمره أو يُزرع بموسم آخر.' };

  let every = base[0];
  let amount = base[1] ?? null;
  const notes = [];

  if (plant.mature && w.mature && w.unit === 'L') { every = every * w.mature[0]; amount = amount * w.mature[1]; notes.push('كمية شجرة كبيرة (أكثر من سنتين)'); }

  const age = plant.plantedDate ? diffDays(plant.plantedDate, date) : 9999;
  const establishing = !!(w.est && age >= 0 && age < w.est.days);
  if (establishing) {
    const k = season === 'W' ? 3 : season === 'M' ? 1.5 : 1; // التبخر أقل بالشتاء
    every = Math.min(every, w.est.every * k);
    if (w.unit !== 'pot' && amount != null && w.est.amount) amount = w.est.amount;
    notes.push(`فترة تثبيت بعد الزراعة (${w.est.days - age} يوم متبقي): سقي أكثر تكراراً`);
  }

  const potted = plant.potted || w.unit === 'pot';
  let litersEach = null; let amountText = '';
  if (potted) {
    if (w.unit !== 'pot' && !(p.env === 'in' || plant.indoor)) { every = every * 0.6; notes.push('بالأصيص يجف أسرع من الأرض'); }
    const pl = potLiters(plant.potCm);
    litersEach = round1(pl * 0.25);
    amountText = `حتى يخرج الماء من فتحات الأصيص (≈ ${litersEach} لتر لأصيص ${plant.potCm || 25} سم)`;
  } else if (w.unit === 'Lm2') {
    litersEach = round1(amount);
    amountText = `${litersEach} لتر لكل م²`;
  } else {
    litersEach = round1(amount);
    amountText = `${litersEach} لتر للنبتة`;
  }

  // تعديلات المستخدم اليدوية تتقدم على كل شي
  if (plant.override?.every) { every = Number(plant.override.every); notes.push('فترة معدّلة يدوياً'); }
  if (plant.override?.amount) {
    litersEach = Number(plant.override.amount);
    amountText = w.unit === 'Lm2' && !potted ? `${litersEach} لتر لكل م² (معدّل)` : `${litersEach} لتر (معدّل يدوياً)`;
  }

  // تعديل الطقس: يوم حار جداً يقرّب موعد السقي للنباتات الخارجية
  const wx = settings.weather?.today;
  if (wx && wx.date === date && wx.tmax >= HEAT_DAY && !(p.env === 'in' || plant.indoor) && every > 1) {
    every = every * 0.7; notes.push(`حر شديد اليوم (${Math.round(wx.tmax)}°م): السقي أقرب من المعتاد`);
  }
  every = Math.max(1, Math.round(every));
  const total = litersEach != null ? round1(litersEach * count) : null;
  const minutes = flow > 0 && total ? Math.max(0.5, Math.round((total / flow) * 2) / 2) : null;
  const inside = p.env === 'in' || plant.indoor;

  return {
    season, seasonName: SEASON_NAMES[season], every, litersEach, total, minutes, count,
    unit: potted ? 'pot' : w.unit, amountText,
    method: METHODS[potted && ['base', 'basin', 'ring', 'lawn'].includes(w.m) ? 'can' : w.m] || w.m,
    leaves: LEAVES[w.leaves] || null,
    slot: SLOTS[(w.slot && w.slot[season]) || 'morning'],
    test: w.test, warn: w.warn, establishing, notes, inside,
    checkFirst: inside || potted, // الداخلية: افحص بالإصبع قبل السقي
  };
}

// ساعة التذكير لكل نبات (بتوقيت بغداد) — تلقائية حسب النوع والموسم، أو يحددها المستخدم
export const AUTO_HOURS = { early: 6, morning: 8, midmorning: 10 };
export function notifyHour(plant, date, type = 'water') {
  if (plant.notifyHour != null && plant.notifyHour !== '') return Number(plant.notifyHour);
  const p = profileOf(plant);
  if (type === 'check') return 16; // ضوء النهار مناسب للتصوير
  const inside = p?.env === 'in' || plant.indoor;
  if (inside) return 9;
  const season = seasonOf(monthOf(date));
  return AUTO_HOURS[(p?.w?.slot && p.w.slot[season]) || 'morning'] ?? 8;
}
export function fmtHour(h) { const hh = ((h + 11) % 12) + 1; return `${hh}:00 ${h < 12 ? 'الصبح' : h < 16 ? 'الظهر' : h < 19 ? 'العصر' : 'بالليل'}`; }
export function hourNow(d = new Date()) { return Number(new Intl.DateTimeFormat('en-GB', { timeZone: TZ, hour: '2-digit', hour12: false }).format(d)) % 24; }

// هل السقي مستحق بهذا التاريخ؟
export function waterDue(plant, date, settings) {
  const plan = waterPlan(plant, date, settings);
  if (!plan || plan.inactive) return null;
  if (plant.snoozeUntil && date < plant.snoozeUntil) return null;
  if (!plant.lastWatered) return { plan, overdue: 0, next: date };
  const next = addDays(plant.lastWatered, plan.every);
  if (date < next) return null;
  return { plan, overdue: diffDays(next, date), next };
}

// التسميد المستحق
export function feedDue(plant, date) {
  const p = profileOf(plant);
  if (!p || !p.feed || !p.feed.length) return [];
  const age = plant.plantedDate ? diffDays(plant.plantedDate, date) : 9999;
  const m = monthOf(date);
  const out = [];
  p.feed.forEach((f, i) => {
    if (!f.mo || !f.mo.includes(m)) return;
    const isManure = /عضوي/.test(f.f || '');
    if (age < 21 && !isManure) return; // لا تسميد كيميائي أول 3 أسابيع بعد الزراعة
    const last = plant.lastFed?.[i];
    if (last && diffDays(last, date) < (f.d || 30)) return;
    out.push({ idx: i, ...f });
  });
  return out;
}

export function checkDue(plant, date) {
  const p = profileOf(plant);
  const age = diffDays(plant.plantedDate || plant.createdDate || date, date);
  // النبتة الجديدة (أول شهر) أخطر فترة: فحص بعد 3 أيام ثم كل أسبوع
  if (age >= 0 && age < 30) {
    if (!plant.lastCheckup) return age >= 3 ? { every: 7, newPlant: true } : null;
    return diffDays(plant.lastCheckup, date) >= 7 ? { every: 7, newPlant: true } : null;
  }
  const every = Number(plant.checkEvery) || p?.check || 21;
  if (!plant.lastCheckup) {
    const start = plant.plantedDate || plant.createdDate || date;
    return diffDays(start, date) >= Math.min(7, every) ? { every } : null; // أول فحص بعد أسبوع
  }
  return diffDays(plant.lastCheckup, date) >= every ? { every } : null;
}

// كل مهام يوم معيّن
export function tasksFor(plants, date, settings = {}) {
  const tasks = [];
  for (const pl of plants) {
    if (pl.archived) continue;
    const p = profileOf(pl);
    if (!p) continue;
    const wd = waterDue(pl, date, settings);
    if (wd) tasks.push({ type: 'water', plant: pl, profile: p, hour: notifyHour(pl, date), ...wd });
    for (const f of feedDue(pl, date)) tasks.push({ type: 'feed', plant: pl, profile: p, hour: notifyHour(pl, date, 'feed'), feed: f });
    const cd = checkDue(pl, date);
    if (cd) tasks.push({ type: 'check', plant: pl, profile: p, hour: notifyHour(pl, date, 'check'), ...cd });
  }
  const order = { water: 0, feed: 1, check: 2 };
  tasks.sort((a, b) => order[a.type] - order[b.type] || a.hour - b.hour || (b.overdue || 0) - (a.overdue || 0));
  return tasks;
}

// محاكاة الجدول للأيام القادمة (للعرض)
export function forecast(plant, fromDate, days = 14, settings = {}) {
  const sim = { ...plant };
  const out = [];
  for (let i = 0; i < days; i++) {
    const d = addDays(fromDate, i);
    const wd = waterDue(sim, d, settings);
    if (wd) { out.push({ date: d, ...wd.plan }); sim.lastWatered = d; sim.snoozeUntil = null; }
  }
  return out;
}

export function plantLabel(plant) {
  const p = profileOf(plant);
  const name = plant.nickname || p?.ar || 'نبات';
  return name + (Number(plant.count) > 1 && !(p?.w?.unit === 'Lm2' && !plant.potted) ? ` ×${plant.count}` : '');
}

// نص إشعار سقي واحد
export function waterNotifText(t) {
  const pl = t.plant; const pn = t.plan; const w = profileOf(pl).w;
  const where = pl.zone ? ` — ${pl.zone}` : '';
  const special = ['orchid', 'vase', 'bottom'].includes(w.m);
  let amt;
  if (pn.unit === 'pot') {
    amt = (pn.checkFirst && pn.test ? `👆 افحص أولاً: ${pn.test}\n` : '') + (special ? '' : `الكمية: ${pn.amountText}${pn.count > 1 ? ` لكل أصيص (${pn.count})` : ''}`);
  } else if (pn.unit === 'Lm2') amt = `الكمية: ${pn.total} لتر للمساحة (${pn.count} م² × ${pn.litersEach})`;
  else amt = `الكمية: ${pn.total} لتر${pn.count > 1 ? ` (${pn.litersEach} × ${pn.count})` : ''}`;
  const mins = pn.minutes && pn.unit !== 'pot' ? ` ≈ ${pn.minutes} دقيقة صوندة` : '';
  return {
    title: `💧 اسقِ ${plantLabel(pl)}${where}`,
    body: [amt.trim() + mins, `الطريقة: ${pn.method}`, pn.leaves ? `الأوراق: ${pn.leaves.t}` : '', t.overdue ? `⚠️ متأخر ${t.overdue} يوم` : ''].filter(Boolean).join('\n'),
  };
}

// إشعار واحد لكل نبتة يجمع مهامها لهذا اليوم (سقي/سماد/فحص)
export function plantNotif(plantTasks) {
  const pl = plantTasks[0].plant;
  const where = pl.zone ? ` — ${pl.zone}` : '';
  const types = new Set(plantTasks.map((t) => t.type));
  const icon = types.has('water') ? '💧' : types.has('feed') ? '🧪' : '📷';
  const verbs = [types.has('water') && 'سقي', types.has('feed') && 'تسميد', types.has('check') && 'فحص بالصور'].filter(Boolean).join(' + ');
  const lines = [];
  for (const t of plantTasks) {
    if (t.type === 'water') { const n = waterNotifText(t); lines.push(n.body); }
    else if (t.type === 'feed') lines.push(`🧪 ${t.feed.n}: ${t.feed.how}${profileOf(pl)?.w?.unit === 'Lm2' && !pl.potted ? ` (المساحة ${pl.count || 1} م²)` : Number(pl.count) > 1 ? ` (لكل نبتة — العدد ${pl.count})` : ''}\nاسقِ قبل التسميد إذا التربة جافة.`);
    else if (t.type === 'check') lines.push('📷 صوّر النبتة كاملة + ورقة قريبة وافحصها من التطبيق.');
  }
  return { title: `${icon} ${plantLabel(pl)}${where}: ${verbs} اليوم`, body: lines.join('\n'), tag: `p-${pl.id}` };
}
