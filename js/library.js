// "My strips": every strip you save is kept on this phone (IndexedDB), never uploaded.
const DB = 'fourposes', STORE = 'strips', MAX = 120;
let dbp = null;
function db() {
  if (!dbp) dbp = new Promise((res, rej) => {
    const r = indexedDB.open(DB, 1);
    r.onupgradeneeded = () => r.result.createObjectStore(STORE, { keyPath: 'id' });
    r.onsuccess = () => res(r.result); r.onerror = () => rej(r.error);
  });
  return dbp;
}
const tx = async (mode, fn) => { const d = await db(); return new Promise((res, rej) => { const t = d.transaction(STORE, mode); const st = t.objectStore(STORE); const out = fn(st); t.oncomplete = () => res(out?.result ?? out); t.onerror = () => rej(t.error); }); };

export async function listStrips() {
  const all = await tx('readonly', st => st.getAll());
  return (all || []).sort((a, b) => b.ts - a.ts);
}
export async function addStrip(rec) {
  await tx('readwrite', st => st.put(rec));
  const all = await listStrips();
  if (all.length > MAX) await tx('readwrite', st => { all.slice(MAX).forEach(r => st.delete(r.id)); });
}
export const deleteStrip = id => tx('readwrite', st => st.delete(id));
