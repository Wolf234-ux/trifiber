const KEY = 'trifiber.cart.v1';
const EV = 'trifiber:cart';

export const CATALOG = {
  'daily-sachets': { name: 'TriFiber Daily', variant: '30 sachets · Lemon-Jeera', once: 34, sub: 29 },
  'daily-jar': { name: 'TriFiber Daily', variant: '300 g jar · Lemon-Jeera', once: 39, sub: 33 },
  'berberine-30': { name: 'Berberine Balance', variant: '60 capsules · 500 mg', once: 39, sub: 33 },
  'duo': { name: 'The Daily Duo', variant: 'TriFiber Daily + Berberine Balance', once: 69, sub: 58 }
};

export function read() {
  try { return JSON.parse(localStorage.getItem(KEY)) || []; } catch (e) { return []; }
}

function write(lines) {
  localStorage.setItem(KEY, JSON.stringify(lines));
  window.dispatchEvent(new CustomEvent(EV, { detail: lines }));
  return lines;
}

export function add(sku, plan, qty) {
  const lines = read();
  const hit = lines.find(l => l.sku === sku && l.plan === plan);
  if (hit) hit.qty += (qty || 1);
  else lines.push({ sku, plan: plan || 'once', qty: qty || 1 });
  return write(lines);
}

export function setQty(i, qty) {
  const lines = read();
  if (!lines[i]) return lines;
  if (qty <= 0) lines.splice(i, 1); else lines[i].qty = qty;
  return write(lines);
}

export function remove(i) {
  const lines = read();
  lines.splice(i, 1);
  return write(lines);
}

export function clear() { return write([]); }

export function price(line) {
  const p = CATALOG[line.sku];
  if (!p) return 0;
  return (line.plan === 'sub' ? p.sub : p.once) * line.qty;
}

export function detail(lines) {
  const items = (lines || read()).map((l, i) => {
    const p = CATALOG[l.sku] || { name: l.sku, variant: '' };
    return { i, sku: l.sku, plan: l.plan, qty: l.qty, name: p.name, variant: p.variant, each: l.plan === 'sub' ? p.sub : p.once, total: price(l) };
  });
  const count = items.reduce((n, l) => n + l.qty, 0);
  const subtotal = items.reduce((n, l) => n + l.total, 0);
  return { items, count, subtotal };
}

export function onChange(fn) {
  const h = () => fn(read());
  window.addEventListener(EV, h);
  window.addEventListener('storage', h);
  return () => { window.removeEventListener(EV, h); window.removeEventListener('storage', h); };
}

export const EVENT = EV;
