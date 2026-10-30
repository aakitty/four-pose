// Four Poses stickers: small vector drawings in a 100×100 box.
// The same data draws on canvas (for saving) and as inline SVG (for the editor),
// so what you place is exactly what you save. Die-cut stickers get a white edge.
const INK = '#1A1A1A';
const starD = (cx, cy, R, r, n = 5) => { let d = ''; for (let i = 0; i < n * 2; i++) { const a = -Math.PI / 2 + i * Math.PI / n, rad = i % 2 ? r : R; d += (i ? 'L' : 'M') + (cx + Math.cos(a) * rad).toFixed(1) + ' ' + (cy + Math.sin(a) * rad).toFixed(1); } return d + 'Z'; };
const sparkD = (cx, cy, s) => `M${cx} ${cy - s}Q${cx + s * .12} ${cy - s * .12} ${cx + s} ${cy}Q${cx + s * .12} ${cy + s * .12} ${cx} ${cy + s}Q${cx - s * .12} ${cy + s * .12} ${cx - s} ${cy}Q${cx - s * .12} ${cy - s * .12} ${cx} ${cy - s}Z`;
const HEART = 'M50 86C22 66 8 52 8 33C8 19 19 10 31 10C40 10 46 15 50 22C54 15 60 10 69 10C81 10 92 19 92 33C92 52 78 66 50 86Z';
const BUBBLE = 'M10 20Q10 10 20 10H80Q90 10 90 20V58Q90 68 80 68H42L24 88L28 68H20Q10 68 10 58Z';
const petals = (n, R, rx, ry, f) => Array.from({ length: n }, (_, i) => { const a = i * Math.PI * 2 / n; return { e: [50 + Math.cos(a) * R, 50 + Math.sin(a) * R, rx, ry, a], f, s: INK, w: 3 }; });

export const STICKERS = {
  'heart-pink': { cut: 1, ops: [{ p: HEART, f: '#F7A8C4', s: INK, w: 4 }, { e: [32, 30, 8, 5, -0.6], f: '#FFFFFF' }] },
  'heart-red': { cut: 1, ops: [{ p: HEART, f: '#C8102E', s: INK, w: 4 }, { e: [32, 30, 8, 5, -0.6], f: '#FF8A9B' }] },
  'star-gold': { cut: 1, ops: [{ p: starD(50, 54, 46, 20), f: '#E8B04B', s: INK, w: 4 }, { e: [40, 40, 5, 3, -0.5], f: '#FFF4DC' }] },
  'sparkle-gold': { cut: 1, ops: [{ p: sparkD(50, 50, 44), f: '#E8B04B', s: INK, w: 3 }] },
  'sparkle-silver': { cut: 1, ops: [{ p: sparkD(50, 50, 44), f: '#D9D9E0', s: INK, w: 3 }] },
  'sparkles': { cut: 1, ops: [{ p: sparkD(36, 58, 30), f: '#FFFFFF', s: INK, w: 3 }, { p: sparkD(74, 26, 18), f: '#F7A8C4', s: INK, w: 3 }, { p: sparkD(78, 74, 12), f: '#E8B04B', s: INK, w: 2.5 }] },
  'cherry': { cut: 1, ops: [{ p: 'M38 60Q44 30 66 14M66 14Q68 40 66 62', s: '#3E7D3A', w: 5 }, { p: 'M66 14Q84 4 92 18Q78 26 66 14Z', f: '#5BAA4A', s: INK, w: 3 }, { c: [36, 68, 18], f: '#C8102E', s: INK, w: 4 }, { c: [66, 72, 18], f: '#C8102E', s: INK, w: 4 }, { e: [29, 61, 5, 3, -0.6], f: '#FFFFFF' }, { e: [59, 65, 5, 3, -0.6], f: '#FFFFFF' }] },
  'bow': { cut: 1, ops: [{ p: 'M46 54L32 90L44 85L50 60Z', f: '#F7A8C4', s: INK, w: 3 }, { p: 'M54 54L68 90L56 85L50 60Z', f: '#F7A8C4', s: INK, w: 3 }, { p: 'M50 48C30 18 4 26 8 46C12 66 34 62 50 52Z', f: '#F7A8C4', s: INK, w: 4 }, { p: 'M50 48C70 18 96 26 92 46C88 66 66 62 50 52Z', f: '#F7A8C4', s: INK, w: 4 }, { c: [50, 50, 8], f: '#E88AAE', s: INK, w: 3 }] },
  'daisy': { cut: 1, ops: [...petals(8, 25, 16, 9, '#FFFFFF'), { c: [50, 50, 13], f: '#FFD23F', s: INK, w: 3 }] },
  'flower': { cut: 1, ops: [...petals(5, 22, 19, 14, '#F7A8C4'), { c: [50, 50, 12], f: '#E8B04B', s: INK, w: 3 }] },
  'smiley': { cut: 1, ops: [{ c: [50, 50, 42], f: '#FFE14D', s: INK, w: 4 }, { e: [36, 42, 4, 7, 0], f: INK }, { e: [64, 42, 4, 7, 0], f: INK }, { p: 'M30 58Q50 80 70 58', s: INK, w: 5 }] },
  'star-face': { cut: 1, ops: [{ p: starD(50, 54, 46, 22), f: '#FFE14D', s: INK, w: 4 }, { e: [42, 52, 3, 5, 0], f: INK }, { e: [58, 52, 3, 5, 0], f: INK }, { e: [35, 61, 5, 3, 0], f: '#F7A8C4' }, { e: [65, 61, 5, 3, 0], f: '#F7A8C4' }, { p: 'M44 62Q50 69 56 62', s: INK, w: 3 }] },
  'omg': { cut: 1, ops: [{ p: BUBBLE, f: '#FFFFFF', s: INK, w: 4 }, { t: 'OMG!', x: 50, y: 40, z: 24, font: 'Bungee', f: '#C8102E' }] },
  'xoxo': { cut: 1, ops: [{ p: BUBBLE, f: '#F7A8C4', s: INK, w: 4 }, { t: 'xoxo', x: 50, y: 38, z: 25, font: 'Pacifico', f: '#5B061A' }] },
  'besties': { cut: 1, ops: [{ p: BUBBLE, f: '#FFE14D', s: INK, w: 4 }, { t: 'BESTIES', x: 50, y: 40, z: 14, font: 'Bungee', f: INK }] },
  'thought-star': { cut: 1, ops: [{ p: 'M24 70C10 70 6 54 18 48C14 32 32 24 42 32C48 18 70 20 72 34C88 32 96 50 84 58C90 70 76 78 66 72C58 82 40 82 34 72C30 74 26 72 24 70Z', f: '#FFFFFF', s: INK, w: 4 }, { p: starD(52, 51, 16, 7), f: '#E8B04B', s: INK, w: 2.5 }, { c: [16, 84, 5], f: '#FFFFFF', s: INK, w: 3 }, { c: [8, 94, 3], f: '#FFFFFF', s: INK, w: 2 }] },
  'lips': { cut: 1, ops: [{ p: 'M8 50C22 28 38 30 50 40C62 30 78 28 92 50C78 78 22 78 8 50Z', f: '#C8102E', s: INK, w: 4 }, { p: 'M14 50C34 57 66 57 86 50', s: '#6E0716', w: 3 }, { e: [36, 42, 7, 3, -0.2], f: '#FF7A8A' }] },
  'butterfly': { cut: 1, ops: [{ e: [32, 36, 22, 18, -0.5], f: '#9EC9FF', s: INK, w: 3 }, { e: [68, 36, 22, 18, 0.5], f: '#9EC9FF', s: INK, w: 3 }, { e: [34, 66, 15, 13, 0.4], f: '#C6A8FF', s: INK, w: 3 }, { e: [66, 66, 15, 13, -0.4], f: '#C6A8FF', s: INK, w: 3 }, { e: [50, 52, 5, 26, 0], f: INK }, { p: 'M48 28Q42 14 34 10M52 28Q58 14 66 10', s: INK, w: 3 }] },
  'crown': { cut: 1, ops: [{ p: 'M12 74L18 28L36 52L50 20L64 52L82 28L88 74Z', f: '#E8B04B', s: INK, w: 4 }, { r: [12, 70, 76, 16, 3], f: '#E8B04B', s: INK, w: 4 }, { c: [50, 56, 6], f: '#C8102E', s: INK, w: 2 }, { c: [30, 62, 4], f: '#9EC9FF', s: INK, w: 2 }, { c: [70, 62, 4], f: '#9EC9FF', s: INK, w: 2 }] },
  'moon': { cut: 1, ops: [{ p: 'M60 8A42 42 0 1 0 92 66A33 33 0 1 1 60 8Z', f: '#FFE14D', s: INK, w: 4 }, { c: [36, 50, 4], f: '#F2C230' }, { c: [46, 72, 3], f: '#F2C230' }] },
  'bolt': { cut: 1, ops: [{ p: 'M58 4L18 56H46L36 96L82 38H54Z', f: '#FFE14D', s: INK, w: 4 }] },
  'cloud': { cut: 1, ops: [{ p: 'M22 74C8 74 4 56 18 52C16 36 34 28 44 38C50 22 74 24 76 40C92 38 98 58 86 66C88 74 80 78 74 74Z', f: '#FFFFFF', s: INK, w: 4 }, { e: [36, 58, 3, 4, 0], f: INK }, { e: [56, 58, 3, 4, 0], f: INK }, { e: [30, 64, 4, 2.5, 0], f: '#F7A8C4' }, { e: [62, 64, 4, 2.5, 0], f: '#F7A8C4' }] },
  'rainbow': { cut: 1, ops: [{ p: 'M10 74A40 40 0 0 1 90 74', s: '#FF3B5C', w: 10 }, { p: 'M21 74A29 29 0 0 1 79 74', s: '#FFB020', w: 10 }, { p: 'M32 74A18 18 0 0 1 68 74', s: '#3FBF6B', w: 10 }, { c: [14, 78, 11], f: '#FFFFFF', s: INK, w: 3 }, { c: [86, 78, 11], f: '#FFFFFF', s: INK, w: 3 }] },
  'strawberry': { cut: 1, ops: [{ p: 'M50 92C22 80 12 50 26 34C36 26 64 26 74 34C88 50 78 80 50 92Z', f: '#FF3B5C', s: INK, w: 4 }, ...[[38, 50], [58, 48], [48, 64], [34, 68], [64, 66], [50, 80]].map(([x, y]) => ({ e: [x, y, 2.5, 4, 0.3], f: '#FFE14D' })), { p: 'M28 34L36 18L46 30L50 12L54 30L64 18L72 34C62 40 38 40 28 34Z', f: '#5BAA4A', s: INK, w: 3 }] },
  'notes': { cut: 1, ops: [{ p: 'M32 78V28L76 18V68', s: INK, w: 6 }, { p: 'M32 28L76 18', s: INK, w: 10 }, { e: [22, 78, 11, 8, -0.3], f: '#C8102E', s: INK, w: 3 }, { e: [66, 68, 11, 8, -0.3], f: '#C8102E', s: INK, w: 3 }] },
  'camera': { cut: 1, ops: [{ r: [20, 20, 24, 16, 4], f: '#C8102E', s: INK, w: 4 }, { r: [6, 30, 88, 58, 10], f: '#C8102E', s: INK, w: 4 }, { c: [50, 59, 21], f: INK, s: '#FFF4DC', w: 4 }, { c: [50, 59, 9], f: '#5B6B8A' }, { e: [45, 53, 4, 3, 0], f: '#FFFFFF' }, { c: [78, 42, 4], f: '#FFE14D' }] },
  'disco': { cut: 1, ops: [{ p: 'M50 4V16', s: INK, w: 3 }, { c: [50, 55, 38], f: '#C9CCD6', s: INK, w: 4 }, { p: 'M16 42H84M12 56H88M16 70H84M36 21V89M50 17V93M64 21V89', s: '#8A8FA0', w: 2 }, { p: sparkD(38, 40, 10), f: '#FFFFFF' }, { p: sparkD(68, 68, 6), f: '#FFFFFF' }] },
  'cassette': { cut: 1, ops: [{ r: [6, 22, 88, 58, 8], f: '#F7A8C4', s: INK, w: 4 }, { r: [18, 32, 64, 26, 4], f: '#FFFFFF', s: INK, w: 3 }, { c: [34, 45, 7], f: INK }, { c: [66, 45, 7], f: INK }, { r: [28, 62, 44, 14, 3], f: '#E88AAE', s: INK, w: 3 }] },
  'cat': { cut: 1, ops: [{ p: 'M18 40L20 10L38 28C46 25 54 25 62 28L80 10L82 40C90 62 76 86 50 86C24 86 10 62 18 40Z', f: '#FFF4DC', s: INK, w: 4 }, { e: [38, 52, 4, 6, 0], f: INK }, { e: [62, 52, 4, 6, 0], f: INK }, { p: 'M46 62L54 62L50 67Z', f: '#F7A8C4', s: INK, w: 1.5 }, { p: 'M30 64H12M30 70L14 75M70 64H88M70 70L86 75', s: INK, w: 2.5 }, { e: [30, 60, 6, 3, 0], f: '#F7A8C4' }, { e: [70, 60, 6, 3, 0], f: '#F7A8C4' }] },
  'bunny': { cut: 1, ops: [{ e: [36, 24, 9, 22, -0.15], f: '#FFFFFF', s: INK, w: 4 }, { e: [36, 26, 4, 14, -0.15], f: '#F7A8C4' }, { e: [64, 24, 9, 22, 0.15], f: '#FFFFFF', s: INK, w: 4 }, { e: [64, 26, 4, 14, 0.15], f: '#F7A8C4' }, { e: [50, 62, 32, 26, 0], f: '#FFFFFF', s: INK, w: 4 }, { c: [40, 60, 3.5], f: INK }, { c: [60, 60, 3.5], f: INK }, { p: 'M46 68L54 68L50 72Z', f: '#F7A8C4' }, { e: [32, 68, 5, 3, 0], f: '#F7A8C4' }, { e: [68, 68, 5, 3, 0], f: '#F7A8C4' }] },
  'badge': { cut: 1, ops: [{ r: [4, 28, 92, 44, 22], f: '#C8102E', s: '#E8B04B', w: 5 }, { t: '4 POSES', x: 50, y: 51, z: 17, font: 'Bungee', f: '#FFF4DC' }] },
  'love': { cut: 1, ops: [{ t: 'love', x: 50, y: 50, z: 38, font: 'Pacifico', f: '#C8102E' }] },
  'film-roll': { cut: 1, ops: [{ r: [20, 6, 60, 88, 4], f: INK }, ...[0, 1, 2, 3, 4, 5].flatMap(i => [{ r: [24, 11 + i * 14, 6, 6, 1], f: '#FFF4DC' }, { r: [70, 11 + i * 14, 6, 6, 1], f: '#FFF4DC' }]), { r: [34, 12, 32, 34, 2], f: '#F7A8C4' }, { r: [34, 54, 32, 34, 2], f: '#9EC9FF' }] },
  'tape-pink': { ops: [{ r: [0, 34, 100, 32, 2], f: '#F7C6D9' }, { p: 'M12 34L4 66M32 34L24 66M52 34L44 66M72 34L64 66M92 34L84 66', s: '#F29BBD', w: 5 }] },
  'tape-blue': { ops: [{ r: [0, 34, 100, 32, 2], f: '#BFD9F6' }, ...[12, 30, 48, 66, 84].map(x => ({ c: [x, 50, 5], f: '#FFFFFF' }))] },
};
export const STICKER_KEYS = Object.keys(STICKERS);

// ---------- canvas ----------
function opPath(ctx, o) {
  if (o.p) return new Path2D(o.p);
  const p = new Path2D();
  if (o.c) p.arc(o.c[0], o.c[1], o.c[2], 0, Math.PI * 2);
  else if (o.e) p.ellipse(o.e[0], o.e[1], o.e[2], o.e[3], o.e[4] || 0, 0, Math.PI * 2);
  else if (o.r) { const [x, y, w, h, r] = o.r; p.roundRect ? p.roundRect(x, y, w, h, r) : p.rect(x, y, w, h); }
  return p;
}
function drawOps(ctx, ops, cut) {
  ctx.lineJoin = 'round'; ctx.lineCap = 'round';
  for (const o of ops) {
    if (o.t) {
      ctx.font = `400 ${o.z}px "${o.font}"`; ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
      if (cut) { ctx.strokeStyle = '#FFFFFF'; ctx.lineWidth = 12; ctx.strokeText(o.t, o.x, o.y); }
      else { if (o.s) { ctx.strokeStyle = o.s; ctx.lineWidth = o.w || 3; ctx.strokeText(o.t, o.x, o.y); } ctx.fillStyle = o.f; ctx.fillText(o.t, o.x, o.y); }
      continue;
    }
    const p = opPath(ctx, o);
    if (cut) { ctx.strokeStyle = '#FFFFFF'; ctx.lineWidth = (o.s ? o.w || 2 : 0) + 12; ctx.stroke(p); if (o.f) { ctx.fillStyle = '#FFFFFF'; ctx.fill(p); } continue; }
    if (o.f) { ctx.fillStyle = o.f; ctx.fill(p); }
    if (o.s) { ctx.strokeStyle = o.s; ctx.lineWidth = o.w || 2; ctx.stroke(p); }
  }
}
// cx, cy, size in the canvas's current units; rot in radians
export function drawSticker(ctx, key, cx, cy, size, rot = 0) {
  const st = STICKERS[key]; if (!st) return;
  ctx.save(); ctx.translate(cx, cy); ctx.rotate(rot); ctx.scale(size / 100, size / 100); ctx.translate(-50, -50);
  if (st.cut) { ctx.save(); ctx.shadowColor = 'rgba(0,0,0,0.22)'; ctx.shadowBlur = 6; ctx.shadowOffsetY = 2; drawOps(ctx, st.ops, true); ctx.restore(); }
  drawOps(ctx, st.ops, false);
  ctx.restore();
}

// ---------- svg (editor + tray) ----------
const esc = s => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
function opSVG(o, cut) {
  const paint = cut
    ? `fill="${o.f || o.t ? '#FFFFFF' : 'none'}" stroke="#FFFFFF" stroke-width="${(o.s ? o.w || 2 : 0) + 12}"`
    : `fill="${o.f || 'none'}" ${o.s ? `stroke="${o.s}" stroke-width="${o.w || 2}"` : ''}`;
  if (o.t) return cut
    ? `<text x="${o.x}" y="${o.y}" font-family="${o.font}" font-size="${o.z}" text-anchor="middle" dominant-baseline="central" fill="#FFFFFF" stroke="#FFFFFF" stroke-width="12" stroke-linejoin="round">${esc(o.t)}</text>`
    : `<text x="${o.x}" y="${o.y}" font-family="${o.font}" font-size="${o.z}" text-anchor="middle" dominant-baseline="central" fill="${o.f}">${esc(o.t)}</text>`;
  if (o.p) return `<path d="${o.p}" ${paint}/>`;
  if (o.c) return `<circle cx="${o.c[0]}" cy="${o.c[1]}" r="${o.c[2]}" ${paint}/>`;
  if (o.e) return `<ellipse cx="${o.e[0]}" cy="${o.e[1]}" rx="${o.e[2]}" ry="${o.e[3]}" transform="rotate(${((o.e[4] || 0) * 180 / Math.PI).toFixed(1)} ${o.e[0]} ${o.e[1]})" ${paint}/>`;
  if (o.r) return `<rect x="${o.r[0]}" y="${o.r[1]}" width="${o.r[2]}" height="${o.r[3]}" rx="${o.r[4] || 0}" ${paint}/>`;
  return '';
}
export function stickerSVG(key) {
  const st = STICKERS[key]; if (!st) return '';
  const cut = st.cut ? `<g filter="url(#fpShadow)">${st.ops.map(o => opSVG(o, true)).join('')}</g>` : '';
  return `<svg viewBox="-8 -8 116 116" xmlns="http://www.w3.org/2000/svg" stroke-linejoin="round" stroke-linecap="round"><defs><filter id="fpShadow" x="-20%" y="-20%" width="140%" height="140%"><feDropShadow dx="0" dy="2" stdDeviation="2.5" flood-opacity=".22"/></filter></defs>${cut}${st.ops.map(o => opSVG(o, false)).join('')}</svg>`;
}
