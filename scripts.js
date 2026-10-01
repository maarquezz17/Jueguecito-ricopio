// Ricopio: toca al pollito rico, gana ricoins, compra mejoras y sube de rango.
const UPGRADES = [
  { id: "grano",     icon: "🌾", name: "Grano de oro",    desc: "+1 por toque",     base: 15,    click: 1 },
  { id: "nido",      icon: "🪺", name: "Nido cómodo",     desc: "+1 por segundo",   base: 50,    sec: 1 },
  { id: "gallinero", icon: "🐔", name: "Gallinero",       desc: "+5 por segundo",   base: 300,   sec: 5 },
  { id: "granja",    icon: "🚜", name: "Granja",          desc: "+25 por segundo",  base: 2000,  sec: 25 },
  { id: "banco",     icon: "🏦", name: "Banco de huevos", desc: "+150 por segundo", base: 15000, sec: 150 },
];
const RANKS = [
  { name: "Pollito sin un duro", at: 0 },
  { name: "Pollito rico",        at: 500 },
  { name: "Gallo magnate",       at: 20000 },
  { name: "Rey del corral",      at: 1000000 },
];
const SAVE_KEY = "ricopio-save";
const $ = (id) => document.getElementById(id);

let state = load();
let rank = 0;

function load() {
  let s = { coins: 0, total: 0, owned: {} };
  try { s = { ...s, ...JSON.parse(localStorage.getItem(SAVE_KEY)) }; } catch {}
  s.total = Math.max(s.total, s.coins);
  return s;
}
function save() { try { localStorage.setItem(SAVE_KEY, JSON.stringify(state)); } catch {} }

const owned = (u) => state.owned[u.id] || 0;
const cost = (u) => Math.ceil(u.base * Math.pow(1.15, owned(u)));
const perClick = () => 1 + UPGRADES.reduce((n, u) => n + (u.click || 0) * owned(u), 0);
const perSec = () => UPGRADES.reduce((n, u) => n + (u.sec || 0) * owned(u), 0);
const fmt = (n) => (n >= 1e6 ? (n / 1e6).toFixed(2) + "M" : n >= 1e4 ? (n / 1e3).toFixed(1) + "k" : Math.floor(n).toString());
const rankIndex = () => RANKS.reduce((r, x, i) => (state.total >= x.at ? i : r), 0);

function gain(n) { state.coins += n; state.total += n; }

// Tienda
const shop = $("shop");
UPGRADES.forEach((u) => {
  const li = document.createElement("li");
  li.innerHTML = `<button class="item" data-id="${u.id}"><span class="ico">${u.icon}</span><span><b>${u.name} (<span class="n">0</span>)</b><small>${u.desc}</small></span><span class="cost"></span></button>`;
  li.firstChild.addEventListener("click", () => buy(u));
  shop.appendChild(li);
});

function buy(u) {
  const c = cost(u);
  if (state.coins < c) return;
  state.coins -= c;
  state.owned[u.id] = owned(u) + 1;
  save();
  renderFarm();
  render();
}

// La granja crece en el paisaje con cada compra (máx. 6 iconos por mejora)
function renderFarm() {
  $("farm").innerHTML = UPGRADES.map((u) => `<span>${u.icon.repeat(Math.min(owned(u), 6))}</span>`).join("");
}

function render() {
  $("coins").textContent = fmt(state.coins);
  $("perClick").textContent = fmt(perClick());
  $("perSec").textContent = fmt(perSec());
  UPGRADES.forEach((u) => {
    const btn = shop.querySelector(`[data-id="${u.id}"]`);
    btn.querySelector(".n").textContent = owned(u);
    btn.querySelector(".cost").textContent = fmt(cost(u));
    btn.disabled = state.coins < cost(u);
  });
  // Rango
  const r = rankIndex();
  const next = RANKS[r + 1];
  $("rankName").textContent = RANKS[r].name;
  $("rankBar").style.width = (next ? ((state.total - RANKS[r].at) / (next.at - RANKS[r].at)) * 100 : 100) + "%";
  $("chick").dataset.rank = r;
  if (r > rank) toast("¡Ahora eres " + RANKS[r].name + "!");
  rank = r;
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
function floater(text, x, y) {
  const el = document.createElement("span");
  el.className = "floater";
  el.textContent = text;
  el.style.left = x + "px";
  el.style.top = y + "px";
  $("floaters").appendChild(el);
  setTimeout(() => el.remove(), 900);
}
function burst(x, y, n = 7) {
  for (let i = 0; i < n; i++) {
    const c = document.createElement("i");
    const a = Math.random() * Math.PI * 2, d = 60 + Math.random() * 70;
    c.className = "coin";
    c.style.cssText = `left:${x}px;top:${y}px;--dx:${Math.cos(a) * d}px;--dy:${Math.sin(a) * d - 40}px`;
    $("floaters").appendChild(c);
    setTimeout(() => c.remove(), 750);
  }
}

// Aura dorada: reinicia la animación en cada toque
function aura() {
  [$("aura"), $("chick")].forEach((el, i) => {
    const cls = i ? "glow" : "on";
    el.classList.remove(cls);
    void el.offsetWidth;
    el.classList.add(cls);
  });
}

// Tocar a Ricopio
$("chick").addEventListener("click", (e) => {
  const g = perClick();
  gain(g);
  const r = $("floaters").getBoundingClientRect();
  // Con teclado clientX vale 0: usamos el centro.
  const x = e.clientX ? e.clientX - r.left : r.width / 2;
  const y = e.clientY ? e.clientY - r.top : r.height / 2;
  floater("+" + fmt(g), x, y);
  burst(x, y);
  aura();
  render();
});

// Producción automática
setInterval(() => {
  const s = perSec();
  if (s > 0) { gain(s / 10); render(); }
}, 100);
setInterval(save, 5000);

// Huevo de oro
const golden = $("golden");
function spawnGolden() {
  const st = golden.parentElement;
  golden.style.left = 10 + Math.random() * (st.clientWidth - 80) + "px";
  golden.style.top = 10 + Math.random() * (st.clientHeight - 150) + "px";
  golden.hidden = false;
  setTimeout(() => (golden.hidden = true), 8000);
}
golden.addEventListener("click", () => {
  const prize = Math.max(50, perSec() * 30);
  gain(prize);
  floater("+" + fmt(prize), golden.offsetLeft, golden.offsetTop);
  burst(golden.offsetLeft + 27, golden.offsetTop + 35, 12);
  golden.hidden = true;
  render();
});
(function schedule() {
  setTimeout(() => { spawnGolden(); schedule(); }, 30000 + Math.random() * 30000);
})();

$("reset").addEventListener("click", () => {
  if (confirm("¿Seguro que quieres borrar tu progreso?")) {
    state = { coins: 0, total: 0, owned: {} };
    rank = 0;
    save();
    renderFarm();
    render();
  }
});

window.addEventListener("beforeunload", save);
renderFarm();
rank = rankIndex();
render();
