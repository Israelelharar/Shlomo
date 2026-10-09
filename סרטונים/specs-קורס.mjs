import fs from 'node:fs';
const TL = JSON.parse(fs.readFileSync(new URL('./timeline.json', import.meta.url)));
const S = (n) => `shots/${n}.png`;
const ORANGE = '#C8600E', AMBER = '#F0A055', TEAL = '#0E6E7A', CREAM = '#FBEBDD', NIGHT = '#12171D', INK = '#18212B', GOLD = '#ffd36b', RED = '#E5483A', GREY = '#8A939E', GREEN = '#2C6B37', MINT = '#7fdc8f';
const WALL = ['home', 'l1', 'l3', 'l4', 'l7', 'l8', 'l10', 'l12', 'quiz', 'appx', 'l13-table', 'l4-prompt'].map(S);
const END = { kind: 'end', noCap: true, streak: GOLD, badge: '17', sealBg: ORANGE, glow: '#5a2a08', t1: 'הקישור בביו', t2: 'קורס קלוד קוד בעברית', waLabel: 'או בוואטסאפ' };
const chip = (text, x, y, at, o = {}) => ({ text, x, y, at, size: 64, rot: o.rot ?? 0, bg: o.bg || '#fff', fg: o.fg });
export function spec(v) {
  const { lines, duration } = TL[v];
  const L = (i, f = 0) => Math.max(0, lines[i][0] - 0.12 + f * (lines[i][1] - lines[i][0]));
  let sc;
  if (v === '1') sc = [
    { t: 0, kind: 'block', bg: NIGHT, fg: '#fff', accent: AMBER, h1: ['כתבת לקלוד', '3 מילים…'], chips: [chip('תעשה לי ריל 🎬', 300, 700, .3, { rot: -3 })] },
    { t: L(1), kind: 'big', word: 'גנרי.', color: GREY, glow: '#1d2228', size: 330, sub: 'כמו של כולם 😐' },
    { t: L(2), kind: 'block', bg: NIGHT, fg: '#fff', accent: AMBER, h1: ['תיקון', 'ועוד תיקון'], bgWord: 'שוב', in: 'spin',
      chips: [chip('לא ככה 😤', 90, 620, .1, { bg: AMBER, rot: 5 }), chip('תתקן את הכתוביות', 260, 820, .3, { rot: -5 }), chip('שוב לא!!', 120, 1020, .55, { bg: RED, fg: '#fff', rot: 7 })] },
    { t: L(3), kind: 'big', word: 'תיקון #', counter: [3, 7], color: RED, glow: '#4a0f0b', size: 230, sub: 'וזה עדיין לא זה' },
    { t: L(4), kind: 'big', word: 'זה לא קלוד', color: GOLD, glow: '#5a2a08', size: 175, streak: '#fff' },
    { t: L(5), kind: 'block', bg: CREAM, fg: INK, accent: ORANGE, h1: ['מה שלא אמרת', 'הוא ממלא בממוצע'], bgWord: 'ממוצע', in: 'wipe',
      chips: [chip('למי זה? 🤷', 90, 640, .15, { rot: -4 }), chip('כמה זמן? 🤷', 420, 830, .35, { rot: 5 }), chip('איזה סגנון? 🤷', 150, 1020, .55, { rot: -3 })] },
    { t: L(6), kind: 'phone', bg: ORANGE, fg: '#fff', accent: GOLD, accent2: CREAM, h1: ['5 דברים', 'בכל בקשה'], img: S('l4-template'), in: 'zoom', streak: GOLD },
    { t: L(7), kind: 'ring', once: true, words: ['תפקיד', 'רקע', 'מטרה', 'חומרים', 'מה לא', 'תפקיד', 'רקע', 'מטרה'], center: 'בקשה טובה', sub: 'שיעור 4', accent: AMBER, glow: '#4a2408' },
    { t: L(8), kind: 'block', bg: TEAL, fg: '#fff', accent: GOLD, h1: ['תשאל אותי', 'לפני שאתה בונה'], card: { img: S('l4-prompt'), x: 240, y: 600, w: 620, h: 1000, scroll: 0, rot: -5 }, chips: [chip('העתקה 📋', 80, 700, .4, { bg: GOLD, rot: -8 })], in: 'spin' },
    { t: L(9), kind: 'big', word: 'בקשה אחת', color: GOLD, glow: '#5a2a08', size: 190, sub: 'במקום 7 תיקונים', streak: GOLD },
    { t: L(9, .55), kind: 'wall', imgs: WALL, h1: ['17 שיעורים', 'של 3 דקות'], accent: GOLD, in: 'zoom' },
    { t: L(10), ...END },
  ];
  if (v === '2') sc = [
    { t: 0, kind: 'big', word: 'מכסה: #%', counter: [100, 0], color: RED, glow: '#4a0f0b', size: 165, sub: 'באמצע הסרטון 🪫' },
    { t: L(1), kind: 'big', word: '⏳ שעות', color: GREY, glow: '#1d2228', size: 260, sub: 'מחכים…' },
    { t: L(2), kind: 'block', bg: NIGHT, fg: '#fff', accent: AMBER, h1: ['וזה קורה', 'כל שבוע'], bgWord: 'שוב', in: 'spin',
      chips: [chip('ראשון 🪫', 100, 640, .1, { bg: AMBER, rot: -5 }), chip('רביעי 🪫', 430, 840, .3, { rot: 4 }), chip('שוב?! 🪫', 160, 1040, .5, { bg: RED, fg: '#fff', rot: -6 })] },
    { t: L(3), kind: 'block', bg: NIGHT, fg: '#fff', accent: AMBER, h1: ['שיחה אחת', '10 נושאים'],
      chips: [chip('סרטון', 80, 600, .05, { rot: -6 }), chip('אתר', 520, 640, .15, { bg: AMBER, rot: 5 }), chip('מייל ללקוח', 200, 800, .25, { rot: 3 }), chip('לוגו', 640, 900, .35, { bg: GOLD, rot: -4 }),
              chip('מחירון', 90, 980, .45, { bg: AMBER, rot: 6 }), chip('עוד שאלה…', 380, 1110, .55, { bg: RED, fg: '#fff', rot: -3 })] },
    { t: L(4), kind: 'big', word: 'מודל כבד', color: AMBER, glow: '#4a2408', size: 200, sub: 'לשאלה של מילה' },
    { t: L(5), kind: 'big', word: 'נושא חדש', color: GOLD, glow: '#5a2a08', size: 200, sub: '= שיחה חדשה', streak: '#fff' },
    { t: L(6), kind: 'phone', bg: TEAL, fg: '#fff', accent: GOLD, accent2: CREAM, h1: ['אופוס מתכנן', 'סונט מבצע'], img: S('l13-models'), in: 'zoom' },
    { t: L(7), kind: 'block', bg: CREAM, fg: INK, accent: ORANGE, h1: ['בוחרים מודל', 'בהתחלה'], card: { img: S('l13-models'), x: 240, y: 600, w: 620, h: 1000, scroll: 300, rot: 5 }, chips: [chip('לא באמצע ✋', 70, 700, .35, { bg: GOLD, rot: -7 })], in: 'wipe', streak: GOLD },
    { t: L(8), kind: 'big', word: 'מכסה: #%', counter: [12, 100], color: MINT, glow: '#123a1a', size: 165, sub: 'מחזיקה הרבה יותר 🔋' },
    { t: L(8, .6), kind: 'wall', imgs: WALL, h1: ['17 שיעורים', 'של 3 דקות'], accent: GOLD, in: 'zoom' },
    { t: L(9), ...END },
  ];
  if (v === '3') sc = [
    { t: 0, kind: 'block', bg: NIGHT, fg: '#fff', accent: AMBER, h1: ['לתת לו', 'לגעת במחשב?'],
      chips: [chip('📁 לקוחות', 90, 660, .15, { rot: -4 }), chip('📁 סרטונים', 450, 850, .3, { bg: AMBER, rot: 5 }), chip('📁 שנים של עבודה', 160, 1040, .45, { bg: GOLD, rot: -3 })] },
    { t: L(1), kind: 'big', word: '# שנים', counter: [1, 7], color: '#cfd5dc', glow: '#1d2228', size: 260, sub: 'של עבודה' },
    { t: L(2), kind: 'big', word: 'נמחק.', color: RED, glow: '#4a0f0b', size: 340, sub: 'בפקודה אחת', streak: '#fff' },
    { t: L(3), kind: 'block', bg: NIGHT, fg: '#fff', accent: RED, h1: ['בלי שום', 'הגנה ✗'], card: { img: S('l3-modes'), x: 240, y: 600, w: 620, h: 1000, scroll: 0, rot: -5 }, chips: [chip('מאשר הכל 🙈', 70, 1480, .4, { bg: RED, fg: '#fff', rot: 6 })], in: 'spin' },
    { t: L(4), kind: 'big', word: 'מצב אוטומטי', color: GOLD, glow: '#5a2a08', size: 150, sub: 'הפתרון', streak: GOLD },
    { t: L(5), kind: 'phone', bg: TEAL, fg: '#fff', accent: GOLD, accent2: CREAM, h1: ['עובד לבד', 'ועוצר בסכנה'], img: S('l3-modes'), in: 'zoom' },
    { t: L(6), kind: 'block', bg: CREAM, fg: INK, accent: ORANGE, h1: ['שומר', 'מחיקה'], card: { img: S('l3-guard'), x: 240, y: 600, w: 620, h: 1000, scroll: 0, rot: 5 }, chips: [chip('רגע! למחוק? 🛑', 60, 1480, .35, { bg: RED, fg: '#fff', rot: -6 })], in: 'wipe' },
    { t: L(7), kind: 'big', word: 'בלי לפחד', color: GOLD, glow: '#5a2a08', size: 200, sub: 'ומהר', streak: '#fff' },
    { t: L(7, .6), kind: 'wall', imgs: WALL, h1: ['17 שיעורים', 'של 3 דקות'], accent: GOLD, in: 'zoom' },
    { t: L(8), ...END },
  ];
  if (v === '4') sc = [
    { t: 0, kind: 'big', word: '#%', counter: [0, 87], color: GOLD, glow: '#5a2a08', size: 320, sub: 'גידול בשוק 📈' },
    { t: L(1), kind: 'block', bg: NIGHT, fg: '#fff', accent: AMBER, h1: ['פרסמת', 'בגאווה'], in: 'spin',
      chips: [chip('פורסם ✓', 100, 660, .1, { bg: GOLD, rot: -5 }), chip('❤️ 214', 470, 850, .3, { rot: 4 }), chip('💬 38', 180, 1030, .5, { bg: AMBER, rot: -3 })] },
    { t: L(2), kind: 'big', word: 'מאיפה זה?', color: AMBER, glow: '#4a2408', size: 180, sub: '💬 שאלה בתגובות' },
    { t: L(3), kind: 'big', word: '87%', color: GREY, glow: '#1d2228', size: 340, sub: 'לא קיים.', streak: RED },
    { t: L(4), kind: 'block', bg: NIGHT, fg: '#fff', accent: RED, h1: ['בטוח בעצמו', 'וטועה'], bgWord: 'בטוח',
      chips: [chip('לפי מחקר של… 🤥', 80, 680, .15, { rot: -4 }), chip('בדיוק 87%', 450, 880, .35, { bg: AMBER, rot: 5 }), chip('מקור: ??? ', 150, 1070, .55, { bg: RED, fg: '#fff', rot: -5 })] },
    { t: L(5), kind: 'big', word: 'משפט אחד', color: GOLD, glow: '#5a2a08', size: 190, sub: 'בסוף כל בקשה', streak: GOLD },
    { t: L(6), kind: 'block', bg: TEAL, fg: '#fff', accent: GOLD, h1: ['תסמן', 'מה לא אימתת'], card: { img: S('l4-sentences'), x: 240, y: 600, w: 620, h: 1000, scroll: 0, rot: -5 }, chips: [chip('העתקה 📋', 80, 700, .4, { bg: GOLD, rot: -8 })], in: 'zoom' },
    { t: L(7), kind: 'phone', bg: ORANGE, fg: '#fff', accent: GOLD, accent2: CREAM, h1: ['ומאיפה', 'כל נתון'], img: S('l4-quiz'), in: 'spin' },
    { t: L(8), kind: 'big', word: 'בודקים', color: MINT, glow: '#123a1a', size: 280, sub: 'לפני שמאמינים ✓', streak: '#fff' },
    { t: L(8, .55), kind: 'wall', imgs: WALL, h1: ['17 שיעורים', 'של 3 דקות'], accent: GOLD, in: 'zoom' },
    { t: L(9), ...END },
  ];
  sc.forEach((s, i) => { s.dur = (sc[i + 1]?.t ?? duration) - s.t; });
  return { lines, duration, scenes: sc, hl: GOLD };
}
