import fs from 'node:fs';
const TL = JSON.parse(fs.readFileSync(new URL('./timeline.json', import.meta.url)));
const S = (n) => `shots/${n}.png`;
const ORANGE = '#C8600E', AMBER = '#F0A055', TEAL = '#0E6E7A', CREAM = '#FBEBDD', NIGHT = '#12171D', SLATE = '#1A2129', INK = '#18212B', GOLD = '#ffd36b', RED = '#E5483A', GREY = '#8A939E', MINT = '#7fdc8f';
const WALL = ['home', 'l1', 'l2-cols', 'l3', 'l4', 'l7', 'l8', 'l10', 'l12', 'quiz', 'l13-table', 'l4-prompt'].map(S);
const chip = (text, x, y, at, o = {}) => ({ text, x, y, at, size: o.size || 64, rot: o.rot ?? 0, bg: o.bg || '#fff', fg: o.fg });
export function spec(v) {
  const { lines, duration } = TL[v];
  const L = (i, f = 0) => Math.max(0, lines[i][0] - 0.12 + f * (lines[i][1] - lines[i][0]));
  const sc = [
    { t: 0, kind: 'alert', title: 'נגמרה המכסה', sub: 'נסו שוב מאוחר יותר' },
    { t: L(0, .55), kind: 'big', word: 'שעה אחת.', color: GREY, glow: '#1d2228', size: 205, sub: 'וזהו, נגמר' },
    { t: L(1), kind: 'big', word: '# דולר', counter: [0, 20], color: GOLD, glow: '#5a2a08', size: 260, sub: 'כל חודש', streak: '#fff' },
    { t: L(1, .55), kind: 'block', bg: NIGHT, fg: '#fff', accent: AMBER, h1: ['נתקע', 'באמצע משימה'], in: 'spin',
      chips: [chip('תבנה לי אתר', 80, 600, .05, { rot: -5 }), chip('רגע, גם לוגו', 470, 700, .18, { bg: AMBER, rot: 4 }), chip('ומייל ללקוח', 150, 840, .31, { rot: 3 }),
              chip('לא, הצבע…', 520, 960, .44, { bg: GOLD, rot: -6 }), chip('תתחיל מחדש', 110, 1080, .57, { rot: 5 }), chip('למה זה נתקע?!', 300, 1200, .7, { bg: RED, fg: '#fff', rot: -3 })] },
    { t: L(2), kind: 'big', word: 'גנרי.', color: GREY, glow: '#1d2228', size: 330, sub: 'ולא מדויק' },
    { t: L(2, .55), kind: 'phone', bg: SLATE, fg: '#fff', accent: AMBER, accent2: GOLD, h1: ['אופוס? סונט?', 'איזה מודל בכלל?'], img: S('l13-models'), in: 'zoom' },
    { t: L(3), kind: 'big', word: 'שיטה.', color: GOLD, glow: '#5a2a08', size: 340, sub: 'זה כל הסוד', streak: GOLD },
    { t: L(4), kind: 'block', bg: TEAL, fg: '#fff', accent: GOLD, h1: ['3 קלודים', 'לכל משימה המקום שלה'], in: 'wipe',
      chips: [chip('💬 שיחה', 110, 640, 1.1, { size: 92, rot: -5 }), chip('🗂️ עוזר אישי', 330, 860, 1.8, { size: 92, bg: GOLD, rot: 4 }), chip('⌨️ קלוד קוד', 140, 1080, 2.6, { size: 92, bg: AMBER, rot: -3 })] },
    { t: L(5), kind: 'bars', bg: NIGHT, accent: GOLD, h1: ['אופוס מתכנן', 'סונט מבצע'], note: 'המחשה, לא מדידה',
      rows: [{ label: 'הכל באופוס', w: 30, color: RED, tag: '' }, { label: 'תכנון באופוס, ביצוע בסונט', w: 86, color: MINT, tag: 'המכסה מחזיקה יותר' }] },
    { t: L(5, .75), kind: 'phone', bg: ORANGE, fg: '#fff', accent: GOLD, accent2: CREAM, h1: ['בוחרים מודל', 'בתחילת השיחה'], img: S('l13-models'), scroll: 260, in: 'spin', streak: GOLD },
    { t: L(6), kind: 'skill', bg: TEAL, accent: GOLD, h1: ['סקיל אחד', 'עבודה שלמה'], cmd: 'תכין הצעת מחיר ללקוח', steps: ['קורא את המחירון', 'כותב את ההצעה', 'שומר קובץ מוכן'] },
    { t: L(7), kind: 'cover', glow: '#5a2a08', accent: GOLD, h1: ['המדריך המלא', 'לקלוד קוד'], img: S('home'),
      chips: [chip('17 שיעורים', 60, 760, .4, { bg: GOLD, rot: -6 }), chip('5 כללי זהב ⭐', 620, 1080, 1.0, { rot: 5 }), chip('בקשות מוכנות 📋', 80, 1400, 1.8, { bg: AMBER, rot: -4 })] },
    { t: L(7, .78), kind: 'wall', imgs: WALL, h1: ['הכל', 'במקום אחד'], accent: GOLD, in: 'zoom' },
    { t: L(8), kind: 'big', word: 'חינם.', color: MINT, glow: '#123a1a', size: 340, sub: 'לגמרי', streak: '#fff' },
    { t: L(9), kind: 'cta', noCap: true, streak: GOLD, accent: GOLD, glow: '#5a2a08', t1: 'תגיבו "קלוד"', t2: 'והקישור אצלכם בפרטי', word: 'קלוד', dm: 'הנה הקישור למדריך 🎁' },
  ];
  sc.forEach((s, i) => { s.dur = (sc[i + 1]?.t ?? duration) - s.t; });
  return { lines, duration, scenes: sc, hl: GOLD };
}
