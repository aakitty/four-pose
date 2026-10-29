// Four Poses — strip rendering engine (templates, filters, patterns, layout)

export const FONTS = {
  bubble: { label: 'Bubble', family: 'Shrikhand', weight: '400', sizeK: 1.0 },
  typewriter: { label: 'Typewriter', family: 'Special Elite', weight: '400', sizeK: 0.9 },
  handwritten: { label: 'Handwritten', family: 'Caveat', weight: '700', sizeK: 1.25 },
  pixel: { label: 'Pixel', family: 'VT323', weight: '400', sizeK: 1.3 },
  classic: { label: 'Classic', family: 'Inter', weight: '700', sizeK: 0.85 },
};

export const FILTERS = {
  original: { label: 'Original' },
  film: { label: 'Film 35mm' },
  sepia: { label: 'Warm sepia' },
  cyan: { label: 'Digicam cyan' },
  bw: { label: 'Black & white' },
  faded: { label: 'Faded' },
};

export const STYLES = ['Y2K', 'Kawaii', 'Film', 'Minimal', 'Booth'];

export const TEMPLATES = {
  'y2k-hearts': { name: 'Y2K Hearts', style: 'Y2K', bg: { type: 'hearts', color: '#F7A8C4', accent: '#FFF4DC' }, frame: { color: '#FFFFFF', width: 8, radius: 10 }, deco: 'sparkles', font: 'bubble', text: '#5B061A', filter: 'cyan' },
  'y2k-chrome': { name: 'Y2K Chrome', style: 'Y2K', bg: { type: 'chrome' }, frame: { color: '#1A1A1A', width: 4, radius: 4 }, deco: 'stars', font: 'pixel', text: '#1A1A1A', filter: 'cyan' },
  'kawaii-pop': { name: 'Kawaii Pop', style: 'Kawaii', bg: { type: 'polka', color: '#FBE7A1', accent: '#F7A8C4' }, frame: { color: '#FFFFFF', width: 10, radius: 22 }, deco: 'hearts', font: 'bubble', text: '#C8102E', filter: 'faded' },
  'pastel-doodle': { name: 'Pastel Doodle', style: 'Kawaii', bg: { type: 'checker', color: '#F3C9B5', accent: '#F8DDD0' }, frame: { color: '#FFF4DC', width: 8, radius: 16 }, deco: 'doodles', font: 'handwritten', text: '#5B061A', filter: 'sepia' },
  'film-35': { name: 'Film 35mm', style: 'Film', bg: { type: 'solid', color: '#1A1A1A' }, frame: null, deco: 'sprockets', font: 'typewriter', text: '#FFF4DC', filter: 'film', date: '#FF8A3D' },
  'film-noir': { name: 'Film Noir', style: 'Film', bg: { type: 'solid', color: '#0E0E0E' }, frame: { color: '#FFFFFF', width: 3, radius: 0 }, deco: null, font: 'typewriter', text: '#FFFFFF', filter: 'bw' },
  'minimal-mono': { name: 'Minimal Mono', style: 'Minimal', bg: { type: 'solid', color: '#FFF4DC' }, frame: { color: '#1A1A1A', width: 2, radius: 0 }, deco: null, font: 'classic', text: '#1A1A1A', filter: 'original' },
  'booth-red': { name: 'Booth Red', style: 'Booth', bg: { type: 'solid', color: '#C8102E' }, frame: { color: '#FFF4DC', width: 6, radius: 6 }, deco: 'bulbs', font: 'bubble', text: '#FFF4DC', filter: 'original' },
};

export const BORDER_COLORS = ['#1A1A1A', '#5B061A', '#C8102E', '#FFF4DC', '#E8B04B', '#F7A8C4', '#D9D9E0', '#F3C9B5'];
export const BORDER_PATTERNS = { none: 'Template', solid: 'Solid', cherry: 'Cherry red', cheetah: 'Cheetah', polka: 'Polka dot', checker: 'Checker' };
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
  else if (type === 'chrome') { const g = ctx.createLinearGradient(0, 0, W, H); g.addColorStop(0, '#F2F2F5'); g.addColorStop(0.25, '#B4B4BE'); g.addColorStop(0.5, '#FAFAFC'); g.addColorStop(0.75, '#9A9AA6'); g.addColorStop(1, '#E6E6EC'); ctx.fillStyle = g; ctx.fillRect(0, 0, W, H); }
}

function paintBackground(ctx, look, t, L) {
  const b = look.border || {};
  if (b.pattern && b.pattern !== 'none') {
    const base = b.color || '#FFF4DC';
    const accent = { solid: base, cherry: '#C8102E', cheetah: '#3A2A1A', polka: lum(base) > 0.6 ? '#C8102E' : '#FFF4DC', checker: lum(base) > 0.6 ? shade(base, 0.88) : shade(base, 1.35) }[b.pattern];
    if (b.pattern === 'solid') { ctx.fillStyle = base; ctx.fillRect(0, 0, L.W, L.H); }
    else paintPattern(ctx, b.pattern, L.W, L.H, b.pattern === 'cheetah' && !b.color ? '#E8B04B' : base, accent);
    return;
  }
  const bg = t.bg;
  const base = b.color || bg.color || '#FFF4DC';
  if (bg.type === 'solid' || b.color) { ctx.fillStyle = base; ctx.fillRect(0, 0, L.W, L.H); }
  else paintPattern(ctx, bg.type, L.W, L.H, base, bg.accent);
}

function paintDeco(ctx, t, L, look) {
  const r = rng(42);
  const { W, H, P } = L;
  const margin = (fn, n) => { for (let i = 0; i < n; i++) { const side = i % 4; let x, y; if (side === 0) { x = r() * W; y = r() * P * 0.7 + 4; } else if (side === 1) { x = W - r() * P * 0.7 - 4; y = r() * H; } else if (side === 2) { x = r() * P * 0.7 + 4; y = r() * H; } else { x = r() * W; y = H - r() * 60 - 10; } fn(x, y, r); } };
  const textC = look.textColor || t.text;
  if (t.deco === 'sparkles' || t.deco === 'stars') {
    ctx.fillStyle = t.deco === 'stars' ? '#FFFFFF' : '#FFF4DC';
    margin((x, y, rr_) => { sparkle(ctx, x, y, 6 + rr_() * 10); ctx.fill(); }, 26);
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
    if (fr && fr.width) { ctx.fillStyle = fr.color; rr(ctx, s.x - fr.width, s.y - fr.width, s.w + fr.width * 2, s.h + fr.width * 2, radius + fr.width); ctx.fill(); }
    rr(ctx, s.x, s.y, s.w, s.h, radius); ctx.clip();
    const img = shots && shots[i];
    if (img && !empty) drawCover(ctx, img, s.x, s.y, s.w, s.h);
    else {
      const dark = lum((look.border?.color) || t.bg.color || '#FFF4DC') < 0.4;
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
  if (cap) {
    let size = 54 * f.sizeK;
    ctx.font = `${f.weight} ${size}px "${f.family}"`;
    while (ctx.measureText(cap).width > L.W - 2 * L.P - 10 && size > 20) { size -= 2; ctx.font = `${f.weight} ${size}px "${f.family}"`; }
    ctx.fillStyle = color; ctx.fillText(cap, L.W / 2, fy + (look.dateStamp ? 66 : 84));
  }
  if (look.dateStamp) {
    ctx.font = `400 ${t.date ? 40 : 30}px "${t.date ? 'VT323' : 'Inter'}"`;
    ctx.fillStyle = t.date || color; ctx.globalAlpha = t.date ? 1 : 0.8;
    ctx.fillText(formatDate(), L.W / 2, fy + (cap ? 124 : 84)); ctx.globalAlpha = 1;
  }
  return canvas;
}

// ---------- filters ----------
export function applyFilter(src, id, intensity = 100, seed = 1) {
  const c = document.createElement('canvas'); c.width = src.width; c.height = src.height;
  const ctx = c.getContext('2d', { willReadFrequently: true });
  ctx.drawImage(src, 0, 0);
  if (!id || id === 'original' || intensity <= 0) return c;
  const img = ctx.getImageData(0, 0, c.width, c.height); const d = img.data;
  const k = intensity / 100; const r = rng(seed);
  const con = (v, a) => (v - 128) * a + 128;
  for (let i = 0; i < d.length; i += 4) {
    const R = d[i], G = d[i + 1], B = d[i + 2]; let r2 = R, g2 = G, b2 = B;
    if (id === 'film') { r2 = con(R * 1.06 + 10, 1.08); g2 = con(G * 1.0 + 4, 1.08); b2 = con(B * 0.9, 1.08); r2 = r2 * 0.94 + 14; g2 = g2 * 0.94 + 12; b2 = b2 * 0.94 + 10; const n = (r() - 0.5) * 18; r2 += n; g2 += n; b2 += n; }
    else if (id === 'sepia') { r2 = 0.393 * R + 0.769 * G + 0.189 * B; g2 = 0.349 * R + 0.686 * G + 0.168 * B; b2 = 0.272 * R + 0.534 * G + 0.131 * B; r2 = r2 * 0.95 + 10; }
    else if (id === 'cyan') { r2 = con(R * 0.92, 1.12) + 6; g2 = con(G * 1.02 + 4, 1.12) + 8; b2 = con(B * 1.12 + 12, 1.12) + 10; }
    else if (id === 'bw') { const l = 0.299 * R + 0.587 * G + 0.114 * B; r2 = g2 = b2 = con(l, 1.18); }
    else if (id === 'faded') { const l = 0.299 * R + 0.587 * G + 0.114 * B; r2 = (R * 0.75 + l * 0.25) * 0.86 + 26; g2 = (G * 0.75 + l * 0.25) * 0.86 + 24; b2 = (B * 0.75 + l * 0.25) * 0.86 + 30; }
    d[i] = R + (r2 - R) * k; d[i + 1] = G + (g2 - G) * k; d[i + 2] = B + (b2 - B) * k;
  }
  ctx.putImageData(img, 0, 0);
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
