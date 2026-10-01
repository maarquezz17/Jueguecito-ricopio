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
const svg = (n, c = "#fff8e6") => `<svg viewBox="0 0 24 24" fill="${c}" stroke="#2b2118" stroke-width="1.6" stroke-linejoin="round" stroke-linecap="round" aria-hidden="true">${ICONS[n]}</svg>`;

const TIER_NAMES = ["Grano de oro", "Nido cómodo", "Gallinero", "Comedero automático", "Granja", "Incubadora", "Silo de maíz", "Banco de huevos", "Tractor pollo", "Mercadillo", "Lonja de huevos", "Cooperativa", "Fábrica de tortillas", "Camión de reparto", "Supermercado", "Centro logístico", "Bolsa de valores", "Torre financiera", "Puerto de exportación", "Tren de mercancías", "Mina de oro", "Refinería dorada", "Laboratorio de yemas", "Clonadora de gallinas", "Granja orbital", "Base lunar", "Colonia marciana", "Fábrica de antimateria", "Reactor de yema", "Portal dimensional", "Gallina cuántica", "Huevo de agujero negro", "Forja estelar", "Esfera de corral", "Telar del tiempo", "Viajero temporal", "Oráculo de plumas", "Templo del Gran Huevo", "Gallo semidiós", "Panteón avícola", "Cosechadora de galaxias", "Imperio galáctico", "Cría de universos", "Máquina del multiverso", "Arquitecto de realidades", "Hilo del destino", "Fénix primigenio", "Huevo cósmico", "Ricopio absoluto", "El origen de todo"];
const IC = Object.keys(ICONS);
const UPGRADES = TIER_NAMES.map((name, i) => ({ id: "t" + i, name, ic: IC[i % IC.length], col: `hsl(${(i * 47) % 360} 70% 85%)`, base: 15 * Math.pow(3.8, i), click: i % 5 ? 0 : (i ? .25 * Math.pow(3.3, i) : 1), sec: i % 5 ? .8 * Math.pow(3.3, i) : 0 }));
const RAR = {
  comun:      { n: "Común",      c: "#8aa4b8", w: 60, b: .02 },
  raro:       { n: "Raro",       c: "#3d9bff", w: 28, b: .06 },
  epico:      { n: "Épico",      c: "#b05cff", w: 10, b: .15 },
  legendario: { n: "Legendario", c: "#ffb400", w: 2,  b: .5 },
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
    { id: "rosa", n: "Rosa", p: 150, v: ["#ff9ec7", "#ff78ad", "#ffd0e4"] },
    { id: "menta", n: "Menta", p: 250, v: ["#7ff0c0", "#4fd3a0", "#c8fbe6"] },
    { id: "hielo", n: "Hielo", p: 400, v: ["#8fe0ff", "#5cc3ee", "#d6f4ff"] },
    { id: "coral", n: "Coral", p: 600, v: ["#ff7f6a", "#ee5a45", "#ffc2b6"] },
    { id: "lima", n: "Lima", p: 900, v: ["#b9ee52", "#8fcf2f", "#e1fb9d"] },
    { id: "uva", n: "Uva", p: 1800, v: ["#b57cf0", "#8d54d0", "#e3ccff"] },
    { id: "noche", n: "Noche", p: 3000, v: ["#6a5acd", "#4b3fa8", "#9a8cf0"] },
    { id: "cielo", n: "Cielo", p: 4000, v: ["#6aa8ff", "#4585e8", "#c2dcff"] },
    { id: "carbon", n: "Carbón", p: 9000, v: ["#5a5a66", "#3d3d47", "#9a9aa8"] },
    { id: "sandia", n: "Sandía", p: 16000, v: ["#ff5d73", "#2f9e5a", "#ffd0d6"] },
    { id: "oro", n: "Oro", p: 25000, v: ["#ffd84a", "#e0a800", "#fff0a0"] },
    { id: "lava", n: "Lava", p: 60000, v: ["#ff7a2e", "#d6330f", "#ffd36b"], cls: "shine" },
    { id: "plata", n: "Plata", p: 150000, v: ["#dfe6ee", "#aab6c4", "#fafcff"], cls: "shine" },
    { id: "esmeralda", n: "Esmeralda", p: 600000, v: ["#2fe08a", "#13a860", "#b4ffd8"], cls: "shine" },
    { id: "fantasma", n: "Fantasma", p: 3000000, v: ["#eef3ff", "#c9d3f2", "#ffffff"], cls: "ghost" },
    { id: "arcoiris", n: "Arcoíris", secret: 1, rb: 1, v: ["#ff5d73", "#ffb400", "#ffe27a"] },
    { id: "cosmos", n: "Cosmos", reb: 1, cls: "shine", v: ["#3b2a8c", "#241a63", "#8a7bdc"] },
    { id: "fenix", n: "Fénix", reb: 3, cls: "shine", v: ["#ff6a1a", "#e0200a", "#ffcf4a"] },
    { id: "galaxia", n: "Galaxia", reb: 6, rb: 1, v: ["#7a3cff", "#ff3ca8", "#6ae0ff"] },
    { id: "radio", n: "Radiactivo", reb: 10, cls: "shine", v: ["#b6ff1a", "#7ac700", "#eaff9a"] },
    { id: "veterano", n: "Veterano", achN: 15, v: ["#c98a3b", "#8a5a1f", "#f0cf9a"] },
    { id: "leyenda", n: "Leyenda", achN: 35, rb: 1, v: ["#ffe45c", "#ff9d00", "#fff6c2"] },
    { id: "supremo", n: "Supremo", egg: 1, rb: 1, cls: "shine", v: ["#ffffff", "#ffd84a", "#ffe9fb"] },
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
  s = { coins: 0, total: 0, owned: {}, items: {}, muted: false, boost: {}, cosm: {}, reb: 0, xp: 0, tree: {}, ach: {}, eggs: {}, ...s };
  BOOSTS.forEach((b) => (s.boost[b.id] = { lvl: 0, end: 0, len: 0, ...s.boost[b.id] }));
  s.cosm = { own: [], ...s.cosm, eq: { skin: "clasico", hat: "ninguno", eyes: "ninguno", neck: "ninguno", scene: "dia", ...s.cosm.eq } };
  s.total = Math.max(s.total, s.coins);
  s.run = s.run ?? s.total;
  s.st = { clicks: 0, crits: 0, chests: 0, golds: 0, maxCombo: 0, ...s.st };
  s.set = { vol: .7, snd: "auto", fx: true, shake: true, ...s.set };
  return s;
}
function load() {
  let s = {};
  try { s = JSON.parse(localStorage.getItem(SAVE_KEY)) || {}; } catch {}
  return fix(s);
}
function save() { try { localStorage.setItem(SAVE_KEY, JSON.stringify(state)); } catch {} }

const owned = (u) => state.owned[u.id] || 0;
const tl = (id) => state.tree[id] || 0;
const cost = (u) => Math.ceil(u.base * Math.pow(1.15, owned(u)) * (1 - .02 * tl("cost")));
const bonus = () => 1 + ITEMS.reduce((n, i) => n + (state.items[i.id] || 0) * RAR[i.r].b, 0) * (1 + .1 * tl("itemb"));
const boostOn = (id) => state.boost[id].end > Date.now();
const gmult = () => bonus() * (1 + .25 * state.reb) * achMult();
const perClick = () => (1 + UPGRADES.reduce((n, u) => n + (u.click || 0) * owned(u), 0)) * gmult() * (1 + .1 * tl("clickpow")) * (boostOn("clic") ? 2 : 1);
const perSec = () => UPGRADES.reduce((n, u) => n + (u.sec || 0) * owned(u), 0) * gmult() * (1 + .08 * tl("prod")) * (boostOn("auto") ? 2 : 1);
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
  const c = cost(u);
  if (state.coins < c) return;
  state.coins -= c;
  state.owned[u.id] = owned(u) + 1;
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
    b.querySelector(".cost").textContent = fmt(cost(u));
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
  if (combo && idle > 900) combo = 0;
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
  madera: { n: "Cofre de madera", w: 60, a: "#a8602b", b: "#c27a3a", loot: [70, 25, 5, 0] },
  plata:  { n: "Cofre de plata",  w: 27, a: "#8797a8", b: "#c4d0db", loot: [30, 50, 18, 2] },
  oro:    { n: "Cofre de oro",    w: 11, a: "#d99a00", b: "#ffd84a", loot: [5, 30, 55, 10] },
  arcano: { n: "Cofre arcano",    w: 2,  a: "#6a2fc4", b: "#a566ff", loot: [0, 15, 50, 35] },
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
  chest.classList.add("open"); state.st.chests++;
  confetti(chest.offsetLeft + 50, chest.offsetTop + 30, 26);
  [523, 659, 784, 1047].forEach((f, i) => setTimeout(() => sfx(f, .18), i * 90));
  setTimeout(() => { chest.hidden = true; dropLoot(); }, 800);
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
  const lockedC = allCosm().filter((x) => !x.secret && x.p > 0 && !has(x));
  if (lockedC.length && Math.random() < (chestKind === "oro" || chestKind === "arcano" ? .3 : .12)) {
    const x = lockedC[Math.floor(Math.random() * lockedC.length)];
    state.cosm.own.push(x.key);
    showCard(`${svg("estrella", "#ffd84a")}<b>${x.n}</b><span class="rar">Cosmético nuevo</span><small>Ya está en tu armario</small>`, "#ff5d73");
    return;
  }
  const it = pickItem(), q = RAR[it.r];
  state.items[it.id] = (state.items[it.id] || 0) + 1;
  showCard(`${svg(it.id, it.col)}<b>${it.name}</b><span class="rar">${q.n}</span><small>+${Math.round(q.b * 100)}% a todas tus ganancias</small>`, q.c);
}

$("reveal").addEventListener("click", () => ($("reveal").hidden = true));

// Huevo de oro
const golden = $("golden");
golden.addEventListener("click", () => {
  const prize = Math.max(50, perSec() * 30) * (1 + .2 * tl("gold"));
  gain(prize); state.st.golds++;
  floater("+" + fmt(prize), golden.offsetLeft, golden.offsetTop, true);
  confetti(golden.offsetLeft + 27, golden.offsetTop + 35, 20);
  sfx(1047, .2); golden.hidden = true; render();
});
(function schedule() {
  setTimeout(() => {
    golden.style.left = 10 + Math.random() * (stage.clientWidth - 80) + "px";
    golden.style.top = 10 + Math.random() * (stage.clientHeight - 150) + "px";
    golden.hidden = false;
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
  const e = state.cosm.eq, ch = $("chick"), root = document.documentElement.style;
  const sk = COSM.skin.find((x) => x.id === e.skin), sc = COSM.scene.find((x) => x.id === e.scene);
  ["--body", "--wing", "--belly"].forEach((v, i) => ch.style.setProperty(v, sk.v[i]));
  ch.className = ch.className.replace(/ ?(rainbow|shine|ghost)/g, "") + (sk.rb ? " rainbow" : sk.cls ? " " + sk.cls : "");
  const on = [e.hat, e.eyes, e.neck];
  document.querySelectorAll("#chick .a").forEach((g) => (g.style.display = on.includes(g.dataset.a) ? "inline" : "none"));
  ["--s1", "--s2", "--s3", "--h1", "--h2", "--h3", "--sun", "--tx"].forEach((v, i) => root.setProperty(v, sc.v[i]));
}
function renderWard() {
  $("wardBody").innerHTML = Object.keys(COSM).map((cat) => `<h3>${CATN[cat]}</h3><div class="chips">` + COSM[cat].map((o) => {
    const x = { ...o, cat, key: cat + ":" + o.id }, own = has(x), on = state.cosm.eq[cat] === x.id;
    const sw = x.v ? `<i class="sw" style="background:${x.v[0]}"></i>` : "";
    const tag = on ? "Puesto" : own ? "Poner" : x.secret ? "???" : x.p ? fmt(x.p) + " ricoins" : reqText(x);
    return `<button class="chip${on ? " on" : ""}" data-k="${x.key}"${!own && (x.secret || !x.p) ? " disabled" : ""}><b>${sw}${x.secret && !own ? "Secreto" : x.n}</b><small>${tag}</small></button>`;
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
const openM = (id) => {
  closeM();
  $(id).hidden = false;
  if (id === "m-ach") renderAch();
  if (id === "m-egg") renderEggs();
  if (id === "m-reb") renderTree();
  if (id === "m-set") syncSet();
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
  $("fx").checked = state.set.fx; $("shk").checked = state.set.shake;
  $("mute").textContent = "Sonido: " + (state.muted ? "no" : "sí");
}
$("vol").oninput = () => { state.set.vol = $("vol").value / 100; sfx(660, .1); save(); };
$("snd").onchange = () => { state.set.snd = $("snd").value; sfx(660, .15); save(); };
$("fx").onchange = () => { state.set.fx = $("fx").checked; save(); };
$("shk").onchange = () => { state.set.shake = $("shk").checked; save(); };

// ===== Efectos de balance =====
function critChance() { return .08 + .01 * tl("crit"); }
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
  for (const a of ACH) if (!state.ach[a.id] && a.f()) { state.ach[a.id] = 1; n++; toast("Logro: " + a.n); }
  if (n) { [659, 784, 988].forEach((f, i) => setTimeout(() => sfx(f, .15), i * 80)); save(); renderWard(); if (!$("m-ach").hidden) renderAch(); }
}
function renderAch() {
  const got = ACH.filter((a) => state.ach[a.id]).length;
  $("achSum").textContent = got + " de " + ACH.length + " conseguidos · +" + ((achMult() - 1) * 100).toFixed(1) + "% de producción";
  const keys = Object.keys(AR);
  $("achBody").innerHTML = keys.map((k, d) => ACH.filter((a) => a.r === k).map((a) => {
    const on = state.ach[a.id];
    return `<li class="ach ${on ? "on" : "off"}" style="--rc:${AR[k].c}"><b>${on ? a.n : "Bloqueado"}</b><span>${a.d}</span><em>${AR[k].n} · dificultad ${"★".repeat(d + 1)}${"☆".repeat(4 - d)}</em></li>`;
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
  checkAch();
  if (!started) return;
  if (new Date().getHours() < 6) egg("noche");
  if (Date.now() - lastAct > 60000) egg("zen");
}

// ===== Aspectos en la columna derecha =====
const LOCK = '<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="5" y="11" width="14" height="10" rx="2" fill="#fff8e6" stroke="#2b2118" stroke-width="2"/><path d="M8 11V8a4 4 0 0 1 8 0v3" fill="none" stroke="#2b2118" stroke-width="2"/></svg>';
function renderSkins() {
  $("skinGrid").innerHTML = COSM.skin.map((o) => {
    const x = { ...o, cat: "skin", key: "skin:" + o.id }, own = has(x), on = state.cosm.eq.skin === o.id;
    const tip = own ? o.n : (x.secret ? "Secreto" : o.n) + " · " + (x.p ? fmt(x.p) + " ricoins" : reqText(x));
    return `<li><button class="sk${on ? " on" : ""}${own ? "" : " lk"}" data-k="${x.key}" title="${tip}" aria-label="${tip}"><i style="background:${o.v[0]};--b2:${o.v[1]}"></i>${own ? "" : LOCK}</button></li>`;
  }).join("");
}
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
const rebXp = () => Math.floor((3 + 2 * state.reb) * (1 + .1 * tl("xpg")));
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
  toast("¡Has renacido! Renacimiento " + state.reb);
  save(); renderTree(); renderWard(); render();
};
function renderExtra() { updReb(); }

applyLook();
$("introChick").appendChild($("chick").firstElementChild.cloneNode(true));
$("mute").textContent = "Sonido: " + (state.muted ? "no" : "sí");
syncIntro(); renderColl(); renderWard();
rank = rankIndex();
render();
