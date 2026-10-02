// Ricopio: toca, encadena combos, abre cofres, colecciona objetos y sube de rango.
const ICONS = {
  grano: '<path fill="none" d="M12 22V9"/><path d="M12 9c-4-1-5-4-5-6 4 0 5 3 5 6zM12 9c4-1 5-4 5-6-4 0-5 3-5 6zM12 15c-4-1-5-4-5-6 4 0 5 3 5 6zM12 15c4-1 5-4 5-6-4 0-5 3-5 6z"/>',
  nido: '<path d="M3 12c1 8 17 8 18 0z"/><path fill="none" d="M6 13c4-3 8-3 12 0"/>',
  gallinero: '<path d="M3 11l9-8 9 8v10H3z"/><rect x="9" y="13" width="6" height="8"/>',
  granja: '<path d="M3 21V10l9-7 9 7v11z"/><path fill="none" d="M9 21v-8h6v8M9 13l6 8M15 13l-6 8"/>',
  banco: '<path d="M2 9l10-6 10 6z"/><path fill="none" d="M5 11v8M10 11v8M14 11v8M19 11v8M2 21h20"/>',
  trebol: '<circle cx="9" cy="9" r="4"/><circle cx="15" cy="9" r="4"/><circle cx="9" cy="15" r="4"/><circle cx="15" cy="15" r="4"/><path fill="none" d="M12 14l2 8"/>',
  llave: '<circle cx="8" cy="8" r="5"/><path fill="none" d="M12 12l9 9M17 17l3-3M20 20l2-2"/>',
  bolsa: '<path d="M7 9h10l2 12H5z"/><path fill="none" d="M9 9c1-6 5-6 6 0"/>',
  anillo: '<circle cx="12" cy="15" r="6" fill="none" stroke-width="3"/><path d="M9 6l3-3 3 3-3 4z"/>',
  reloj: '<circle cx="12" cy="12" r="9"/><path fill="none" d="M12 6v6l4 3"/>',
  gema: '<path d="M12 3l8 6-8 13L4 9z"/><path fill="none" d="M4 9h16M9 9l3 13 3-13"/>',
  estrella: '<path d="M12 2l3 7 7 .5-5.500 4.500 2 7.500-6.500-4-6.500 4 2-7.500L2 9.500 9 9z"/>',
  rayo: '<path d="M13 2L4 14h7l-1 8 9-12h-7z"/>',
  diamante: '<path d="M12 2c6 0 8 10 8 13a8 8 0 0 1-16 0C4 12 6 2 12 2z"/><path fill="none" d="M8 14c0 2 1 4 3 5"/>',
};
ICONS.huevonegro = ICONS.diamante; ICONS.banda = ICONS.anillo;
const svg = (n, c = "#fff8e6") => `<svg viewBox="0 0 24 24" fill="${c}" stroke="#2b2118" stroke-width="1.6" stroke-linejoin="round" stroke-linecap="round" aria-hidden="true">${ICONS[n]}</svg>`;

const TIER_NAMES = ["Grano de oro", "Nido cómodo", "Gallinero", "Comedero automático", "Granja", "Incubadora", "Silo de maíz", "Banco de huevos", "Tractor pollo", "Mercadillo", "Lonja de huevos", "Cooperativa", "Fábrica de tortillas", "Camión de reparto", "Supermercado", "Centro logístico", "Bolsa de valores", "Torre financiera", "Puerto de exportación", "Tren de mercancías", "Mina de oro", "Refinería dorada", "Laboratorio de yemas", "Clonadora de gallinas", "Granja orbital", "Base lunar", "Colonia marciana", "Fábrica de antimateria", "Reactor de yema", "Portal dimensional", "Gallina cuántica", "Huevo de agujero negro", "Forja estelar", "Esfera de corral", "Telar del tiempo", "Viajero temporal", "Oráculo de plumas", "Templo del Gran Huevo", "Gallo semidiós", "Panteón avícola", "Cosechadora de galaxias", "Imperio galáctico", "Cría de universos", "Máquina del multiverso", "Arquitecto de realidades", "Hilo del destino", "Fénix primigenio", "Huevo cósmico", "Ricopio absoluto", "El origen de todo"];
const IC = Object.keys(ICONS);
const UPGRADES = TIER_NAMES.map((name, i) => ({ id: "t" + i, name, ic: IC[i % IC.length], col: `hsl(${(i * 47) % 360} 70% 85%)`, base: 15 * Math.pow(3.8, i), click: i % 5 ? 0 : (i ? .25 * Math.pow(3.3, i) : 1), sec: i % 5 ? .8 * Math.pow(3.3, i) : 0 }));
const RAR = {
  comun:      { n: "Común",      c: "#8aa4b8", w: 60, b: .02 },
  raro:       { n: "Raro",       c: "#3d9bff", w: 28, b: .06 },
  epico:      { n: "Épico",      c: "#b05cff", w: 10, b: .15 },
  legendario: { n: "Legendario", c: "#ffb400", w: 2,  b: .5 },
  mitico:     { n: "Mítico",     c: "#ff2d6f", w: 0,  b: 1.5 },
};
const ITEMS = [
  { id: "trebol",   name: "Trébol de cuatro hojas", r: "comun",      col: "#6fd06f" },
  { id: "llave",    name: "Llave dorada",           r: "comun",      col: "#ffd84a" },
  { id: "bolsa",    name: "Bolsa de semillas",      r: "comun",      col: "#d9a15b" },
  { id: "anillo",   name: "Anillo de plata",        r: "raro",       col: "#d8e2ea" },
  { id: "reloj",    name: "Reloj de bolsillo",      r: "raro",       col: "#ffe08a" },
  { id: "gema",     name: "Gema azul",              r: "epico",      col: "#5cb8ff" },
  { id: "estrella", name: "Estrella fugaz",         r: "epico",      col: "#ffe45c" },
  { id: "diamante", name: "Huevo de diamante",      r: "legendario", col: "#9ff0ff" },
  { id: "huevonegro", name: "Huevo negro",           r: "mitico",     col: "#2b2b33" },
  { id: "banda",     name: "Banda negra",           r: "mitico",     col: "#15151b" },
];
const RANKS = [
  { name: "Pollito sin un duro", at: 0 },
  { name: "Pollito rico",        at: 500 },
  { name: "Gallo magnate",       at: 20000 },
  { name: "Rey del corral",      at: 1000000 },
];
const COSM = {
  skin: [
    { id: "clasico", n: "Clásico", v: ["#ffc928", "#f2b300", "#ffe27a"] },
    { id: "rosa", bn: ["clk", 0.05], n: "Rosa", p: 150, v: ["#ff9ec7", "#ff78ad", "#ffd0e4"] },
    { id: "menta", bn: ["sec", 0.05], n: "Menta", p: 250, v: ["#7ff0c0", "#4fd3a0", "#c8fbe6"] },
    { id: "hielo", bn: ["clk", 0.08], n: "Hielo", p: 400, v: ["#8fe0ff", "#5cc3ee", "#d6f4ff"] },
    { id: "coral", bn: ["crit", 0.01], n: "Coral", p: 600, v: ["#ff7f6a", "#ee5a45", "#ffc2b6"] },
    { id: "lima", bn: ["sec", 0.08], n: "Lima", p: 900, v: ["#b9ee52", "#8fcf2f", "#e1fb9d"] },
    { id: "uva", bn: ["chest", 0.15], n: "Uva", p: 1800, v: ["#b57cf0", "#8d54d0", "#e3ccff"] },
    { id: "noche", bn: ["crit", 0.02], n: "Noche", p: 3000, v: ["#6a5acd", "#4b3fa8", "#9a8cf0"] },
    { id: "cielo", bn: ["wheel", 0.1], n: "Cielo", p: 4000, v: ["#6aa8ff", "#4585e8", "#c2dcff"] },
    { id: "carbon", bn: ["sec", 0.12], n: "Carbón", p: 9000, v: ["#5a5a66", "#3d3d47", "#9a9aa8"] },
    { id: "sandia", bn: ["clk", 0.15], n: "Sandía", p: 16000, v: ["#ff5d73", "#2f9e5a", "#ffd0d6"] },
    { id: "oro", bn: ["sec", 0.2], n: "Oro", p: 25000, v: ["#ffd84a", "#e0a800", "#fff0a0"] },
    { id: "lava", bn: ["clk", 0.25], n: "Lava", p: 60000, v: ["#ff7a2e", "#d6330f", "#ffd36b"], cls: "shine" },
    { id: "plata", bn: ["chest", 0.3], n: "Plata", p: 150000, v: ["#dfe6ee", "#aab6c4", "#fafcff"], cls: "shine" },
    { id: "esmeralda", bn: ["sec", 0.3], n: "Esmeralda", p: 600000, v: ["#2fe08a", "#13a860", "#b4ffd8"], cls: "shine" },
    { id: "fantasma", bn: ["crit", 0.03], n: "Fantasma", p: 3000000, v: ["#eef3ff", "#c9d3f2", "#ffffff"], cls: "ghost" },
    { id: "arcoiris", bn: ["sec", 0.25], n: "Arcoíris", secret: 1, rb: 1, v: ["#ff5d73", "#ffb400", "#ffe27a"] },
    { id: "cosmos", bn: ["sec", 0.35], n: "Cosmos", reb: 1, cls: "shine", v: ["#3b2a8c", "#241a63", "#8a7bdc"] },
    { id: "fenix", bn: ["clk", 0.5], n: "Fénix", reb: 3, cls: "shine", v: ["#ff6a1a", "#e0200a", "#ffcf4a"] },
    { id: "galaxia", bn: ["sec", 0.5], n: "Galaxia", reb: 6, rb: 1, v: ["#7a3cff", "#ff3ca8", "#6ae0ff"] },
    { id: "radio", bn: ["chest", 0.6], n: "Radiactivo", reb: 10, cls: "shine", v: ["#b6ff1a", "#7ac700", "#eaff9a"] },
    { id: "veterano", bn: ["wheel", 0.25], n: "Veterano", achN: 15, v: ["#c98a3b", "#8a5a1f", "#f0cf9a"] },
    { id: "leyenda", bn: ["sec", 0.6], n: "Leyenda", achN: 35, rb: 1, v: ["#ffe45c", "#ff9d00", "#fff6c2"] },
    { id: "supremo", bn: ["sec", 1.0], n: "Supremo", egg: 1, rb: 1, cls: "shine", v: ["#ffffff", "#ffd84a", "#ffe9fb"] },
  ],
  hat: [
    { id: "ninguno", n: "Nada" },
    { id: "paja", n: "Sombrero de paja", p: 200 },
    { id: "gorra", n: "Gorra", p: 500 },
    { id: "aureola", n: "Aureola", p: 6000 },
    { id: "chistera", n: "Chistera", rank: 1 },
    { id: "corona", n: "Corona", rank: 3 },
  ],
  eyes: [
    { id: "ninguno", n: "Nada" },
    { id: "gafas", n: "Gafas de sol", p: 700 },
    { id: "monoculo", n: "Monóculo", rank: 2 },
  ],
  neck: [
    { id: "ninguno", n: "Nada" },
    { id: "bufanda", n: "Bufanda", p: 400 },
    { id: "medalla", n: "Medalla", p: 3500 },
    { id: "pajarita", n: "Pajarita", rank: 1 },
  ],
  scene: [
    { id: "dia", n: "Día", v: ["#6cc0ee", "#c4ebf6", "#ffe9bd", "#8bd078", "#55b35f", "#37954f", "#ffd84a", "#2b2118"] },
    { id: "tarde", n: "Atardecer", p: 1200, v: ["#ff8a65", "#ffbd80", "#ffe0b2", "#d8a24a", "#9aa84a", "#5f8f3f", "#ff6b4a", "#2b2118"] },
    { id: "noche", n: "Noche", p: 5000, v: ["#14183f", "#2b2f7a", "#5a4a96", "#2f6f7a", "#1f5565", "#153f4f", "#f4f1d8", "#fff8e6"] },
  ],
};
const CATN = { skin: "Plumaje", hat: "Sombrero", eyes: "Gafas", neck: "Cuello", scene: "Mundo" };
const BOOSTS = [
  { id: "clic", name: "Toques x2", icon: "rayo", base: 40 },
  { id: "auto", name: "Producción x2", icon: "reloj", base: 120 },
];
const SAVE_KEY = "ricopio-save";
const $ = (id) => document.getElementById(id);
const stage = document.querySelector(".stage");

let state = load();
let rank = 0, combo = 0, lastClick = 0, started = false, ac, chestTimer;

function fix(s) {
  s = { coins: 0, total: 0, owned: {}, items: {}, muted: false, boost: {}, cosm: {}, reb: 0, xp: 0, tree: {}, ach: {}, eggs: {}, mut: {}, slots: [null, null, null, null], wheelAt: 0, asc: 0, gf: 0, gp: {}, q: null, pass: null, pets: {}, petEq: [], cards: {}, gold: {}, br: {}, title: "", name: "", friends: [], gifts: [], redeemed: [], wk: null, wstreak: 0, wday: "", last: 0, tut: 0, hist: [], mgAt: {}, ...s };
  BOOSTS.forEach((b) => (s.boost[b.id] = { lvl: 0, end: 0, len: 0, ...s.boost[b.id] }));
  s.cosm = { own: [], ...s.cosm, eq: { skin: "clasico", hat: "ninguno", eyes: "ninguno", neck: "ninguno", scene: "dia", back: "ninguno", feet: "ninguno", tap: "ninguno", trail: "ninguno", ...s.cosm.eq } };
  s.total = Math.max(s.total, s.coins);
  s.run = s.run ?? s.total;
  s.st = { clicks: 0, crits: 0, chests: 0, golds: 0, maxCombo: 0, time: 0, spins: 0, bosses: 0, games: 0, fusions: 0, ...s.st };
  s.set = { vol: .7, snd: "auto", fx: true, shake: true, glass: true, music: true, lang: "es", big: 100, cb: false, rm: false, auto: false, notif: false, ...s.set };
  s.slots = [0, 1, 2, 3].map((i) => (s.slots && s.slots[i]) || null);
  return s;
}
function load() {
  let s = {};
  try { s = JSON.parse(localStorage.getItem(SAVE_KEY)) || {}; } catch {}
  return fix(s);
}
function save() { state.last = Date.now(); try { localStorage.setItem(SAVE_KEY, JSON.stringify(state)); } catch {} }

const owned = (u) => state.owned[u.id] || 0;
const tl = (id) => state.tree[id] || 0;
const cost = (u) => Math.ceil(u.base * Math.pow(1.15, owned(u)) * brC(u) * (1 - .02 * tl("cost")));
const bonus = () => 1 + ITEMS.reduce((n, i) => n + (state.items[i.id] || 0) * RAR[i.r].b * mutI(i.r), 0) * (1 + .1 * tl("itemb"));
const boostOn = (id) => state.boost[id].end > Date.now();
const gmult = () => bonus() * (1 + .25 * state.reb) * achMult() * extraMult();
const perClick = () => (1 + UPGRADES.reduce((n, u) => n + (u.click || 0) * owned(u) * brM(u), 0)) * gmult() * (1 + .1 * tl("clickpow")) * (1 + skinBn("clk")) * clkX() * (boostOn("clic") ? 2 : 1);
const perSec = () => UPGRADES.reduce((n, u) => n + (u.sec || 0) * owned(u) * brM(u), 0) * gmult() * (1 + .08 * tl("prod")) * (1 + skinBn("sec")) * secX() * (boostOn("auto") ? 2 : 1);
const comboMult = () => 1 + Math.min(combo, 60 + 10 * tl("combo")) / 20;
const SUF = ["", "k", "M", "B", "T", "Qa", "Qi", "Sx", "Sp", "Oc", "No", "Dc"];
const fmt = (n) => {
  if (n < 10) return n % 1 ? n.toFixed(1) : String(Math.floor(n));
  if (n < 1e4) return Math.floor(n).toString();
  if (n >= 1e36) return n.toExponential(2).replace("e+", "e");
  const e = Math.floor(Math.log10(n) / 3);
  return (n / Math.pow(1000, e)).toFixed(2) + SUF[e];
};
const rankIndex = () => RANKS.reduce((r, x, i) => (state.total >= x.at ? i : r), 0);
const gain = (n) => { state.coins += n; state.total += n; state.run += n; };
const replay = (el, cls) => { el.classList.remove(cls); void el.offsetWidth; el.classList.add(cls); };

// Sonido sintetizado (sin archivos)
function sfx(f, d = .09, type = "triangle") {
  if (state.muted) return;
  try {
    ac = ac || new AudioContext();
    const o = ac.createOscillator(), g = ac.createGain(), t = ac.currentTime;
    o.type = state.set.snd === "auto" ? type : state.set.snd; o.frequency.value = f;
    g.gain.setValueAtTime(.1 * state.set.vol, t); g.gain.exponentialRampToValueAtTime(.001, t + d);
    o.connect(g); g.connect(ac.destination); o.start(); o.stop(t + d);
  } catch {}
}

// Tienda
const shop = $("shop");
UPGRADES.forEach((u) => {
  const li = document.createElement("li");
  li.innerHTML = `<button class="item" data-id="${u.id}"><span class="ico">${svg(u.ic, u.col)}</span><span><b>${u.name} (<span class="n">0</span>)</b><small>${u.click ? "+" + fmt(u.click) + " por toque" : "+" + fmt(u.sec) + " por segundo"}</small></span><span class="cost"></span></button>`;
  li.firstChild.addEventListener("click", () => buy(u));
  shop.appendChild(li);
});
function buy(u) {
  let n = 0;
  while ((buyQty === "max" || n < buyQty) && n < 1000) { const c = cost(u); if (state.coins < c) break; state.coins -= c; state.owned[u.id] = owned(u) + 1; n++; }
  if (!n) return;
  replay(shop.querySelector(`[data-id="${u.id}"]`), "bought");
  sfx(660, .1); setTimeout(() => sfx(990, .14), 80);
  save(); render();
}

function renderColl() {
  $("coll").innerHTML = ITEMS.map((i) => {
    const n = state.items[i.id] || 0;
    return `<li class="${n ? "" : "locked"}" style="--rc:${RAR[i.r].c}" title="${n ? i.name : "Sin descubrir"}">${svg(i.id, i.col)}${n > 1 ? `<em>${n}</em>` : ""}</li>`;
  }).join("");
}

function render() {
  $("coins").textContent = fmt(state.coins);
  $("perClick").textContent = fmt(perClick());
  $("perSec").textContent = fmt(perSec());
  $("bonus").textContent = Math.round((gmult() - 1) * 100);
  const mo = UPGRADES.reduce((m, u, i) => (owned(u) ? i : m), -1);
  UPGRADES.forEach((u, i) => {
    const b = shop.querySelector(`[data-id="${u.id}"]`);
    b.parentElement.hidden = i > mo + 2;
    b.querySelector(".n").textContent = owned(u);
    b.querySelector(".cost").textContent = fmt(bulkCost(u));
    b.disabled = state.coins < cost(u);
  });
  const r = rankIndex(), next = RANKS[r + 1];
  $("rankName").textContent = RANKS[r].name;
  $("rankBar").style.width = (next ? ((state.total - RANKS[r].at) / (next.at - RANKS[r].at)) * 100 : 100) + "%";
  $("chick").dataset.rank = r;
  if (r > rank) {
    toast("¡Ahora eres " + RANKS[r].name + "! Mira el armario"); renderWard();
    confetti(stage.clientWidth / 2, stage.clientHeight / 2, 40);
    [523, 659, 784, 1047, 1319].forEach((f, i) => setTimeout(() => sfx(f, .2), i * 90));
  }
  rank = r;
  renderBoosts();
  renderExtra();
}

let toastTimer;
function toast(text) {
  const t = $("toast");
  t.textContent = text;
  t.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => t.classList.remove("show"), 2800);
}

// Efectos
function floater(text, x, y, crit) {
  const el = document.createElement("span");
  el.className = "floater" + (crit ? " crit" : "");
  el.textContent = text;
  el.style.left = x + "px";
  el.style.top = y + "px";
  $("floaters").appendChild(el);
  setTimeout(() => el.remove(), 900);
}
function spray(cls, x, y, n, life, spread, style = () => "") {
  if (!state.set.fx) return;
  for (let i = 0; i < n; i++) {
    const p = document.createElement("i"), a = Math.random() * Math.PI * 2, d = spread * (.4 + Math.random() * .6);
    p.className = cls;
    p.style.cssText = `left:${x}px;top:${y}px;--dx:${Math.cos(a) * d}px;--dy:${Math.sin(a) * d - 40}px;--r:${Math.random() * 720 - 360}deg;${style()}`;
    $("floaters").appendChild(p);
    setTimeout(() => p.remove(), life);
  }
}
const burst = (x, y, n) => spray("coin", x, y, n, 800, 130);
const confetti = (x, y, n) => spray("conf", x, y, n, 1100, 200, () => `--c:hsl(${Math.random() * 360} 90% 60%)`);

// Tocar a Ricopio
$("chick").addEventListener("click", (e) => {
  const now = Date.now();
  combo = now - lastClick < 900 ? combo + 1 : 1;
  lastClick = now;
  const crit = Math.random() < critChance();
  state.st.clicks++; if (crit) state.st.crits++; state.st.maxCombo = Math.max(state.st.maxCombo, combo);
  const g = perClick() * comboMult() * (crit ? critMul() : 1);
  gain(g);
  const r = $("floaters").getBoundingClientRect();
  const x = e.clientX ? e.clientX - r.left : r.width / 2; // con teclado clientX = 0
  const y = e.clientY ? e.clientY - r.top : r.height / 2;
  floater((crit ? "¡CRÍTICO! +" : "+") + fmt(g), x, y, crit);
  burst(x, y, 6 + Math.min(combo, 14) + (crit ? 10 : 0));
  replay($("aura"), "on"); replay($("chick"), "glow"); replay($("scoreBox"), "bump");
  if (crit) { if (state.set.shake) replay(stage, "shake"); confetti(x, y, 14); }
  sfx(480 + Math.min(combo, 30) * 14, .09, crit ? "square" : "triangle");
  render();
});

// Combo y producción automática
setInterval(() => {
  const idle = Date.now() - lastClick;
  if (combo && idle > 900 && !(ev && Date.now() < ev.end && ev.hold)) combo = 0;
  $("combo").classList.toggle("on", combo >= 3);
  $("comboN").textContent = "x" + comboMult().toFixed(1);
  $("comboBar").style.width = Math.max(0, 100 - idle / 9) + "%";
  renderBoosts(); tickExtra();
  const s = perSec();
  if (s > 0) { gain(s / 10); render(); }
}, 100);
setInterval(save, 5000);

// Cofres con rareza
const CHESTS = {
  madera: { n: "Cofre de madera", w: 59.9, a: "#a8602b", b: "#c27a3a", loot: [70, 25, 5, 0, 0], mins: 5, cb: 1 },
  plata:  { n: "Cofre de plata",  w: 27, a: "#8797a8", b: "#c4d0db", loot: [30, 50, 18, 2, 0], mins: 10, cb: 3 },
  oro:    { n: "Cofre de oro",    w: 11, a: "#d99a00", b: "#ffd84a", loot: [5, 30, 55, 10, 0], mins: 20, cb: 10 },
  arcano: { n: "Cofre arcano",    w: 2,  a: "#6a2fc4", b: "#a566ff", loot: [0, 15, 50, 35, 0], mins: 40, cb: 40 },
  mitico: { n: "Cofre mítico",    w: .1, a: "#2a1f3d", b: "#4a3470", loot: [0, 0, 0, 40, 60], mins: 90, cb: 400 },
};
const chest = $("chest");
let chestKind = "madera";
function spawnChest() {
  if (!started || !chest.hidden) return;
  let roll = Math.random() * 100;
  for (const k in CHESTS) { if ((roll -= CHESTS[k].w) < 0) { chestKind = k; break; } }
  const c = CHESTS[chestKind];
  chest.className = "chest";
  chest.style.cssText = `left:${10 + Math.random() * (stage.clientWidth - 120)}px;bottom:${10 + Math.random() * 60}px;--cb:${c.a};--cl:${c.b}`;
  chest.hidden = false;
  toast("¡Ha caído un " + c.n.toLowerCase() + "!");
  sfx(880, .15);
  chestTimer = setTimeout(() => (chest.hidden = true), 25000);
}
(function schedule(first) {
  setTimeout(() => { spawnChest(); schedule(); }, first || (25000 + Math.random() * 20000) * chestWait());
})(8000);

function pickItem() {
  const loot = CHESTS[chestKind].loot, keys = Object.keys(RAR);
  let roll = Math.random() * 100, tier = keys[0];
  for (let i = 0; i < keys.length; i++) { if ((roll -= loot[i]) < 0) { tier = keys[i]; break; } }
  const pool = ITEMS.filter((i) => i.r === tier);
  return pool[Math.floor(Math.random() * pool.length)];
}
chest.addEventListener("click", () => {
  if (chest.classList.contains("open")) return;
  clearTimeout(chestTimer);
  chest.classList.add("open");
  confetti(chest.offsetLeft + 50, chest.offsetTop + 30, 26);
  [523, 659, 784, 1047].forEach((f, i) => setTimeout(() => sfx(f, .18), i * 90));
  setTimeout(() => { chest.hidden = true; if (addChest(chestKind, true)) toast("Cofre guardado en tus ranuras"); else openChestNow(chestKind); }, 800);
});
function showCard(html, color) {
  const rv = $("reveal");
  rv.style.setProperty("--rc", color);
  $("card").innerHTML = html + '<small class="hint">Toca para continuar</small>';
  rv.hidden = false;
  replay($("card"), "in");
  sfx(1319, .3); setTimeout(() => sfx(1760, .35), 120);
  save(); renderColl(); renderWard(); render();
}
function dropLoot() {
  const cc = chestCoins(chestKind); gain(cc);
  if (Math.random() < .07) givePet(); if (Math.random() < .25) giveCard(); passXp(5);
  const lockedC = allCosm().filter((x) => !x.secret && x.p > 0 && !has(x));
  if (lockedC.length && Math.random() < (chestKind === "oro" || chestKind === "arcano" ? .3 : .12)) {
    const x = lockedC[Math.floor(Math.random() * lockedC.length)];
    state.cosm.own.push(x.key);
    showCard(`${svg("estrella", "#ffd84a")}<b>${x.n}</b><span class="rar">Cosmético nuevo</span><small>Ya está en tu armario · +${fmt(cc)} ricoins</small>`, "#ff5d73");
    return;
  }
  const it = pickItem(), q = RAR[it.r];
  state.items[it.id] = (state.items[it.id] || 0) + 1;
  showCard(`${svg(it.id, it.col)}<b>${it.name}</b><span class="rar">${q.n}</span><small>+${Math.round(q.b * mutI(it.r) * 100)}% a todas tus ganancias · +${fmt(cc)} ricoins</small>`, q.c);
}

$("reveal").addEventListener("click", () => ($("reveal").hidden = true));

// Huevo de oro
const golden = $("golden");
golden.addEventListener("click", () => {
  const prize = Math.max(50, perSec() * 30) * (1 + .2 * tl("gold")) * GT[goldT].m;
  gain(prize); state.st.golds++; state.gold[goldT] = (state.gold[goldT] || 0) + 1;
  floater("+" + fmt(prize), golden.offsetLeft, golden.offsetTop, true);
  confetti(golden.offsetLeft + 27, golden.offsetTop + 35, 20);
  sfx(1047, .2); golden.hidden = true; render();
});
(function schedule() {
  setTimeout(() => {
    golden.style.left = 10 + Math.random() * (stage.clientWidth - 80) + "px";
    golden.style.top = 10 + Math.random() * (stage.clientHeight - 150) + "px";
    golden.hidden = false; pickGold();
    setTimeout(() => (golden.hidden = true), 8000);
    schedule();
  }, (30000 + Math.random() * 30000) * goldWait());
})();

$("mute").addEventListener("click", () => {
  state.muted = !state.muted;
  $("mute").textContent = "Sonido: " + (state.muted ? "no" : "sí");
  save();
});
$("reset").addEventListener("click", () => {
  if (confirm("¿Seguro que quieres borrar tu progreso?")) {
    state = fix({}); rank = 0; save();
    applyLook(); renderColl(); renderWard(); render(); syncIntro();
  }
});
window.addEventListener("beforeunload", save);
document.addEventListener("visibilitychange", save);

// Cosméticos y armario
const allCosm = () => Object.entries(COSM).flatMap(([cat, l]) => l.map((x) => ({ ...x, cat, key: cat + ":" + x.id })));
const has = (x) => (!x.p && !x.secret && x.rank === undefined && x.reb === undefined && !x.egg && !x.achN) || state.cosm.own.includes(x.key) || (x.rank !== undefined && rankIndex() >= x.rank) || (x.reb !== undefined && state.reb >= x.reb) || (x.achN && Object.keys(state.ach).length >= x.achN) || (x.egg && EGGS.every((e) => state.eggs[e.id]));
const reqText = (x) => x.secret ? "Secreto" : x.rank !== undefined ? "Rango: " + RANKS[x.rank].name : x.reb !== undefined ? "Renacer " + x.reb + (x.reb > 1 ? " veces" : " vez") : x.achN ? x.achN + " logros" : "Todos los easter eggs";
function applyLook() {
  applySet(); applyEvo();
  document.body.classList.toggle("glass", state.set.glass);
  const e = state.cosm.eq, ch = $("chick"), root = document.documentElement.style;
  const sk = COSM.skin.find((x) => x.id === e.skin) || COSM.skin[0], sc = COSM.scene.find((x) => x.id === effScene()) || COSM.scene[0];
  ["--body", "--wing", "--belly"].forEach((v, i) => ch.style.setProperty(v, sk.v[i]));
  ch.className = ch.className.replace(/ ?(rainbow|shine|ghost)/g, "") + (sk.rb ? " rainbow" : sk.cls ? " " + sk.cls : "");
  const on = [e.hat, e.eyes, e.neck, e.back, e.feet];
  document.querySelectorAll("#chick .a").forEach((g) => (g.style.display = on.includes(g.dataset.a) ? "inline" : "none"));
  ["--s1", "--s2", "--s3", "--h1", "--h2", "--h3", "--sun", "--tx"].forEach((v, i) => root.setProperty(v, sc.v[i]));
}
function renderWard() {
  $("wardBody").innerHTML = Object.keys(COSM).map((cat) => `<h3>${CATN[cat]}</h3><div class="chips">` + COSM[cat].map((o) => {
    const x = { ...o, cat, key: cat + ":" + o.id }, own = has(x), on = state.cosm.eq[cat] === x.id;
    const sw = x.v ? `<i class="sw" style="background:${x.v[0]}"></i>` : "";
    const tag = on ? "Puesto" : own ? "Poner" : x.secret ? "???" : x.p ? fmt(x.p) + " ricoins" : reqText(x);
    return `<button class="chip${on ? " on" : ""}" data-k="${x.key}"${!own && (x.secret || !x.p) ? " disabled" : ""}><b>${sw}${x.secret && !own ? "Secreto" : x.n}</b><small>${tag}${x.bn ? " · " + bnText(x.bn) : ""}</small></button>`;
  }).join("") + "</div>").join("");
}
$("wardBody").addEventListener("click", (e) => {
  const b = e.target.closest(".chip");
  if (!b) return;
  const x = allCosm().find((y) => y.key === b.dataset.k);
  if (!has(x)) {
    if (state.coins < x.p) return toast("Te faltan ricoins");
    state.coins -= x.p; state.cosm.own.push(x.key);
    confetti(stage.clientWidth / 2, stage.clientHeight / 2, 18); sfx(990, .15);
  }
  state.cosm.eq[x.cat] = x.id;
  replay($("aura"), "on"); sfx(660);
  applyLook(); renderWard(); save(); render();
});
$("wardBtn").onclick = () => { $("wardrobe").hidden = false; renderWard(); };
$("closeWard").onclick = () => ($("wardrobe").hidden = true);

// Potenciadores temporales (duración mejorable de 15 a 60 s)
const dur = (id) => 15 + 5 * state.boost[id].lvl + 3 * tl("boostdur");
const actCost = (b) => Math.ceil(b.base * (1 + state.boost[b.id].lvl));
const upCost = (b) => Math.ceil(b.base * 6 * Math.pow(1.7, state.boost[b.id].lvl));
const bl = $("boosts");
BOOSTS.forEach((b) => {
  const li = document.createElement("li");
  li.className = "boost"; li.dataset.id = b.id;
  li.innerHTML = `<span class="ico">${svg(b.icon)}</span><div><b>${b.name}</b><small></small><div class="bar"><div></div></div></div><button class="act"></button><button class="up"></button>`;
  li.querySelector(".act").onclick = () => {
    const c = actCost(b), s = state.boost[b.id];
    if (state.coins < c || boostOn(b.id)) return;
    state.coins -= c; s.len = dur(b.id) * 1000; s.end = Date.now() + s.len;
    replay($("aura"), "on"); sfx(784, .15); toast(b.name + " activado"); save(); render();
  };
  li.querySelector(".up").onclick = () => {
    const c = upCost(b), s = state.boost[b.id];
    if (state.coins < c || s.lvl >= 9) return;
    state.coins -= c; s.lvl++; sfx(880, .12); save(); render();
  };
  bl.appendChild(li);
});
function renderBoosts() {
  BOOSTS.forEach((b) => {
    const li = bl.querySelector(`[data-id="${b.id}"]`), s = state.boost[b.id];
    const left = Math.max(0, s.end - Date.now()), live = left > 0;
    li.querySelector("small").textContent = live ? Math.ceil(left / 1000) + " s restantes" : dur(b.id) + " s · nivel " + (s.lvl + 1);
    li.querySelector(".bar > div").style.width = live ? (left / s.len) * 100 + "%" : "0%";
    const a = li.querySelector(".act"), u = li.querySelector(".up");
    a.textContent = live ? "Activo" : "Activar " + fmt(actCost(b));
    a.disabled = live || state.coins < actCost(b);
    u.textContent = s.lvl >= 9 ? "Máx." : "+5 s " + fmt(upCost(b));
    u.disabled = s.lvl >= 9 || state.coins < upCost(b);
    li.classList.toggle("live", live);
  });
  stage.classList.toggle("boosted", BOOSTS.some((b) => boostOn(b.id)));
}

// Huevos de pascua
function unlock(key, msg, equip) {
  if (!state.cosm.own.includes(key)) state.cosm.own.push(key);
  if (equip) { const [c, id] = key.split(":"); state.cosm.eq[c] = id; applyLook(); }
  toast(msg);
  confetti(stage.clientWidth / 2, stage.clientHeight / 2, 40);
  [784, 988, 1175, 1568].forEach((f, i) => setTimeout(() => sfx(f, .2), i * 90));
  save(); renderWard();
}
let keys = [], tc = 0, tt = 0;
const KONAMI = "ArrowUp,ArrowUp,ArrowDown,ArrowDown,ArrowLeft,ArrowRight,ArrowLeft,ArrowRight,b,a";
addEventListener("keydown", (e) => {
  keys = [...keys, e.key.length === 1 ? e.key.toLowerCase() : e.key].slice(-10);
  if (keys.join() === KONAMI) {
    unlock("skin:arcoiris", "¡Código secreto! Plumaje arcoíris", true); egg("konami", true);
    for (let i = 0; i < 8; i++) setTimeout(() => burst(Math.random() * stage.clientWidth, 0, 6), i * 120);
  }
  if (keys.slice(-7).join("") === "ricopio") {
    gain(1000); render(); toast("¡Me has llamado! +1000"); egg("ricopio", true);
    confetti(stage.clientWidth / 2, stage.clientHeight / 2, 30);
  }
});
$("title").addEventListener("click", () => {
  tc = Date.now() - tt < 700 ? tc + 1 : 1; tt = Date.now();
  if (tc === 7) { unlock("hat:aureola", "Huevo de pascua: ¡aureola desbloqueada!"); egg("titulo", true); tc = 0; }
});

// Pantalla de inicio, guardar y cargar
$("introTitle").innerHTML = [..."Ricopio"].map((c, i) => `<span style="--i:${i}">${c}</span>`).join("");
$("rain").innerHTML = Array.from({ length: 18 }, () => `<i style="left:${Math.random() * 100}%;animation-delay:${Math.random() * 3}s"></i>`).join("");
const syncIntro = () => ($("start").textContent = state.total > 0 ? "Continuar" : "Iniciar");
$("start").addEventListener("click", () => {
  started = true;
  [523, 659, 784, 1047].forEach((f, i) => setTimeout(() => sfx(f, .2), i * 80));
  $("intro").classList.add("out");
  setTimeout(() => $("intro").remove(), 900);
});
$("saveBtn").addEventListener("click", () => {
  save();
  const a = document.createElement("a");
  a.href = URL.createObjectURL(new Blob([JSON.stringify(state)], { type: "application/json" }));
  a.download = "ricopio-partida.json";
  a.click();
  toast("Partida guardada");
});
$("loadBtn").onclick = $("loadBtn2").onclick = () => $("file").click();
$("file").addEventListener("change", async (e) => {
  const f = e.target.files[0];
  if (!f) return;
  try {
    const d = JSON.parse(await f.text());
    if (typeof d.coins !== "number") throw 0;
    state = fix(d); save(); rank = rankIndex();
    applyLook(); renderColl(); renderWard(); render(); syncIntro();
    $("mute").textContent = "Sonido: " + (state.muted ? "no" : "sí");
    toast("Partida cargada");
  } catch { toast("Ese archivo no es una partida válida"); }
  e.target.value = "";
});

// ===== Menús (tienda, ajustes, logros, secretos, renacer) =====
let openM = (id) => {
  closeM();
  $(id).hidden = false;
  if (id === "m-ach") renderAch();
  if (id === "m-egg") renderEggs();
  if (id === "m-reb") renderTree();
  if (id === "m-set") syncSet();
  if (id === "m-skins") renderSkins();
  if (id === "m-wheel") updWheel();
  render(); sfx(700, .06);
};
const closeM = () => document.querySelectorAll(".modal").forEach((m) => (m.hidden = true));
let sunN = 0, cloudN = 0, coinN = 0, coinT = 0, lastAct = Date.now(), typed = "", clickLog = [], mutedClicks = 0;
document.addEventListener("click", (e) => {
  const o = e.target.closest("[data-open]");
  if (o) return openM(o.dataset.open);
  if (e.target.closest("[data-close]") || e.target.classList.contains("modal")) return closeM();
  if (!started) return;
  if (e.target.closest(".sun") && ++sunN >= 5) egg("sol");
  if (e.target.closest(".cloud") && ++cloudN >= 3) egg("nube");
  if (e.target.closest("#scoreBox")) { coinN = Date.now() - coinT < 600 ? coinN + 1 : 1; coinT = Date.now(); if (coinN >= 12) egg("monedero"); }
});
addEventListener("keydown", (e) => {
  lastAct = Date.now();
  if (e.key === "Escape") closeM();
  typed = (typed + (e.key.length === 1 ? e.key.toLowerCase() : "")).slice(-12);
  if (started && typed.endsWith("piopio")) egg("pio");
});
addEventListener("pointerdown", () => (lastAct = Date.now()));
$("chick").addEventListener("click", () => {
  const n = Date.now();
  clickLog = clickLog.filter((t) => n - t < 5000); clickLog.push(n);
  if (clickLog.length >= 30) egg("rafaga");
  if (state.muted && ++mutedClicks >= 50) egg("silencio");
});

// ===== Ajustes =====
const SNDS = { auto: "Variado", triangle: "Pollito", sine: "Suave", square: "Retro", sawtooth: "Eléctrico" };
$("snd").innerHTML = Object.entries(SNDS).map(([k, v]) => `<option value="${k}">${v}</option>`).join("");
function syncSet() {
  $("vol").value = Math.round(state.set.vol * 100); $("snd").value = state.set.snd;
  $("fx").checked = state.set.fx; $("glass").checked = state.set.glass; $("shk").checked = state.set.shake;
  $("mute").textContent = "Sonido: " + (state.muted ? "no" : "sí");
}
$("vol").oninput = () => { state.set.vol = $("vol").value / 100; sfx(660, .1); save(); };
$("snd").onchange = () => { state.set.snd = $("snd").value; sfx(660, .15); save(); };
$("fx").onchange = () => { state.set.fx = $("fx").checked; save(); };
$("shk").onchange = () => { state.set.shake = $("shk").checked; save(); };

// ===== Efectos de balance =====
function critChance() { return .08 + .01 * tl("crit") + skinBn("crit") + petBn("crit") + worldBn("crit") + (wkMod().crit || 0); }
function critMul() { return 5 + .5 * tl("critmul"); }
function chestWait() { return 1 - .05 * tl("chest"); }
function goldWait() { return 1 - .05 * tl("gold"); }

// ===== Logros =====
const AR = {
  comun: { n: "Común", c: "#8aa4b8", b: .005 }, raro: { n: "Raro", c: "#3d9bff", b: .01 }, epico: { n: "Épico", c: "#b05cff", b: .02 },
  legendario: { n: "Legendario", c: "#ffb400", b: .04 }, mitico: { n: "Mítico", c: "#ff4fa3", b: .08 },
};
const ACH = [];
const A = (id, n, d, r, f) => ACH.push({ id, n, d, r, f });
const tierMax = () => UPGRADES.reduce((m, u, i) => (owned(u) ? i + 1 : m), 0);
const skinsOwn = () => COSM.skin.filter((s) => has({ ...s, cat: "skin", key: "skin:" + s.id })).length;
const L = (n) => n.toLocaleString("es");
[[100, "comun"], [1000, "comun"], [10000, "raro"], [100000, "epico"], [1000000, "legendario"]].forEach(([k, r]) => A("clk" + k, "Tocador " + L(k), "Toca a Ricopio " + L(k) + " veces", r, () => state.st.clicks >= k));
[[1e3, "comun"], [1e5, "comun"], [1e7, "raro"], [1e9, "raro"], [1e12, "epico"], [1e18, "epico"], [1e24, "legendario"], [1e30, "mitico"]].forEach(([k, r]) => A("coin" + k, "Ricachón " + fmt(k), "Gana " + fmt(k) + " ricoins en total", r, () => state.total >= k));
[[3, "comun"], [10, "raro"], [20, "raro"], [30, "epico"], [40, "legendario"], [50, "mitico"]].forEach(([k, r]) => A("tier" + k, "Mejora nº " + k, "Compra la mejora número " + k + " de la tienda", r, () => tierMax() >= k));
[[1, "raro"], [3, "epico"], [5, "epico"], [10, "legendario"], [25, "mitico"]].forEach(([k, r]) => A("reb" + k, "Renacido x" + k, "Renace " + k + (k > 1 ? " veces" : " vez"), r, () => state.reb >= k));
[[1, "comun"], [10, "raro"], [50, "epico"], [200, "legendario"]].forEach(([k, r]) => A("chest" + k, "Cofrero " + k, "Abre " + k + " cofres", r, () => state.st.chests >= k));
[[1, "comun"], [10, "raro"], [50, "epico"]].forEach(([k, r]) => A("gold" + k, "Cazahuevos " + k, "Atrapa " + k + " huevos de oro", r, () => state.st.golds >= k));
[[10, "comun"], [100, "raro"], [1000, "epico"]].forEach(([k, r]) => A("crit" + k, "Crítico x" + k, "Consigue " + L(k) + " toques críticos", r, () => state.st.crits >= k));
A("combo30", "Racha", "Encadena 30 toques seguidos", "raro", () => state.st.maxCombo >= 30);
A("combo60", "Imparable", "Encadena 60 toques seguidos", "epico", () => state.st.maxCombo >= 60);
A("items4", "Coleccionista", "Descubre 4 objetos distintos", "raro", () => ITEMS.filter((i) => state.items[i.id]).length >= 4);
A("items8", "Museo completo", "Descubre todos los objetos", "epico", () => ITEMS.every((i) => state.items[i.id]));
A("skins5", "Fashion", "Ten 5 aspectos de plumaje", "raro", () => skinsOwn() >= 5);
A("skins12", "Vestidor", "Ten 12 aspectos de plumaje", "epico", () => skinsOwn() >= 12);
A("eggs1", "Curioso", "Encuentra un easter egg", "comun", () => Object.keys(state.eggs).length >= 1);
A("eggs6", "Detective", "Encuentra 6 easter eggs", "raro", () => Object.keys(state.eggs).length >= 6);
A("eggsAll", "Sin secretos", "Encuentra todos los easter eggs", "legendario", () => EGGS.every((e) => state.eggs[e.id]));
A("tree10", "Aprendiz", "Gasta 10 niveles en el árbol", "raro", () => Object.values(state.tree).reduce((a, b) => a + b, 0) >= 10);
A("tree50", "Sabio", "Gasta 50 niveles en el árbol", "legendario", () => Object.values(state.tree).reduce((a, b) => a + b, 0) >= 50);
A("todo", "Ricopio total", "Consigue todos los demás logros", "mitico", () => ACH.every((a) => a.id === "todo" || state.ach[a.id]));
let _ac = -1, _av = 1;
const achMult = () => {
  const c = Object.keys(state.ach).length;
  if (c !== _ac) { _ac = c; _av = 1 + ACH.reduce((s, a) => s + (state.ach[a.id] ? AR[a.r].b : 0), 0); }
  return _av;
};
function checkAch() {
  let n = 0;
  for (const a of ACH) if (!state.ach[a.id] && a.f()) { state.ach[a.id] = 1; n++; passXp(15); toast("Logro: " + a.n); confetti(stage.clientWidth / 2, 60, 18); }
  if (n) { [659, 784, 988].forEach((f, i) => setTimeout(() => sfx(f, .15), i * 80)); save(); renderWard(); if (!$("m-ach").hidden) renderAch(); }
}
function renderAch() {
  const got = ACH.filter((a) => state.ach[a.id]).length;
  $("achSum").textContent = got + " de " + ACH.length + " conseguidos · +" + ((achMult() - 1) * 100).toFixed(1) + "% de producción";
  const keys = Object.keys(AR);
  $("achBody").innerHTML = keys.map((k, d) => ACH.filter((a) => a.r === k).map((a) => {
    const on = state.ach[a.id];
    return `<li class="ach ${on ? "on" : "off"}" style="--rc:${AR[k].c}"><b>${on ? a.n : a.sec ? "Logro secreto" : "Bloqueado"}</b><span>${!on && a.sec ? "Descúbrelo jugando" : a.d}</span><em>${AR[k].n} · dificultad ${"★".repeat(d + 1)}${"☆".repeat(4 - d)}</em></li>`;
  }).join("")).join("");
}

// ===== Easter eggs =====
const EGGS = [
  { id: "konami", n: "Código clásico", h: "Los videojuegos de antes tenían un truco con flechas… y dos letras al final." },
  { id: "ricopio", n: "Di mi nombre", h: "Escribe su nombre con el teclado." },
  { id: "titulo", n: "El título es un botón", h: "El rótulo de arriba aguanta que lo toques muchas veces seguidas." },
  { id: "sol", n: "Sol coqueto", h: "Hay algo en el cielo que parece querer que lo toques." },
  { id: "nube", n: "Nube cosquillosa", h: "Las nubes pasan, pero si pillas una y la tocas varias veces…" },
  { id: "noche", n: "Gallo trasnochador", h: "Solo pasa si juegas de madrugada (de 00:00 a 05:59)." },
  { id: "rafaga", n: "Dedo veloz", h: "Toca a Ricopio muchísimo en muy poco tiempo (30 toques en 5 segundos)." },
  { id: "silencio", n: "Silencio, por favor", h: "Quita el sonido y sigue tocando al pollito: 50 toques." },
  { id: "zen", n: "Maestro zen", h: "No hagas nada durante un minuto entero, con la partida ya empezada." },
  { id: "monedero", n: "Cuenta tus monedas", h: "Ese marcador de ricoins parece más que un número. Tócalo sin parar." },
  { id: "pio", n: "Pío pío", h: "Escribe cómo hace un pollito, dos veces seguidas." },
];
function egg(id, silent) {
  if (state.eggs[id]) return;
  const e = EGGS.find((x) => x.id === id), g = Math.max(500, perSec() * 60);
  state.eggs[id] = 1; gain(g);
  if (!silent) toast("Easter egg: " + e.n + " (+" + fmt(g) + ")");
  confetti(stage.clientWidth / 2, stage.clientHeight / 2, 24);
  [784, 988, 1175].forEach((f, i) => setTimeout(() => sfx(f, .18), i * 90));
  if (EGGS.every((x) => state.eggs[x.id])) unlock("skin:supremo", "¡Todos los easter eggs! Aspecto Supremo", true);
  save(); render(); if (!$("m-egg").hidden) renderEggs();
}
function renderEggs() {
  const n = EGGS.filter((e) => state.eggs[e.id]).length;
  $("eggSum").textContent = n + " de " + EGGS.length + " encontrados. Al completarlos, aspecto exclusivo.";
  $("eggGrid").innerHTML = EGGS.map((e, i) => `<button class="egg${state.eggs[e.id] ? " on" : ""}" data-i="${i}" aria-label="Easter egg ${i + 1}">${state.eggs[e.id] ? svg("diamante", "#fff3a6") : "?"}</button>`).join("");
}
$("eggGrid").onclick = (e) => {
  const b = e.target.closest(".egg");
  if (!b) return;
  const g = EGGS[+b.dataset.i];
  $("eggHint").innerHTML = state.eggs[g.id] ? `<b>${g.n}</b> Ya lo tienes.` : `<b>Pista:</b> ${g.h}`;
};
function tickExtra() {
  checkAch(); tickMore();
  if (!started) return;
  if (new Date().getHours() < 6) egg("noche");
  if (Date.now() - lastAct > 60000) egg("zen");
}

// ===== Aspectos en la columna derecha =====
const LOCK = '<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="5" y="11" width="14" height="10" rx="2" fill="#fff8e6" stroke="#2b2118" stroke-width="2"/><path d="M8 11V8a4 4 0 0 1 8 0v3" fill="none" stroke="#2b2118" stroke-width="2"/></svg>';
$("skinGrid").addEventListener("click", (e) => {
  const b = e.target.closest(".sk");
  if (!b) return;
  const x = allCosm().find((y) => y.key === b.dataset.k);
  if (!has(x)) {
    if (!x.p) return toast("Se consigue con: " + reqText(x));
    if (state.coins < x.p) return toast("Te faltan ricoins (" + fmt(x.p) + ")");
    state.coins -= x.p; state.cosm.own.push(x.key); confetti(stage.clientWidth / 2, stage.clientHeight / 2, 18); sfx(990, .15);
  }
  state.cosm.eq.skin = x.id; replay($("aura"), "on"); sfx(660);
  applyLook(); renderWard(); save(); render();
});
{ const _rw = renderWard; renderWard = () => { _rw(); renderSkins(); }; }

// ===== Renacer y árbol de habilidades =====
const TREE = [
  { id: "clickpow", g: "Toque", n: "Dedos de oro", d: "+10% ricoins por toque", max: 10 },
  { id: "combo", g: "Toque", n: "Ritmo", d: "+10 al tope del combo", max: 5, req: ["clickpow", 2] },
  { id: "crit", g: "Toque", n: "Ojo clínico", d: "+1% probabilidad de crítico", max: 10, req: ["clickpow", 3] },
  { id: "critmul", g: "Toque", n: "Golpe seco", d: "+0,5 al multiplicador crítico", max: 6, req: ["crit", 3] },
  { id: "prod", g: "Producción", n: "Gallinas felices", d: "+8% producción por segundo", max: 10 },
  { id: "boostdur", g: "Producción", n: "Pilas duraderas", d: "+3 s a los potenciadores", max: 5, req: ["prod", 2] },
  { id: "cost", g: "Producción", n: "Regateo", d: "-2% al coste de las mejoras", max: 10, req: ["prod", 3] },
  { id: "start", g: "Producción", n: "Ahorros", d: "Empiezas cada renacer con ricoins", max: 5, req: ["cost", 2] },
  { id: "chest", g: "Fortuna", n: "Olfato de cofres", d: "-5% de espera entre cofres", max: 6 },
  { id: "itemb", g: "Fortuna", n: "Buen coleccionista", d: "+10% al bonus de objetos", max: 5, req: ["chest", 2] },
  { id: "gold", g: "Fortuna", n: "Brillo dorado", d: "Huevos de oro +20% y más seguidos", max: 8 },
  { id: "xpg", g: "Fortuna", n: "Aprendizaje", d: "+10% de experiencia al renacer", max: 5, req: ["gold", 2] },
];
const rebGoal = (n = state.reb) => 1e6 * Math.pow(9, n);
const rebXp = () => Math.floor((3 + 2 * state.reb) * (1 + .1 * tl("xpg")) * (1 + .25 * gl("gxp")) * (1 + petBn("xp")));
const nodeCost = (n) => tl(n.id) + 1;
function renderTree() {
  let g = "";
  $("treeBody").innerHTML = TREE.map((n) => {
    const l = tl(n.id), ok = !n.req || tl(n.req[0]) >= n.req[1], max = l >= n.max;
    const head = n.g !== g ? `<h4>${(g = n.g)}</h4>` : "";
    const need = ok ? "" : ` · requiere ${TREE.find((t) => t.id === n.req[0]).n} ${n.req[1]}`;
    return head + `<button class="node${l ? " has" : ""}" data-id="${n.id}"${!ok || max || state.xp < nodeCost(n) ? " disabled" : ""}><b>${n.n} ${l}/${n.max}</b><small>${n.d}${need}</small><span>${max ? "Máx." : ok ? nodeCost(n) + " XP" : "Bloqueado"}</span></button>`;
  }).join("");
  updReb();
}
$("treeBody").addEventListener("click", (e) => {
  const b = e.target.closest(".node");
  if (!b) return;
  const n = TREE.find((t) => t.id === b.dataset.id);
  if (state.xp < nodeCost(n) || tl(n.id) >= n.max) return;
  state.xp -= nodeCost(n); state.tree[n.id] = tl(n.id) + 1;
  sfx(880, .12); save(); renderTree(); render();
});
function updReb() {
  const goal = rebGoal(), pct = Math.min(100, (state.run / goal) * 100), can = state.run >= goal;
  $("rebMini").style.width = pct + "%";
  $("rebTxt").textContent = "Objetivo: " + fmt(state.run) + " / " + fmt(goal) + " ricoins";
  $("rebBtn").classList.toggle("ready", can);
  if ($("m-reb").hidden) return;
  $("rebInfo").innerHTML = `Renacimientos: <b>${state.reb}</b> · bonus de producción actual: <b>+${state.reb * 25}%</b><br>Al renacer: <b>+25%</b> de producción permanente y <b>+${rebXp()} XP</b>. XP disponible: <b>${state.xp}</b>`;
  $("rebFill").style.width = pct + "%";
  $("rebGoalTxt").textContent = fmt(state.run) + " / " + fmt(goal) + " ricoins";
  $("rebGo").disabled = !can;
}
$("rebGo").onclick = () => {
  if (state.run < rebGoal() || !confirm("Vas a renacer. Pierdes ricoins y mejoras de la tienda. Conservas aspectos, logros, objetos, árbol y experiencia. ¿Seguro?")) return;
  state.xp += rebXp(); state.reb++;
  state.coins = tl("start") ? 500 * Math.pow(6, tl("start") - 1) : 0;
  state.run = 0; state.owned = {}; combo = 0;
  confetti(innerWidth / 2, innerHeight / 3, 60); [523, 659, 784, 1047, 1319, 1568].forEach((f, i) => setTimeout(() => sfx(f, .25), i * 90));
  toast("¡Has renacido! Renacimiento " + state.reb); addChest(rollChest()); passXp(50);
  save(); renderTree(); renderWard(); render();
};
function renderExtra() { updReb(); updMuts(); updBranches(); }

// ===== Bonus de aspectos =====
function skinBn(t) {
  const s = COSM.skin.find((x) => x.id === state.cosm.eq.skin);
  return s && s.bn && s.bn[0] === t ? s.bn[1] : 0;
}
const bnText = (b) => ({ sec: "+" + Math.round(b[1] * 100) + "% producción", clk: "+" + Math.round(b[1] * 100) + "% por toque", crit: "+" + Math.round(b[1] * 100) + " pts de crítico", chest: "+" + Math.round(b[1] * 100) + "% ricoins de cofres", wheel: "-" + Math.round(b[1] * 100) + "% espera de ruleta" }[b[0]]);
function renderSkins() {
  $("skinGrid").innerHTML = COSM.skin.map((o) => {
    const x = { ...o, cat: "skin", key: "skin:" + o.id }, own = has(x), on = state.cosm.eq.skin === o.id;
    const st = on ? "Puesto" : own ? "Poner" : x.p ? fmt(x.p) + " ricoins" : reqText(x);
    return `<li><button class="sk${on ? " on" : ""}${own ? "" : " lk"}" data-k="${x.key}"><i style="background:${o.v[0]};--b2:${o.v[1]}"></i><b>${!own && x.secret ? "Secreto" : o.n}</b><small>${!own && x.secret ? "???" : o.bn ? bnText(o.bn) : "Sin bonus"}</small><em>${st}</em>${own ? "" : LOCK}</button></li>`;
  }).join("");
}

// ===== Mutaciones (multiplican el dinero base de objetos y cofres) =====
const MUT_MAX = 25;
const MUTS = [
  ...["comun", "raro", "epico", "legendario", "mitico"].map((r, i) => ({ id: "i_" + r, ic: "estrella", n: "Mutación de objetos " + RAR[r].n.toLowerCase(), base: [500, 3e3, 2e4, 2e5, 5e6][i] })),
  ...["madera", "plata", "oro", "arcano", "mitico"].map((k, i) => ({ id: "c_" + k, ic: "llave", n: "Mutación del " + CHESTS[k].n.toLowerCase(), base: [400, 2500, 15000, 150000, 4e6][i] })),
];
const mutLvl = (id) => state.mut[id] || 0;
function mutI(r) { return 1 + .25 * mutLvl("i_" + r); }
function mutC(k) { return 1 + .3 * mutLvl("c_" + k); }
const mutCost = (m) => Math.ceil(m.base * Math.pow(2.2, mutLvl(m.id)));
function chestCoins(k) { return CHESTS[k].cb * Math.max(100, perSec() * 30) * mutC(k) * (1 + skinBn("chest")) * (1 + petBn("chest") + worldBn("chest")) * wkM("chest"); }
$("muts").innerHTML = MUTS.map((m) => `<li><button class="item" data-m="${m.id}"><span class="ico">${svg(m.ic, m.id[0] === "i" ? "#ffe45c" : "#d9a15b")}</span><span><b>${m.n} (<span class="n">0</span>)</b><small></small></span><span class="cost"></span></button></li>`).join("");
$("muts").addEventListener("click", (e) => {
  const b = e.target.closest("[data-m]");
  if (!b) return;
  const m = MUTS.find((x) => x.id === b.dataset.m), c = mutCost(m);
  if (state.coins < c || mutLvl(m.id) >= MUT_MAX) return;
  state.coins -= c; state.mut[m.id] = mutLvl(m.id) + 1;
  replay(b, "bought"); sfx(660, .1); setTimeout(() => sfx(990, .14), 80); save(); render();
});
function updMuts() {
  MUTS.forEach((m) => {
    const b = $("muts").querySelector(`[data-m="${m.id}"]`), l = mutLvl(m.id), c = mutCost(m);
    b.querySelector(".n").textContent = l;
    b.querySelector("small").textContent = m.id[0] === "i" ? "Bonus de esos objetos x" + mutI(m.id.slice(2)).toFixed(2) : "Ricoins del cofre x" + mutC(m.id.slice(2)).toFixed(1);
    b.querySelector(".cost").textContent = l >= MUT_MAX ? "Máx." : fmt(c);
    b.disabled = l >= MUT_MAX || state.coins < c;
  });
}

// ===== Cofres con temporizador (4 ranuras) =====
const fmtT = (ms) => { const s = Math.ceil(ms / 1000); return Math.floor(s / 60) + ":" + String(s % 60).padStart(2, "0"); };
function chestSvg(k) {
  const c = CHESTS[k], band = k === "mitico" ? "#0b0b10" : "#ffc928";
  return `<svg viewBox="0 0 100 90" aria-hidden="true"><rect x="8" y="40" width="84" height="46" rx="6" fill="${c.a}" stroke="#2b2118" stroke-width="5"/><path d="M30 42v42M70 42v42" stroke="${band}" stroke-width="9"/><path d="M8 40Q8 8 50 8Q92 8 92 40Z" fill="${c.b}" stroke="#2b2118" stroke-width="5" stroke-linejoin="round"/><path d="M30 38V11M70 38V11" stroke="${band}" stroke-width="9"/><rect x="42" y="36" width="16" height="20" rx="3" fill="#ffd84a" stroke="#2b2118" stroke-width="4"/></svg>`;
}
function rollChest() {
  if (Math.random() < .001) return "mitico";
  let r = Math.random() * 100;
  for (const k of ["madera", "plata", "oro", "arcano"]) if ((r -= Math.round(CHESTS[k].w)) < 0) return k;
  return "madera";
}
function addChest(k, onlyStore) {
  const i = state.slots.findIndex((s) => !s);
  if (i < 0) { if (!onlyStore) openChestNow(k); return false; }
  state.slots[i] = { k, end: 0 }; save(); updSlots();
  return true;
}
function openChestNow(k) {
  chestKind = k; state.st.chests++;
  const big = k === "mitico";
  confetti(stage.clientWidth / 2, stage.clientHeight / 2, big ? 90 : 30);
  if (big) { if (state.set.shake) replay(stage, "shake"); toast("¡COFRE MÍTICO!"); }
  [523, 659, 784, 1047].forEach((f, i) => setTimeout(() => sfx(f, .18), i * 90));
  setTimeout(dropLoot, 600);
}
const slotsEl = $("slots");
slotsEl.innerHTML = [0, 1, 2, 3].map((i) => `<button class="slot" data-i="${i}"><span class="si"></span><b></b></button>`).join("");
function updSlots() {
  slotsEl.querySelectorAll(".slot").forEach((el, i) => {
    const s = state.slots[i], key = s ? s.k : "";
    if (el.dataset.k !== key) { el.dataset.k = key; el.querySelector(".si").innerHTML = s ? chestSvg(s.k) : ""; }
    let t = "Vacío", cls = "";
    if (s) {
      if (!s.end) { t = CHESTS[s.k].mins + " min"; cls = " idle"; }
      else if (s.end <= Date.now()) { t = "¡Abrir!"; cls = " ready"; }
      else { t = fmtT(s.end - Date.now()); cls = " going"; }
    }
    el.className = "slot" + cls + (s && s.k === "mitico" ? " mit" : "");
    el.querySelector("b").textContent = t;
  });
}
slotsEl.addEventListener("click", (e) => {
  const b = e.target.closest(".slot");
  if (!b) return;
  const i = +b.dataset.i, s = state.slots[i];
  if (!s) return toast("Ranura vacía: consigue cofres en la ruleta y en el mapa");
  if (!s.end) {
    if (state.slots.some((x) => x && x.end > Date.now())) return toast("Ya hay un cofre abriéndose");
    s.end = Date.now() + CHESTS[s.k].mins * 60000 * (1 - .05 * gl("gchest")); sfx(740, .1); save(); return updSlots();
  }
  if (s.end <= Date.now()) { state.slots[i] = null; save(); updSlots(); return openChestNow(s.k); }
  const left = (s.end - Date.now()) / 1000, c = Math.ceil(left * Math.max(5, perSec()) * .6);
  if (state.coins < c) return toast("Para abrirlo ya necesitas " + fmt(c) + " ricoins");
  if (confirm("¿Abrir ya por " + fmt(c) + " ricoins?")) { state.coins -= c; state.slots[i] = null; save(); updSlots(); render(); openChestNow(s.k); }
});

// ===== Ruleta (cada 5 min) =====
const SEG = ["coin", "item", "coin", "chest", "coin", "cosm", "coin", "item", "coin", "chest", "coin", "mitico"];
const SEGC = { coin: ["#ffd84a", "Ricoins"], item: ["#8bd078", "Objeto"], chest: ["#d9a15b", "Cofre"], cosm: ["#ff9ec7", "Aspecto"], mitico: ["#15151b", "MÍTICO"] };
$("wheel").style.background = "conic-gradient(" + SEG.map((s, k) => `${SEGC[s][0]} ${k * 30}deg ${k * 30 + 30}deg`).join(",") + ")";
$("wheel").innerHTML = SEG.map((s, k) => `<span style="--a:${k * 30 + 15}deg;${s === "mitico" ? "color:#fff" : ""}">${SEGC[s][1]}</span>`).join("");
let wheelRot = 0, spinning = false;
const wheelCd = () => 300000 * Math.max(.2, 1 - skinBn("wheel") - petBn("wheel")) * (1 - .03 * gl("gwheel"));
function updWheel() {
  const left = state.wheelAt - Date.now(), ok = left <= 0 && !spinning;
  $("spinBtn").disabled = !ok;
  $("wheelInfo").textContent = spinning ? "Girando…" : left <= 0 ? "¡Tirada gratis lista!" : "Próxima tirada en " + fmtT(left);
}
function spin() {
  if (spinning || state.wheelAt > Date.now()) return;
  spinning = true; bumpStreak(); state.st.spins = (state.st.spins || 0) + 1; passXp(3);
  let r = Math.random() * 100, cat = "coin";
  if (r < .1 + .02 * Math.min(10, state.wstreak || 0)) cat = "mitico"; else if (r < 18.1) cat = "item"; else if (r < 38.1) cat = "chest"; else if (r < 50) cat = "cosm"; else cat = "coin";
  const idx = (() => { const l = SEG.map((s, i) => (s === cat ? i : -1)).filter((i) => i >= 0); return l[Math.floor(Math.random() * l.length)]; })();
  const c = idx * 30 + 15 + (Math.random() * 18 - 9);
  wheelRot += 1800 + ((((-c - wheelRot) % 360) + 360) % 360);
  $("wheel").style.transform = `rotate(${wheelRot}deg)`;
  state.wheelAt = Date.now() + wheelCd(); save(); updWheel();
  for (let i = 0; i < 24; i++) setTimeout(() => sfx(300 + (i % 4) * 40, .04), 250 * Math.pow(i, 1.3));
  setTimeout(() => { spinning = false; givePrize(cat); updWheel(); }, 4700);
}
$("spinBtn").onclick = spin;
function rollItem(loot) {
  const keys = Object.keys(RAR);
  let roll = Math.random() * 100, tier = keys[0];
  for (let i = 0; i < keys.length; i++) { if ((roll -= loot[i]) < 0) { tier = keys[i]; break; } }
  const pool = ITEMS.filter((i) => i.r === tier);
  return pool[Math.floor(Math.random() * pool.length)];
}
function givePrize(cat) {
  if (cat === "cosm") {
    const l = allCosm().filter((x) => !x.secret && x.p > 0 && !has(x));
    if (l.length) { const x = l[Math.floor(Math.random() * l.length)]; state.cosm.own.push(x.key); return showCard(`${svg("estrella", "#ffd84a")}<b>${x.n}</b><span class="rar">Cosmético de ruleta</span><small>Ya está en tu armario</small>`, "#ff5d73"); }
    cat = Math.random() < .2 ? "big" : "coin";
  }
  if (cat === "coin" || cat === "big") {
    if (cat === "coin" && Math.random() < .2) cat = "big";
    const g = Math.max(300, perSec() * 120) * (cat === "big" ? 5 : 1) * wStreakM();
    gain(g); confetti(stage.clientWidth / 2, stage.clientHeight / 2, cat === "big" ? 50 : 20);
    return showCard(`${svg("gema", "#ffd84a")}<b>+${fmt(g)} ricoins</b><span class="rar">${cat === "big" ? "¡Premio gordo!" : "Ruleta"}</span>`, "#ffc928");
  }
  if (cat === "item") {
    const it = rollItem([60, 28, 10, 2, 0]), q = RAR[it.r];
    state.items[it.id] = (state.items[it.id] || 0) + 1;
    return showCard(`${svg(it.id, it.col)}<b>${it.name}</b><span class="rar">${q.n}</span><small>+${Math.round(q.b * mutI(it.r) * 100)}% a todas tus ganancias</small>`, q.c);
  }
  const k = cat === "mitico" ? "mitico" : rollChest();
  if (k === "mitico") { confetti(stage.clientWidth / 2, stage.clientHeight / 2, 90); if (state.set.shake) replay(stage, "shake"); }
  const stored = addChest(k, true);
  if (!stored) openChestNow(k);
  showCard(`${chestSvg(k)}<b>${CHESTS[k].n}</b><span class="rar">${stored ? "Guardado en tus ranuras" : "Sin hueco: abierto al instante"}</span>`, k === "mitico" ? "#ff2d6f" : CHESTS[k].b);
}
function tickMore() {
  updSlots();
  const left = state.wheelAt - Date.now(), b = $("wheelBtn");
  b.classList.toggle("ready", left <= 0);
  $("wheelTxt").textContent = left <= 0 ? "¡Girar!" : fmtT(left);
  if (!$("m-wheel").hidden) updWheel();
}
$("glass").onchange = () => { state.set.glass = $("glass").checked; applyLook(); save(); };

// ===================== 38 NOVEDADES =====================
const RENDER = {};
const pick = (a) => a[Math.floor(Math.random() * a.length)];
const enc = (s) => btoa(unescape(encodeURIComponent(s)));
const dec = (s) => decodeURIComponent(escape(atob(s)));
const dayKey = (d = new Date()) => d.getFullYear() + "-" + String(d.getMonth() + 1).padStart(2, "0") + "-" + String(d.getDate()).padStart(2, "0");
const monthKey = () => dayKey().slice(0, 7);
const weekKey = (d = new Date()) => { const t = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate())); t.setUTCDate(t.getUTCDate() + 4 - (t.getUTCDay() || 7)); const y = t.getUTCFullYear(); return y + "-W" + String(Math.ceil(((t - Date.UTC(y, 0, 1)) / 864e5 + 1) / 7)).padStart(2, "0"); };
const seedRand = (s) => { let h = 2166136261; for (const c of s) h = Math.imul(h ^ c.charCodeAt(0), 16777619); return () => (((h = Math.imul(h ^ (h >>> 15), 2246822507) ^ Math.imul(h ^ (h >>> 13), 3266489909)) >>> 0) / 4294967296); };
const fmtH = (s) => Math.floor(s / 3600) + " h " + Math.floor((s % 3600) / 60) + " min";
function mkModal(id, title, body) { const d = document.createElement("div"); d.id = "m-" + id; d.className = "modal"; d.hidden = true; d.innerHTML = `<div class="mbox"><header><h2>${title}</h2><button class="btn" data-close>Cerrar</button></header><div class="mbody" id="b-${id}">${body || ""}</div></div>`; document.body.appendChild(d); }
{ const _o = openM; openM = (id) => { _o(id); if (RENDER[id]) RENDER[id](); applyLang(); }; }
function gl(id) { return (state.gp && state.gp[id]) || 0; }
// ---- Menú Más
mkModal("hub", "Más", '<div class="hubg">' + [["m-quests", "Misiones"], ["m-pass", "Pase"], ["m-pets", "Mascotas"], ["m-fuse", "Fusión"], ["m-album", "Álbum"], ["m-gal", "Huevos de oro"], ["m-games", "Minijuegos"], ["m-stats", "Estadísticas"], ["m-asc", "Ascender"], ["m-social", "Social"]].map(([i, n]) => `<button class="btn" data-open="${i}">${n}</button>`).join("") + "</div>");
mkModal("quests", "Misiones"); mkModal("pass", "Pase de temporada"); mkModal("pets", "Mascotas"); mkModal("fuse", "Fusión de objetos"); mkModal("album", "Álbum de cartas"); mkModal("gal", "Huevos de oro");
mkModal("stats", "Estadísticas"); mkModal("asc", "Ascender"); mkModal("social", "Social");


// ---- 28 Compra masiva + 7 Caminos
let buyQty = 1;
function bulkCost(u) { if (buyQty === "max" || buyQty === 1) return cost(u); let t = 0; for (let i = 0; i < buyQty; i++) t += Math.ceil(u.base * Math.pow(1.15, owned(u) + i) * brC(u) * (1 - .02 * tl("cost"))); return t; }
function brM(u) { const b = state.br[u.id]; return b === 0 ? 2 : b === 1 ? 1.5 : 1; }
function brC(u) { const b = state.br[u.id]; return b === 0 ? 1.2 : b === 1 ? .7 : 1; }
$("qty").addEventListener("click", (e) => {
  const b = e.target.closest("[data-q]"); if (!b) return;
  buyQty = b.dataset.q === "max" ? "max" : +b.dataset.q;
  $("qty").querySelectorAll("button").forEach((x) => x.classList.toggle("on", x === b)); render();
});
let _bs = "";
function updBranches() {
  const e = UPGRADES.filter((u) => owned(u) >= 25), sig = e.map((u) => u.id + ":" + state.br[u.id]).join();
  if (sig === _bs) return; _bs = sig;
  $("branches").innerHTML = e.length ? e.map((u) => `<li class="br"><b>${u.name}</b>` + (state.br[u.id] === undefined ? `<button class="btn" data-b="${u.id}:0">Vapor: producción x2, coste +20%</button><button class="btn" data-b="${u.id}:1">Taller: producción x1,5, coste -30%</button>` : `<small>Elegido: ${state.br[u.id] === 0 ? "Vapor" : "Taller"}</small>`) + `</li>`).join("") : '<li class="sum small">Aún no tienes mejoras al nivel 25.</li>';
}
$("branches").addEventListener("click", (e) => { const b = e.target.closest("[data-b]"); if (!b) return; const [id, n] = b.dataset.b.split(":"); state.br[id] = +n; _bs = ""; sfx(880, .15); save(); render(); });

// ---- 8 Eventos temporales
const EVS = [
  { id: "hora", n: "¡Hora dorada! Producción x2 durante 60 s", sec: 2, t: 60 },
  { id: "tormenta", n: "¡Tormenta de huevos! Toques x3 durante 45 s", clk: 3, t: 45 },
  { id: "fiebre", n: "¡Fiebre de combo! Todo x1,5 y el combo no cae (30 s)", sec: 1.5, clk: 1.5, hold: 1, t: 30 },
  { id: "loco", n: "¡Cofre loco!", t: 0 },
];
let ev = null;
function evM(t) { return ev && Date.now() < ev.end && ev[t] ? ev[t] : 1; }
const evBan = document.createElement("div"); evBan.id = "evBanner"; evBan.className = "evb"; evBan.hidden = true; document.body.appendChild(evBan);
function startEvent() {
  if (!started) return;
  const e = pick(EVS); say(e.n.split("!")[0] + "!");
  if (e.id === "loco") { toast(e.n); chest.hidden = true; spawnChest(); return; }
  ev = { ...e, end: Date.now() + e.t * 1000 }; toast(e.n); sfx(880, .2); confetti(stage.clientWidth / 2, 40, 30);
}
(function s() { setTimeout(() => { startEvent(); s(); }, 180000 + Math.random() * 180000); })();

// ---- 11 Jefe del corral
let boss = null;
function spawnBoss() {
  if (!started || boss) return;
  const hp = 60 + 15 * state.reb + 25 * state.asc; boss = { hp, max: hp, end: Date.now() + 30000 };
  $("boss").hidden = false; toast("¡Ha llegado el Zorro del corral! Pícalo 30 s"); say("¡Un zorro!"); sfx(220, .3, "sawtooth");
}
function hitBoss(n) {
  if (!boss) return; boss.hp -= n;
  if (boss.hp <= 0) {
    boss = null; $("boss").hidden = true; state.st.bosses = (state.st.bosses || 0) + 1; passXp(15);
    const g = Math.max(2000, perSec() * 600); gain(g); addChest(Math.random() < .3 ? "oro" : "plata");
    confetti(stage.clientWidth / 2, stage.clientHeight / 2, 60); toast("¡Zorro derrotado! +" + fmt(g) + " y un cofre"); say("¡Toma zorro!"); render();
  }
}
$("boss").addEventListener("click", () => hitBoss(2));
(function s() { setTimeout(() => { spawnBoss(); s(); }, 240000 + Math.random() * 180000); })();

// ---- 15 Mensajes del pollo / 18 Emociones
function say(t, ms = 3200) { const b = $("bubble"); b.textContent = t; b.hidden = false; clearTimeout(b._t); b._t = setTimeout(() => (b.hidden = true), ms); }
let nextSay = Date.now() + 15000;

// ---- 10 Hitos de combo
let hit = {};
$("chick").addEventListener("click", (e) => {
  if (combo < 5) hit = {};
  for (const m of [10, 25, 50, 100]) if (combo >= m && !hit[m]) {
    hit[m] = 1; const g = Math.max(100, perSec() * m * 2); gain(g);
    toast("¡Combo x" + m + "! +" + fmt(g)); say("¡Combo x" + m + "!"); confetti(stage.clientWidth / 2, stage.clientHeight / 2, m >= 50 ? 50 : 20);
    [660, 880, 1100].forEach((f, i) => setTimeout(() => sfx(f, .12), i * 70));
    if (m === 50) addChest("madera"); if (m === 100) { addChest("plata"); if (state.set.shake) replay(stage, "shake"); }
  }
  hitBoss(1 + Math.floor(combo / 20));
  const r = $("floaters").getBoundingClientRect(), x = e.clientX ? e.clientX - r.left : r.width / 2, y = e.clientY ? e.clientY - r.top : r.height / 2;
  const t = TAPFX[state.cosm.eq.tap]; if (t && state.set.fx) charBurst(x, y, t, 7);
});

// ---- 22 Efectos de toque y estelas
const TAPFX = { estrellas: { ch: "★", c: ["#ffd84a", "#fff3a6"] }, corazones: { ch: "♥", c: ["#ff5d73", "#ff9aa8"] }, burbujas: { ch: "●", c: ["#8fe0ff", "#d6f4ff"] }, llamas: { ch: "▲", c: ["#ff7a2e", "#ffd84a"] }, arcoiris: { ch: "✦", c: null }, chispas: { ch: "✦", c: ["#ffe27a", "#fff"] } };
function charBurst(x, y, d, n) {
  for (let i = 0; i < n; i++) {
    const p = document.createElement("i"), a = Math.random() * Math.PI * 2, r = 50 + Math.random() * 70;
    p.className = "cbp"; p.textContent = d.ch;
    p.style.cssText = `left:${x}px;top:${y}px;color:${d.c ? pick(d.c) : "hsl(" + Math.random() * 360 + " 90% 60%)"};--dx:${Math.cos(a) * r}px;--dy:${Math.sin(a) * r - 30}px;--r:${Math.random() * 360 - 180}deg`;
    $("floaters").appendChild(p); setTimeout(() => p.remove(), 900);
  }
}
const trailEl = document.createElement("div"); trailEl.id = "trail"; document.body.appendChild(trailEl);
let _tr = 0;
addEventListener("pointermove", (e) => {
  const d = TAPFX[state.cosm.eq.trail]; if (!d || !state.set.fx || !started || Date.now() - _tr < 45) return; _tr = Date.now();
  const t = document.createElement("i"); t.className = "trl"; t.textContent = d.ch;
  t.style.cssText = `left:${e.clientX}px;top:${e.clientY}px;color:${d.c ? pick(d.c) : "hsl(" + Math.random() * 360 + " 90% 60%)"}`;
  trailEl.appendChild(t); setTimeout(() => t.remove(), 700);
});

// ---- 17 Animaciones por aspecto
const FXC = { lava: ["#ff7a2e", "#ffd36b"], hielo: ["#d6f4ff", "#8fe0ff"], cosmos: ["#8a7bdc", "#fff"], fenix: ["#ff6a1a", "#ffcf4a"], galaxia: ["#ff3ca8", "#6ae0ff"], esmeralda: ["#b4ffd8", "#2fe08a"], radio: ["#b6ff1a"], supremo: ["#ffd84a", "#fff"], oro: ["#ffe27a"], arcoiris: ["#ff5d73", "#ffb400", "#6ae0ff"], plata: ["#fff", "#dfe6ee"], fantasma: ["#fff"] };
function ambient() {
  if (!state.set.fx) return; const c = FXC[state.cosm.eq.skin]; if (!c) return;
  spray("conf", stage.clientWidth / 2 + (Math.random() - .5) * 160, stage.clientHeight / 2 + 40 + (Math.random() - .5) * 100, 1, 1100, 60, () => `--c:${pick(c)}`);
}

// ---- 16 Accesorios nuevos, 19 Mundos, 22 cosméticos de toque
const NN = { id: "ninguno", n: "Nada" };
COSM.hat.push({ id: "lazo", n: "Lazo", p: 1500 }, { id: "gorro", n: "Gorro de lana", p: 2500 }, { id: "mago", n: "Sombrero de mago", p: 9000 }, { id: "casco", n: "Casco espacial", reb: 2 });
COSM.eyes.push({ id: "parche", n: "Parche pirata", p: 1200 }, { id: "corazones", n: "Ojos de corazón", p: 4000 });
COSM.back = [NN, { id: "mochila", n: "Mochila", p: 2500 }, { id: "capa", n: "Capa de héroe", p: 7000 }, { id: "alas", n: "Alas de ángel", achN: 10 }];
COSM.feet = [NN, { id: "zapas", n: "Zapatillas", p: 1000 }, { id: "botas", n: "Botas", p: 3000 }];
COSM.tap = [NN, { id: "estrellas", n: "Estrellas", p: 2000 }, { id: "burbujas", n: "Burbujas", p: 3000 }, { id: "corazones", n: "Corazones", p: 5000 }, { id: "llamas", n: "Llamas", p: 12000 }, { id: "arcoiris", n: "Arcoíris", p: 40000 }];
COSM.trail = [NN, { id: "chispas", n: "Chispas", p: 3500 }, { id: "estrellas", n: "Estrellas", p: 6000 }, { id: "corazones", n: "Corazones", p: 9000 }, { id: "arcoiris", n: "Arcoíris", p: 25000 }];
Object.assign(CATN, { back: "Espalda", feet: "Pies", tap: "Efecto de toque", trail: "Estela" });
COSM.scene.find((x) => x.id === "tarde").bn = ["crit", .01];
COSM.scene.find((x) => x.id === "noche").bn = ["chest", .1];
COSM.scene.push(
  { id: "playa", n: "Playa", p: 15000, bn: ["sec", .05], v: ["#5fd3f0", "#bff3ff", "#fff1c9", "#f7e0a3", "#e8c878", "#d1ab52", "#ffe066", "#2b2118"] },
  { id: "espacio", n: "Espacio", p: 60000, bn: ["clk", .1], v: ["#05061a", "#14123f", "#2a1f66", "#3b3a7a", "#2b2a5e", "#1d1c44", "#e9e6ff", "#fff8e6"] },
  { id: "volcan", n: "Volcán", p: 200000, bn: ["sec", .12], v: ["#2a0d0a", "#7a1f0f", "#d6451a", "#4a2a22", "#33201b", "#201512", "#ffb347", "#fff8e6"] },
  { id: "ciudad", n: "Ciudad", p: 800000, bn: ["chest", .1], v: ["#2b3a67", "#5d7ac4", "#f3b5c9", "#6b7280", "#4b5563", "#374151", "#fff3b0", "#fff8e6"] },
  { id: "nieve", n: "Invierno", p: 3000000, bn: ["crit", .02], v: ["#9ec9e8", "#e4f3ff", "#ffffff", "#f4faff", "#d5e6f3", "#b9d2e5", "#fff8d6", "#2b2118"] });
function effScene() {
  const s = state.cosm.eq.scene; if (!state.set.auto) return s;
  const h = new Date().getHours(), id = h >= 7 && h < 18 ? "dia" : h >= 18 && h < 21 ? "tarde" : "noche", o = COSM.scene.find((x) => x.id === id);
  return o && has({ ...o, cat: "scene", key: "scene:" + id }) ? id : s;
}
function worldBn(t) { const s = COSM.scene.find((x) => x.id === effScene()); return s && s.bn && s.bn[0] === t ? s.bn[1] : 0; }
const MUS = { dia: [0, 2, 4, 7, 9], tarde: [0, 3, 5, 7, 10], noche: [0, 3, 5, 7, 10], playa: [0, 2, 4, 7, 9], espacio: [0, 2, 3, 7, 8], volcan: [0, 1, 5, 7, 8], ciudad: [0, 2, 5, 7, 9], nieve: [0, 4, 7, 11, 12] };

// ---- 21 Evolución
const EVO = ["Pollito", "Gallo joven", "Gallo", "Gallo dragón"];
const evoIdx = () => (state.reb >= 6 || state.asc ? 3 : state.reb >= 3 ? 2 : state.reb >= 1 ? 1 : 0);
let _ev = "";
function applyEvo() {
  const i = evoIdx(), s = i + ":" + state.reb; if (s === _ev) return; _ev = s;
  document.querySelectorAll("#chick .e").forEach((g) => (g.style.display = +g.dataset.e <= i ? "inline" : "none"));
  $("chick").style.setProperty("--evo", 1 + Math.min(.3, state.reb * .03));
}

// ---- 5 Mascotas
const PETS = [
  { id: "pip", n: "Pip", r: "comun", c: "#ffd84a", t: "clk", b: .03 }, { id: "nuez", n: "Nuez", r: "comun", c: "#c98a3b", t: "sec", b: .03 }, { id: "lola", n: "Lola", r: "comun", c: "#ff9ec7", t: "chest", b: .05 },
  { id: "tito", n: "Tito", r: "raro", c: "#3d9bff", t: "crit", b: .005 }, { id: "mora", n: "Mora", r: "raro", c: "#8d54d0", t: "sec", b: .06 }, { id: "kiwi", n: "Kiwi", r: "raro", c: "#8fcf2f", t: "clk", b: .06 },
  { id: "luna", n: "Luna", r: "epico", c: "#dfe6ee", t: "wheel", b: .04 }, { id: "sol", n: "Sol", r: "epico", c: "#ffb400", t: "all", b: .03 },
  { id: "zeus", n: "Zeus", r: "legendario", c: "#fff3a6", t: "sec", b: .12 }, { id: "omega", n: "Omega", r: "mitico", c: "#15151b", t: "all", b: .08 },
];
const petB = (p) => p.b * (1 + .25 * ((state.pets[p.id] || 1) - 1));
function petBn(t) { return state.petEq.reduce((n, id) => { const p = PETS.find((x) => x.id === id); return n + (p && p.t === t ? petB(p) : 0); }, 0); }
const petSvg = (c) => `<svg viewBox="0 0 40 40" aria-hidden="true"><ellipse cx="20" cy="36" rx="12" ry="3" fill="rgba(0,0,0,.2)"/><circle cx="20" cy="22" r="14" fill="${c}" stroke="#2b2118" stroke-width="3"/><circle cx="15" cy="20" r="2.4" fill="#2b2118"/><circle cx="25" cy="20" r="2.4" fill="#2b2118"/><path d="M17 25h6l-3 5z" fill="#ff8a1f" stroke="#2b2118" stroke-width="1.5"/></svg>`;
const RW = { comun: 60, raro: 28, epico: 9, legendario: 2.5, mitico: .5 };
function rollRar() { let r = Math.random() * 100; for (const k in RW) if ((r -= RW[k]) < 0) return k; return "comun"; }
function givePet() {
  const p = pick(PETS.filter((x) => x.r === rollRar()).concat(PETS.slice(0, 1))), had = state.pets[p.id] || 0;
  state.pets[p.id] = Math.min(10, had + 1);
  if (!had && state.petEq.length < 3) state.petEq.push(p.id);
  toast(had ? "Mascota " + p.n + " sube a nivel " + state.pets[p.id] : "¡Mascota nueva: " + p.n + "!"); save();
}
let _pe = "";
function petsStage() { const s = state.petEq.join(); if (s === _pe) return; _pe = s; $("pets").innerHTML = state.petEq.map((id, i) => { const p = PETS.find((x) => x.id === id); return `<span class="pet p${i}" title="${p.n}">${petSvg(p.c)}</span>`; }).join(""); }
const PT = { sec: "producción", clk: "por toque", chest: "ricoins de cofres", crit: "pts de crítico", wheel: "menos espera de ruleta", all: "todo", xp: "XP" };
RENDER["m-pets"] = () => {
  $("b-pets").innerHTML = `<p class="sum">Consíguelas en cofres (7%). Repetidas suben de nivel (máx. 10). Puedes llevar 3.</p><ul class="pets-list">` + PETS.map((p) => {
    const l = state.pets[p.id] || 0, on = state.petEq.includes(p.id), v = petB(p);
    return `<li><button class="sk${on ? " on" : ""}${l ? "" : " lk"}" data-pet="${p.id}" style="border-color:${RAR[p.r].c}"><span class="pi">${petSvg(l ? p.c : "#999")}</span><b>${l ? p.n : "???"}</b><small>${l ? "+" + (p.t === "crit" ? (v * 100).toFixed(1) : Math.round(v * 100)) + (p.t === "crit" ? "" : "%") + " " + PT[p.t] : RAR[p.r].n}</small><em>${l ? "Nv " + l + (on ? " · puesta" : "") : "Sin descubrir"}</em></button></li>`;
  }).join("") + "</ul>";
};
document.addEventListener("click", (e) => {
  const b = e.target.closest("[data-pet]"); if (!b) return; const id = b.dataset.pet; if (!state.pets[id]) return;
  const i = state.petEq.indexOf(id); if (i >= 0) state.petEq.splice(i, 1); else if (state.petEq.length < 3) state.petEq.push(id); else return toast("Solo 3 mascotas a la vez");
  sfx(700, .08); save(); RENDER["m-pets"](); render();
});

// ---- 23 Álbum de cartas
const CN = "Pirata,Mago,Astronauta,Samurái,Vaquero,Bombero,Chef,Rockero,Detective,Buzo,Vikingo,Bailarín,Robot,Fantasma,Dragón,Rey,Ninja,Hada,Vampiro,Cíborg,Faraón,Sirena,Ángel,Dios".split(",");
const CARDS = CN.map((n, i) => ({ id: "k" + i, n: "Ricopio " + n, r: i < 10 ? "comun" : i < 17 ? "raro" : i < 22 ? "epico" : i < 23 ? "legendario" : "mitico", c: `hsl(${i * 15} 70% 70%)` }));
function giveCard() {
  const r = rollRar(), c = pick(CARDS.filter((x) => x.r === r)), foil = Math.random() < .1, had = state.cards[c.id];
  state.cards[c.id] = { n: (had ? had.n : 0) + 1, foil: (had && had.foil) || foil };
  toast((had ? "Carta repetida: " : "¡Carta nueva: ") + c.n + (foil ? " ✨ brillante" : "") + (had ? "" : "!")); save();
}
function cardBonus() { return CARDS.reduce((n, c) => { const k = state.cards[c.id]; return n + (k ? .004 * (k.foil ? 2 : 1) : 0); }, 0); }
RENDER["m-album"] = () => {
  const got = CARDS.filter((c) => state.cards[c.id]).length;
  $("b-album").innerHTML = `<p class="sum">${got} de ${CARDS.length} cartas · bonus +${(cardBonus() * 100).toFixed(1)}% a todo (brillantes valen doble). Caen de los cofres (25%).</p><ul class="cards">` + CARDS.map((c, i) => {
    const k = state.cards[c.id];
    return `<li class="cd${k ? "" : " off"}${k && k.foil ? " foil" : ""}" style="--rc:${RAR[c.r].c}"><span class="cn">#${i + 1}</span>${k ? petSvg(c.c) : '<span class="q">?</span>'}<b>${k ? c.n : "???"}</b><small>${RAR[c.r].n}${k && k.n > 1 ? " x" + k.n : ""}</small></li>`;
  }).join("") + "</ul>";
};

// ---- 24 Galería de huevos de oro
const GT = { oro: { n: "Dorado", m: 1, w: 70, c: "#ffd84a" }, plata: { n: "Plateado", m: 3, w: 20, c: "#dfe6ee" }, rubi: { n: "Rubí", m: 8, w: 7, c: "#ff5d73" }, iris: { n: "Arcoíris", m: 25, w: 2.5, c: "#b05cff" }, negro: { n: "Negro", m: 100, w: .5, c: "#15151b" } };
let goldT = "oro";
function pickGold() {
  let r = Math.random() * 100; goldT = "oro"; for (const k in GT) if ((r -= GT[k].w) < 0) { goldT = k; break; }
  golden.style.background = `radial-gradient(circle at 35% 30%, #fff, ${GT[goldT].c} 55%, #000)`; golden.style.boxShadow = `0 0 22px 6px ${GT[goldT].c}`;
}
RENDER["m-gal"] = () => {
  $("b-gal").innerHTML = `<p class="sum">Cada huevo de oro que atrapas queda registrado. Los raros dan mucho más (x3, x8, x25, x100).</p><ul class="cards">` + Object.keys(GT).map((k) => {
    const n = state.gold[k] || 0, g = GT[k];
    return `<li class="cd${n ? "" : " off"}" style="--rc:${g.c}"><span class="egg-ic" style="background:radial-gradient(circle at 35% 30%,#fff,${n ? g.c : "#999"} 55%,#000)"></span><b>${n ? g.n : "???"}</b><small>${n ? "x" + n + " · premio x" + g.m : "Sin descubrir"}</small></li>`;
  }).join("") + "</ul>";
};

// ---- 6 Fusión
const RK = Object.keys(RAR);
RENDER["m-fuse"] = () => {
  $("b-fuse").innerHTML = '<p class="sum">Junta 3 objetos iguales para conseguir uno de rareza superior al azar. Pierdes el bonus de los 3 usados.</p><ul class="fuse">' + (ITEMS.filter((i) => state.items[i.id]).map((i) => {
    const n = state.items[i.id], nx = RK[RK.indexOf(i.r) + 1];
    return `<li><span class="fi">${svg(i.id, i.col)}</span><span><b>${i.name} x${n}</b><small>${RAR[i.r].n}${nx ? " → " + RAR[nx].n : " (máximo)"}</small></span><button class="btn" data-f="${i.id}"${n >= 3 && nx ? "" : " disabled"}>Fusionar</button></li>`;
  }).join("") || '<li class="sum">Aún no tienes objetos.</li>') + "</ul>";
};
document.addEventListener("click", (e) => {
  const b = e.target.closest("[data-f]"); if (!b) return;
  const it = ITEMS.find((i) => i.id === b.dataset.f), nx = RK[RK.indexOf(it.r) + 1];
  if (!nx || (state.items[it.id] || 0) < 3) return;
  state.items[it.id] -= 3; const r = pick(ITEMS.filter((i) => i.r === nx)); state.items[r.id] = (state.items[r.id] || 0) + 1;
  state.st.fusions = (state.st.fusions || 0) + 1; showCard(`${svg(r.id, r.col)}<b>${r.name}</b><span class="rar">${RAR[r.r].n}</span><small>¡Fusión conseguida!</small>`, RAR[r.r].c); RENDER["m-fuse"]();
});

// ---- 1 Misiones diarias/semanales, 3 Pase de temporada
const STAT = { clicks: () => state.st.clicks, crits: () => state.st.crits, chests: () => state.st.chests, golds: () => state.st.golds, spins: () => state.st.spins || 0, bosses: () => state.st.bosses || 0, games: () => state.st.games || 0, fusions: () => state.st.fusions || 0 };
const QP = [
  { s: "clicks", n: "Toca a Ricopio %n veces", d: 150, w: 2500 }, { s: "crits", n: "Consigue %n golpes críticos", d: 10, w: 120 }, { s: "chests", n: "Abre %n cofres", d: 2, w: 14 },
  { s: "golds", n: "Atrapa %n huevos de oro", d: 1, w: 6 }, { s: "spins", n: "Gira la ruleta %n veces", d: 1, w: 7 }, { s: "bosses", n: "Derrota %n zorros", d: 1, w: 5 },
  { s: "games", n: "Juega %n minijuegos", d: 2, w: 12 }, { s: "fusions", n: "Fusiona objetos %n veces", d: 1, w: 6 },
];
const snap = () => { const o = {}; for (const k in STAT) o[k] = STAT[k](); return o; };
function newSet(seed, n) { const r = seedRand(seed), ids = []; while (ids.length < n) { const i = Math.floor(r() * QP.length); if (!ids.includes(i)) ids.push(i); } return { ids, base: snap(), done: [] }; }
function ensureQuests() {
  const dk = dayKey(), wk = weekKey(); if (!state.q) state.q = { day: "", wk: "", d: null, w: null, streak: 0 };
  const q = state.q;
  if (q.day !== dk) { const pv = new Date(); pv.setDate(pv.getDate() - 1); q.streak = q.day === dayKey(pv) ? q.streak + 1 : 1; q.day = dk; q.d = newSet("d" + dk, 3); }
  if (q.wk !== wk) { q.wk = wk; q.w = newSet("w" + wk, 2); }
}
RENDER["m-quests"] = () => {
  ensureQuests(); const q = state.q;
  const list = (k, t) => q[k].ids.map((i, j) => { const p = QP[i], tg = k === "d" ? p.d : p.w, pr = Math.min(tg, STAT[p.s]() - q[k].base[p.s]), done = q[k].done.includes(i); return `<li class="qrow"><span><b>${p.n.replace("%n", tg)}</b><div class="bar"><div style="width:${pr / tg * 100}%"></div></div><small>${fmt(pr)} / ${tg}</small></span><button class="btn" data-q="${k}:${i}"${done || pr < tg ? " disabled" : ""}>${done ? "Hecho" : "Reclamar"}</button></li>`; }).join("");
  $("b-quests").innerHTML = `<p class="sum">Racha de días: <b>${q.streak}</b> (+10% de premio por día, máx. +100%)</p><h3>Diarias</h3><ul class="quests">${list("d")}</ul><h3>Semanales</h3><ul class="quests">${list("w")}</ul>`;
};
document.addEventListener("click", (e) => {
  const b = e.target.closest("[data-q]"); if (!b || b.dataset.q.indexOf(":") < 0) return;
  const [k, i] = b.dataset.q.split(":"), q = state.q; if (q[k].done.includes(+i)) return; q[k].done.push(+i);
  const m = 1 + .1 * Math.min(10, q.streak), g = Math.max(2000, perSec() * 900) * m * (k === "w" ? 8 : 1); gain(g);
  if (k === "w") addChest("oro"); passXp(k === "w" ? 100 : 25);
  confetti(stage.clientWidth / 2, stage.clientHeight / 2, 30); toast("Misión completada +" + fmt(g)); sfx(990, .15); save(); render(); RENDER["m-quests"]();
});
const PASS_N = 30, PASS_XP = 100, MESES = "Enero,Febrero,Marzo,Abril,Mayo,Junio,Julio,Agosto,Septiembre,Octubre,Noviembre,Diciembre".split(",");
function passState() { const k = monthKey(); if (!state.pass || state.pass.key !== k) state.pass = { key: k, xp: 0, claimed: [] }; return state.pass; }
function passXp(n) { passState().xp += n; }
const passLvl = () => Math.min(PASS_N, Math.floor(passState().xp / PASS_XP));
const seasonId = (k) => "pase" + k.replace("-", "");
for (let i = 0; i < 12; i++) {
  const d = new Date(); d.setDate(1); d.setMonth(d.getMonth() - i); const k = dayKey(d).slice(0, 7), m = d.getMonth();
  COSM.skin.push({ id: seasonId(k), n: "Temporada " + MESES[m] + (i ? " " + d.getFullYear() : ""), secret: 1, bn: ["sec", .4], cls: "shine", v: [`hsl(${m * 30} 80% 60%)`, `hsl(${m * 30} 70% 45%)`, `hsl(${m * 30} 90% 85%)`] });
}
function passReward(i) {
  if (i === PASS_N) return { t: "skin", x: "Aspecto de temporada exclusivo + cofre mítico" };
  if (i % 10 === 0) return { t: "chest", k: "arcano", x: "Cofre arcano" };
  if (i % 5 === 0) return { t: "chest", k: "oro", x: "Cofre de oro" };
  return { t: "coin", x: "Ricoins" };
}
RENDER["m-pass"] = () => {
  const ps = passState(), L = passLvl();
  $("b-pass").innerHTML = `<p class="sum">Temporada de ${MESES[new Date().getMonth()]} · nivel <b>${L}</b>/${PASS_N} · ${ps.xp % PASS_XP}/${PASS_XP} XP. Gana XP con misiones, logros, cofres, zorros y renaciendo.</p><div class="bar"><div style="width:${L >= PASS_N ? 100 : ps.xp % PASS_XP}%"></div></div><div class="passl">` + Array.from({ length: PASS_N }, (_, j) => {
    const i = j + 1, r = passReward(i), done = ps.claimed.includes(i), ok = L >= i;
    return `<button class="node${done ? " has" : ""}" data-pass="${i}"${!ok || done ? " disabled" : ""}><b>Nivel ${i}</b><small>${r.x}</small><span>${done ? "✓" : ok ? "Reclamar" : "🔒"}</span></button>`;
  }).join("") + "</div>";
};
document.addEventListener("click", (e) => {
  const b = e.target.closest("[data-pass]"); if (!b) return; const i = +b.dataset.pass, ps = passState();
  if (passLvl() < i || ps.claimed.includes(i)) return; ps.claimed.push(i); const r = passReward(i);
  if (r.t === "coin") gain(Math.max(500, perSec() * 60) * (1 + i / 5)); else if (r.t === "chest") addChest(r.k);
  else { state.cosm.own.push("skin:" + seasonId(ps.key)); addChest("mitico"); toast("¡Aspecto de temporada desbloqueado!"); renderWard(); }
  confetti(stage.clientWidth / 2, stage.clientHeight / 2, 25); sfx(990, .15); save(); render(); RENDER["m-pass"]();
});

// ---- 4 Ascender
const PERKS = [{ id: "gprod", n: "Plumas de poder", d: "+20% producción global", c: 1 }, { id: "gxp", n: "Sabiduría", d: "+25% XP al renacer", c: 2 }, { id: "gchest", n: "Cofres veloces", d: "-5% espera de cofres", c: 2 }, { id: "gwheel", n: "Ruleta veloz", d: "-3% espera de ruleta", c: 3 }];
RENDER["m-asc"] = () => {
  const can = state.reb >= 5, g = Math.max(1, Math.floor(state.reb / 5));
  $("b-asc").innerHTML = `<p class="sum">Ascensiones: <b>${state.asc}</b> (cada una da +50% de producción global) · Plumas doradas: <b>${state.gf}</b></p><p class="sum small">Necesitas 5 renacimientos. Ascender reinicia renacimientos, árbol, XP, ricoins y mejoras. Conservas aspectos, logros, objetos, cartas, mascotas y mutaciones. Ganarías <b>${g}</b> pluma${g > 1 ? "s" : ""}.</p><button id="ascGo" class="btn wide reb"${can ? "" : " disabled"}>Ascender</button><h3>Plumas doradas</h3>` + PERKS.map((p) => { const l = gl(p.id), c = p.c * (l + 1); return `<button class="node${l ? " has" : ""}" data-perk="${p.id}"${l >= 10 || state.gf < c ? " disabled" : ""}><b>${p.n} ${l}/10</b><small>${p.d}</small><span>${l >= 10 ? "Máx." : c + " 🪶"}</span></button>`; }).join("");
};
document.addEventListener("click", (e) => {
  if (e.target.id === "ascGo") {
    if (state.reb < 5 || !confirm("Vas a ascender y reiniciar renacimientos, árbol, XP, ricoins y mejoras. ¿Seguro?")) return;
    state.gf += Math.max(1, Math.floor(state.reb / 5)); state.asc++; state.reb = 0; state.xp = 0; state.tree = {}; state.coins = 0; state.run = 0; state.owned = {}; combo = 0;
    confetti(innerWidth / 2, innerHeight / 3, 80); toast("¡Has ascendido! Ascensión " + state.asc); passXp(100); save(); render(); renderTree(); RENDER["m-asc"]();
  }
  const p = e.target.closest("[data-perk]"); if (!p) return; const pk = PERKS.find((x) => x.id === p.dataset.perk), c = pk.c * (gl(pk.id) + 1);
  if (state.gf < c || gl(pk.id) >= 10) return; state.gf -= c; state.gp[pk.id] = gl(pk.id) + 1; sfx(880, .12); save(); render(); RENDER["m-asc"]();
});

// ---- 12 Minijuegos
mkModal("games", "Minijuegos", `<p class="sum">Atrapahuevos y Memoria: gratis cada 10 min. Tragaperras: cuesta ricoins.</p><div class="foot"><button class="btn" id="mgC">Atrapahuevos</button><button class="btn" id="mgM">Memoria</button><button class="btn" id="mgS">Tragaperras</button></div><p id="mgHud" class="sum"></p><div id="mgArena" class="arena"></div>`);
const mgCd = (k) => { const l = (state.mgAt[k] || 0) - Date.now(); return l > 0 ? l : 0; };
$("mgC").onclick = () => {
  if (mgCd("c")) return toast("Disponible en " + fmtT(mgCd("c")));
  state.mgAt.c = Date.now() + 600000; const ar = $("mgArena"), hud = $("mgHud"); let sc = 0, t = 20; ar.innerHTML = ""; hud.textContent = "¡Atrapa los huevos! 20 s · 0";
  const sp = setInterval(() => { const e = document.createElement("button"); e.className = "mgegg" + (Math.random() < .12 ? " gold" : ""); e.style.left = Math.random() * 86 + "%"; e.style.animationDuration = 1.5 + Math.random() + "s"; e.onclick = () => { sc += e.classList.contains("gold") ? 5 : 1; hud.textContent = "¡Atrapa los huevos! " + t + " s · " + sc; e.remove(); sfx(600 + sc * 8, .05); }; e.addEventListener("animationend", () => e.remove()); ar.appendChild(e); }, 380);
  const tm = setInterval(() => { t--; hud.textContent = "¡Atrapa los huevos! " + t + " s · " + sc; if (t <= 0) { clearInterval(sp); clearInterval(tm); ar.innerHTML = ""; const g = sc * Math.max(100, perSec() * 8); gain(g); state.st.games = (state.st.games || 0) + 1; passXp(5); hud.textContent = "Atrapados " + sc + ": +" + fmt(g) + " ricoins"; confetti(stage.clientWidth / 2, stage.clientHeight / 2, 25); save(); render(); } }, 1000);
};
$("mgM").onclick = () => {
  if (mgCd("m")) return toast("Disponible en " + fmtT(mgCd("m")));
  state.mgAt.m = Date.now() + 600000; const ar = $("mgArena"), hud = $("mgHud"), ic = ITEMS.slice(0, 6), deck = [...ic, ...ic].sort(() => Math.random() - .5); let open = [], moves = 0, found = 0, lock = false;
  hud.textContent = "Encuentra las 6 parejas · movimientos: 0";
  ar.innerHTML = '<div class="mem">' + deck.map((it, i) => `<button class="mc" data-i="${i}"><span>${svg(it.id, it.col)}</span></button>`).join("") + "</div>";
  ar.onclick = (e) => {
    const b = e.target.closest(".mc"); if (!b || lock || b.classList.contains("up")) return; b.classList.add("up"); open.push(b); sfx(500, .05);
    if (open.length === 2) { moves++; hud.textContent = "Encuentra las 6 parejas · movimientos: " + moves; const [a, c] = open;
      if (deck[+a.dataset.i].id === deck[+c.dataset.i].id) { found++; open = []; sfx(900, .1); if (found === 6) { const g = Math.max(500, perSec() * 200) * Math.max(1, (20 - moves) / 6); gain(g); state.st.games = (state.st.games || 0) + 1; passXp(5); hud.textContent = "¡Completado en " + moves + " movimientos! +" + fmt(g); confetti(stage.clientWidth / 2, stage.clientHeight / 2, 30); save(); render(); } }
      else { lock = true; setTimeout(() => { a.classList.remove("up"); c.classList.remove("up"); open = []; lock = false; }, 700); } }
  };
};
$("mgS").onclick = () => {
  const c = Math.max(100, perSec() * 20); if (state.coins < c) return toast("Necesitas " + fmt(c) + " ricoins");
  state.coins -= c; const S = ["gema", "estrella", "trebol", "llave", "diamante", "nido"], ar = $("mgArena"), hud = $("mgHud"), r = [pick(S), pick(S), pick(S)];
  ar.onclick = null; let n = 0; hud.textContent = "Cuesta " + fmt(c) + " ricoins";
  const iv = setInterval(() => { n++; ar.innerHTML = '<div class="reels">' + [0, 1, 2].map((i) => `<span>${svg(n > 6 + i * 3 ? r[i] : pick(S), "#ffd84a")}</span>`).join("") + "</div>"; sfx(300 + n * 20, .04);
    if (n > 12) { clearInterval(iv); const u = new Set(r).size, m = u === 1 ? 12 : u === 2 ? 1.2 : 0, g = c * m; state.st.games = (state.st.games || 0) + 1; if (g) { gain(g); confetti(stage.clientWidth / 2, stage.clientHeight / 2, u === 1 ? 70 : 15); } hud.textContent = g ? "¡Premio! +" + fmt(g) : "Mala suerte…"; render(); } }, 120);
};

// ---- 29 Estadísticas y 27 Títulos
const TITLES = [
  { id: "nov", n: "Pollito novato", f: () => true }, { id: "caza", n: "Cazahuevos", f: () => state.st.golds >= 10 }, { id: "cof", n: "Maestro de cofres", f: () => state.st.chests >= 100 },
  { id: "rey", n: "Rey del corral", f: () => rankIndex() >= 3 }, { id: "ren", n: "Renacido", f: () => state.reb >= 1 }, { id: "col", n: "Coleccionista", f: () => Object.keys(state.cards).length >= 12 },
  { id: "mit", n: "Tocado por lo mítico", f: () => ITEMS.some((i) => i.r === "mitico" && state.items[i.id]) }, { id: "asc", n: "Ascendido", f: () => state.asc >= 1 },
  { id: "dom", n: "Domador", f: () => Object.keys(state.pets).length >= 5 }, { id: "sec", n: "Sin secretos", f: () => EGGS.every((e) => state.eggs[e.id]) },
];
RENDER["m-stats"] = () => {
  const s = state.st, h = state.hist, mx = Math.max(1, ...h.map((v) => Math.log10(1 + v))), pts = h.map((v, i) => `${(i / Math.max(1, h.length - 1)) * 300},${60 - (Math.log10(1 + v) / mx) * 55}`).join(" ");
  const row = (a, b) => `<div class="row"><span>${a}</span><b>${b}</b></div>`;
  $("b-stats").innerHTML = `<p class="sum">Evolución: <b>${EVO[evoIdx()]}</b></p>` + row("Tiempo jugado", fmtH(s.time || 0)) + row("Toques", L(s.clicks)) + row("Críticos", L(s.crits)) + row("Mejor combo", s.maxCombo) + row("Cofres abiertos", s.chests) + row("Huevos de oro", s.golds) + row("Giros de ruleta", s.spins || 0) + row("Zorros derrotados", s.bosses || 0) + row("Minijuegos", s.games || 0) + row("Ricoins totales", fmt(state.total)) + row("Renacimientos / Ascensiones", state.reb + " / " + state.asc) + row("Cartas / Mascotas", Object.keys(state.cards).length + " / " + Object.keys(state.pets).length) +
    `<h3>Producción por segundo (últimos minutos)</h3><svg class="graph" viewBox="0 0 300 64" preserveAspectRatio="none"><polyline points="${pts}" fill="none" stroke="#ff5d73" stroke-width="2.5" stroke-linejoin="round"/></svg><h3>Título</h3><div class="chips">` + TITLES.map((t) => { const ok = t.f(); return `<button class="chip${state.title === t.id || (!state.title && t.id === "nov") ? " on" : ""}" data-ti="${t.id}"${ok ? "" : " disabled"}><b>${ok ? t.n : "???"}</b></button>`; }).join("") + "</div>";
};
document.addEventListener("click", (e) => { const b = e.target.closest("[data-ti]"); if (!b) return; state.title = b.dataset.ti; save(); RENDER["m-stats"](); });
const titleLbl = document.createElement("small"); titleLbl.id = "titleLbl"; $("rankName").after(titleLbl);

// ---- 36 Ranking, 37 Regalos, 38 Reto semanal
const WK = [
  { n: "Semana del dedo: toques x2, producción x0,7", clk: 2, sec: .7 }, { n: "Semana del corral: producción x1,5, toques x0,6", sec: 1.5, clk: .6 },
  { n: "Semana relámpago: todo x1,3", clk: 1.3, sec: 1.3 }, { n: "Semana rica: ricoins de cofres x2", chest: 2 },
  { n: "Semana tranquila: producción x2, toques x0,5", sec: 2, clk: .5 }, { n: "Semana del suertudo: +10 pts de crítico", crit: .1 },
];
const wkMod = () => WK[Math.floor(seedRand("wk" + weekKey())() * WK.length)];
function wkM(t) { const m = wkMod(); return t === "crit" ? 1 : m[t] || 1; }
function wkScore() { if (!state.wk || state.wk.key !== weekKey()) state.wk = { key: weekKey(), start: state.total }; return state.total - state.wk.start; }
const myCard = () => "RC1." + enc(JSON.stringify({ n: state.name || "Anónimo", t: state.total, r: state.reb, a: state.asc, k: Object.keys(state.ach).length, w: weekKey(), ws: wkScore() }));
function copyText(c, msg) { (typeof navigator !== "undefined" && navigator.clipboard ? navigator.clipboard.writeText(c) : Promise.reject()).then(() => toast(msg), () => prompt("Copia el código:", c)); }
RENDER["m-social"] = () => {
  const me = { n: state.name || "Anónimo", t: state.total, r: state.reb, a: state.asc, w: weekKey(), ws: wkScore(), me: 1 }, all = [me, ...state.friends].sort((a, b) => b.t - a.t), wk = all.filter((x) => x.w === weekKey()).sort((a, b) => b.ws - a.ws);
  $("b-social").innerHTML = `<p class="sum small">Sin servidor: os pasáis códigos entre amigos (por chat). Los datos se guardan en tu navegador.</p><label class="row">Tu nombre <input id="myName" maxlength="14" value="${(state.name || "").replace(/"/g, "")}"></label><div class="foot"><button class="btn" data-s="card">Copiar mi tarjeta</button><button class="btn" data-s="add">Añadir amigo (pegar tarjeta)</button></div>
  <h3>Ranking (ricoins totales)</h3><ol class="rank-l">${all.map((x) => `<li class="${x.me ? "me" : ""}"><b>${x.n}</b> · ${fmt(x.t)} · ren ${x.r}${x.a ? " · asc " + x.a : ""}</li>`).join("")}</ol>
  <h3>Reto semanal ${weekKey()}</h3><p class="sum">${wkMod().n}. Tu puntuación: <b>${fmt(wkScore())}</b> ricoins esta semana (el modificador afecta a toda la partida).</p><ol class="rank-l">${wk.map((x) => `<li class="${x.me ? "me" : ""}"><b>${x.n}</b> · ${fmt(x.ws)}</li>`).join("")}</ol>
  <h3>Regalos</h3><div class="foot"><button class="btn" data-s="coin">Regalar ricoins</button><button class="btn" data-s="redeem">Canjear regalo</button></div><ul class="fuse">${ITEMS.filter((i) => state.items[i.id]).map((i) => `<li><span class="fi">${svg(i.id, i.col)}</span><span><b>${i.name} x${state.items[i.id]}</b></span><button class="btn" data-s="gift:${i.id}">Regalar 1</button></li>`).join("")}</ul>`;
};
$("b-social").addEventListener("change", (e) => { if (e.target.id === "myName") { state.name = e.target.value.trim(); save(); } });
$("b-social").addEventListener("click", (e) => {
  const b = e.target.closest("[data-s]"); if (!b) return; const a = b.dataset.s;
  if (a === "card") return copyText(myCard(), "Tarjeta copiada");
  if (a === "add") { const c = prompt("Pega la tarjeta de tu amigo:"); if (!c) return; try { const d = JSON.parse(dec(c.trim().replace(/^RC1\./, ""))); if (typeof d.t !== "number") throw 0; state.friends = state.friends.filter((x) => x.n !== d.n).concat(d).slice(-20); save(); RENDER["m-social"](); } catch { toast("Tarjeta no válida"); } return; }
  if (a === "coin") { const v = Math.floor(+prompt("¿Cuántos ricoins regalas?") || 0); if (v <= 0 || v > state.coins) return toast("Cantidad no válida"); const x = Math.random().toString(36).slice(2, 9); state.coins -= v; state.gifts.push(x); save(); render(); return copyText("RG1." + enc(JSON.stringify({ t: "c", a: v, f: state.name || "Anónimo", x })), "Regalo copiado: pásaselo a tu amigo"); }
  if (a === "redeem") { const c = prompt("Pega el código de regalo:"); if (!c) return; try { const d = JSON.parse(dec(c.trim().replace(/^RG1\./, ""))); if (state.gifts.includes(d.x)) return toast("No puedes canjear tu propio regalo"); if (state.redeemed.includes(d.x)) return toast("Regalo ya canjeado"); state.redeemed.push(d.x); if (d.t === "c") gain(d.a); else state.items[d.id] = (state.items[d.id] || 0) + 1; confetti(stage.clientWidth / 2, stage.clientHeight / 2, 40); toast("¡Regalo de " + d.f + " recibido!"); save(); render(); renderColl(); } catch { toast("Código no válido"); } return; }
  if (a.startsWith("gift:")) { const id = a.slice(5), it = ITEMS.find((i) => i.id === id), x = Math.random().toString(36).slice(2, 9); if (!state.items[id]) return; state.items[id]--; state.gifts.push(x); save(); renderColl(); RENDER["m-social"](); copyText("RG1." + enc(JSON.stringify({ t: "i", id, f: state.name || "Anónimo", x })), "Regalo copiado: " + it.name); }
});

// ---- 9 Huevo sorpresa al abrir
const crack = document.createElement("div"); crack.id = "crack"; crack.className = "crack"; crack.hidden = true;
crack.innerHTML = '<svg viewBox="0 0 100 130" aria-hidden="true"><path class="eg" d="M50 6C78 6 94 56 94 82a44 44 0 0 1-88 0C6 56 22 6 50 6z" fill="#fff8e6" stroke="#2b2118" stroke-width="5"/><path class="ck" d="M18 70l14 12 12-14 12 14 14-12 14 12" fill="none" stroke="#2b2118" stroke-width="4" stroke-linejoin="round"/></svg>';
document.body.appendChild(crack);
{ const _sc = showCard; showCard = (html, color) => {
  if (state.set.rm) return _sc(html, color);
  crack.hidden = false; crack.style.setProperty("--rc", color); crack.classList.remove("go"); void crack.offsetWidth; crack.classList.add("go");
  [300, 380, 460].forEach((f, i) => setTimeout(() => sfx(f, .09), i * 380));
  setTimeout(() => { crack.hidden = true; _sc(html, color); }, 1300);
}; }

// ---- 13 Música dinámica
let mStep = 0;
function mus(f, d, type, g) {
  if (state.muted || !state.set.music) return;
  try { ac = ac || new AudioContext(); const o = ac.createOscillator(), gn = ac.createGain(), t = ac.currentTime; o.type = type; o.frequency.value = f; gn.gain.setValueAtTime(g * state.set.vol, t); gn.gain.exponentialRampToValueAtTime(.0005, t + d); o.connect(gn); gn.connect(ac.destination); o.start(); o.stop(t + d); } catch {}
}
function musicTick() {
  if (started) {
    const sc = MUS[effScene()] || MUS.dia, n = (i) => 196 * Math.pow(2, (sc[i % 5] + 12 * Math.floor(i / 5)) / 12), pat = [0, 2, 1, 3, 2, 4, 3, 1][mStep % 8] + (Math.floor(mStep / 8) % 2) * 2;
    mus(n(pat + 5), .35, "triangle", .06);
    if (mStep % 4 === 0) mus(n(0) / 2, .5, "sine", .09);
    if (combo >= 10 && mStep % 2) mus(n(pat + 10), .15, "square", .02);
    if (combo >= 30) mus(n(pat + 5) * 2, .12, "triangle", .03);
    mStep++;
  }
  setTimeout(musicTick, 280 - Math.min(combo, 60) * 2.5);
}

// ---- 32 Idiomas, 33 Accesibilidad
const EN = { "Tienda": "Shop", "Aspectos": "Looks", "Armario": "Wardrobe", "Renacer": "Rebirth", "Ajustes": "Settings", "Logros": "Achievements", "Secretos": "Secrets", "Más": "More", "Cerrar": "Close", "Mejoras": "Upgrades", "Potenciadores": "Boosts", "Mutaciones": "Mutations", "Colección": "Collection", "Caminos": "Paths", "Iniciar": "Start", "Continuar": "Continue", "Cargar partida": "Load game", "Guardar partida": "Save game", "Empezar de cero": "Start over", "Girar": "Spin", "Ruleta": "Wheel", "Volumen": "Volume", "Estilo de sonido": "Sound style", "Partículas y confeti": "Particles and confetti", "Sacudida en críticos": "Shake on crits", "Cristal líquido (estilo iPhone)": "Liquid glass (iPhone style)", "Música": "Music", "Idioma": "Language", "Tamaño de texto": "Text size", "Modo daltonismo": "Colorblind mode", "Reducir animaciones": "Reduce motion", "Mundo según la hora": "World by time of day", "Notificaciones": "Notifications", "Copiar código": "Copy code", "Pegar código": "Paste code", "Ver tutorial": "Show tutorial", "Misiones": "Quests", "Pase": "Pass", "Mascotas": "Pets", "Fusión": "Fusion", "Álbum": "Album", "Huevos de oro": "Golden eggs", "Minijuegos": "Minigames", "Estadísticas": "Stats", "Ascender": "Ascend", "Social": "Social", "Diarias": "Daily", "Semanales": "Weekly", "Reclamar": "Claim", "Hecho": "Done", "Fusionar": "Fuse", "Sonido: sí": "Sound: on", "Sonido: no": "Sound: off", "Easter eggs": "Easter eggs", "Árbol de habilidades": "Skill tree", "Renacer ahora": "Rebirth now", "Atrapahuevos": "Egg catcher", "Memoria": "Memory", "Tragaperras": "Slots", "Título": "Title", "Ranking (ricoins totales)": "Ranking (total coins)", "Regalos": "Gifts", "Canjear regalo": "Redeem gift", "Regalar ricoins": "Gift coins", "Copiar mi tarjeta": "Copy my card", "Máx": "Max" };
let _lg = "";
function applyLang() {
  if (typeof document.createTreeWalker !== "function") return;
  const en = state.set.lang === "en"; if (!en && !_lg) return; _lg = en ? "en" : "";
  const w = document.createTreeWalker(document.body, 4); let n;
  while ((n = w.nextNode())) { if (n._es === undefined) n._es = n.nodeValue; const t = n._es.trim(); if (t && (EN[t] || n.nodeValue !== n._es)) n.nodeValue = n._es.replace(t, en && EN[t] ? EN[t] : t); }
}
const ORIGC = {};
const CBC = { comun: "#999999", raro: "#0072b2", epico: "#cc79a7", legendario: "#e69f00", mitico: "#d55e00" };
let _ap = "";
function applySet() {
  const s = [state.set.big, state.set.rm, state.set.cb, state.set.lang].join(); if (s === _ap) return; _ap = s;
  document.documentElement.style.fontSize = state.set.big + "%"; document.body.classList.toggle("rm", !!state.set.rm);
  for (const k in RAR) { if (!ORIGC[k]) ORIGC[k] = { r: RAR[k].c, a: AR[k] && AR[k].c }; RAR[k].c = state.set.cb ? CBC[k] : ORIGC[k].r; if (AR[k]) AR[k].c = state.set.cb ? CBC[k] : ORIGC[k].a; }
  renderColl(); applyLang();
}
$("m-set").querySelector(".mbody").insertAdjacentHTML("afterbegin", `<label class="row">Música <input id="music" type="checkbox"></label><label class="row">Idioma <select id="lang"><option value="es">Español</option><option value="en">English</option></select></label><label class="row">Tamaño de texto <select id="big"><option value="100">Normal</option><option value="115">Grande</option><option value="130">Muy grande</option></select></label><label class="row">Modo daltonismo <input id="cb" type="checkbox"></label><label class="row">Reducir animaciones <input id="rm" type="checkbox"></label><label class="row">Mundo según la hora <input id="auto" type="checkbox"></label><label class="row">Notificaciones <input id="notif" type="checkbox"></label><div class="foot"><button id="codeCopy" class="btn">Copiar código</button><button id="codePaste" class="btn">Pegar código</button><button id="tutBtn" class="btn">Ver tutorial</button></div><p class="sum small">Atajos: 1 Tienda · 2 Aspectos · 3 Armario · 4 Renacer · 5 Ruleta · 6 Logros · 7 Secretos · 8 Ajustes · 9 Más</p>`);
{ const _ss = syncSet; syncSet = () => { _ss(); $("music").checked = state.set.music; $("lang").value = state.set.lang; $("big").value = state.set.big; $("cb").checked = state.set.cb; $("rm").checked = state.set.rm; $("auto").checked = state.set.auto; $("notif").checked = state.set.notif; }; }
["music", "cb", "rm", "auto", "notif"].forEach((k) => ($(k).onchange = () => { state.set[k] = $(k).checked; if (k === "notif" && $(k).checked && typeof Notification !== "undefined") Notification.requestPermission(); if (k === "auto") applyLook(); save(); applySet(); }));
$("lang").onchange = () => { state.set.lang = $("lang").value; save(); applySet(); };
$("big").onchange = () => { state.set.big = +$("big").value; save(); applySet(); };
// ---- 31 Guardado por código
function loadState(d) { if (typeof d.coins !== "number") throw 0; state = fix(d); save(); rank = rankIndex(); _ap = ""; applyLook(); renderColl(); renderWard(); render(); syncIntro(); toast("Partida cargada"); }
$("codeCopy").onclick = () => copyText("RC-" + enc(JSON.stringify(state)), "Código de partida copiado");
$("codePaste").onclick = () => { const c = prompt("Pega tu código de partida:"); if (!c) return; try { loadState(JSON.parse(dec(c.trim().replace(/^RC-/, "")))); } catch { toast("Código no válido"); } };

// ---- 34 Tutorial
const TUT = ["¡Hola! Soy Ricopio. Toca sobre mí para ganar ricoins.", "Con los ricoins compra mejoras en la Tienda (arriba a la derecha) para que trabajen por ti.", "Los cofres caen en pantalla: se guardan abajo en 4 ranuras con temporizador.", "Arriba a la izquierda está la ruleta: una tirada gratis cada 5 minutos.", "A la izquierda tienes Ajustes, Logros, Secretos y el menú Más con misiones, mascotas, cartas y mucho más.", "Cuando llegues al objetivo, Renacer te da bonus permanentes. ¡Diviértete!"];
const tut = document.createElement("div"); tut.id = "tut"; tut.className = "tut"; tut.hidden = true; document.body.appendChild(tut);
let tutI = 0;
function showTut(i) { tutI = i; if (i >= TUT.length) { tut.hidden = true; state.tut = 1; save(); return; } tut.hidden = false; tut.innerHTML = `<div class="tc">${petSvg("#ffc928")}</div><p>${TUT[i]}</p><button class="btn" data-t="n">${i === TUT.length - 1 ? "¡Vamos!" : "Siguiente"}</button><button class="btn" data-t="s">Saltar</button>`; }
tut.addEventListener("click", (e) => { const b = e.target.closest("[data-t]"); if (b) showTut(b.dataset.t === "s" ? 99 : tutI + 1); });
$("tutBtn").onclick = () => { closeM(); showTut(0); };

// Atajos de teclado
addEventListener("keydown", (e) => {
  if (!started || /INPUT|TEXTAREA|SELECT/.test((e.target && e.target.tagName) || "")) return;
  const m = { 1: "m-shop", 2: "m-skins", 4: "m-reb", 5: "m-wheel", 6: "m-ach", 7: "m-egg", 8: "m-set", 9: "m-hub" }[e.key];
  if (m) openM(m); else if (e.key === "3") { $("wardrobe").hidden = false; renderWard(); }
});

// ---- Logros y easter eggs nuevos
EGGS.push(
  { id: "vuelta", n: "Te echaba de menos", h: "Ricopio se alegra cuando vuelves después de dejarlo solo un buen rato (cambia de pestaña unos segundos)." },
  { id: "orden", n: "Ritmo secreto", h: "Un saludo en cuatro tiempos: pollo, pollo, título y sol, uno tras otro." },
  { id: "fecha", n: "Día señalado", h: "Juega en Navidad, Año Nuevo o Halloween." },
  { id: "gallina", n: "La pareja", h: "Escribe el nombre de la compañera de Ricopio." },
  { id: "corto", n: "Rápido y furioso", h: "Toca a Ricopio 15 veces en menos de 2 segundos." });
ACH.push(
  { id: "s1", n: "Sin manos", d: "Compra 10 mejoras con menos de 100 toques", r: "epico", sec: 1, f: () => tierMax() >= 10 && state.st.clicks < 100 },
  { id: "s2", n: "Domador", d: "Ten 3 mascotas de nivel 5", r: "epico", sec: 1, f: () => Object.values(state.pets).filter((v) => v >= 5).length >= 3 },
  { id: "s3", n: "Maratón", d: "Juega 2 horas en total", r: "raro", sec: 1, f: () => (state.st.time || 0) >= 7200 },
  { id: "s4", n: "Oro negro", d: "Atrapa un huevo de oro negro", r: "legendario", sec: 1, f: () => (state.gold.negro || 0) >= 1 },
  { id: "s5", n: "Ascendido", d: "Asciende por primera vez", r: "legendario", sec: 1, f: () => state.asc >= 1 },
  { id: "s6", n: "Álbum completo", d: "Consigue las 24 cartas", r: "mitico", sec: 1, f: () => CARDS.every((c) => state.cards[c.id]) },
  { id: "s7", n: "Cazazorros", d: "Derrota 10 zorros", r: "raro", f: () => (state.st.bosses || 0) >= 10 },
  { id: "s8", n: "Nivel pase 30", d: "Completa el pase de temporada", r: "epico", f: () => passLvl() >= PASS_N });

// ---- Bucle extra
let T3 = 0, notified = {}, _tl = "";
function notify(k, msg) { if (!state.set.notif || !document.hidden || typeof Notification === "undefined" || Notification.permission !== "granted" || notified[k]) return; notified[k] = 1; try { new Notification("Ricopio", { body: msg }); } catch {} }
let hideAt = 0;
document.addEventListener("visibilitychange", () => { if (document.hidden) hideAt = Date.now(); else if (started && hideAt && Date.now() - hideAt > 10000) egg("vuelta"); });
let seq = [], cl2 = [];
document.addEventListener("click", (e) => {
  if (!started) return; const t = e.target, k = t.closest("#chick") ? "chick" : t.closest("#title") ? "title" : t.closest(".sun") ? "sun" : t.closest(".cloud") ? "cloud" : ""; if (!k) return;
  seq = [...seq, k].slice(-4); if (seq.join() === "chick,chick,title,sun") egg("orden");
  if (k === "chick") { const n = Date.now(); cl2 = cl2.filter((x) => n - x < 2000); cl2.push(n); if (cl2.length >= 15) egg("corto"); }
});
addEventListener("keydown", (e) => { typed2 = (typed2 + (e.key.length === 1 ? e.key.toLowerCase() : "")).slice(-10); if (started && typed2.endsWith("gallina")) egg("gallina"); });
let typed2 = "";
{ const _tm = tickMore; tickMore = () => { _tm(); tick3(); }; }
function tick3() {
  T3++; if (!started) return;
  state.st.time = (state.st.time || 0) + .1;
  const idle = Date.now() - lastAct, h = new Date().getHours(), mood = idle > 90000 || (h < 6 && idle > 30000) ? "sleep" : idle > 30000 ? "bored" : combo >= 8 ? "happy" : "";
  if ($("chick").dataset.mood !== mood) $("chick").dataset.mood = mood;
  if (T3 % 100 === 0) { state.hist.push(perSec()); if (state.hist.length > 60) state.hist.shift(); ensureQuests(); passState(); const d = new Date(); if ((d.getMonth() === 11 && d.getDate() === 25) || (d.getMonth() === 0 && d.getDate() === 1) || (d.getMonth() === 9 && d.getDate() === 31)) egg("fecha"); }
  if (T3 % 5 === 0) ambient();
  if (T3 % 20 === 0) { applyEvo(); petsStage(); const t = TITLES.find((x) => x.id === (state.title || "nov")); titleLbl.textContent = t && t.f() ? t.n : "Pollito novato"; if (state.set.auto) applyLook(); }
  if (Date.now() > nextSay) { nextSay = Date.now() + 25000 + Math.random() * 20000; say(pick(idle > 45000 ? ["¿Hola? ¿Sigues ahí?", "Me aburro…"] : h < 6 ? ["Zzz…", "¿No es hora de dormir?"] : ["¡Pío!", "Hoy me siento rico.", "Dame toquecitos.", "¿Ya giraste la ruleta?", "Hay cofres esperando."])); }
  if (ev) { if (Date.now() >= ev.end) { ev = null; evBan.hidden = true; } else { evBan.hidden = false; evBan.textContent = ev.n.split("!")[0] + "! " + Math.ceil((ev.end - Date.now()) / 1000) + " s"; if (ev.id === "tormenta" && T3 % 3 === 0) spray("coin", Math.random() * stage.clientWidth, 0, 1, 800, 40); } }
  if (boss) { if (Date.now() >= boss.end) { boss = null; $("boss").hidden = true; toast("El zorro escapó…"); } else $("bossBar").style.width = (boss.hp / boss.max) * 100 + "%"; }
  const wl = state.wheelAt - Date.now(); if (wl <= 0) notify("w", "¡La ruleta está lista!"); else delete notified.w;
  state.slots.forEach((s, i) => { if (s && s.end && s.end <= Date.now()) notify("s" + i, "¡Un cofre está listo!"); else delete notified["s" + i]; });
}
// Racha de ruleta
function bumpStreak() { const t = dayKey(), pv = new Date(); pv.setDate(pv.getDate() - 1); if (state.wday !== t) { state.wstreak = state.wday === dayKey(pv) ? state.wstreak + 1 : 1; state.wday = t; } }
const wStreakM = () => 1 + .1 * Math.min(10, state.wstreak || 0);

// ---- 2 Producción offline
let pendingOff = null;
(function () {
  const away = state.last ? Date.now() - state.last : 0;
  if (away > 60000 && state.total > 0) { const g = perSec() * Math.min(away / 1000, 28800) * .5; if (g > 0) { gain(g); pendingOff = { g, away }; if (away > 1800000) addChest(away > 7200000 ? "plata" : "madera", true); } }
})();
$("start").addEventListener("click", () => {
  musicTick();
  if (pendingOff) { const p = pendingOff; pendingOff = null; setTimeout(() => showCard(`${svg("reloj", "#ffd84a")}<b>+${fmt(p.g)} ricoins</b><span class="rar">Mientras no estabas</span><small>${fmtH(p.away / 1000)} fuera (al 50%)</small>`, "#ffc928"), 1200); }
  if (!state.tut) setTimeout(() => showTut(0), 1500);
});
ensureQuests(); passState(); wkScore();
function extraMult() { return (1 + .2 * gl("gprod")) * (1 + .5 * state.asc) * (1 + cardBonus()) * (1 + petBn("all")); }
function secX() { return (1 + petBn("sec")) * (1 + worldBn("sec")) * evM("sec") * wkM("sec"); }
function clkX() { return (1 + petBn("clk")) * (1 + worldBn("clk")) * evM("clk") * wkM("clk"); }
if (typeof navigator !== "undefined" && "serviceWorker" in navigator && /^https?:/.test(location.protocol)) navigator.serviceWorker.register("sw.js").catch(() => {});

applyLook();
$("introChick").appendChild($("chick").firstElementChild.cloneNode(true));
$("mute").textContent = "Sonido: " + (state.muted ? "no" : "sí");
syncIntro(); renderColl(); renderWard();
rank = rankIndex();
render();
