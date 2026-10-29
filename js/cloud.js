// Shared feed: looks posted by everyone, stored in Supabase.
// Only the design (template, colours, fonts, filter, caption) is ever sent, never photos.
import { SUPABASE_URL, SUPABASE_ANON_KEY } from './config.js';
import { TEMPLATES, FILTERS, FONTS, BORDER_PATTERNS, THICKNESS, defaultLook } from './render.js';

export const enabled = !!(SUPABASE_URL && SUPABASE_ANON_KEY);
const H = { apikey: SUPABASE_ANON_KEY, Authorization: `Bearer ${SUPABASE_ANON_KEY}`, 'Content-Type': 'application/json' };
const base = SUPABASE_URL.replace(/\/$/, '') + '/rest/v1';

const HEXC = /^#[0-9a-fA-F]{6}$/;
// Anything coming back from the shared database is untrusted: rebuild a clean look from it.
export function cleanLook(raw) {
  if (!raw || typeof raw !== 'object' || !TEMPLATES[raw.template]) return null;
  const l = defaultLook(raw.template);
  if (raw.layout === 'grid' || raw.layout === 'strip') l.layout = raw.layout;
  if (FILTERS[raw.filter]) l.filter = raw.filter;
  if (Number.isFinite(raw.intensity)) l.intensity = Math.max(0, Math.min(100, Math.round(raw.intensity)));
  if (FONTS[raw.font]) l.font = raw.font;
  l.textColor = HEXC.test(raw.textColor || '') ? raw.textColor : null;
  l.caption = typeof raw.caption === 'string' ? raw.caption.slice(0, 28) : '';
  l.dateStamp = raw.dateStamp !== false;
  const b = raw.border || {};
  l.border = { color: HEXC.test(b.color || '') ? b.color : null, pattern: BORDER_PATTERNS[b.pattern] ? b.pattern : 'none', thickness: THICKNESS[b.thickness] ? b.thickness : 'M' };
  return l;
}
const cleanNick = n => (typeof n === 'string' && /^@[A-Za-z0-9._]{1,20}$/.test(n)) ? n : null;

export async function fetchLooks(limit = 80) {
  const r = await fetch(`${base}/looks?select=id,nick,look,created_at&order=created_at.desc&limit=${limit}`, { headers: H });
  if (!r.ok) throw new Error('feed ' + r.status);
  const rows = await r.json();
  return rows.map(x => ({ id: 'c' + x.id, rid: x.id, nick: cleanNick(x.nick), look: cleanLook(x.look), ts: Date.parse(x.created_at) }))
    .filter(x => x.nick && x.look);
}
export async function postLook(nick, look) {
  const body = JSON.stringify({ nick, look: cleanLook(look) });
  const r = await fetch(`${base}/looks`, { method: 'POST', headers: { ...H, Prefer: 'return=representation' }, body });
  if (!r.ok) throw new Error('post ' + r.status);
  const [row] = await r.json();
  return { id: 'c' + row.id, rid: row.id, nick, look: cleanLook(row.look), ts: Date.parse(row.created_at) };
}
export async function reportLook(rid) {
  await fetch(`${base}/rpc/report_look`, { method: 'POST', headers: H, body: JSON.stringify({ look_id: rid }) }).catch(() => { });
}
