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

const UPGRADES = [
  { id: "grano",     name: "Grano de oro",    desc: "+1 por toque",     base: 15,    click: 1 },
  { id: "nido",      name: "Nido cómodo",     desc: "+1 por segundo",   base: 50,    sec: 1 },
  { id: "gallinero", name: "Gallinero",       desc: "+5 por segundo",   base: 300,   sec: 5 },
  { id: "granja",    name: "Granja",          desc: "+25 por segundo",  base: 2000,  sec: 25 },
  { id: "banco",     name: "Banco de huevos", desc: "+150 por segundo", base: 15000, sec: 150 },
];
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
    { id: "hielo", n: "Hielo", p: 400, v: ["#8fe0ff", "#5cc3ee", "#d6f4ff"] },
    { id: "lima", n: "Lima", p: 900, v: ["#b9ee52", "#8fcf2f", "#e1fb9d"] },
    { id: "noche", n: "Noche", p: 3000, v: ["#6a5acd", "#4b3fa8", "#9a8cf0"] },
    { id: "oro", n: "Oro", p: 25000, v: ["#ffd84a", "#e0a800", "#fff0a0"] },
    { id: "arcoiris", n: "Arcoíris", secret: 1, rb: 1, v: ["#ff5d73", "#ffb400", "#ffe27a"] },
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
  s = { coins: 0, total: 0, owned: {}, items: {}, muted: false, boost: {}, cosm: {}, ...s };
  BOOSTS.forEach((b) => (s.boost[b.id] = { lvl: 0, end: 0, len: 0, ...s.boost[b.id] }));
  s.cosm = { own: [], ...s.cosm, eq: { skin: "clasico", hat: "ninguno", eyes: "ninguno", neck: "ninguno", scene: "dia", ...s.cosm.eq } };
  s.total = Math.max(s.total, s.coins);
  return s;
}
function load() {
  let s = {};
  try { s = JSON.parse(localStorage.getItem(SAVE_KEY)) || {}; } catch {}
  return fix(s);
}
function save() { try { localStorage.setItem(SAVE_KEY, JSON.stringify(state)); } catch {} }

const owned = (u) => state.owned[u.id] || 0;
const cost = (u) => Math.ceil(u.base * Math.pow(1.15, owned(u)));
const bonus = () => 1 + ITEMS.reduce((n, i) => n + (state.items[i.id] || 0) * RAR[i.r].b, 0);
const boostOn = (id) => state.boost[id].end > Date.now();
const perClick = () => (1 + UPGRADES.reduce((n, u) => n + (u.click || 0) * owned(u), 0)) * bonus() * (boostOn("clic") ? 2 : 1);
const perSec = () => UPGRADES.reduce((n, u) => n + (u.sec || 0) * owned(u), 0) * bonus() * (boostOn("auto") ? 2 : 1);
const comboMult = () => 1 + Math.min(combo, 60) / 20;
const fmt = (n) => (n >= 1e6 ? (n / 1e6).toFixed(2) + "M" : n >= 1e4 ? (n / 1e3).toFixed(1) + "k" : n < 10 && n % 1 ? n.toFixed(1) : Math.floor(n).toString());
const rankIndex = () => RANKS.reduce((r, x, i) => (state.total >= x.at ? i : r), 0);
const gain = (n) => { state.coins += n; state.total += n; };
const replay = (el, cls) => { el.classList.remove(cls); void el.offsetWidth; el.classList.add(cls); };

// Sonido sintetizado (sin archivos)
function sfx(f, d = .09, type = "triangle") {
  if (state.muted) return;
  try {
    ac = ac || new AudioContext();
    const o = ac.createOscillator(), g = ac.createGain(), t = ac.currentTime;
    o.type = type; o.frequency.value = f;
    g.gain.setValueAtTime(.07, t); g.gain.exponentialRampToValueAtTime(.001, t + d);
    o.connect(g); g.connect(ac.destination); o.start(); o.stop(t + d);
  } catch {}
}

// Tienda
const shop = $("shop");
UPGRADES.forEach((u) => {
  const li = document.createElement("li");
  li.innerHTML = `<button class="item" data-id="${u.id}"><span class="ico">${svg(u.id)}</span><span><b>${u.name} (<span class="n">0</span>)</b><small>${u.desc}</small></span><span class="cost"></span></button>`;
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
  $("bonus").textContent = Math.round((bonus() - 1) * 100);
  UPGRADES.forEach((u) => {
    const b = shop.querySelector(`[data-id="${u.id}"]`);
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
  const crit = Math.random() < .08;
  const g = perClick() * comboMult() * (crit ? 5 : 1);
  gain(g);
  const r = $("floaters").getBoundingClientRect();
  const x = e.clientX ? e.clientX - r.left : r.width / 2; // con teclado clientX = 0
  const y = e.clientY ? e.clientY - r.top : r.height / 2;
  floater((crit ? "¡CRÍTICO! +" : "+") + fmt(g), x, y, crit);
  burst(x, y, 6 + Math.min(combo, 14) + (crit ? 10 : 0));
  replay($("aura"), "on"); replay($("chick"), "glow"); replay($("scoreBox"), "bump");
  if (crit) { replay(stage, "shake"); confetti(x, y, 14); }
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
  renderBoosts();
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
  setTimeout(() => { spawnChest(); schedule(); }, first || 25000 + Math.random() * 20000);
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
  const prize = Math.max(50, perSec() * 30);
  gain(prize);
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
  }, 30000 + Math.random() * 30000);
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
const has = (x) => (!x.p && !x.secret && x.rank === undefined) || state.cosm.own.includes(x.key) || (x.rank !== undefined && rankIndex() >= x.rank);
function applyLook() {
  const e = state.cosm.eq, ch = $("chick"), root = document.documentElement.style;
  const sk = COSM.skin.find((x) => x.id === e.skin), sc = COSM.scene.find((x) => x.id === e.scene);
  ["--body", "--wing", "--belly"].forEach((v, i) => ch.style.setProperty(v, sk.v[i]));
  ch.classList.toggle("rainbow", !!sk.rb);
  const on = [e.hat, e.eyes, e.neck];
  document.querySelectorAll("#chick .a").forEach((g) => (g.style.display = on.includes(g.dataset.a) ? "inline" : "none"));
  ["--s1", "--s2", "--s3", "--h1", "--h2", "--h3", "--sun", "--tx"].forEach((v, i) => root.setProperty(v, sc.v[i]));
}
function renderWard() {
  $("wardBody").innerHTML = Object.keys(COSM).map((cat) => `<h3>${CATN[cat]}</h3><div class="chips">` + COSM[cat].map((o) => {
    const x = { ...o, cat, key: cat + ":" + o.id }, own = has(x), on = state.cosm.eq[cat] === x.id;
    const sw = x.v ? `<i class="sw" style="background:${x.v[0]}"></i>` : "";
    const tag = on ? "Puesto" : own ? "Poner" : x.secret ? "???" : x.rank !== undefined ? "Rango: " + RANKS[x.rank].name : fmt(x.p) + " ricoins";
    return `<button class="chip${on ? " on" : ""}" data-k="${x.key}"${!own && (x.secret || x.rank !== undefined) ? " disabled" : ""}><b>${sw}${x.secret && !own ? "Secreto" : x.n}</b><small>${tag}</small></button>`;
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
const dur = (id) => 15 + 5 * state.boost[id].lvl;
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
    unlock("skin:arcoiris", "¡Código secreto! Plumaje arcoíris", true);
    for (let i = 0; i < 8; i++) setTimeout(() => burst(Math.random() * stage.clientWidth, 0, 6), i * 120);
  }
  if (keys.slice(-7).join("") === "ricopio") {
    gain(1000); render(); toast("¡Me has llamado! +1000");
    confetti(stage.clientWidth / 2, stage.clientHeight / 2, 30);
  }
});
$("title").addEventListener("click", () => {
  tc = Date.now() - tt < 700 ? tc + 1 : 1; tt = Date.now();
  if (tc === 7) { unlock("hat:aureola", "Huevo de pascua: ¡aureola desbloqueada!"); tc = 0; }
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

applyLook();
$("introChick").appendChild($("chick").firstElementChild.cloneNode(true));
$("mute").textContent = "Sonido: " + (state.muted ? "no" : "sí");
syncIntro(); renderColl(); renderWard();
rank = rankIndex();
render();
