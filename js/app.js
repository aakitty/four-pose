import { TEMPLATES, FILTERS, FONTS, STYLES, BORDER_COLORS, BORDER_PATTERNS, defaultLook, layoutFor, renderLook, applyFilter, digicamFlash, downscale, formatDate } from './render.js';

// ---------- icons ----------
const sv = (p, extra = '') => `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" ${extra}>${p}</svg>`;
const I = {
  flash: sv('<path d="M13 2 4 14h7l-1 8 9-12h-7l1-8z"/>'),
  flashOff: sv('<path d="M13 2 9.5 6.7M7 10l-3 4h7l-1 8 4.5-6M16 11h4l-2.7 3.6M3 3l18 18"/>'),
  bulb: sv('<path d="M9 18h6M10 21h4M12 3a6 6 0 0 0-4 10.5c.8.8 1 1.5 1 2.5h6c0-1 .2-1.7 1-2.5A6 6 0 0 0 12 3z"/>'),
  timer: sv('<circle cx="12" cy="13" r="8"/><path d="M12 9v4l2.5 2.5M9 2h6"/>'),
  flip: sv('<path d="M20 11a8 8 0 0 0-14.3-4.9L4 8M4 3v5h5M4 13a8 8 0 0 0 14.3 4.9L20 16M20 21v-5h-5"/>'),
  feed: sv('<rect x="3" y="3" width="7" height="9" rx="1.5"/><rect x="14" y="3" width="7" height="5" rx="1.5"/><rect x="14" y="12" width="7" height="9" rx="1.5"/><rect x="3" y="16" width="7" height="5" rx="1.5"/>'),
  gear: sv('<circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.7 1.7 0 0 0 .3 1.8l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.7 1.7 0 0 0-1.8-.3 1.7 1.7 0 0 0-1 1.5V21a2 2 0 1 1-4 0v-.1a1.7 1.7 0 0 0-1.1-1.5 1.7 1.7 0 0 0-1.8.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.7 1.7 0 0 0 .3-1.8 1.7 1.7 0 0 0-1.5-1H3a2 2 0 1 1 0-4h.1a1.7 1.7 0 0 0 1.5-1.1 1.7 1.7 0 0 0-.3-1.8l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1.7 1.7 0 0 0 1.8.3H9a1.7 1.7 0 0 0 1-1.5V3a2 2 0 1 1 4 0v.1a1.7 1.7 0 0 0 1 1.5 1.7 1.7 0 0 0 1.8-.3l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.7 1.7 0 0 0-.3 1.8V9a1.7 1.7 0 0 0 1.5 1H21a2 2 0 1 1 0 4h-.1a1.7 1.7 0 0 0-1.5 1z"/>'),
  template: sv('<rect x="4" y="3" width="7" height="8" rx="1"/><rect x="13" y="3" width="7" height="8" rx="1"/><rect x="4" y="13" width="7" height="8" rx="1"/><rect x="13" y="13" width="7" height="8" rx="1"/>'),
  filter: sv('<circle cx="9" cy="12" r="6"/><circle cx="15" cy="12" r="6"/>'),
  text: sv('<path d="M5 5h14M12 5v15M9 20h6"/>'),
  border: sv('<rect x="3" y="3" width="18" height="18" rx="2"/><rect x="7" y="7" width="10" height="10" stroke-dasharray="2 2"/>'),
  check: sv('<path d="M5 12.5 10 17 19 7"/>', 'stroke-width="3"'),
  more: sv('<circle cx="5" cy="12" r="1.3" fill="currentColor"/><circle cx="12" cy="12" r="1.3" fill="currentColor"/><circle cx="19" cy="12" r="1.3" fill="currentColor"/>'),
  download: sv('<path d="M12 3v12M7 10l5 5 5-5M5 21h14"/>'),
  insta: sv('<rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor"/>'),
  tiktok: sv('<path d="M14 3v11.5a3.5 3.5 0 1 1-3.5-3.5M14 3c.5 2.5 2.5 4.5 5 4.5"/>'),
  share: sv('<path d="M12 3v13M7 8l5-5 5 5M5 14v5a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-5"/>'),
};

// ---------- utils ----------
const $ = s => document.querySelector(s);
const $$ = s => [...document.querySelectorAll(s)];
const store = {
  get(k, d) { try { const v = localStorage.getItem('fp_' + k); return v == null ? d : JSON.parse(v); } catch { return d; } },
  set(k, v) { try { localStorage.setItem('fp_' + k, JSON.stringify(v)); } catch { } },
};
const clone = o => JSON.parse(JSON.stringify(o));
const sleep = ms => new Promise(r => setTimeout(r, ms));
const isIOS = /iP(hone|ad|od)/.test(navigator.userAgent) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
let toastT;
function toast(msg, ms = 2200) { const t = $('#toast'); t.textContent = msg; t.classList.add('show'); clearTimeout(toastT); toastT = setTimeout(() => t.classList.remove('show'), ms); }

// ---------- state ----------
const RING_PRESETS = [['White', '#FFFFFF'], ['Warm', '#FFD9A8'], ['Pink', '#F7A8C4'], ['Green', '#8FE3A6'], ['Blue', '#9EC9FF'], ['Purple', '#C6A8FF']];
const S = {
  screen: 'camera', facing: 'user', stream: null,
  flash: 'off', timer: 3, layout: 'strip',
  ring: store.get('ring', { on: false, name: 'Pink', color: '#F7A8C4', bri: 100 }),
  shots: [null, null, null, null], small: [null, null, null, null], version: 0,
  capturing: false, retakeIndex: null,
  selecting: false, selected: new Set(),
  look: null, pendingLook: null, tool: null, tplFilter: 'All',
  exportBlob: null, feedFilter: 'All', detail: null,
};

// ---------- theme ----------
const mq = matchMedia('(prefers-color-scheme: dark)');
function applyTheme() {
  const pref = store.get('theme', 'system');
  const t = pref === 'system' ? (mq.matches ? 'dark' : 'light') : pref;
  document.documentElement.dataset.theme = t;
  $$('#themeSeg button').forEach(b => b.classList.toggle('on', b.dataset.theme === pref));
  updateBarColor();
  if (S.screen === 'studio') schedulePreview();
  if (S.screen === 'feed') renderFeed();
}
function updateBarColor() {
  const cam = S.screen === 'camera' && S.ring.on;
  const c = cam ? ringColor() : getComputedStyle(document.documentElement).getPropertyValue('--bg').trim();
  $('#themeColor').setAttribute('content', c);
}
mq.addEventListener?.('change', applyTheme);

// ---------- navigation ----------
let sheetOpen = null;
function show(id, push = true) {
  if (S.screen === id) return;
  $$('.screen').forEach(s => s.classList.toggle('active', s.id === id));
  const prev = S.screen; S.screen = id;
  if (push) history.pushState({ s: id }, '');
  if (id === 'camera') startCamera(); else if (prev === 'camera') stopCamera();
  updateBarColor();
}
window.addEventListener('popstate', e => {
  if (sheetOpen) { closeSheet(true); history.pushState({ s: S.screen }, ''); return; }
  if (S.screen === 'studio' && S.tool) { closeTool(); history.pushState({ s: S.screen }, ''); return; }
  const target = e.state?.s || 'camera';
  if (S.screen === 'review' && target === 'camera' && hasShots()) { history.pushState({ s: 'review' }, ''); confirmDiscard(); return; }
  show(target, false);
});
function openSheet(id) {
  closeSheet(true); sheetOpen = id;
  $('#scrim').hidden = false; $('#' + id).classList.add('open'); $('#' + id).setAttribute('aria-hidden', 'false');
}
function closeSheet(silent) {
  if (!sheetOpen) return;
  $('#' + sheetOpen).classList.remove('open'); $('#' + sheetOpen).setAttribute('aria-hidden', 'true');
  sheetOpen = null; $('#scrim').hidden = true;
}
$('#scrim').addEventListener('click', () => closeSheet());

// ---------- camera ----------
const video = $('#video');
async function startCamera() {
  if (S.stream) return;
  const msg = $('#camMsg');
  if (!navigator.mediaDevices?.getUserMedia) {
    msg.hidden = false; $('#camMsgBody').textContent = 'This browser can’t open the camera here. Open Four Poses in Safari or Chrome from its https link.'; $('#btnAllowCam').hidden = true; return;
  }
  try {
    S.stream = await navigator.mediaDevices.getUserMedia({ audio: false, video: { facingMode: S.facing, width: { ideal: 1920 }, height: { ideal: 1440 } } });
    if (S.screen !== 'camera') { stopCamera(); return; }
    video.srcObject = S.stream; video.classList.toggle('mirror', S.facing === 'user');
    await video.play().catch(() => { });
    msg.hidden = true;
  } catch (err) {
    S.stream = null; msg.hidden = false; $('#btnAllowCam').hidden = false;
    $('#camMsgBody').textContent = err?.name === 'NotAllowedError'
      ? 'Camera access is off. Allow it for this site in your browser settings, then tap the button.'
      : 'We couldn’t start the camera. Close other apps using it and try again.';
  }
}
function stopCamera() { if (S.stream) { S.stream.getTracks().forEach(t => t.stop()); S.stream = null; video.srcObject = null; } }
$('#btnAllowCam').addEventListener('click', () => { stopCamera(); startCamera(); });

function grabFrame() {
  const L = layoutFor({ layout: S.layout, border: { thickness: 'M' } });
  const outW = S.layout === 'grid' ? 920 : 1040, outH = Math.round(outW / L.photoAspect);
  const vw = video.videoWidth, vh = video.videoHeight;
  const c = document.createElement('canvas'); c.width = outW; c.height = outH;
  const ctx = c.getContext('2d');
  if (!vw || !vh) { ctx.fillStyle = '#999'; ctx.fillRect(0, 0, outW, outH); return c; }
  const target = outW / outH; let sw = vw, sh = vh;
  if (vw / vh > target) sw = vh * target; else sh = vw / target;
  const sx = (vw - sw) / 2, sy = (vh - sh) / 2;
  if (S.facing === 'user') { ctx.translate(outW, 0); ctx.scale(-1, 1); }
  ctx.drawImage(video, sx, sy, sw, sh, 0, 0, outW, outH);
  return c;
}
async function setTorch(on) {
  const track = S.stream?.getVideoTracks?.()[0]; if (!track) return;
  try { if (track.getCapabilities?.().torch) await track.applyConstraints({ advanced: [{ torch: on }] }); } catch { }
}
async function shoot() {
  if (S.capturing) return;
  if (!S.stream) { await startCamera(); if (!S.stream) return; }
  S.capturing = true; $('#vf').classList.add('busy'); $('#btnShutter').classList.add('busy');
  const indices = S.retakeIndex != null ? [S.retakeIndex] : [0, 1, 2, 3];
  if (S.retakeIndex == null) { S.shots = [null, null, null, null]; S.small = [null, null, null, null]; renderProgress(); }
  const cd = $('#countdown');
  try {
    for (const i of indices) {
      $('#shotPill').textContent = `Shot ${i + 1} of 4`; renderProgress(i);
      for (let n = S.timer; n > 0; n--) { cd.textContent = n; cd.classList.remove('pop'); void cd.offsetWidth; cd.classList.add('pop'); await sleep(1000); if (S.screen !== 'camera') throw new Error('left'); }
      cd.textContent = '';
      const fl = $('#flash'); const useFlash = S.flash !== 'off';
      if (useFlash) { if (S.facing === 'environment') await setTorch(true); fl.classList.toggle('digi', S.flash === 'digicam'); fl.classList.add('on'); await sleep(S.facing === 'user' ? 180 : 250); }
      let frame = grabFrame();
      if (useFlash) { fl.classList.remove('on'); if (S.facing === 'environment') setTorch(false); }
      else { fl.style.opacity = .5; setTimeout(() => fl.style.opacity = '', 90); }
      if (S.flash === 'digicam') frame = digicamFlash(frame);
      S.shots[i] = frame; S.small[i] = downscale(frame, 520); S.version++;
      renderProgress();
      await sleep(450);
    }
    $('#shotPill').textContent = 'Shot 1 of 4';
    S.retakeIndex = null;
    renderReview(); show('review');
  } catch { cd.textContent = ''; }
  finally { S.capturing = false; $('#vf').classList.remove('busy'); $('#btnShutter').classList.remove('busy'); }
}
function renderProgress(next) {
  const p = $('#progress'); p.classList.toggle('grid', S.layout === 'grid');
  p.innerHTML = S.shots.map((s, i) => `<span class="${s ? 'done' : ''} ${next === i ? 'next' : ''}" ${s ? `style="background-image:url(${thumbURL(i)})"` : ''}></span>`).join('');
}
const thumbCache = new Map();
function thumbURL(i) { const k = i + ':' + S.version; if (!thumbCache.has(k)) thumbCache.set(k, downscale(S.shots[i], 90).toDataURL('image/jpeg', .7)); return thumbCache.get(k); }
const hasShots = () => S.shots.some(Boolean);

// camera controls
function renderCamControls() {
  const f = $('#btnFlash');
  f.innerHTML = S.flash === 'off' ? I.flashOff : S.flash === 'on' ? I.flash : `${I.flash}<span>DIGI</span>`;
  f.classList.toggle('on', S.flash !== 'off'); f.setAttribute('aria-label', `Flash: ${S.flash === 'digicam' ? 'digicam' : S.flash}`);
  const r = $('#btnRing'); r.innerHTML = I.bulb; r.classList.toggle('on', S.ring.on); r.setAttribute('aria-label', `Ring light ${S.ring.on ? 'on' : 'off'}`);
  $('#btnTimer').innerHTML = `${I.timer}<span>${S.timer}s</span>`;
  $$('.seg [data-layout]').forEach(b => b.classList.toggle('on', b.dataset.layout === S.layout));
  $('#vf').classList.toggle('grid', S.layout === 'grid');
  const cam = $('#camera'); cam.classList.toggle('ring', S.ring.on); cam.style.setProperty('--ring', ringColor());
  if (S.ring.on) { cam.style.setProperty('--text', '#1A1A1A'); cam.style.setProperty('--muted', '#3A2A26'); cam.style.setProperty('--strong', '#1A1A1A'); cam.style.setProperty('--surface', 'rgba(255,255,255,.55)'); cam.style.setProperty('--line', 'rgba(0,0,0,.18)'); }
  else ['--text', '--muted', '--strong', '--surface', '--line'].forEach(v => cam.style.removeProperty(v));
  const chip = $('#ringChip'); chip.hidden = !S.ring.on; chip.textContent = `Ring light · ${S.ring.name}`;
  renderProgress(); updateBarColor();
}
function ringColor() {
  const k = S.ring.bri / 100; const n = parseInt(S.ring.color.slice(1), 16);
  return '#' + [n >> 16 & 255, n >> 8 & 255, n & 255].map(v => Math.round(v * k).toString(16).padStart(2, '0')).join('');
}
$('#btnFlash').addEventListener('click', () => { S.flash = { off: 'on', on: 'digicam', digicam: 'off' }[S.flash]; renderCamControls(); toast({ off: 'Flash off', on: 'Flash on', digicam: '2000s digicam flash' }[S.flash], 1300); });
$('#btnTimer').addEventListener('click', () => { S.timer = S.timer === 3 ? 5 : 3; renderCamControls(); toast(`${S.timer} seconds between poses`, 1300); });
$$('.seg [data-layout]').forEach(b => b.addEventListener('click', () => { if (S.capturing) return; S.layout = b.dataset.layout; S.shots = [null, null, null, null]; renderCamControls(); }));
$('#btnFlip').addEventListener('click', async () => { if (S.capturing) return; S.facing = S.facing === 'user' ? 'environment' : 'user'; stopCamera(); await startCamera(); });
$('#btnShutter').addEventListener('click', shoot);
$('#btnFeed').addEventListener('click', () => { if (!S.capturing) { renderFeed(); show('feed'); } });
$('#btnSettings').addEventListener('click', () => openSheet('settingsSheet'));
$('#btnRing').addEventListener('click', () => { openRingSheet(); });
$('#ringChip').addEventListener('click', () => openRingSheet());

// ring sheet
function openRingSheet() {
  $('#ringOn').checked = S.ring.on;
  $('#ringPresets').innerHTML = RING_PRESETS.map(([n, c]) => `<button class="preset ${S.ring.name === n ? 'on' : ''}" data-n="${n}" data-c="${c}"><i style="background:${c}"></i>${n}</button>`).join('');
  $('#ringSwatch').style.background = S.ring.color; $('#ringBri').value = S.ring.bri; $('#ringBriVal').textContent = S.ring.bri + '%';
  openSheet('ringSheet');
}
function saveRing() { store.set('ring', S.ring); renderCamControls(); }
$('#ringPresets').addEventListener('click', e => { const b = e.target.closest('.preset'); if (!b) return; S.ring.name = b.dataset.n; S.ring.color = b.dataset.c; S.ring.on = true; $('#ringOn').checked = true; $$('.preset').forEach(p => p.classList.toggle('on', p === b)); $('#ringSwatch').style.background = S.ring.color; saveRing(); });
$('#ringHue').addEventListener('input', e => { const h = +e.target.value; S.ring.color = hslHex(h, 88, 74); S.ring.name = 'Custom'; S.ring.on = true; $('#ringOn').checked = true; $$('.preset').forEach(p => p.classList.remove('on')); $('#ringSwatch').style.background = S.ring.color; saveRing(); });
$('#ringBri').addEventListener('input', e => { S.ring.bri = +e.target.value; $('#ringBriVal').textContent = S.ring.bri + '%'; saveRing(); });
$('#ringOn').addEventListener('change', e => { S.ring.on = e.target.checked; saveRing(); });
$('#ringDone').addEventListener('click', () => closeSheet());
function hslHex(h, s, l) { s /= 100; l /= 100; const k = n => (n + h / 30) % 12, a = s * Math.min(l, 1 - l); const f = n => l - a * Math.max(-1, Math.min(k(n) - 3, Math.min(9 - k(n), 1))); return '#' + [f(0), f(8), f(4)].map(x => Math.round(x * 255).toString(16).padStart(2, '0')).join(''); }

// ---------- review ----------
const shotURL = new Map();
function cellURL(i) { const k = i + ':' + S.version; if (!shotURL.has(k)) shotURL.set(k, S.small[i].toDataURL('image/jpeg', .85)); return shotURL.get(k); }
function renderReview() {
  const g = $('#revGrid'); g.classList.toggle('square', S.layout === 'grid'); g.classList.toggle('selecting', S.selecting);
  g.innerHTML = S.shots.map((s, i) => `<div class="rev-cell ${S.selected.has(i) ? 'sel' : ''}" data-i="${i}" style="background-image:url(${s ? cellURL(i) : ''})" role="button" aria-label="Photo ${i + 1}">
    <span class="num">${i + 1}</span><span class="tick">${S.selected.has(i) ? I.check : ''}</span><button class="retake" data-retake="${i}">Retake</button></div>`).join('');
  $('#revTitle').textContent = S.selecting ? `${S.selected.size} selected` : 'Review';
  $('#revSelect').textContent = S.selecting ? 'Cancel' : 'Select';
  $('#revBack').style.visibility = S.selecting ? 'hidden' : '';
  $('#revHint').textContent = S.selecting ? 'Pick the photos you want to keep on their own' : 'Tap Retake to redo just that shot · Select to save single photos';
  $('#revNote').hidden = !S.selecting;
  const d = $('#revDone'); d.textContent = S.selecting ? `Save ${S.selected.size || ''} photo${S.selected.size === 1 ? '' : 's'}`.replace('  ', ' ') : 'Done'; d.disabled = S.selecting && !S.selected.size;
}
$('#revGrid').addEventListener('click', e => {
  const rt = e.target.closest('[data-retake]');
  if (rt && !S.selecting) { S.retakeIndex = +rt.dataset.retake; show('camera'); toast(`Retaking shot ${S.retakeIndex + 1}`, 1500); return; }
  const c = e.target.closest('.rev-cell'); if (!c) return;
  const i = +c.dataset.i;
  if (!S.selecting) { S.selecting = true; S.selected = new Set([i]); }
  else S.selected.has(i) ? S.selected.delete(i) : S.selected.add(i);
  renderReview();
});
$('#revSelect').addEventListener('click', () => { S.selecting = !S.selecting; S.selected = new Set(); renderReview(); });
$('#revBack').addEventListener('click', () => confirmDiscard());
function confirmDiscard() {
  $('#dialogText').textContent = 'Discard these four photos?'; $('#dialog').hidden = false;
  $('#dialogYes').onclick = () => { $('#dialog').hidden = true; S.shots = [null, null, null, null]; S.small = [null, null, null, null]; S.selecting = false; show('camera'); renderProgress(); };
  $('#dialogNo').onclick = () => { $('#dialog').hidden = true; };
}
$('#revDone').addEventListener('click', () => {
  if (S.selecting) {
    const files = [...S.selected].sort().map(i => dataURLFile(S.shots[i].toDataURL('image/jpeg', .93), `four-poses-photo-${i + 1}.jpg`));
    saveFiles(files, `${files.length} photo${files.length > 1 ? 's' : ''} saved`);
    S.selecting = false; S.selected = new Set(); renderReview(); return;
  }
  openStudio();
});

// ---------- saving ----------
function dataURLFile(url, name) { const [h, b] = url.split(','); const mime = h.match(/:(.*?);/)[1]; const bin = atob(b); const u = new Uint8Array(bin.length); for (let i = 0; i < bin.length; i++) u[i] = bin.charCodeAt(i); return new File([u], name, { type: mime }); }
function download(file) { const a = document.createElement('a'); a.href = URL.createObjectURL(file); a.download = file.name; document.body.appendChild(a); a.click(); setTimeout(() => { URL.revokeObjectURL(a.href); a.remove(); }, 4000); }
async function saveFiles(files, okMsg, preferShare = isIOS) {
  if (preferShare && navigator.canShare?.({ files })) {
    try { await navigator.share({ files }); toast(okMsg); return true; } catch (e) { if (e.name === 'AbortError') return false; }
  }
  files.forEach(download); toast(okMsg); return true;
}

// ---------- studio ----------
const preview = $('#preview');
const fcache = new Map();
function filtered(i, full = false) {
  const look = S.look; const k = `${i}|${S.version}|${look.filter}|${look.intensity}|${full ? 'F' : 'P'}`;
  if (!fcache.has(k)) { if (fcache.size > 40) fcache.clear(); fcache.set(k, applyFilter(full ? S.shots[i] : S.small[i], look.filter, look.intensity, i + 1)); }
  return fcache.get(k);
}
function openStudio() {
  const last = store.get('last', null);
  S.look = S.pendingLook ? clone(S.pendingLook) : (last ? { ...defaultLook(last.template), ...last } : defaultLook('booth-red'));
  S.look.layout = S.layout;
  if (!S.look.caption && S.look.caption !== '') S.look.caption = 'four poses';
  S.pendingLook = null;
  renderToolbar(); closeTool(); show('studio'); schedulePreview();
}
let raf = 0;
function schedulePreview() { cancelAnimationFrame(raf); raf = requestAnimationFrame(drawPreview); }
function drawPreview() {
  if (!S.look) return;
  const shots = [0, 1, 2, 3].map(i => S.small[i] ? filtered(i) : null);
  const area = $('#previewArea'); const L = layoutFor(S.look);
  const maxH = area.clientHeight - 30, maxW = area.clientWidth - 32;
  const cssScale = Math.min(maxH / L.H, maxW / L.W);
  const dpr = Math.min(2, devicePixelRatio || 1);
  renderLook(preview, S.look, shots, { scale: cssScale * dpr * 1.0 * (S.look.layout === 'grid' ? 1 : 1) });
  preview.style.width = Math.round(L.W * cssScale) + 'px'; preview.style.height = Math.round(L.H * cssScale) + 'px';
  $('#liveLabel').textContent = S.tool ? `Live preview · ${liveText()}` : '';
}
function liveText() { const l = S.look; return { template: TEMPLATES[l.template].name, filter: FILTERS[l.filter].label, text: FONTS[l.font].label + ' font', border: l.border.pattern !== 'none' ? BORDER_PATTERNS[l.border.pattern] : (l.border.color ? 'Custom colour' : 'Template border') }[S.tool]; }
new ResizeObserver(() => S.screen === 'studio' && schedulePreview()).observe($('#previewArea'));

const TOOLS = [['template', 'Template', I.template], ['filter', 'Filter', I.filter], ['text', 'Text', I.text], ['border', 'Border', I.border]];
function renderToolbar() { $('#toolbar').innerHTML = TOOLS.map(([id, label, ic]) => `<button class="tool ${S.tool === id ? 'on' : ''}" data-tool="${id}">${ic}<span>${label}</span></button>`).join(''); }
$('#toolbar').addEventListener('click', e => { const b = e.target.closest('[data-tool]'); if (!b) return; S.tool === b.dataset.tool ? closeTool() : openTool(b.dataset.tool); });
function openTool(t) { S.tool = t; $('#studio').classList.add('tool-open'); $('#toolSheet').setAttribute('aria-hidden', 'false'); renderToolbar(); renderTool(); setTimeout(schedulePreview, 320); }
function closeTool() { S.tool = null; $('#studio').classList.remove('tool-open'); $('#toolSheet').setAttribute('aria-hidden', 'true'); renderToolbar(); setTimeout(schedulePreview, 320); }
$('#toolDone').addEventListener('click', closeTool);

function miniLook(over) { return { ...clone(S.look), ...over }; }
function thumbCanvas(look, h, shots = null) {
  const c = document.createElement('canvas'); const L = layoutFor(look); const dpr = Math.min(2, devicePixelRatio || 1);
  renderLook(c, look, shots, { scale: (h / L.H) * dpr, empty: !shots });
  c.style.height = h + 'px'; return c;
}
function renderTool() {
  const body = $('#toolBody'); const l = S.look;
  $('#toolTitle').textContent = { template: 'Templates', filter: 'Filters', text: 'Text', border: 'Border' }[S.tool];
  if (S.tool === 'template') {
    body.innerHTML = `<div class="chips">${['All', ...STYLES].map(s => `<button class="chip ${S.tplFilter === s ? 'on' : ''}" data-st="${s}">${s}</button>`).join('')}</div><div class="tpl-grid" id="tplGrid"></div>`;
    const grid = body.querySelector('#tplGrid');
    Object.entries(TEMPLATES).filter(([, t]) => S.tplFilter === 'All' || t.style === S.tplFilter).forEach(([id, t]) => {
      const b = document.createElement('button'); b.className = 'tpl' + (l.template === id ? ' on' : ''); b.dataset.id = id;
      const smallShots = S.small.some(Boolean) ? S.small.map(s => s && downscale(s, 160)) : null;
      const cv = thumbCanvas({ ...defaultLook(id), layout: l.layout, caption: l.caption }, 120, smallShots); cv.style.height = '';
      b.append(cv); b.insertAdjacentHTML('beforeend', `<span>${t.name}</span>`); grid.append(b);
    });
  } else if (S.tool === 'filter') {
    body.innerHTML = `<div class="flt-grid" id="fltGrid"></div><div class="row-between"><p class="label">Intensity</p><p class="label muted" id="intVal">${l.intensity}%</p></div><input type="range" min="0" max="100" value="${l.intensity}" id="intensity" aria-label="Filter intensity">`;
    const src = S.small.find(Boolean); const base = src ? downscale(src, 200) : null;
    Object.entries(FILTERS).forEach(([id, f]) => {
      const b = document.createElement('button'); b.className = 'flt' + (l.filter === id ? ' on' : ''); b.dataset.id = id;
      const c = base ? applyFilter(base, id, 100, 2) : document.createElement('canvas'); b.append(c); b.insertAdjacentHTML('beforeend', `<span>${f.label}</span>`); body.querySelector('#fltGrid').append(b);
    });
  } else if (S.tool === 'text') {
    const colors = ['auto', '#1A1A1A', '#FFF4DC', '#C8102E', '#5B061A', '#E8B04B', '#F7A8C4'];
    body.innerHTML = `<input class="input" id="capInput" maxlength="28" value="${(l.caption || '').replace(/"/g, '&quot;')}" placeholder="Add a caption" aria-label="Caption">
      <p class="label">Font</p><div class="font-row">${Object.entries(FONTS).map(([id, f]) => `<button class="font-opt ${l.font === id ? 'on' : ''}" data-font="${id}"><b style="font-family:'${f.family}';font-weight:${f.weight}">Aa</b>${f.label}</button>`).join('')}</div>
      <p class="label">Colour</p><div class="swatches">${colors.map(c => c === 'auto' ? `<button class="sw auto ${!l.textColor ? 'on' : ''}" data-tc="">AUTO</button>` : `<button class="sw ${l.textColor === c ? 'on' : ''}" data-tc="${c}" style="background:${c}" aria-label="${c}"></button>`).join('')}</div>
      <div class="row-between" style="margin-top:16px"><div><p class="label" style="margin:0">Date stamp</p><p class="sub">Adds today's date like an old film camera</p></div><label class="switch"><input type="checkbox" id="dateOn" ${l.dateStamp ? 'checked' : ''}><span></span></label></div>`;
  } else if (S.tool === 'border') {
    body.innerHTML = `<p class="label" style="margin-top:4px">Colour</p><div class="swatches"><button class="sw auto ${!l.border.color ? 'on' : ''}" data-bc="">AUTO</button>${BORDER_COLORS.map(c => `<button class="sw ${l.border.color === c ? 'on' : ''}" data-bc="${c}" style="background:${c}" aria-label="${c}"></button>`).join('')}</div>
      <p class="label">Pattern</p><div class="pat-row" id="patRow"></div>
      <p class="label">Thickness</p><div class="seg full mini">${['S', 'M', 'L'].map(t => `<button class="${l.border.thickness === t ? 'on' : ''}" data-th="${t}">${{ S: 'Thin', M: 'Medium', L: 'Thick' }[t]}</button>`).join('')}</div>`;
    Object.entries(BORDER_PATTERNS).forEach(([id, label]) => {
      const b = document.createElement('button'); b.className = 'pat' + (l.border.pattern === id ? ' on' : ''); b.dataset.pat = id;
      const c = document.createElement('canvas'); c.width = c.height = 120;
      const tmp = document.createElement('canvas'); renderLook(tmp, { ...miniLook({}), layout: 'grid', border: { ...l.border, pattern: id, thickness: 'L' }, caption: '', dateStamp: false }, null, { scale: 0.4, empty: true });
      c.getContext('2d').drawImage(tmp, 0, 0, 60, 60, 0, 0, 120, 120);
      b.append(c); b.insertAdjacentHTML('beforeend', `<span>${label}</span>`); body.querySelector('#patRow').append(b);
    });
  }
}
const toolBody = $('#toolBody');
toolBody.addEventListener('click', e => {
  const l = S.look; let t;
  if ((t = e.target.closest('[data-st]'))) { S.tplFilter = t.dataset.st; renderTool(); return; }
  if ((t = e.target.closest('.tpl'))) { const d = defaultLook(t.dataset.id); Object.assign(l, { template: t.dataset.id, filter: d.filter, font: d.font, textColor: null, border: { ...d.border, thickness: l.border.thickness } }); }
  else if ((t = e.target.closest('.flt'))) l.filter = t.dataset.id;
  else if ((t = e.target.closest('[data-font]'))) l.font = t.dataset.font;
  else if ((t = e.target.closest('[data-tc]'))) l.textColor = t.dataset.tc || null;
  else if ((t = e.target.closest('[data-bc]'))) l.border.color = t.dataset.bc || null;
  else if ((t = e.target.closest('[data-pat]'))) l.border.pattern = t.dataset.pat;
  else if ((t = e.target.closest('[data-th]'))) l.border.thickness = t.dataset.th;
  else return;
  renderTool(); schedulePreview();
});
toolBody.addEventListener('input', e => {
  const l = S.look;
  if (e.target.id === 'intensity') { l.intensity = +e.target.value; $('#intVal').textContent = l.intensity + '%'; }
  else if (e.target.id === 'capInput') l.caption = e.target.value;
  else if (e.target.id === 'dateOn') l.dateStamp = e.target.checked;
  else return;
  schedulePreview();
});
toolBody.addEventListener('change', e => { if (e.target.id === 'dateOn') { S.look.dateStamp = e.target.checked; schedulePreview(); } });
$('#stBack').addEventListener('click', () => history.back());

$('#stSave').addEventListener('click', () => {
  const shots = [0, 1, 2, 3].map(i => S.shots[i] ? filtered(i, true) : null);
  const c = document.createElement('canvas'); renderLook(c, S.look, shots, { scale: 1.5 });
  const file = dataURLFile(c.toDataURL('image/jpeg', .92), `four-poses-${Date.now()}.jpg`);
  S.exportBlob = file;
  const { caption, ...rest } = S.look; store.set('last', { ...rest, caption });
  closeTool();
  $('#savedTitle').textContent = 'Your strip is ready';
  $('#savedSub').textContent = isIOS ? 'Tap Save, then "Save Image" to put it in Photos.' : 'Save it to your gallery or share it straight to your story.';
  $('#shareRow').innerHTML = [['save', 'Save', I.download], ['insta', 'Instagram', I.insta], ['tiktok', 'TikTok', I.tiktok], ['more', 'More', I.share]].map(([id, n, ic]) => `<button class="share-btn" data-share="${id}"><i>${ic}</i>${n}</button>`).join('');
  openSheet('savedSheet');
});
$('#shareRow').addEventListener('click', async e => {
  const b = e.target.closest('[data-share]'); if (!b || !S.exportBlob) return;
  const id = b.dataset.share; const files = [S.exportBlob];
  if (id === 'save') { await saveFiles(files, isIOS ? 'Ready to save' : 'Saved to your gallery'); $('#savedTitle').textContent = 'Saved'; return; }
  if (navigator.canShare?.({ files })) { try { await navigator.share({ files, title: 'Four Poses' }); return; } catch (err) { if (err.name === 'AbortError') return; } }
  download(S.exportBlob); toast(id === 'more' ? 'Saved. Share it from your gallery.' : `Saved. Open ${id === 'insta' ? 'Instagram' : 'TikTok'} and add it from your gallery.`, 3200);
});
$('#btnShootAgain').addEventListener('click', () => { closeSheet(); S.shots = [null, null, null, null]; S.small = [null, null, null, null]; S.version++; show('camera'); renderProgress(); });
$('#btnPostLook').addEventListener('click', () => openPost());

// ---------- post a look ----------
function openPost() {
  closeSheet(true);
  $('#postNick').value = store.get('nick', '');
  $('#postKeepText').checked = true; drawPostPreview(); openSheet('postSheet');
}
function postLook() { const l = clone(S.look); if (!$('#postKeepText').checked) l.caption = ''; return l; }
function drawPostPreview() { const c = $('#postCanvas'); const l = postLook(); const L = layoutFor(l); renderLook(c, l, null, { scale: (110 / L.W) * 2, empty: true }); c.style.width = '110px'; }
$('#postKeepText').addEventListener('change', drawPostPreview);
$('#postCancel').addEventListener('click', () => closeSheet());
$('#postGo').addEventListener('click', () => {
  let nick = $('#postNick').value.trim().replace(/\s+/g, '');
  if (!nick) { toast('Pick a nickname first'); $('#postNick').focus(); return; }
  if (!nick.startsWith('@')) nick = '@' + nick;
  if (/(fuck|shit|bitch|sex|porn|nazi)/i.test(nick + ' ' + $('#postNick').value)) { toast('Please choose a kinder nickname'); return; }
  store.set('nick', nick.slice(1));
  const posts = store.get('posts', []); posts.unshift({ id: 'u' + Date.now(), nick, look: postLook(), ts: Date.now(), mine: true }); store.set('posts', posts.slice(0, 60));
  closeSheet(); toast('Posted! Your look is on the feed'); S.feedFilter = 'All'; renderFeed(); show('feed');
});

// ---------- feed ----------
const SEED = [
  ['@mira.snaps', 'y2k-hearts', { caption: 'besties 4ever' }],
  ['@kawaii_kid', 'kawaii-pop', { caption: 'sleepover!!', layout: 'grid' }],
  ['@filmroll', 'film-35', { caption: 'night out' }],
  ['@booth.babe', 'booth-red', { caption: 'four poses', border: { color: '#C8102E', pattern: 'cherry', thickness: 'M' } }],
  ['@digicam_ria', 'y2k-chrome', { caption: 'y2k forever' }],
  ['@retro.rohan', 'minimal-mono', { caption: 'sunday', layout: 'grid' }],
  ['@noir.nights', 'film-noir', { caption: 'midnight' }],
  ['@pastelpanda', 'pastel-doodle', { caption: 'brunch club' }],
  ['@cheetah.club', 'booth-red', { caption: 'wild ones', border: { color: '#E8B04B', pattern: 'cheetah', thickness: 'M' }, font: 'handwritten', textColor: '#1A1A1A' }],
  ['@polka.pop', 'kawaii-pop', { caption: 'cherry on top', border: { color: '#C8102E', pattern: 'polka', thickness: 'L' }, font: 'classic', textColor: '#FFF4DC' }],
  ['@seoul.strips', 'y2k-hearts', { caption: 'concert night', layout: 'grid', font: 'pixel' }],
  ['@goldenhour', 'minimal-mono', { caption: 'golden hour', border: { color: '#E8B04B', pattern: 'solid', thickness: 'L' }, font: 'typewriter', filter: 'sepia' }],
].map(([nick, tpl, over], i) => ({ id: 's' + i, nick, look: { ...defaultLook(tpl), ...over, border: { ...defaultLook(tpl).border, ...(over.border || {}) } } }));
const styleOf = look => TEMPLATES[look.template].style;
function allLooks() {
  const hidden = store.get('hidden', []); const reported = store.get('reported', []);
  return [...store.get('posts', []), ...SEED].filter(p => !hidden.includes(p.nick) && !reported.includes(p.id));
}
function renderFeed() {
  $('#feedChips').innerHTML = ['All', ...STYLES].map(s => `<button class="chip ${S.feedFilter === s ? 'on' : ''}" data-f="${s}">${s}</button>`).join('');
  const sc = $('#feedScroll'); sc.innerHTML = '';
  // templates rail
  const head = document.createElement('div'); head.className = 'feed-h'; head.innerHTML = '<h3>New templates</h3><span>Tap to try one</span>'; sc.append(head);
  const rail = document.createElement('div'); rail.className = 'tpl-rail';
  Object.entries(TEMPLATES).filter(([, t]) => S.feedFilter === 'All' || t.style === S.feedFilter).forEach(([id, t], i) => {
    const b = document.createElement('button'); b.className = 'rail-card';
    const art = document.createElement('div'); art.className = 'art'; art.append(thumbCanvas({ ...defaultLook(id), caption: t.name.toLowerCase() }, 148)); if (i < 3) art.insertAdjacentHTML('beforeend', '<span class="new">NEW</span>');
    b.append(art); b.insertAdjacentHTML('beforeend', `<b>${t.name}</b><small>${t.style} · Four Poses</small>`);
    b.addEventListener('click', () => openLook({ id: 't-' + id, nick: '@fourposes', look: { ...defaultLook(id), caption: t.name.toLowerCase() }, official: true }));
    rail.append(b);
  });
  sc.append(rail);
  const h2 = document.createElement('div'); h2.className = 'feed-h'; h2.innerHTML = '<h3>From the community</h3><span>Designs only, never photos</span>'; sc.append(h2);
  const grid = document.createElement('div'); grid.className = 'look-grid';
  const looks = allLooks().filter(p => S.feedFilter === 'All' || styleOf(p.look) === S.feedFilter);
  if (!looks.length) grid.innerHTML = '<p class="empty" style="grid-column:1/-1">No looks in this style yet. Make one and post it!</p>';
  looks.forEach((p, i) => {
    if (i > 0 && i % 4 === 0) grid.insertAdjacentHTML('beforeend', adCard(i / 4));
    const card = document.createElement('div'); card.className = 'look-card';
    const art = document.createElement('button'); art.className = 'art'; art.setAttribute('aria-label', `Look by ${p.nick}`); art.append(thumbCanvas(p.look, 206));
    const rm = document.createElement('button'); rm.className = 'remix'; rm.textContent = 'Remix'; rm.addEventListener('click', ev => { ev.stopPropagation(); remix(p); });
    art.append(rm); art.addEventListener('click', () => openLook(p));
    card.append(art); card.insertAdjacentHTML('beforeend', `<span class="nick">${escapeHTML(p.nick)}${p.mine ? ' · you' : ''}</span><span class="meta">${TEMPLATES[p.look.template].name} · ${p.look.layout === 'grid' ? '2×2' : 'Strip'}</span>`);
    grid.append(card);
  });
  if (looks.length >= 2 && looks.length < 5) grid.insertAdjacentHTML('beforeend', adCard(1));
  sc.append(grid);
}
function adCard(n) { return `<div class="ad" role="complementary" aria-label="Advertisement space"><div class="ad-art">AD</div><div><span class="ad-tag">Sponsored · Ad space ${n}</span><p><b>Your brand here</b></p><p class="ad-size">Native ad slot · fits a 320 × 100 banner. Ads keep Four Poses free.</p></div></div>`; }
function escapeHTML(s) { return s.replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c])); }
$('#feedChips').addEventListener('click', e => { const b = e.target.closest('[data-f]'); if (!b) return; S.feedFilter = b.dataset.f; renderFeed(); });
$('#feedBack').addEventListener('click', () => history.length > 1 ? history.back() : show('camera'));

// ---------- look detail ----------
function openLook(p) {
  S.detail = p; const l = p.look; const L = layoutFor(l);
  show('look');
  requestAnimationFrame(() => {
    const box = $('.look-preview'); const h = box.clientHeight - 32, w = box.clientWidth - 32; const k = Math.min(h / L.H, w / L.W); const dpr = Math.min(2, devicePixelRatio || 1);
    const c = $('#lookCanvas'); renderLook(c, l, null, { scale: k * dpr, empty: true }); c.style.width = Math.round(L.W * k) + 'px'; c.style.height = Math.round(L.H * k) + 'px';
  });
  $('#lookBy').textContent = `by ${p.nick}`; $('#lookStyle').textContent = styleOf(l);
  const border = l.border.pattern !== 'none' ? BORDER_PATTERNS[l.border.pattern] : (l.border.color ? 'Solid colour' : 'Template');
  $('#lookConfig').innerHTML = [['Template', TEMPLATES[l.template].name], ['Layout', l.layout === 'grid' ? '2×2 grid' : '4-shot strip'], ['Filter', FILTERS[l.filter].label], ['Font', FONTS[l.font].label], ['Border', border], ['Caption', l.caption || '—']].map(([k, v]) => `<div><dt>${k}</dt><dd>${escapeHTML(String(v))}</dd></div>`).join('');
  $('#lookMore').innerHTML = I.more; $('#lookMore').style.visibility = p.official ? 'hidden' : '';
}
function remix(p) {
  S.pendingLook = clone(p.look); S.layout = p.look.layout; S.shots = [null, null, null, null]; S.small = [null, null, null, null];
  renderCamControls(); show('camera'); toast(`Look loaded: ${TEMPLATES[p.look.template].name}. Strike four poses!`, 2600);
}
$('#lookRemix').addEventListener('click', () => remix(S.detail));
$('#lookBack').addEventListener('click', () => history.back());
$('#lookMore').addEventListener('click', () => openSheet('menuSheet'));
$('#menuCancel').addEventListener('click', () => closeSheet());
$('#menuReport').addEventListener('click', () => { const r = store.get('reported', []); r.push(S.detail.id); store.set('reported', r); closeSheet(); toast('Thanks. We’ll review it, and it’s hidden for you.'); renderFeed(); show('feed'); });
$('#menuHide').addEventListener('click', () => { const h = store.get('hidden', []); h.push(S.detail.nick); store.set('hidden', h); closeSheet(); toast(`Looks from ${S.detail.nick} are hidden`); renderFeed(); show('feed'); });

// ---------- settings ----------
$('#themeSeg').addEventListener('click', e => { const b = e.target.closest('[data-theme]'); if (!b) return; store.set('theme', b.dataset.theme); applyTheme(); });
$('#settingsDone').addEventListener('click', () => closeSheet());
$('#btnResetFeed').addEventListener('click', () => { store.set('posts', []); store.set('hidden', []); store.set('reported', []); toast('Cleared'); });
let deferredInstall = null;
window.addEventListener('beforeinstallprompt', e => { e.preventDefault(); deferredInstall = e; $('#btnInstall').hidden = false; });
$('#btnInstall').addEventListener('click', async () => { if (!deferredInstall) return; deferredInstall.prompt(); await deferredInstall.userChoice; deferredInstall = null; $('#btnInstall').hidden = true; });

// ---------- boot ----------
$('#btnSettings').innerHTML = I.gear; $('#btnFeed').innerHTML = I.feed; $('#btnFlip').innerHTML = I.flip;
applyTheme(); renderCamControls();
history.replaceState({ s: 'camera' }, '');
document.addEventListener('visibilitychange', () => { if (document.hidden) stopCamera(); else if (S.screen === 'camera') startCamera(); });
Promise.all(['Shrikhand', 'Special Elite', 'Caveat', 'VT323', 'Inter', 'Bungee'].map(f => document.fonts.load(`${f === 'Caveat' || f === 'Inter' ? 700 : 400} 40px "${f}"`).catch(() => { }))).then(() => { if (S.screen === 'studio') schedulePreview(); if (S.screen === 'feed') renderFeed(); });
startCamera();
if ('serviceWorker' in navigator && location.protocol === 'https:') navigator.serviceWorker.register('sw.js').catch(() => { });
window.__fp = S; // debug hook
