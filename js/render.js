// Four Poses — strip rendering engine (templates, filters, patterns, layout)

export const FONTS = {
  bubble: { label: 'Bubble', family: 'Shrikhand', weight: '400', sizeK: 1.0 },
  typewriter: { label: 'Typewriter', family: 'Special Elite', weight: '400', sizeK: 0.9 },
  handwritten: { label: 'Handwritten', family: 'Caveat', weight: '700', sizeK: 1.25 },
  pixel: { label: 'Pixel', family: 'VT323', weight: '400', sizeK: 1.3 },
  classic: { label: 'Classic', family: 'Inter', weight: '700', sizeK: 0.85 },
  sign: { label: 'Booth Sign', family: 'Bungee', weight: '400', sizeK: 0.8 },
  script: { label: 'Surf Script', family: 'Pacifico', weight: '400', sizeK: 0.85 },
  retro: { label: 'Diner', family: 'Lobster', weight: '400', sizeK: 1.0 },
  elegant: { label: 'Love Letter', family: 'Dancing Script', weight: '700', sizeK: 1.15 },
  signature: { label: 'Signature', family: 'Sacramento', weight: '400', sizeK: 1.45 },
  marker: { label: 'Marker', family: 'Permanent Marker', weight: '400', sizeK: 0.9 },
  doodle: { label: 'Doodle', family: 'Gloria Hallelujah', weight: '400', sizeK: 0.8 },
  chewy: { label: 'Chewy', family: 'Chewy', weight: '400', sizeK: 1.0 },
  rounded: { label: 'Rounded', family: 'Fredoka', weight: '600', sizeK: 0.95 },
  bubbles: { label: 'Bubbles', family: 'Rubik Bubbles', weight: '400', sizeK: 0.9 },
  serif: { label: 'Magazine', family: 'Abril Fatface', weight: '400', sizeK: 0.95 },
  vogue: { label: 'Vogue', family: 'Playfair Display', weight: '700', style: 'italic', sizeK: 0.95 },
  poster: { label: 'Poster', family: 'Bebas Neue', weight: '400', sizeK: 1.2 },
  courier: { label: 'Courier', family: 'Courier Prime', weight: '700', sizeK: 0.85 },
  western: { label: 'Rodeo', family: 'Rye', weight: '400', sizeK: 0.8 },
  marquee: { label: 'Marquee', family: 'Bungee Shade', weight: '400', sizeK: 0.75 },
  neon: { label: 'Neon', family: 'Monoton', weight: '400', sizeK: 0.75 },
  arcade: { label: 'Arcade', family: 'Press Start 2P', weight: '400', sizeK: 0.5 },
  eightbit: { label: '8-bit', family: 'Silkscreen', weight: '400', sizeK: 0.8 },
};
export const fontCSS = f => `${f.style || 'normal'} ${f.weight} `;

export const FILTERS = {
  original: { label: 'Original' },
  film: { label: 'Film 35mm' },
  disposable: { label: 'Disposable' },
  kodak: { label: 'Gold 200' },
  fuji: { label: 'Fuji Green' },
  polaroid: { label: 'Polaroid' },
  vintage: { label: 'Vintage' },
  sepia: { label: 'Warm sepia' },
  golden: { label: 'Golden hour' },
  cyan: { label: 'Digicam cyan' },
  vhs: { label: 'Camcorder' },
  lomo: { label: 'Lomo' },
  vivid: { label: 'Vivid' },
  pink: { label: 'Bubblegum' },
  dreamy: { label: 'Dreamy' },
  cool: { label: 'Ice blue' },
  cross: { label: 'Cross-process' },
  matte: { label: 'Matte' },
  faded: { label: 'Faded' },
  duotone: { label: 'Cherry duo' },
  infrared: { label: 'Infrared' },
  bw: { label: 'Black & white' },
  noir: { label: 'Noir' },
};

export const STYLES = ['Y2K', 'Kawaii', 'Film', 'Retro', 'Minimal', 'Booth'];

export const TEMPLATES = {
  'y2k-hearts': { name: 'Y2K Hearts', style: 'Y2K', bg: { type: 'hearts', color: '#F7A8C4', accent: '#FFF4DC' }, frame: { color: '#FFFFFF', width: 8, radius: 10 }, deco: 'sparkles', font: 'sign', text: '#5B061A', filter: 'cyan' },
  'y2k-chrome': { name: 'Y2K Chrome', style: 'Y2K', bg: { type: 'chrome' }, frame: { color: '#1A1A1A', width: 4, radius: 4 }, deco: 'stars', font: 'pixel', text: '#1A1A1A', filter: 'cyan' },
  'kawaii-pop': { name: 'Kawaii Pop', style: 'Kawaii', bg: { type: 'polka', color: '#FBE7A1', accent: '#F7A8C4' }, frame: { color: '#FFFFFF', width: 10, radius: 22 }, deco: 'hearts', font: 'sign', text: '#C8102E', filter: 'faded' },
  'pastel-doodle': { name: 'Pastel Doodle', style: 'Kawaii', bg: { type: 'checker', color: '#F3C9B5', accent: '#F8DDD0' }, frame: { color: '#FFF4DC', width: 8, radius: 16 }, deco: 'doodles', font: 'handwritten', text: '#5B061A', filter: 'sepia' },
  'film-35': { name: 'Film 35mm', style: 'Film', bg: { type: 'solid', color: '#1A1A1A' }, frame: null, deco: 'sprockets', font: 'typewriter', text: '#FFF4DC', filter: 'film', date: '#FF8A3D' },
  'film-noir': { name: 'Film Noir', style: 'Film', bg: { type: 'solid', color: '#0E0E0E' }, frame: { color: '#FFFFFF', width: 3, radius: 0 }, deco: null, font: 'typewriter', text: '#FFFFFF', filter: 'bw' },
  'minimal-mono': { name: 'Minimal Mono', style: 'Minimal', bg: { type: 'solid', color: '#FFF4DC' }, frame: { color: '#1A1A1A', width: 2, radius: 0 }, deco: null, font: 'classic', text: '#1A1A1A', filter: 'original' },
  'booth-red': { name: 'Booth Red', style: 'Booth', bg: { type: 'solid', color: '#C8102E' }, frame: { color: '#FFF4DC', width: 6, radius: 6 }, deco: 'bulbs', font: 'sign', text: '#FFF4DC', filter: 'original' },
  'harlequin': { name: 'Harlequin', style: 'Booth', bg: { type: 'harlequin', color: '#5B061A', accent: '#C8102E' }, frame: { color: '#E8B04B', width: 6, radius: 4 }, band: '#5B061A', deco: null, font: 'vogue', text: '#E8B04B', filter: 'kodak' },
  'disco-ball': { name: 'Disco Ball', style: 'Booth', bg: { type: 'disco', color: '#BFC0C8' }, frame: { color: '#1A1A1A', width: 5, radius: 6 }, band: '#1A1A1A', deco: 'sparkles', font: 'marquee', text: '#E8B04B', filter: 'vivid' },
  'retro-stripes': { name: 'Candy Stripe', style: 'Booth', bg: { type: 'stripes', color: '#FFF4DC', accent: '#C8102E' }, frame: { color: '#FFF4DC', width: 8, radius: 6 }, band: '#FFF4DC', deco: null, font: 'retro', text: '#C8102E', filter: 'film' },
  'cheetah-girl': { name: 'Cheetah Girl', style: 'Y2K', bg: { type: 'cheetah', color: '#E8B04B', accent: '#3A2A1A' }, frame: { color: '#1A1A1A', width: 6, radius: 8 }, band: '#1A1A1A', deco: 'sparkles', font: 'marker', text: '#F7A8C4', filter: 'golden' },
  'star-girl': { name: 'Star Girl', style: 'Y2K', bg: { type: 'stars', color: '#1B1F4A', accent: '#E8B04B' }, frame: { color: '#E8B04B', width: 4, radius: 10 }, deco: null, font: 'script', text: '#E8B04B', filter: 'dreamy' },
  'neon-nights': { name: 'Neon Nights', style: 'Y2K', bg: { type: 'grid', color: '#0B0B14', accent: '#3A1450' }, frame: { color: '#FF3EA5', width: 4, radius: 8 }, glow: true, deco: null, font: 'neon', text: '#FF3EA5', filter: 'cool' },
  'bubblegum': { name: 'Bubblegum', style: 'Kawaii', bg: { type: 'polka', color: '#F7A8C4', accent: '#FFFFFF' }, frame: { color: '#FFFFFF', width: 10, radius: 24 }, deco: 'hearts', font: 'bubbles', text: '#C8102E', filter: 'pink' },
  'gingham-picnic': { name: 'Gingham Picnic', style: 'Kawaii', bg: { type: 'gingham', color: '#FFF4DC', accent: '#C8102E' }, frame: { color: '#FFFFFF', width: 10, radius: 14 }, band: '#FFF4DC', deco: null, font: 'rounded', text: '#C8102E', filter: 'polaroid' },
  'lovecore': { name: 'Lovecore', style: 'Kawaii', bg: { type: 'hearts', color: '#C8102E', accent: '#F7A8C4' }, frame: { color: '#FFF4DC', width: 8, radius: 18 }, deco: null, font: 'elegant', text: '#FFF4DC', filter: 'dreamy' },
  'cherry-bomb': { name: 'Cherry Bomb', style: 'Retro', bg: { type: 'cherry', color: '#FFF4DC', accent: '#C8102E' }, frame: { color: '#FFFFFF', width: 8, radius: 10 }, band: '#FFF4DC', deco: null, font: 'retro', text: '#C8102E', filter: 'vintage' },
  'arcade': { name: 'Arcade', style: 'Retro', bg: { type: 'grid', color: '#2A0F4A', accent: '#5B2A8A' }, frame: { color: '#00E5FF', width: 4, radius: 0 }, deco: 'stars', font: 'arcade', text: '#FFE14D', filter: 'vhs' },
  'rodeo': { name: 'Rodeo', style: 'Retro', bg: { type: 'solid', color: '#F3E2C7' }, frame: { color: '#7A3E1D', width: 5, radius: 4 }, deco: 'stars', decoColor: '#C97B3D', font: 'western', text: '#7A3E1D', filter: 'sepia' },
  'golden-hour': { name: 'Golden Hour', style: 'Film', bg: { type: 'gradient', colors: ['#F7B267', '#F25C54', '#5B061A'] }, frame: { color: '#FFF4DC', width: 6, radius: 4 }, deco: null, font: 'serif', text: '#FFF4DC', filter: 'golden' },
  'kraft-paper': { name: 'Kraft Paper', style: 'Film', bg: { type: 'kraft', color: '#C9A57A' }, frame: { color: '#FFF4DC', width: 12, radius: 2 }, deco: null, font: 'courier', text: '#3A2416', filter: 'disposable' },
  'camcorder': { name: 'Camcorder', style: 'Film', bg: { type: 'solid', color: '#111111' }, frame: null, deco: 'scanlines', font: 'eightbit', text: '#F0F0F0', filter: 'vhs', date: '#FF8A3D' },
  'polaroid': { name: 'Polaroid', style: 'Minimal', bg: { type: 'solid', color: '#FAFAF7' }, frame: { color: '#E9E6DE', width: 2, radius: 0 }, deco: null, font: 'signature', text: '#1A1A1A', filter: 'polaroid' },
  'sage-garden': { name: 'Sage Garden', style: 'Minimal', bg: { type: 'solid', color: '#C9D6BF' }, frame: { color: '#FFFFFF', width: 8, radius: 12 }, deco: 'flowers', font: 'elegant', text: '#3E5A3A', filter: 'matte' },
  'newsprint': { name: 'Newsprint', style: 'Minimal', bg: { type: 'solid', color: '#F2EFE6' }, frame: { color: '#1A1A1A', width: 2, radius: 0 }, deco: null, font: 'vogue', text: '#1A1A1A', filter: 'noir' },
};

export const BORDER_COLORS = ['#1A1A1A', '#5B061A', '#C8102E', '#FFF4DC', '#E8B04B', '#F7A8C4', '#D9D9E0', '#F3C9B5', '#FFFFFF', '#7A3E1D', '#3E5A3A', '#1B1F4A', '#9EC9FF', '#C6A8FF'];
export const TEXT_COLORS = ['#1A1A1A', '#FFFFFF', '#FFF4DC', '#C8102E', '#5B061A', '#E8B04B', '#F7A8C4', '#FF3EA5', '#FF8A3D', '#FFE14D', '#8FE3A6', '#3E5A3A', '#00E5FF', '#2F5BEA', '#1B1F4A', '#C6A8FF', '#7A3E1D', '#D9D9E0'];
export const BORDER_PATTERNS = { none: 'Template', solid: 'Solid', cherry: 'Cherry red', cheetah: 'Cheetah', polka: 'Polka dot', checker: 'Checker', gingham: 'Gingham', stripes: 'Stripes', harlequin: 'Harlequin', hearts: 'Hearts', stars: 'Stars' };
export const THICKNESS = { S: 28, M: 44, L: 64 };

export function defaultLook(templateId = 'booth-red') {
  const t = TEMPLATES[templateId];
  return {
    template: templateId, layout: 'strip', filter: t.filter, intensity: 80,
    font: t.font, textColor: null, caption: 'four poses', dateStamp: true,
    border: { color: null, pattern: 'none', thickness: 'M' }, flash: 'off',
  };
}

// ---------- layout ----------
export function layoutFor(look) {
  const P = THICKNESS[look.border?.thickness || 'M'];
  const gap = Math.round(P * 0.45);
  const footer = 170;
  if (look.layout === 'grid') {
    const s = 460;
    const W = 2 * s + gap + 2 * P, H = P + 2 * s + gap + footer;
    const slots = [0, 1, 2, 3].map(i => ({ x: P + (i % 2) * (s + gap), y: P + Math.floor(i / 2) * (s + gap), w: s, h: s }));
    return { W, H, P, gap, footer, slots, photoAspect: 1 };
  }
  const w = 520, h = 390;
  const W = w + 2 * P, H = P + 4 * h + 3 * gap + footer;
  const slots = [0, 1, 2, 3].map(i => ({ x: P, y: P + i * (h + gap), w, h }));
  return { W, H, P, gap, footer, slots, photoAspect: w / h };
}

// ---------- helpers ----------
function rng(seed) { let a = seed >>> 0; return () => { a |= 0; a = a + 0x6D2B79F5 | 0; let t = Math.imul(a ^ a >>> 15, 1 | a); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; }; }
function rr(ctx, x, y, w, h, r) { r = Math.min(r, w / 2, h / 2); ctx.beginPath(); ctx.moveTo(x + r, y); ctx.arcTo(x + w, y, x + w, y + h, r); ctx.arcTo(x + w, y + h, x, y + h, r); ctx.arcTo(x, y + h, x, y, r); ctx.arcTo(x, y, x + w, y, r); ctx.closePath(); }
function heartPath(ctx, cx, cy, s) { ctx.beginPath(); ctx.moveTo(cx, cy + s * 0.35); ctx.bezierCurveTo(cx - s * 0.9, cy - s * 0.25, cx - s * 0.45, cy - s * 0.95, cx, cy - s * 0.4); ctx.bezierCurveTo(cx + s * 0.45, cy - s * 0.95, cx + s * 0.9, cy - s * 0.25, cx, cy + s * 0.35); ctx.closePath(); }
function sparkle(ctx, cx, cy, s) { ctx.beginPath(); ctx.moveTo(cx, cy - s); ctx.quadraticCurveTo(cx, cy, cx + s, cy); ctx.quadraticCurveTo(cx, cy, cx, cy + s); ctx.quadraticCurveTo(cx, cy, cx - s, cy); ctx.quadraticCurveTo(cx, cy, cx, cy - s); ctx.closePath(); }
function star(ctx, cx, cy, s) { ctx.beginPath(); for (let i = 0; i < 10; i++) { const a = -Math.PI / 2 + i * Math.PI / 5, rad = i % 2 ? s * 0.45 : s; ctx.lineTo(cx + Math.cos(a) * rad, cy + Math.sin(a) * rad); } ctx.closePath(); }
function flower(ctx, cx, cy, s, petal, mid) { ctx.fillStyle = petal; for (let i = 0; i < 5; i++) { const a = i * Math.PI * 2 / 5; ctx.beginPath(); ctx.ellipse(cx + Math.cos(a) * s * 0.55, cy + Math.sin(a) * s * 0.55, s * 0.45, s * 0.3, a, 0, 7); ctx.fill(); } ctx.fillStyle = mid; ctx.beginPath(); ctx.arc(cx, cy, s * 0.28, 0, 7); ctx.fill(); }
function lum(hex) { const n = parseInt(hex.slice(1), 16); const r = n >> 16 & 255, g = n >> 8 & 255, b = n & 255; return (0.299 * r + 0.587 * g + 0.114 * b) / 255; }
const shade = (hex, k) => { const n = parseInt(hex.slice(1), 16); const f = v => Math.max(0, Math.min(255, Math.round(v * k))); return '#' + [n >> 16 & 255, n >> 8 & 255, n & 255].map(v => f(v).toString(16).padStart(2, '0')).join(''); };

function paintPattern(ctx, type, W, H, base, accent) {
  ctx.fillStyle = base; ctx.fillRect(0, 0, W, H);
  const r = rng(7);
  if (type === 'polka') { ctx.fillStyle = accent; for (let y = 0, row = 0; y < H + 40; y += 46, row++) for (let x = row % 2 ? 23 : 0; x < W + 40; x += 46) { ctx.beginPath(); ctx.arc(x, y, 9, 0, Math.PI * 2); ctx.fill(); } }
  else if (type === 'checker') { ctx.fillStyle = accent; const s = 40; for (let y = 0; y < H; y += s) for (let x = 0; x < W; x += s) if (((x + y) / s) % 2 === 0) ctx.fillRect(x, y, s, s); }
  else if (type === 'hearts') { ctx.fillStyle = accent; ctx.globalAlpha = 0.85; for (let y = 20, row = 0; y < H + 40; y += 58, row++) for (let x = row % 2 ? 29 : 0; x < W + 40; x += 58) { heartPath(ctx, x, y, 14); ctx.fill(); } ctx.globalAlpha = 1; }
  else if (type === 'cheetah') { for (let i = 0; i < (W * H) / 2600; i++) { const x = r() * W, y = r() * H, s = 6 + r() * 12; ctx.fillStyle = accent; ctx.beginPath(); ctx.ellipse(x, y, s, s * 0.75, r() * 3, 0, Math.PI * 2); ctx.fill(); ctx.fillStyle = base; ctx.beginPath(); ctx.ellipse(x, y, s * 0.45, s * 0.32, r() * 3, 0, Math.PI * 2); ctx.fill(); } }
  else if (type === 'cherry') { for (let y = 30, row = 0; y < H + 40; y += 70, row++) for (let x = row % 2 ? 35 : 0; x < W + 40; x += 70) { ctx.strokeStyle = '#3E7D3A'; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(x - 6, y); ctx.quadraticCurveTo(x, y - 22, x + 8, y - 26); ctx.moveTo(x + 8, y + 2); ctx.quadraticCurveTo(x + 8, y - 16, x + 8, y - 26); ctx.stroke(); ctx.fillStyle = accent; ctx.beginPath(); ctx.arc(x - 6, y + 6, 9, 0, 7); ctx.arc(x + 10, y + 8, 9, 0, 7); ctx.fill(); } }
  else if (type === 'gingham') { const s = 36; ctx.fillStyle = accent; ctx.globalAlpha = 0.45; for (let x = 0; x < W; x += s * 2) ctx.fillRect(x, 0, s, H); for (let y = 0; y < H; y += s * 2) ctx.fillRect(0, y, W, s); ctx.globalAlpha = 1; }
  else if (type === 'stripes') { ctx.fillStyle = accent; const s = 34; for (let x = 0; x < W; x += s * 2) ctx.fillRect(x, 0, s, H); }
  else if (type === 'harlequin') { ctx.fillStyle = accent; const w = 70, h = 100; for (let y = 0, row = 0; y < H + h; y += h / 2, row++) for (let x = row % 2 ? w / 2 : 0; x < W + w; x += w) { ctx.beginPath(); ctx.moveTo(x, y - h / 2); ctx.lineTo(x + w / 2, y); ctx.lineTo(x, y + h / 2); ctx.lineTo(x - w / 2, y); ctx.closePath(); if ((row + Math.round(x / w)) % 2 === 0) ctx.fill(); } }
  else if (type === 'stars') { ctx.fillStyle = accent; for (let i = 0; i < (W * H) / 5200; i++) { const x = r() * W, y = r() * H, s = 4 + r() * 9; star(ctx, x, y, s); ctx.fill(); } }
  else if (type === 'grid') { ctx.strokeStyle = accent; ctx.lineWidth = 2; for (let x = 0; x < W; x += 40) { ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, H); ctx.stroke(); } for (let y = 0; y < H; y += 40) { ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(W, y); ctx.stroke(); } }
  else if (type === 'kraft') { for (let i = 0; i < (W * H) / 90; i++) { ctx.fillStyle = r() > 0.5 ? 'rgba(80,50,20,.08)' : 'rgba(255,240,210,.08)'; ctx.fillRect(r() * W, r() * H, 1 + r() * 6, 1 + r() * 2); } }
  else if (type === 'disco') { const s = 26; for (let y = 0; y < H; y += s) for (let x = 0; x < W; x += s) { const v = 150 + Math.floor(r() * 100); ctx.fillStyle = `rgb(${v},${v},${v + 8})`; ctx.fillRect(x + 1, y + 1, s - 2, s - 2); if (r() > 0.93) { ctx.fillStyle = '#FFFFFF'; sparkle(ctx, x + s / 2, y + s / 2, 10); ctx.fill(); } } }
  else if (type === 'chrome') { const g = ctx.createLinearGradient(0, 0, W, H); g.addColorStop(0, '#F2F2F5'); g.addColorStop(0.25, '#B4B4BE'); g.addColorStop(0.5, '#FAFAFC'); g.addColorStop(0.75, '#9A9AA6'); g.addColorStop(1, '#E6E6EC'); ctx.fillStyle = g; ctx.fillRect(0, 0, W, H); }
}

function paintBackground(ctx, look, t, L) {
  const b = look.border || {};
  if (b.pattern && b.pattern !== 'none') {
    const base = b.color || '#FFF4DC';
    const pop = lum(base) > 0.6 ? '#C8102E' : '#FFF4DC';
    const accent = { solid: base, cherry: '#C8102E', cheetah: '#3A2A1A', polka: pop, checker: lum(base) > 0.6 ? shade(base, 0.88) : shade(base, 1.35), gingham: pop, stripes: pop, harlequin: lum(base) > 0.6 ? shade(base, 0.82) : shade(base, 1.6), hearts: pop, stars: lum(base) > 0.6 ? '#E8B04B' : '#E8B04B' }[b.pattern];
    if (b.pattern === 'solid') { ctx.fillStyle = base; ctx.fillRect(0, 0, L.W, L.H); }
    else paintPattern(ctx, b.pattern, L.W, L.H, b.pattern === 'cheetah' && !b.color ? '#E8B04B' : base, accent);
    return;
  }
  const bg = t.bg;
  const base = b.color || bg.color || '#FFF4DC';
  if (bg.type === 'gradient' && !b.color) { const g = ctx.createLinearGradient(0, 0, 0, L.H); bg.colors.forEach((c, i) => g.addColorStop(i / (bg.colors.length - 1), c)); ctx.fillStyle = g; ctx.fillRect(0, 0, L.W, L.H); }
  else if (bg.type === 'solid' || b.color) { ctx.fillStyle = base; ctx.fillRect(0, 0, L.W, L.H); }
  else paintPattern(ctx, bg.type, L.W, L.H, base, bg.accent);
}

function paintDeco(ctx, t, L, look) {
  const r = rng(42);
  const { W, H, P } = L;
  const margin = (fn, n) => { for (let i = 0; i < n; i++) { const side = i % 4; let x, y; if (side === 0) { x = r() * W; y = r() * P * 0.7 + 4; } else if (side === 1) { x = W - r() * P * 0.7 - 4; y = r() * H; } else if (side === 2) { x = r() * P * 0.7 + 4; y = r() * H; } else { x = r() * W; y = H - r() * 60 - 10; } fn(x, y, r); } };
  const textC = look.textColor || t.text;
  if (t.deco === 'sparkles' || t.deco === 'stars') {
    ctx.fillStyle = t.decoColor || (t.deco === 'stars' ? '#FFFFFF' : '#FFF4DC');
    margin((x, y, rr_) => { if (t.deco === 'stars' && t.decoColor) star(ctx, x, y, 8 + rr_() * 8); else sparkle(ctx, x, y, 6 + rr_() * 10); ctx.fill(); }, 26);
  } else if (t.deco === 'flowers') {
    margin((x, y, rr_) => flower(ctx, x, y, 10 + rr_() * 8, rr_() > 0.5 ? '#FFFFFF' : '#F7A8C4', '#E8B04B'), 18);
  } else if (t.deco === 'scanlines') {
    ctx.fillStyle = 'rgba(255,255,255,0.05)'; for (let y = 0; y < H; y += 6) ctx.fillRect(0, y, W, 2);
    ctx.fillStyle = '#FF3B30'; ctx.beginPath(); ctx.arc(P * 0.5, P * 0.5, Math.max(5, P * 0.16), 0, 7); ctx.fill();
  } else if (t.deco === 'hearts') {
    margin((x, y, rr_) => { ctx.fillStyle = rr_() > 0.5 ? '#C8102E' : '#F7A8C4'; heartPath(ctx, x, y, 8 + rr_() * 8); ctx.fill(); }, 22);
  } else if (t.deco === 'doodles') {
    ctx.strokeStyle = textC; ctx.lineWidth = 3; ctx.lineCap = 'round';
    margin((x, y, rr_) => { ctx.beginPath(); ctx.moveTo(x - 10, y); for (let k = 0; k < 4; k++) ctx.quadraticCurveTo(x - 5 + k * 6, y + (k % 2 ? 8 : -8), x + k * 6, y); ctx.stroke(); }, 14);
  } else if (t.deco === 'sprockets') {
    ctx.fillStyle = '#FFF4DC';
    const sw = Math.min(16, P * 0.35), sh = 22;
    for (let y = 18; y < H - 18; y += 46) { rr(ctx, P * 0.5 - sw / 2, y, sw, sh, 4); ctx.fill(); rr(ctx, W - P * 0.5 - sw / 2, y, sw, sh, 4); ctx.fill(); }
  } else if (t.deco === 'bulbs') {
    ctx.fillStyle = '#FFF4DC';
    const g = 46; for (let x = g / 2; x < W; x += g) { ctx.beginPath(); ctx.arc(x, P * 0.42, 6, 0, 7); ctx.fill(); }
    for (let y = P + 20; y < H - L.footer; y += g) { ctx.beginPath(); ctx.arc(P * 0.42, y, 6, 0, 7); ctx.arc(W - P * 0.42, y, 6, 0, 7); ctx.fill(); }
  }
}

function drawCover(ctx, img, x, y, w, h) {
  const iw = img.width, ih = img.height; const s = Math.max(w / iw, h / ih);
  const sw = w / s, sh = h / s; ctx.drawImage(img, (iw - sw) / 2, (ih - sh) / 2, sw, sh, x, y, w, h);
}

export function formatDate(d = new Date()) { const p = n => String(n).padStart(2, '0'); return `${p(d.getDate())}.${p(d.getMonth() + 1)}.${String(d.getFullYear()).slice(2)}`; }

// Render a look onto a canvas. shots: array of 4 canvases (already filtered) or null for design-only.
export function renderLook(canvas, look, shots, { scale = 1, empty = false } = {}) {
  const t = TEMPLATES[look.template] || TEMPLATES['booth-red'];
  const L = layoutFor(look);
  canvas.width = Math.round(L.W * scale); canvas.height = Math.round(L.H * scale);
  const ctx = canvas.getContext('2d');
  ctx.setTransform(scale, 0, 0, scale, 0, 0);
  paintBackground(ctx, look, t, L);
  paintDeco(ctx, t, L, look);
  const fr = t.frame;
  const radius = fr ? fr.radius : 0;
  L.slots.forEach((s, i) => {
    ctx.save();
    // no border around photos: they sit straight on the strip background
    rr(ctx, s.x, s.y, s.w, s.h, radius); ctx.clip();
    const img = shots && shots[i];
    if (img && !empty) drawCover(ctx, img, s.x, s.y, s.w, s.h);
    else {
      const dark = lum((look.border?.color) || t.bg.color || t.bg.colors?.[1] || '#FFF4DC') < 0.4;
      ctx.fillStyle = dark ? 'rgba(255,244,220,0.10)' : 'rgba(26,26,26,0.07)'; ctx.fillRect(s.x, s.y, s.w, s.h);
      ctx.strokeStyle = dark ? 'rgba(255,244,220,0.55)' : 'rgba(26,26,26,0.35)'; ctx.setLineDash([14, 10]); ctx.lineWidth = 3; rr(ctx, s.x + 10, s.y + 10, s.w - 20, s.h - 20, Math.max(0, radius - 6)); ctx.stroke(); ctx.setLineDash([]);
      ctx.fillStyle = dark ? 'rgba(255,244,220,0.6)' : 'rgba(26,26,26,0.45)'; ctx.font = '600 40px Inter, sans-serif'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillText(String(i + 1), s.x + s.w / 2, s.y + s.h / 2);
    }
    ctx.restore();
  });
  // footer
  const f = FONTS[look.font] || FONTS.bubble;
  const color = look.textColor || t.text;
  const fy = L.H - L.footer;
  ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
  const cap = (look.caption || '').trim();
  const noPattern = !look.border || look.border.pattern === 'none';
  if (t.band && noPattern && !look.border?.color) { ctx.fillStyle = t.band; rr(ctx, L.P, fy + 14, L.W - 2 * L.P, L.footer - 14 - Math.min(L.P, 30), 12); ctx.fill(); }
  if (cap) {
    let size = 54 * f.sizeK;
    ctx.font = `${fontCSS(f)}${size}px "${f.family}"`;
    while (ctx.measureText(cap).width > L.W - 2 * L.P - 24 && size > 14) { size -= 2; ctx.font = `${fontCSS(f)}${size}px "${f.family}"`; }
    ctx.fillStyle = color;
    if (t.glow) { ctx.shadowColor = color; ctx.shadowBlur = 22; }
    ctx.fillText(cap, L.W / 2, fy + (look.dateStamp ? 66 : 84));
    ctx.shadowBlur = 0; ctx.shadowColor = 'transparent';
  }
  if (look.dateStamp) {
    ctx.font = `400 ${t.date ? 40 : 30}px "${t.date ? 'VT323' : 'Inter'}"`;
    ctx.fillStyle = t.date || color; ctx.globalAlpha = t.date ? 1 : 0.8;
    ctx.fillText(formatDate(), L.W / 2, fy + (cap ? 124 : 84)); ctx.globalAlpha = 1;
  }
  return canvas;
}

// ---------- filters ----------
// Each filter = per-pixel colour transform + optional finishing effects
// (vignette, grain, light leak, scanlines). Everything is blended by intensity.
const FX = {
  film: { grain: 18 }, disposable: { grain: 22, leak: 'rgba(255,120,40,0.45)', vignette: 0.25 }, kodak: { grain: 10, vignette: 0.15 },
  fuji: { grain: 10 }, polaroid: { vignette: 0.18 }, vintage: { vignette: 0.4, grain: 14 }, golden: { leak: 'rgba(255,170,60,0.35)' },
  vhs: { scan: true, shift: 4, grain: 10 }, lomo: { vignette: 0.6 }, dreamy: { glow: true }, noir: { vignette: 0.45, grain: 24 },
  cross: { vignette: 0.2 }, infrared: {}, duotone: {},
};
export function applyFilter(src, id, intensity = 100, seed = 1) {
  const c = document.createElement('canvas'); c.width = src.width; c.height = src.height;
  const ctx = c.getContext('2d', { willReadFrequently: true });
  ctx.drawImage(src, 0, 0);
  if (!id || id === 'original' || intensity <= 0) return c;
  const W = c.width, H = c.height;
  const img = ctx.getImageData(0, 0, W, H); const d = img.data; const orig = FX[id]?.shift ? new Uint8ClampedArray(d) : null;
  const k = intensity / 100; const r = rng(seed); const fx = FX[id] || {};
  const con = (v, a) => (v - 128) * a + 128;
  const sat = (R, G, B, a) => { const l = 0.299 * R + 0.587 * G + 0.114 * B; return [l + (R - l) * a, l + (G - l) * a, l + (B - l) * a]; };
  const cx = W / 2, cy = H / 2, maxD = Math.hypot(cx, cy);
  for (let i = 0, p = 0; i < d.length; i += 4, p++) {
    let R = d[i], G = d[i + 1], B = d[i + 2];
    if (orig) { const x = p % W; const sx = Math.min(W - 1, x + fx.shift); R = orig[(p - x + sx) * 4]; }
    const R0 = d[i], G0 = d[i + 1], B0 = d[i + 2];
    let r2 = R, g2 = G, b2 = B; const l = 0.299 * R + 0.587 * G + 0.114 * B;
    switch (id) {
      case 'film': r2 = con(R * 1.06 + 10, 1.08) * 0.94 + 14; g2 = con(G + 4, 1.08) * 0.94 + 12; b2 = con(B * 0.9, 1.08) * 0.94 + 10; break;
      case 'disposable': [r2, g2, b2] = sat(R * 1.08 + 12, G * 1.02 + 8, B * 0.86, 1.1); g2 += (255 - l) * 0.05; break;
      case 'kodak': [r2, g2, b2] = sat(con(R * 1.1 + 8, 1.1), con(G * 1.03 + 6, 1.1), con(B * 0.82, 1.1), 1.15); break;
      case 'fuji': r2 = con(R * 0.96, 1.06); g2 = con(G * 1.04 + 6, 1.06); b2 = con(B * 1.0 + (255 - l) * 0.08, 1.06); break;
      case 'polaroid': r2 = R * 0.86 + 30 + (l > 150 ? 6 : 0); g2 = G * 0.86 + 28; b2 = B * 0.82 + 36 - (l > 150 ? 8 : 0); break;
      case 'vintage': { const t = sat(R, G, B, 0.7); r2 = t[0] * 0.88 + 34; g2 = t[1] * 0.85 + 26; b2 = t[2] * 0.75 + 22; break; }
      case 'sepia': r2 = (0.393 * R + 0.769 * G + 0.189 * B) * 0.95 + 10; g2 = 0.349 * R + 0.686 * G + 0.168 * B; b2 = 0.272 * R + 0.534 * G + 0.131 * B; break;
      case 'golden': [r2, g2, b2] = sat(R * 1.12 + 14, G * 1.04 + 6, B * 0.8, 1.12); break;
      case 'cyan': r2 = con(R * 0.92, 1.12) + 6; g2 = con(G * 1.02 + 4, 1.12) + 8; b2 = con(B * 1.12 + 12, 1.12) + 10; break;
      case 'vhs': { const t = sat(R, G, B, 0.8); r2 = con(t[0], 1.1) + 6; g2 = con(t[1], 1.1); b2 = con(t[2] * 1.06, 1.1) + 12; break; }
      case 'lomo': [r2, g2, b2] = sat(con(R, 1.3), con(G, 1.3), con(B, 1.25), 1.35); break;
      case 'vivid': [r2, g2, b2] = sat(con(R, 1.08), con(G, 1.08), con(B, 1.08), 1.5); break;
      case 'pink': r2 = R * 0.9 + 40; g2 = G * 0.86 + 14; b2 = B * 0.88 + 34; break;
      case 'dreamy': { const t = sat(R, G, B, 0.85); r2 = t[0] * 0.8 + 60; g2 = t[1] * 0.78 + 46; b2 = t[2] * 0.8 + 62; break; }
      case 'cool': r2 = con(R * 0.86, 1.05); g2 = con(G * 0.98 + 6, 1.05); b2 = con(B * 1.1 + 22, 1.05); break;
      case 'cross': r2 = con(R * 1.1, 1.2); g2 = con(G * 1.08 + 10, 1.15); b2 = B * 0.7 + 40; break;
      case 'matte': { const t = sat(R, G, B, 0.82); r2 = t[0] * 0.78 + 36; g2 = t[1] * 0.78 + 36; b2 = t[2] * 0.78 + 40; break; }
      case 'faded': r2 = (R * 0.75 + l * 0.25) * 0.86 + 26; g2 = (G * 0.75 + l * 0.25) * 0.86 + 24; b2 = (B * 0.75 + l * 0.25) * 0.86 + 30; break;
      case 'duotone': { const t = Math.min(1, Math.max(0, (con(l, 1.15)) / 255)); r2 = 91 + (247 - 91) * t; g2 = 6 + (200 - 6) * t; b2 = 26 + (210 - 26) * t; break; }
      case 'infrared': r2 = con(G * 1.1 + 20, 1.1); g2 = con(R * 0.7, 1.1); b2 = con(B * 1.1 + 30, 1.1); break;
      case 'bw': r2 = g2 = b2 = con(l, 1.18); break;
      case 'noir': r2 = g2 = b2 = con(l, 1.45) - 6; break;
    }
    if (fx.grain) { const n = (r() - 0.5) * fx.grain; r2 += n; g2 += n; b2 += n; }
    if (fx.vignette) { const x = p % W, y = (p / W) | 0; const v = 1 - fx.vignette * Math.pow(Math.hypot(x - cx, y - cy) / maxD, 2.2) * 1.4; r2 *= v; g2 *= v; b2 *= v; }
    d[i] = R0 + (r2 - R0) * k; d[i + 1] = G0 + (g2 - G0) * k; d[i + 2] = B0 + (b2 - B0) * k;
  }
  ctx.putImageData(img, 0, 0);
  ctx.globalAlpha = k;
  if (fx.leak) { ctx.globalCompositeOperation = 'screen'; const g = ctx.createRadialGradient(W * 0.95, H * 0.1, 0, W * 0.95, H * 0.1, W * 0.7); g.addColorStop(0, fx.leak); g.addColorStop(1, 'rgba(0,0,0,0)'); ctx.fillStyle = g; ctx.fillRect(0, 0, W, H); ctx.globalCompositeOperation = 'source-over'; }
  if (fx.glow) { ctx.globalCompositeOperation = 'screen'; ctx.globalAlpha = 0.35 * k; const s = document.createElement('canvas'); s.width = Math.max(1, W >> 3); s.height = Math.max(1, H >> 3); s.getContext('2d').drawImage(c, 0, 0, s.width, s.height); ctx.imageSmoothingQuality = 'high'; ctx.drawImage(s, 0, 0, W, H); ctx.globalCompositeOperation = 'source-over'; ctx.globalAlpha = k; }
  if (fx.scan) { ctx.fillStyle = 'rgba(0,0,0,0.18)'; const step = Math.max(3, Math.round(H / 160)); for (let y = 0; y < H; y += step) ctx.fillRect(0, y, W, Math.max(1, step >> 1)); }
  ctx.globalAlpha = 1;
  return c;
}

// Digicam flash look applied at capture time
export function digicamFlash(src) {
  const c = applyFilter(src, 'cyan', 70, 3);
  const ctx = c.getContext('2d');
  const g = ctx.createRadialGradient(c.width / 2, c.height / 2, c.width * 0.1, c.width / 2, c.height / 2, c.width * 0.75);
  g.addColorStop(0, 'rgba(255,255,255,0.18)'); g.addColorStop(1, 'rgba(0,0,0,0.28)');
  ctx.fillStyle = g; ctx.fillRect(0, 0, c.width, c.height);
  return c;
}

export function downscale(src, maxW) {
  if (src.width <= maxW) return src;
  const k = maxW / src.width; const c = document.createElement('canvas'); c.width = maxW; c.height = Math.round(src.height * k);
  c.getContext('2d').drawImage(src, 0, 0, c.width, c.height); return c;
}
