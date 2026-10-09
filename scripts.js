// Ricopio: toca, encadena combos, abre cofres, colecciona objetos y sube de rango.
const ICONS = {
  grano: '<path d="M12 2C7 2 4 8 4 14c0 4.5 4 8 8 8s8-3.5 8-8c0-6-3-12-8-12z" fill="#ffd84a"/><path d="M7 14c0-3 2-6 5-8" stroke="#fff" stroke-width="1.5" fill="none" opacity="0.6"/><path d="M12 22c-4 0-8-3.500-8-8 2 3 5 4 8 4z" fill="#000" opacity=".12" stroke="none"/>',
  nido: '<path d="M2 12c0 6 4 9 10 9s10-3 10-9z" fill="#c98a3b"/><ellipse cx="8.500" cy="10" rx="3" ry="4" fill="#fff8e6"/><ellipse cx="15.500" cy="10" rx="3" ry="4" fill="#ffe9bd"/><path d="M7.500 8.500c.5-1 1-1.500 1.500-1.500" stroke="#fff" fill="none" opacity=".8"/><path d="M4 15c4 2 12 2 16 0M6 18c3.500 1.500 8.500 1.500 12 0" fill="none" stroke="#8a5a1f" stroke-width="1"/><path d="M2 12c4 2 16 2 20 0" fill="none" stroke="#8a5a1f" stroke-width="1.600"/>',
  gallinero: '<path d="M2 11l10-8 10 8z" fill="#c0392b"/><rect x="4" y="11" width="16" height="10" fill="#e0b070"/><path d="M4 14.500h16M4 18h16" stroke="#a87a3a" stroke-width=".8" fill="none"/><path d="M9 21v-6a3 3 0 0 1 6 0v6z" fill="#5a3a1a"/><circle cx="12" cy="8" r="1.500" fill="#fff8e6"/><path d="M4 11l8-6.500" stroke="#fff" opacity=".35" fill="none"/>',
  comedero: '<path d="M6 3h12l-2 9H8z" fill="#b9c2cf"/><path d="M8 12h8l1 3H7z" fill="#8a96a6"/><path d="M3 17h18l-2 4H5z" fill="#c27a3a"/><circle cx="8" cy="16" r="1" fill="#ffd84a" stroke="none"/><circle cx="12" cy="16" r="1" fill="#ffd84a" stroke="none"/><circle cx="16" cy="16" r="1" fill="#ffd84a" stroke="none"/><path d="M9 5.500h4" stroke="#fff" opacity=".7" fill="none"/>',
  granja: '<path d="M2 21V10l10-7 10 7v11z" fill="#d8303f"/><path d="M2 10l10-7 10 7" fill="none" stroke="#fff8e6" stroke-width="1.500"/><rect x="7" y="12" width="10" height="9" fill="#fff8e6"/><path d="M7 12l10 9M17 12L7 21" stroke="#d8303f" stroke-width="1.200" fill="none"/><circle cx="12" cy="8" r="1.500" fill="#fff8e6"/>',
  incubadora: '<path d="M4 20V12a8 8 0 0 1 16 0v8z" fill="#bfe9ff" opacity=".85"/><path d="M2 20h20v2.500H2z" fill="#8a96a6"/><ellipse cx="12" cy="16" rx="3" ry="4" fill="#fff8e6"/><path d="M9 2.500h6l-1 3h-4z" fill="#ff7a2e"/><path d="M8 8c1-1.500 2-2 3-2" stroke="#fff" stroke-width="1.200" fill="none" opacity=".8"/><path d="M10 8l-1 2M14 8l1 2M12 8v2" stroke="#ff7a2e" stroke-width="1" fill="none"/>',
  silo: '<path d="M6 8a6 6 0 0 1 12 0v13H6z" fill="#b9c2cf"/><path d="M6 12h12M6 16h12" stroke="#8a96a6" fill="none"/><path d="M9 6c1-2 5-2 6 0" stroke="#fff" opacity=".7" fill="none"/><path d="M10 21v-4h4v4z" fill="#5a6a7a"/><path d="M18 3l3.500 1.500-1 4.500-3-1.500z" fill="#ffd84a"/><path d="M16 14h2" stroke="#fff" opacity=".5" fill="none"/>',
  banco: '<path d="M2 9l10-6 10 6z" fill="#e8d8a0"/><rect x="4" y="10" width="2.500" height="8" fill="#fff8e6"/><rect x="8.500" y="10" width="2.500" height="8" fill="#fff8e6"/><rect x="13" y="10" width="2.500" height="8" fill="#fff8e6"/><rect x="17.500" y="10" width="2.500" height="8" fill="#fff8e6"/><rect x="2" y="18" width="20" height="3" fill="#c9b878"/><ellipse cx="12" cy="7" rx="1.500" ry="2" fill="#fff8e6"/>',
  tractor: '<rect x="11" y="6" width="9" height="8" rx="1" fill="#3a9a4a"/><rect x="3" y="9" width="9" height="6" fill="#3a9a4a"/><rect x="12.500" y="7.500" width="5" height="4" fill="#bfe9ff"/><path d="M5 9V5h2v4" fill="#8a96a6"/><circle cx="17" cy="17" r="4.500" fill="#2b2118"/><circle cx="17" cy="17" r="2" fill="#ffd84a" stroke="none"/><circle cx="6" cy="18" r="3" fill="#2b2118"/><circle cx="6" cy="18" r="1.200" fill="#ffd84a" stroke="none"/>',
  mercadillo: '<path d="M2 8l2-5h16l2 5z" fill="#d8303f"/><path d="M6 3L5 8M10 3l-.5 5M14 3l.5 5M18 3l1 5" stroke="#fff8e6" stroke-width="1.800" fill="none"/><rect x="3" y="12" width="18" height="3" fill="#c27a3a"/><rect x="4" y="15" width="2" height="6" fill="#8a5a1f"/><rect x="18" y="15" width="2" height="6" fill="#8a5a1f"/><ellipse cx="9" cy="10.500" rx="2" ry="2.500" fill="#fff8e6"/><ellipse cx="14" cy="10.500" rx="2" ry="2.500" fill="#ffe9bd"/>',
  lonja: '<path d="M2 12h20l-2 8H4z" fill="#c9b080"/><ellipse cx="6.500" cy="10" rx="2.500" ry="3.200" fill="#fff8e6"/><ellipse cx="12" cy="10" rx="2.500" ry="3.200" fill="#ffe9bd"/><ellipse cx="17.500" cy="10" rx="2.500" ry="3.200" fill="#fff8e6"/><path d="M5 15.500h14" stroke="#a89060" fill="none"/><circle cx="20" cy="4.500" r="3" fill="#ffd84a"/><path d="M20 3v3" stroke="#a87a00" fill="none"/>',
  cooperativa: '<circle cx="12" cy="12" r="8" fill="none" stroke="#6fd06f" stroke-width="2.500"/><ellipse cx="12" cy="5" rx="2.300" ry="3" fill="#fff8e6"/><g transform="rotate(120 12 12)"><ellipse cx="12" cy="5" rx="2.300" ry="3" fill="#ffe9bd"/></g><g transform="rotate(240 12 12)"><ellipse cx="12" cy="5" rx="2.300" ry="3" fill="#fff8e6"/></g><circle cx="12" cy="12" r="2" fill="#ffd84a"/>',
  tortillas: '<rect x="3" y="11" width="18" height="10" fill="#c9b080"/><rect x="15" y="3" width="4" height="8" fill="#8a96a6"/><circle cx="17" cy="1.500" r="1.500" fill="#fff" opacity=".8" stroke="none"/><circle cx="12" cy="16" r="3.500" fill="#fff8e6"/><circle cx="12" cy="16" r="1.600" fill="#ffd84a" stroke="none"/><rect x="5" y="13" width="3" height="3" fill="#bfe9ff"/>',
  camion: '<rect x="1" y="7" width="13" height="10" fill="#fff8e6"/><path d="M14 10h5l3 4v3H14z" fill="#d8303f"/><path d="M16 11h3l1.500 2.500H16z" fill="#bfe9ff" stroke="none"/><ellipse cx="7.500" cy="12" rx="2" ry="2.600" fill="#ffe9bd"/><circle cx="6" cy="18" r="2.600" fill="#2b2118"/><circle cx="18" cy="18" r="2.600" fill="#2b2118"/><circle cx="6" cy="18" r="1" fill="#ccc" stroke="none"/><circle cx="18" cy="18" r="1" fill="#ccc" stroke="none"/>',
  super: '<path d="M2 4h3l3 11h11l2-8H6.500" fill="#6fd3ff"/><path d="M9 9h9M9.500 12h8" stroke="#fff" opacity=".7" fill="none"/><ellipse cx="12" cy="5.500" rx="1.500" ry="2" fill="#fff8e6"/><circle cx="9" cy="19.500" r="1.800" fill="#2b2118"/><circle cx="18" cy="19.500" r="1.800" fill="#2b2118"/>',
  logistica: '<path d="M2 9l10-5 10 5v12H2z" fill="#8a96a6"/><rect x="5" y="12" width="14" height="9" fill="#c4ccd6"/><path d="M5 15h14M5 18h14" stroke="#8a96a6" fill="none"/><rect x="14" y="17" width="4" height="4" fill="#d9a15b"/><rect x="7" y="18" width="4.500" height="3" fill="#c27a3a"/>',
  bolsavalores: '<rect x="2" y="3" width="20" height="18" rx="2" fill="#16302a"/><rect x="5" y="14" width="2" height="4" fill="#d8303f" stroke="none"/><rect x="10" y="12" width="2" height="6" fill="#6fd06f" stroke="none"/><rect x="15" y="9" width="2" height="9" fill="#6fd06f" stroke="none"/><path d="M4 16l5-5 3 3 7-8" fill="none" stroke="#fff8e6" stroke-width="2"/><path d="M15 6h4v4" fill="none" stroke="#fff8e6" stroke-width="2"/>',
  torre: '<rect x="8" y="2" width="8" height="19" fill="#6a8fcf"/><rect x="3" y="10" width="5" height="11" fill="#4a6fb0"/><rect x="16" y="7" width="5" height="14" fill="#4a6fb0"/><path d="M10 6h1.500M12.500 6H14M10 9h1.500M12.500 9H14M10 12h1.500M12.500 12H14M10 15h1.500M12.500 15H14" stroke="#ffe9bd" stroke-width="1.200" fill="none"/><circle cx="12" cy="2" r="2" fill="#ffd84a"/>',
  puerto: '<path d="M2 15h20l-3 5H5z" fill="#2b4a7a"/><rect x="5" y="9" width="4" height="6" fill="#d8303f"/><rect x="9.500" y="9" width="4" height="6" fill="#ffd84a"/><rect x="14" y="9" width="4" height="6" fill="#3d9bff"/><rect x="7" y="4" width="4" height="5" fill="#6fd06f"/><path d="M2 21.500c3-1 4 1 7 0s4 1 7 0 4 1 6 0" stroke="#6fd3ff" fill="none" stroke-width="1.500"/>',
  tren: '<rect x="2" y="9" width="14" height="8" rx="1" fill="#3a3a48"/><rect x="14" y="6" width="7" height="11" fill="#d8303f"/><rect x="16" y="8" width="3" height="3" fill="#bfe9ff"/><rect x="4" y="5" width="3" height="4" fill="#8a96a6"/><circle cx="5" cy="3" r="1.500" fill="#fff" opacity=".7" stroke="none"/><circle cx="6" cy="18" r="2.500" fill="#2b2118"/><circle cx="12" cy="18" r="2.500" fill="#2b2118"/><circle cx="18" cy="18" r="2.500" fill="#2b2118"/>',
  mina: '<path d="M3 7c4-4 14-4 18 0l-2 1.800c-4-3-10-3-14 0z" fill="#b9c2cf"/><path d="M10.500 6h3L15 21H9z" fill="#8a5a1f"/><path d="M2 21l3.500-5 3 5zM15 21l3.500-6 3.500 6z" fill="#ffd84a"/><path d="M5 19l1 .5M18 19l1 .5" stroke="#fff" fill="none"/>',
  refineria: '<path d="M2 21l2-5h7l2 5z" fill="#ffd84a"/><path d="M11 21l2-5h7l2 5z" fill="#e0a800"/><path d="M6.500 15l2-5h7l2 5z" fill="#ffe27a"/><path d="M5 18.500h6M14 18.500h5M9 12.500h5" stroke="#fff" opacity=".7" fill="none"/><path d="M12 1c1 2 3 3 3 5a3 3 0 0 1-6 0c0-1 1-1.500 1-3 1 0 1.500-1 2-2z" fill="#ff7a2e"/>',
  laboratorio: '<path d="M9 2h6v6l5 11a2 2 0 0 1-2 3H6a2 2 0 0 1-2-3l5-11z" fill="#d6f4ff"/><path d="M6.500 15h11l2.500 5a1.200 1.200 0 0 1-1 2H5a1.200 1.200 0 0 1-1-2z" fill="#ffd84a"/><circle cx="10" cy="18" r="1" fill="#fff" stroke="none"/><circle cx="14" cy="17" r=".8" fill="#fff" stroke="none"/><path d="M8 2h8" stroke-width="2" fill="none"/>',
  clonadora: '<circle cx="16" cy="14" r="5.500" fill="#ffc928" opacity=".55" stroke-dasharray="2 1.500"/><circle cx="8" cy="14" r="5.500" fill="#ffc928"/><circle cx="6.500" cy="13" r="1" fill="#2b2118" stroke="none"/><circle cx="14.500" cy="13" r="1" fill="#2b2118" stroke="none"/><path d="M8 15.500l-2 1 2 1zM16 15.500l-2 1 2 1z" fill="#ff8a1f"/><path d="M7 8.500q1-3 2 0" fill="#ff5d73"/><path d="M9 4h6M13 2.500L15 4l-2 1.500" fill="none" stroke-width="1.500"/>',
  orbital: '<rect x="1.500" y="3" width="6" height="3" fill="#2b4a7a" transform="rotate(-20 4.500 4.500)"/><rect x="16.500" y="18" width="6" height="3" fill="#2b4a7a" transform="rotate(-20 19.500 19.500)"/><circle cx="12" cy="12" r="6" fill="#3d9bff"/><path d="M8 10c2-2 5-2 6.500 0-1 2-4.500 3-6.500 0z" fill="#6fd06f" stroke="none"/><ellipse cx="12" cy="12" rx="10.500" ry="3.500" fill="none" stroke="#b9c2cf" stroke-width="1.800" transform="rotate(-20 12 12)"/>',
  lunar: '<circle cx="12" cy="13" r="9" fill="#d9dde6"/><circle cx="6.500" cy="9" r="1.800" fill="#aab0bc" stroke="none"/><circle cx="18" cy="16" r="2.200" fill="#aab0bc" stroke="none"/><path d="M8 14a4 4 0 0 1 8 0z" fill="#bfe9ff"/><rect x="8" y="14" width="8" height="3" fill="#fff8e6"/><path d="M12 10V5" fill="none"/><path d="M12 5l4 1.500-4 1.500z" fill="#d8303f"/>',
  marte: '<circle cx="12" cy="12" r="9" fill="#d6552a"/><path d="M4 9c3 1 5-1 8 0s5 0 8 1" fill="none" stroke="#a83a18"/><circle cx="7.500" cy="16" r="2" fill="#a83a18" stroke="none"/><circle cx="17" cy="7.500" r="1.500" fill="#a83a18" stroke="none"/><path d="M10 18a3.500 3.500 0 0 1 7 0z" fill="#d6f4ff"/><path d="M8 4c2-1 4-1.500 6-1" stroke="#fff" opacity=".4" fill="none"/>',
  antimateria: '<ellipse cx="12" cy="12" rx="10" ry="4" fill="none" stroke="#b05cff" stroke-width="1.500"/><ellipse cx="12" cy="12" rx="10" ry="4" fill="none" stroke="#6fd3ff" stroke-width="1.500" transform="rotate(60 12 12)"/><ellipse cx="12" cy="12" rx="10" ry="4" fill="none" stroke="#ff5d73" stroke-width="1.500" transform="rotate(120 12 12)"/><circle cx="12" cy="12" r="3" fill="#fff"/><circle cx="12" cy="12" r="1.200" fill="#2b2118" stroke="none"/>',
  reactor: '<circle cx="12" cy="12" r="10" fill="#2b2118"/><circle cx="12" cy="12" r="7" fill="#ffd84a"/><circle cx="12" cy="12" r="3.500" fill="#fff8e6"/><path d="M12 5v3M12 16v3M5 12h3M16 12h3" stroke="#ff7a2e" stroke-width="1.800" fill="none"/>',
  portal: '<ellipse cx="12" cy="12" rx="7" ry="10" fill="#2a0f55"/><ellipse cx="12" cy="12" rx="5" ry="8" fill="none" stroke="#b05cff" stroke-width="2"/><ellipse cx="12" cy="12" rx="2.500" ry="5" fill="none" stroke="#6fd3ff" stroke-width="1.800"/><circle cx="12" cy="12" r="1.200" fill="#fff" stroke="none"/><path d="M4 5l2 2M20 4l-2 2M3 19l2-2M21 20l-2-2" stroke="#ffd84a" fill="none"/>',
  cuantica: '<ellipse cx="12" cy="12" rx="11" ry="4" fill="none" stroke="#6fd3ff" stroke-width="1.200" transform="rotate(-30 12 12)"/><ellipse cx="12" cy="12" rx="11" ry="4" fill="none" stroke="#b05cff" stroke-width="1.200" transform="rotate(30 12 12)"/><circle cx="12" cy="13" r="6" fill="#ffc928"/><circle cx="10" cy="12" r="1" fill="#2b2118" stroke="none"/><circle cx="14" cy="12" r="1" fill="#2b2118" stroke="none"/><path d="M11 14.500h2l-1 1.800z" fill="#ff8a1f"/><path d="M10.500 7q1.500-3 3 0" fill="#ff5d73"/><circle cx="21" cy="8" r="1.500" fill="#fff"/>',
  agujero: '<ellipse cx="12" cy="13" rx="6.500" ry="8" fill="#0b0b10"/><ellipse cx="12" cy="13" rx="11" ry="3" fill="none" stroke="#ff9d2e" stroke-width="2" transform="rotate(-15 12 13)"/><ellipse cx="12" cy="13" rx="9" ry="2" fill="none" stroke="#ffd84a" stroke-width="1" opacity=".8" transform="rotate(-15 12 13)"/><path d="M9 7c1-2 3-2 4-1" stroke="#fff" opacity=".4" fill="none"/>',
  forja: '<path d="M3 10h15c0 3-3 4-5 4v3h4v4H6v-4h4v-3c-3 0-6-1-7-4z" fill="#5a6270"/><path d="M18 10h4c-1 2-2 3-4 3z" fill="#5a6270"/><path d="M5 11h11" stroke="#fff" opacity=".4" fill="none"/><path d="M14 1.500l1 2.500 2.500 1-2.500 1-1 2.500-1-2.500-2.500-1 2.500-1z" fill="#ffd84a"/>',
  esfera: '<circle cx="12" cy="11" r="9" fill="#6fd3ff"/><path d="M3 11h18M12 2c-4 4-4 14 0 18M12 2c4 4 4 14 0 18" fill="none" stroke="#fff" opacity=".7"/><path d="M2 20h20" stroke="#8a5a1f" stroke-width="1.500" fill="none"/><path d="M4 17v5M8 17v5M12 17v5M16 17v5M20 17v5" stroke="#8a5a1f" stroke-width="1.500" fill="none"/>',
  telar: '<rect x="3" y="3" width="18" height="18" rx="2" fill="#c27a3a"/><path d="M7 4v10M10 4v10M13 4v10M17 4v10" stroke="#ffe9bd" fill="none"/><path d="M4 7h16M4 10h16" stroke="#b05cff" stroke-width="2" fill="none"/><circle cx="12" cy="17" r="3.500" fill="#fff8e6"/><path d="M12 15v2h1.500" fill="none" stroke-width="1"/>',
  viajero: '<circle cx="12" cy="12" r="9" fill="#fff8e6"/><circle cx="12" cy="12" r="9" fill="none" stroke="#b05cff" stroke-width="2"/><path d="M12 6v6l4 2" fill="none" stroke-width="1.800"/><path d="M2.500 7.500A10 10 0 0 1 8 2.500" fill="none" stroke="#6fd3ff" stroke-width="1.800"/><path d="M1 5l3 4 3-3z" fill="#6fd3ff"/>',
  oraculo: '<path d="M7 21l1-4h8l1 4z" fill="#8a5a1f"/><circle cx="12" cy="11" r="8" fill="#b05cff"/><path d="M6.500 8c1-3 5-4 7-3" stroke="#fff" stroke-width="1.500" fill="none" opacity=".7"/><path d="M9 15c0-5 4-8 7-8-1 4-2 7-7 8z" fill="#fff8e6"/><path d="M9 15l5-6" stroke="#b05cff" fill="none"/>',
  templo: '<path d="M2 9l10-6 10 6z" fill="#e8d8a0"/><rect x="4" y="10" width="3" height="8" fill="#fff8e6"/><rect x="10.500" y="10" width="3" height="8" fill="#fff8e6"/><rect x="17" y="10" width="3" height="8" fill="#fff8e6"/><rect x="2" y="18" width="20" height="3" fill="#c9b878"/><ellipse cx="12" cy="6.500" rx="1.700" ry="2.200" fill="#ffd84a"/><path d="M12 1.500v1M8 3l1 1M16 3l-1 1" stroke="#ffd84a" fill="none"/>',
  semidios: '<ellipse cx="11" cy="2.500" rx="5" ry="1.500" fill="none" stroke="#ffd84a" stroke-width="1.500"/><path d="M19 13c3-1 4-6 3-9-3 2-4 5-4 9z" fill="#3d9bff"/><circle cx="11" cy="13" r="7.500" fill="#e0482f"/><circle cx="11" cy="9" r="5" fill="#e0482f"/><path d="M8 6C7 3 9 2 10 4c0-2 2-2 2 0 1-2 3-1 2 2z" fill="#d8303f"/><path d="M15 9l4 1-4 1.500z" fill="#ffd84a"/><circle cx="12.500" cy="8" r="1" fill="#2b2118" stroke="none"/><path d="M15 12c1 2 0 3-1 3z" fill="#d8303f"/>',
  panteon: '<path d="M2 12a10 8 0 0 1 20 0z" fill="#e8d8a0"/><rect x="2" y="12" width="20" height="2" fill="#c9b878"/><rect x="3.500" y="14" width="2.500" height="6" fill="#fff8e6"/><rect x="8" y="14" width="2.500" height="6" fill="#fff8e6"/><rect x="13.500" y="14" width="2.500" height="6" fill="#fff8e6"/><rect x="18" y="14" width="2.500" height="6" fill="#fff8e6"/><rect x="2" y="20" width="20" height="2" fill="#c9b878"/><path d="M12 3c-1.500 3-1.500 5 0 7 1.500-2 1.500-4 0-7z" fill="#fff8e6"/>',
  galaxias: '<circle cx="12" cy="12" r="10" fill="#14123f"/><path d="M12 12c0-4 5-5 7-2s-1 8-7 8-9-5-8-10" fill="none" stroke="#b05cff" stroke-width="2.500"/><path d="M12 12c0 3-4 4-6 2" stroke="#6fd3ff" fill="none" stroke-width="1.800"/><circle cx="12" cy="12" r="2.500" fill="#fff"/><circle cx="19" cy="5" r=".8" fill="#fff" stroke="none"/><circle cx="5" cy="6" r=".8" fill="#fff" stroke="none"/><path d="M16 3c4 1 6 4 5 8l-2.500-3z" fill="#b9c2cf"/>',
  imperio: '<circle cx="12" cy="15" r="7" fill="#3d6cff"/><ellipse cx="12" cy="15" rx="10" ry="2.500" fill="none" stroke="#ffd84a" stroke-width="1.500" transform="rotate(-15 12 15)"/><path d="M5 10l1-7 3.500 3 2.500-4 2.500 4 3.500-3 1 7z" fill="#ffd84a"/><circle cx="12" cy="7" r="1.200" fill="#d8303f" stroke="none"/>',
  universos: '<ellipse cx="12" cy="6" rx="9" ry="1.500" fill="none" stroke="#fff" opacity=".6"/><circle cx="12" cy="6" r="4" fill="#3d9bff"/><circle cx="5.500" cy="7" r="2" fill="#ff7a2e"/><circle cx="18.500" cy="5.500" r="2.500" fill="#b05cff"/><path d="M4 12l3 2 3-2.500 3 2.500 3-2.500 4 2.500a8 8 0 0 1-16 0z" fill="#fff8e6"/><path d="M8 18c2 1.500 6 1.500 8 0" stroke="#e0d0b0" fill="none"/>',
  multiverso: '<ellipse cx="12" cy="12" rx="10" ry="4" fill="none" stroke="#b05cff" stroke-width="2" transform="rotate(45 12 12)"/><ellipse cx="12" cy="12" rx="10" ry="4" fill="none" stroke="#6fd3ff" stroke-width="2" transform="rotate(-45 12 12)"/><circle cx="12" cy="12" r="3" fill="#fff"/><circle cx="12" cy="12" r="1.200" fill="#b05cff" stroke="none"/>',
  arquitecto: '<path d="M12 9l6 3v6l-6 3-6-3v-6z" fill="#6fd3ff"/><path d="M12 9v12M6 12l6 3 6-3" fill="none" stroke="#fff" opacity=".7"/><circle cx="12" cy="3.500" r="1.800" fill="#ffd84a"/><path d="M12 5L6 20M12 5l6 15" fill="none" stroke="#8a96a6" stroke-width="1.800"/>',
  hilo: '<path d="M20 2L6 16" stroke="#e8e8f0" stroke-width="2.200" fill="none"/><ellipse cx="19" cy="3" rx="1" ry="2.500" transform="rotate(45 19 3)" fill="#fff8e6"/><path d="M6 16c-5 1-3 6 1 5s3-6-1-3" fill="none" stroke="#ff2d6f" stroke-width="1.800"/><path d="M18 14l1 2.500 2.500 1-2.500 1-1 2.500-1-2.500-2.500-1 2.500-1z" fill="#ffd84a"/>',
  fenix: '<path d="M10 10C7 8 4 7 1 8c1 4 4 8 9 9z" fill="#ff5d1a"/><path d="M14 10c3-2 6-3 9-2-1 4-4 8-9 9z" fill="#ff5d1a"/><path d="M12 17l-3 6 3-2 3 2z" fill="#ffd84a"/><ellipse cx="12" cy="13" rx="3.500" ry="6" fill="#ff7a2e"/><ellipse cx="12" cy="14" rx="1.800" ry="3.500" fill="#ffd84a" stroke="none"/><circle cx="12" cy="6.500" r="3" fill="#ffa733"/><path d="M12 6.500l3.500 1-3.500 1z" fill="#ffd84a"/><path d="M10 4c0-2 1-3 2-3-.5 1 0 2 .5 2.500C13 2.500 14 2 14 1c1 2 0 4-1 4z" fill="#ffd84a"/><circle cx="11" cy="6" r=".8" fill="#2b2118" stroke="none"/>',
  cosmico: '<path d="M12 2c5 0 8 7 8 12a8 8 0 0 1-16 0C4 9 7 2 12 2z" fill="#3b2a8c"/><path d="M6 15c3-4 7 2 12-2" fill="none" stroke="#6fd3ff" stroke-width="1.500"/><path d="M7 10c3-3 6 0 9-2" fill="none" stroke="#ff7ad5" stroke-width="1.200"/><circle cx="9" cy="18" r=".8" fill="#fff" stroke="none"/><circle cx="15" cy="6" r=".8" fill="#fff" stroke="none"/><circle cx="16" cy="17" r=".8" fill="#fff" stroke="none"/><path d="M8 5c1-1 2-1.500 3-1.500" stroke="#fff" opacity=".5" fill="none"/>',
  absoluto: '<path d="M12 .5v2.500M3 4l2 2M21 4l-2 2" stroke="#ffd84a" stroke-width="1.600" fill="none"/><circle cx="12" cy="15" r="7" fill="#ffc928"/><path d="M7 10l1-5 2 2 2-3 2 3 2-2 1 5z" fill="#ffd84a"/><circle cx="9.500" cy="14" r="1.100" fill="#2b2118" stroke="none"/><circle cx="14.500" cy="14" r="1.100" fill="#2b2118" stroke="none"/><path d="M11 16h2l-1 2z" fill="#ff8a1f"/>',
  origen: '<circle cx="12" cy="12" r="10" fill="#0e0a2a"/><path d="M12 2v6M12 16v6M2 12h6M16 12h6M5 5l4 4M19 5l-4 4M5 19l4-4M19 19l-4-4" stroke="#ffd84a" stroke-width="1.800" fill="none"/><circle cx="12" cy="12" r="4" fill="#fff"/><circle cx="12" cy="12" r="2" fill="#ffd84a" stroke="none"/>',
  trebol: '<circle cx="9" cy="9" r="4"/><circle cx="15" cy="9" r="4"/><circle cx="9" cy="15" r="4"/><circle cx="15" cy="15" r="4"/><path d="M12 14c0 4 1 6 3 8" fill="none" stroke="#2f7a3a" stroke-width="2"/><path d="M7.500 8c1-1 2-1.500 3-1" stroke="#fff" opacity=".6" fill="none"/><circle cx="12" cy="12" r="1.500" fill="#2f7a3a" stroke="none"/>',
  llave: '<path d="M11.500 11.500L21 21l-1.800 1.800-2-2-1.700 1.700-2.200-2.200 1.700-1.700-3.500-3.500z"/><circle cx="8" cy="8" r="5.500"/><circle cx="8" cy="8" r="2.200" fill="#2b2118" opacity=".4" stroke="none"/><path d="M4.500 5.500c1-1.500 2-2 3-2" stroke="#fff" opacity=".7" fill="none"/>',
  bolsa: '<path d="M7 7h10l3 14H4z"/><path d="M6.500 7C8 5 10 4 12 4s4 1 5.500 3z" fill="#fff8e6" opacity=".45"/><path d="M9 7c0-2.500 1.500-4 3-4s3 1.500 3 4" fill="none"/><rect x="8" y="12" width="8" height="6" rx="1" fill="#fff8e6" stroke="none"/><path d="M12 17v-3.500M12 14c-2-.5-2-2 0-2.500 2 .5 2 2 0 2.500z" fill="#6fd06f" stroke="#2f7a3a" stroke-width=".8"/>',
  anillo: '<path fill-rule="evenodd" d="M12 8.500a6.500 6.500 0 1 0 0 13 6.500 6.500 0 1 0 0-13zm0 3a3.500 3.500 0 1 1 0 7 3.500 3.500 0 1 1 0-7z"/><path d="M9 6l1.500-3h3L15 6l-3 3z" fill="#6fd3ff"/><path d="M9 6h6M12 3v3" fill="none" stroke="#fff" stroke-width=".8" opacity=".8"/><path d="M6.500 13.500a6 6 0 0 1 2.500-3" stroke="#fff" opacity=".7" fill="none"/>',
  reloj: '<circle cx="12" cy="14" r="8"/><circle cx="12" cy="14" r="5.500" fill="#fff8e6"/><path d="M12 10.500v3.500l3 2" fill="none" stroke-width="1.500"/><rect x="10.500" y="2" width="3" height="3.500" rx="1" fill="#d9a400"/><path d="M17.500 8l2-2" stroke-width="2.200" fill="none"/><path d="M7 9c1-1 2-1.500 3-1.500" stroke="#fff" opacity=".7" fill="none"/>',
  gema: '<path d="M7 3h10l5 6-10 13L2 9z"/><path d="M7 3h10l-2 6H9z" fill="#fff" opacity=".35" stroke="none"/><path d="M2 9h20M7 3L5 9l7 13M17 3l2 6-7 13M9 9l3-6 3 6" fill="none" stroke="#fff" stroke-width=".9" opacity=".7"/>',
  estrella: '<path d="M12 2l3.100 6.300 6.900 1-5 4.900 1.200 6.900L12 17.800 5.800 21.100 7 14.200 2 9.300l6.900-1z"/><path d="M12 2l3.100 6.300L12 12z" fill="#fff" opacity=".4" stroke="none"/><path d="M12 12l-5 2.200 1.200-5.900z" fill="#000" opacity=".1" stroke="none"/>',
  rayo: '<path d="M13 2L4 14h6l-1 8 10-13h-6z"/><path d="M13 2l-4 12h2z" fill="#fff" opacity=".4" stroke="none"/>',
  diamante: '<path d="M12 2c5 0 8 8 8 12a8 8 0 0 1-16 0C4 10 7 2 12 2z"/><path d="M12 2l-4 7 4 13 4-13z" fill="#fff" opacity=".45" stroke="none"/><path d="M4.300 12h15.400M8 9l4 13M16 9l-4 13" fill="none" stroke="#fff" opacity=".8"/>',
  huevonegro: '<path d="M12 2c5 0 8 8 8 12a8 8 0 0 1-16 0C4 10 7 2 12 2z"/><path d="M8 6c1-2 2-3 4-3.500" stroke="#fff" opacity=".35" stroke-width="1.500" fill="none"/><path d="M7 13c2 3 8 3 10 0" stroke="#ff2d6f" opacity=".7" fill="none"/><circle cx="14" cy="9" r="1" fill="#ff2d6f" opacity=".7" stroke="none"/>',
  banda: '<path d="M3 8h18v8H3z"/><path d="M3 8c2 1 2 7 0 8M21 8c-2 1-2 7 0 8" fill="none"/><path d="M12 10l1 2h2l-1.600 1.500.6 2.500-2-1.300-2 1.300.6-2.500L9 12h2z" fill="#ff2d6f" stroke="none"/><path d="M4 9.500h16" stroke="#fff" opacity=".3" fill="none"/>',
};
const TIER_IC = ["grano", "nido", "gallinero", "comedero", "granja", "incubadora", "silo", "banco", "tractor", "mercadillo", "lonja", "cooperativa", "tortillas", "camion", "super", "logistica", "bolsavalores", "torre", "puerto", "tren", "mina", "refineria", "laboratorio", "clonadora", "orbital", "lunar", "marte", "antimateria", "reactor", "portal", "cuantica", "agujero", "forja", "esfera", "telar", "viajero", "oraculo", "templo", "semidios", "panteon", "galaxias", "imperio", "universos", "multiverso", "arquitecto", "hilo", "fenix", "cosmico", "absoluto", "origen"];
const svg = (n, c = "#fff8e6") => `<svg viewBox="0 0 24 24" fill="${c}" stroke="#2b2118" stroke-width="1.3" stroke-linejoin="round" stroke-linecap="round" aria-hidden="true">${ICONS[n]}</svg>`;

const TIER_NAMES = ["Grano de oro", "Nido cómodo", "Gallinero", "Comedero automático", "Granja", "Incubadora", "Silo de maíz", "Banco de huevos", "Tractor pollo", "Mercadillo", "Lonja de huevos", "Cooperativa", "Fábrica de tortillas", "Camión de reparto", "Supermercado", "Centro logístico", "Bolsa de valores", "Torre financiera", "Puerto de exportación", "Tren de mercancías", "Mina de oro", "Refinería dorada", "Laboratorio de yemas", "Clonadora de gallinas", "Granja orbital", "Base lunar", "Colonia marciana", "Fábrica de antimateria", "Reactor de yema", "Portal dimensional", "Gallina cuántica", "Huevo de agujero negro", "Forja estelar", "Esfera de corral", "Telar del tiempo", "Viajero temporal", "Oráculo de plumas", "Templo del Gran Huevo", "Gallo semidiós", "Panteón avícola", "Cosechadora de galaxias", "Imperio galáctico", "Cría de universos", "Máquina del multiverso", "Arquitecto de realidades", "Hilo del destino", "Fénix primigenio", "Huevo cósmico", "Ricopio absoluto", "El origen de todo"];
const UPGRADES = TIER_NAMES.map((name, i) => ({ id: "t" + i, name, ic: TIER_IC[i], col: `hsl(${(i * 47) % 360} 70% 85%)`, base: 15 * Math.pow(3.8, i), click: i % 5 ? 0 : (i ? .25 * Math.pow(3.3, i) : 1), sec: i % 5 ? .8 * Math.pow(3.3, i) : 0 }));
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
const setT = (el, t) => { if (el._t !== t) { el._t = t; el.textContent = t; } };
const setW = (el, w) => { if (el._w !== w) { el._w = w; el.style.width = w; } };
const setH = (el, h) => { if (el._h !== h) { el._h = h; el.innerHTML = h; } };
let MG = 0, lastUpd = Date.now(), UD = .1, perfWas = false, perfUntil = 0, visAt = Date.now(), _uiR = -1, loadFlag = false;
document.addEventListener("visibilitychange", () => { visAt = Date.now(); });
const ttl = (fn, ms) => { let t = 0, g = -1, v; return () => { const n = Date.now(); if (g !== MG || n - t >= ms) { v = fn(); t = n; g = MG; } return v; }; };
const mShop = $("m-shop"), E = { coins: $("coins"), perClick: $("perClick"), perSec: $("perSec"), bonus: $("bonus"), rankName: $("rankName"), rankBar: $("rankBar") };

let state = load();   // (loadFlag se declara arriba, junto a MG)
let rank = 0, combo = 0, lastClick = 0, started = false, ac, chestTimer, T4 = 0;
const EQC = ["skin", "hat", "eyes", "neck", "back", "feet", "tap", "trail"];
let _sbS = "", _sbV = {};

function fix(s) {
  s = { coins: 0, total: 0, owned: {}, items: {}, muted: false, boost: {}, cosm: {}, reb: 0, xp: 0, tree: {}, ach: {}, eggs: {}, mut: {}, slots: [null, null, null, null], wheelAt: 0, asc: 0, gf: 0, gp: {}, q: null, pass: null, pets: {}, petEq: [], cards: {}, gold: {}, br: {}, title: "", name: "", friends: [], gifts: [], redeemed: [], wk: null, wstreak: 0, wday: "", last: 0, tut: 0, hist: [], mgAt: {}, hs: {}, codes: {}, peggs: 0, cc: 0, pid: "", srv: "", ...s };
  BOOSTS.forEach((b) => (s.boost[b.id] = { lvl: 0, end: 0, len: 0, ...s.boost[b.id] }));
  s.cosm = { own: [], ...s.cosm, eq: { skin: "clasico", hat: "ninguno", eyes: "ninguno", neck: "ninguno", scene: "dia", back: "ninguno", feet: "ninguno", tap: "ninguno", trail: "ninguno", ...s.cosm.eq } };
  s.total = Math.max(s.total, s.coins);
  s.run = s.run ?? s.total;
  s.st = { clicks: 0, crits: 0, chests: 0, golds: 0, maxCombo: 0, time: 0, spins: 0, games: 0, fusions: 0, ...s.st };
  s.set = { vol: .7, snd: "auto", fx: true, shake: true, glass: true, music: true, lang: "es", big: 100, cb: false, rm: false, auto: false, notif: false, ...s.set };
  s.slots = [0, 1, 2, 3].map((i) => (s.slots && s.slots[i]) || null);
  return s;
}
// Firma básica anti-trampas (disuade de editar el localStorage; no es seguridad real)
function sig(s) {
  const str = [s.total, s.reb, s.asc, Math.floor(s.coins || 0), "piopio"].join("|");
  let h = 5381; for (let i = 0; i < str.length; i++) h = ((h << 5) + h + str.charCodeAt(i)) | 0;
  return btoa((h >>> 0) + ":" + str.length);
}
// Las partidas antiguas (sin firma) se aceptan y se firman en el siguiente guardado
function verify(s) { return s.hash === undefined || s.hash === sig(s); }
function load() {
  let s = {};
  try { s = JSON.parse(localStorage.getItem(SAVE_KEY)) || {}; } catch {}
  if (!verify(s)) { loadFlag = true; return fix({}); }
  return fix(s);
}
function save() {
  MG++; state.last = Date.now(); state.hash = sig(state);
  const fx = state.set.fx; if (perfWas) state.set.fx = true;   // el modo patata no debe quedar guardado
  try { localStorage.setItem(SAVE_KEY, JSON.stringify(state)); } catch {}
  state.set.fx = fx;
}

const owned = (u) => state.owned[u.id] || 0;
const tl = (id) => state.tree[id] || 0;
const cost = (u) => Math.ceil(u.base * Math.pow(1.15, owned(u)) * brC(u) * (1 - .02 * tl("cost")));
const bonus = () => 1 + ITEMS.reduce((n, i) => n + (state.items[i.id] || 0) * RAR[i.r].b * mutI(i.r), 0) * (1 + .1 * tl("itemb"));
const boostOn = (id) => state.boost[id].end > Date.now();
const gmult = () => bonus() * (1 + .25 * state.reb) * achMult() * extraMult();
const perClick0 = () => (1 + UPGRADES.reduce((n, u) => n + (u.click || 0) * owned(u) * brM(u), 0)) * gmult() * (1 + .1 * tl("clickpow")) * (1 + skinBn("clk")) * clkX() * (boostOn("clic") ? 2 : 1);
const perSec0 = () => UPGRADES.reduce((n, u) => n + (u.sec || 0) * owned(u) * brM(u), 0) * gmult() * (1 + .08 * tl("prod")) * (1 + skinBn("sec")) * secX() * (boostOn("auto") ? 2 : 1);
const comboMult = () => 1 + Math.min(combo, 60 + 10 * tl("combo")) / 20;
const perClick = ttl(perClick0, 100), perSec = ttl(perSec0, 100);
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
    ac = ac || new AudioContext(); if (ac.state === "suspended") ac.resume();
    const o = ac.createOscillator(), g = ac.createGain(), t = ac.currentTime;
    o.type = state.set.snd === "auto" ? type : state.set.snd; o.frequency.value = f;
    g.gain.setValueAtTime(.1 * state.set.vol, t); g.gain.exponentialRampToValueAtTime(.001, t + d);
    o.connect(g); g.connect(ac.destination); o.start(); o.stop(t + d);
  } catch {}
}

// Tienda
const shop = $("shop"), shopRefs = [];
UPGRADES.forEach((u) => {
  const li = document.createElement("li");
  li.innerHTML = `<button class="item" data-id="${u.id}"><span class="ico">${svg(u.ic, u.col)}</span><span><b>${u.name} (<span class="n">0</span>)</b><small>${u.click ? "+" + fmt(u.click) + " por toque" : "+" + fmt(u.sec) + " por segundo"}</small></span><span class="cost"></span></button>`;
  li.firstChild.addEventListener("click", () => buy(u));
  shop.appendChild(li);
  shopRefs.push({ u, li, b: li.firstChild, n: li.querySelector(".n"), c: li.querySelector(".cost") });
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
  setT(E.coins, fmt(state.coins)); setT(E.perClick, fmt(perClick())); setT(E.perSec, fmt(perSec())); setT(E.bonus, String(Math.round((gmult() - 1) * 100)));
  if (!mShop.hidden) {
    const mo = UPGRADES.reduce((m, u, i) => (owned(u) ? i : m), -1);
    shopRefs.forEach((r, i) => {
      const hid = i > mo + 2; if (r.h !== hid) { r.h = hid; r.li.hidden = hid; }
      setT(r.n, String(owned(r.u))); setT(r.c, fmt(bulkCost(r.u)));
      const dis = state.coins < cost(r.u); if (r.d !== dis) { r.d = dis; r.b.disabled = dis; }
    });
  }
  const r = rankIndex(), next = RANKS[r + 1];
  setT(E.rankName, RANKS[r].name);
  if (r !== _uiR) {   // Interfaz progresiva según el rango
    _uiR = r; $("wheelBtn").hidden = r < 1; $("skinBtn").hidden = false; $("wardBtn").hidden = false; $("rebBtn").parentElement.hidden = r < 3;
  }
  setW(E.rankBar, (next ? ((state.total - RANKS[r].at) / (next.at - RANKS[r].at)) * 100 : 100) + "%");
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
const floatersEl = $("floaters");
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
  if (!state.set.fx || floatersEl.childElementCount > 50) return;
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
function update() {
  const now = Date.now(), dt = Math.min(5, (now - lastUpd) / 1000); lastUpd = now; UD = dt;
  // Modo patata: si el bucle se retrasa >0,5 s (y no venimos de una pestaña oculta), se apagan las partículas 30 s
  if (!document.hidden && now - visAt > 3000 && UD > .5 && state.set.fx && !perfWas) { perfWas = true; perfUntil = now + 30000; state.set.fx = false; toast("Modo rendimiento activado"); }
  if (perfWas && now > perfUntil) { perfWas = false; state.set.fx = true; toast("Efectos visuales restaurados"); }
  const idle = now - lastClick;
  if (combo && idle > 900 && !(ev && now < ev.end && ev.hold)) combo = 0;
  $("combo").classList.toggle("on", combo >= 3);
  setT($("comboN"), "x" + comboMult().toFixed(1));
  setW($("comboBar"), Math.max(0, 100 - idle / 9) + "%");
  renderBoosts();
  tickExtra();   // logros + tickMore() -> ranuras, ruleta, tick3 (pollo/eventos) y tick4 (pase/juegos)
  const s = perSec();
  if (s > 0) { gain(s * dt); render(); }
}
setInterval(update, 100);
setInterval(save, 5000);

// Cofres con rareza
const CHESTS = {
  madera:     { n: "Cofre de madera",     w: 59.4, a: "#a8602b", b: "#c27a3a", loot: [70, 25, 5, 0, 0], mins: 1, cb: 1 },
  plata:      { n: "Cofre de plata",      w: 27, a: "#8797a8", b: "#c4d0db", loot: [30, 50, 18, 2, 0], mins: 3, cb: 3 },
  oro:        { n: "Cofre de oro",        w: 11, a: "#d99a00", b: "#ffd84a", loot: [5, 30, 55, 10, 0], mins: 7, cb: 10 },
  arcano:     { n: "Cofre arcano",        w: 2,  a: "#6a2fc4", b: "#a566ff", loot: [0, 15, 50, 35, 0], mins: 15, cb: 40 },
  legendario: { n: "Cofre legendario",    w: .5, a: "#ff8a00", b: "#ffc14d", loot: [0, 0, 10, 70, 20], mins: 30, cb: 150 },
  mitico:     { n: "Cofre mítico",        w: .1, a: "#2a1f3d", b: "#4a3470", loot: [0, 0, 0, 40, 60], mins: 60, cb: 400 },
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
  if (chest.classList.contains("open") || chest.classList.contains("broke")) return;
  clearTimeout(chestTimer);
  if (state.slots.every(Boolean)) return chestBreak();
  chest.classList.add("open");
  confetti(chest.offsetLeft + 50, chest.offsetTop + 30, 26);
  [523, 659, 784, 1047].forEach((f, i) => setTimeout(() => sfx(f, .18), i * 90));
  setTimeout(() => { chest.hidden = true; if (addChest(chestKind, true)) toast("Cofre guardado en tus ranuras"); else openChestNow(chestKind); }, 800);
});
function chestBreak() {
  const k = chestKind, c = Math.max(1, Math.floor(chestCoins(k) * .05)), x = chest.offsetLeft + 50, y = chest.offsetTop + 30;
  chest.classList.add("broke");
  spray("conf", x, y, 14, 900, 90, () => "--c:#8a8a8a");
  sfx(110, .25, "sawtooth"); setTimeout(() => sfx(80, .3, "square"), 90);
  const f = document.createElement("span"); f.className = "floater crit";
  f.style.cssText = `left:${Math.max(4, x - 110)}px;top:${y - 30}px;font-size:1.3rem;white-space:nowrap`;
  f.textContent = "¡Ranuras llenas! Cofre destruido (+" + fmt(c) + ")"; $("floaters").appendChild(f); setTimeout(() => f.remove(), 900);
  gain(c); render(); setTimeout(() => { chest.hidden = true; }, 450);
}
function revealCard(html, color) {
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
$("reset").addEventListener("click", () => showModal("Empezar de cero", "¿Seguro que quieres borrar tu progreso?", "Borrar", () => {
  state = fix({}); rank = 0; save();
  applyLook(); renderColl(); renderWard(); render(); syncIntro();
}));
window.addEventListener("beforeunload", save);
document.addEventListener("visibilitychange", save);

// Cosméticos y armario
const allCosm = () => Object.entries(COSM).flatMap(([cat, l]) => l.map((x) => ({ ...x, cat, key: cat + ":" + x.id })));
const has = (x) => (!x.p && !x.secret && !x.ev && x.rank === undefined && x.reb === undefined && !x.egg && !x.achN) || state.cosm.own.includes(x.key) || (x.rank !== undefined && rankIndex() >= x.rank) || (x.reb !== undefined && state.reb >= x.reb) || (x.achN && Object.keys(state.ach).length >= x.achN) || (x.egg && EGGS.every((e) => state.eggs[e.id]));
const reqText = (x) => x.ev ? "Evento Halloween" : x.secret ? "Secreto" : x.rank !== undefined ? "Rango: " + RANKS[x.rank].name : x.reb !== undefined ? "Renacer " + x.reb + (x.reb > 1 ? " veces" : " vez") : x.achN ? x.achN + " logros" : "Todos los easter eggs";
function applyLook() {
  applySet(); applyEvo(); applyFx();
  document.body.classList.toggle("glass", state.set.glass);
  const e = state.cosm.eq, ch = $("chick"), root = document.documentElement.style;
  const sk = COSM.skin.find((x) => x.id === e.skin) || COSM.skin[0], sc = COSM.scene.find((x) => x.id === effScene()) || COSM.scene[0];
  ["--body", "--wing", "--belly"].forEach((v, i) => ch.style.setProperty(v, sk.v[i]));
  ch.className = ch.className.replace(/ ?(rainbow|shine|ghost)/g, "") + (sk.rb ? " rainbow" : sk.cls ? " " + sk.cls : "");
  const on = [e.hat, e.eyes, e.neck, e.back, e.feet];
  document.querySelectorAll("#chick .a").forEach((g) => (g.style.display = on.includes(g.dataset.a) ? "inline" : "none"));
  ["--s1", "--s2", "--s3", "--h1", "--h2", "--h3", "--sun", "--tx"].forEach((v, i) => root.setProperty(v, sc.v[i]));
  const scene = document.querySelector(".scene");
  if (scene) scene.dataset.world = effScene();
}
function renderWard() {
  $("wardBody").innerHTML = Object.keys(COSM).map((cat) => `<h3>${CATN[cat]}</h3><div class="chips">` + COSM[cat].map((o) => {
    const x = { ...o, cat, key: cat + ":" + o.id }, own = has(x), on = state.cosm.eq[cat] === x.id;
    const sw = x.v ? `<i class="sw" style="background:${x.v[0]}"></i>` : "";
    const tag = on ? "Puesto" : own ? "Poner" : x.secret ? "???" : x.p ? fmt(x.p) + " ricoins" : reqText(x);
    return `<button class="chip${on ? " on" : ""}" data-k="${x.key}" style="border-color:${rarCol(x)}"${!own && (x.secret || !x.p) ? " disabled" : ""}><b>${sw}${x.secret && !own ? "Secreto" : x.n}</b><small>${tag}${x.bn ? " · " + bnLine(x.bn) : ""}</small></button>`;
  }).join("") + "</div>").join("");
  renderSkins();
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
  if (!mShop.hidden) BOOSTS.forEach((b) => {
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
const importCode = (c) => {
  c = (c || "").trim(); if (!c) return toast("Pega primero tu código");
  try { loadState(c[0] === "{" ? JSON.parse(c) : JSON.parse(dec(c.replace(/^RC-/, "")))); } catch { toast("Código no válido"); }
};
$("saveBtn").addEventListener("click", () => {
  save(); const o = $("saveOut"); o.hidden = false; o.value = "RC-" + enc(JSON.stringify(state)); o.focus(); o.select();
  toast("Código generado: cópialo y guárdalo");
});
$("loadBtn2").onclick = () => $("saveIn").focus();
$("importBtn").onclick = () => importCode($("saveIn").value);
$("loadBtn").onclick = () => showModal("Cargar partida", "Pega tu código de partida:", "Cargar", importCode, "text");

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
  if (RENDER[id]) RENDER[id](); applyLang();
};
const closeM = () => document.querySelectorAll(".modal").forEach((m) => (m.hidden = true));
let coinN = 0, coinT = 0, lastAct = Date.now(), typed = "", clickLog = [], mutedClicks = 0;
document.addEventListener("click", (e) => {
  const o = e.target.closest("[data-open]");
  if (o) return openM(o.dataset.open);
  if (e.target.closest("[data-close]") || e.target.classList.contains("modal")) return closeM();
  if (!started) return;
  if (e.target.closest("#scoreBox")) { coinN = Date.now() - coinT < 600 ? coinN + 1 : 1; coinT = Date.now(); if (coinN >= 12) egg("monedero"); }
});
addEventListener("keydown", (e) => {
  lastAct = Date.now();
  if (e.key === "Escape") closeM();
  typed = (typed + (e.key.length === 1 ? e.key.toLowerCase() : "")).slice(-12);
  if (started && typed.endsWith("piopio")) egg("pio");
  if (started && typed.endsWith("marcos")) egg("marcos");
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
  $("music").checked = state.set.music; $("lang").value = state.set.lang; $("big").value = state.set.big; $("cb").checked = state.set.cb; $("rm").checked = state.set.rm; $("auto").checked = state.set.auto; $("notif").checked = state.set.notif;
}
$("vol").oninput = () => { state.set.vol = $("vol").value / 100; sfx(660, .1); save(); };
$("snd").onchange = () => { state.set.snd = $("snd").value; sfx(660, .15); save(); };
$("fx").onchange = () => { state.set.fx = $("fx").checked; save(); };
$("shk").onchange = () => { state.set.shake = $("shk").checked; save(); };

// ===== Efectos de balance =====
function critChance() { return Math.min(.9, .08 + .01 * tl("crit") + skinBn("crit") + petBn("crit") + worldBn("crit") + (wkMod().crit || 0)); }
function critMul() { return (5 + .5 * tl("critmul")) * (1 + skinBn("cmul")); }
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
  $("eggHint").innerHTML = state.eggs[g.id] ? `<b>${g.n}</b> ✓ Cómo se consigue: ${g.h}` : `<b>Pista:</b> ${g.h}`;
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
const rebGoal = (n = state.reb) => 1e6 * Math.pow(2.8, n);
const rebXp = () => Math.floor((3 + 2 * state.reb) * (1 + .1 * tl("xpg")) * (1 + .25 * gl("gxp")) * (1 + petBn("xp") + skinBn("xp")));
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
  setW($("rebMini"), pct + "%");
  setT($("rebTxt"), "Objetivo: " + fmt(state.run) + " / " + fmt(goal) + " ricoins");
  $("rebBtn").classList.toggle("ready", can);
  if ($("m-reb").hidden) return;
  setH($("rebInfo"), `Renacimientos: <b>${state.reb}</b> · bonus de producción actual: <b>+${state.reb * 25}%</b><br>Al renacer: <b>+25%</b> de producción permanente y <b>+${rebXp()} XP</b>. XP disponible: <b>${state.xp}</b>`);
  setW($("rebFill"), pct + "%");
  setT($("rebGoalTxt"), fmt(state.run) + " / " + fmt(goal) + " ricoins");
  $("rebGo").disabled = !can;
}
$("rebGo").onclick = () => {
  if (state.run < rebGoal()) return;
  showModal("Renacer", "Pierdes ricoins y mejoras de la tienda. Conservas aspectos, logros, objetos, árbol y experiencia.", "Renacer", () => {
    if (state.run < rebGoal()) return;
    state.xp += rebXp(); state.reb++;
    state.coins = tl("start") ? 500 * Math.pow(6, tl("start") - 1) : 0;
    state.run = 0; state.owned = {}; combo = 0; state.cc = 0; updCC();
    confetti(innerWidth / 2, innerHeight / 3, 60); [523, 659, 784, 1047, 1319, 1568].forEach((f, i) => setTimeout(() => sfx(f, .25), i * 90));
    toast("¡Has renacido! Renacimiento " + state.reb); addChest(rollChest()); passXp(50);
    save(); renderTree(); renderWard(); render();
  });
};
function renderExtra() { updReb(); updMuts(); updBranches(); }

// ===== Bonus de aspectos =====
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
  ...["madera", "plata", "oro", "arcano", "legendario", "mitico"].map((k, i) => ({ id: "c_" + k, ic: "llave", n: "Mutación del " + CHESTS[k].n.toLowerCase(), base: [400, 2500, 15000, 150000, 1e6, 4e6][i] })),
];
const mutLvl = (id) => state.mut[id] || 0;
function mutI(r) { return 1 + .25 * mutLvl("i_" + r); }
function mutC(k) { return 1 + .3 * mutLvl("c_" + k); }
const mutCost = (m) => Math.ceil(m.base * Math.pow(2.2, mutLvl(m.id)));
function bulkMutCost(m) {
  if (buyQty === "max" || buyQty === 1) return mutCost(m);
  let t = 0;
  for (let i = 0; i < buyQty; i++) {
    t += Math.ceil(m.base * Math.pow(2.2, mutLvl(m.id) + i));
  }
  return t;
}
function chestCoins(k) { return CHESTS[k].cb * Math.max(100, perSec() * 30) * mutC(k) * (1 + skinBn("chest")) * (1 + petBn("chest") + worldBn("chest")) * wkM("chest"); }
$("muts").innerHTML = MUTS.map((m) => `<li><button class="item" data-m="${m.id}"><span class="ico">${svg(m.ic, m.id[0] === "i" ? "#ffe45c" : "#d9a15b")}</span><span><b>${m.n} (<span class="n">0</span>)</b><small></small></span><span class="cost"></span></button></li>`).join("");
$("muts").addEventListener("click", (e) => {
  const b = e.target.closest("[data-m]");
  if (!b) return;
  const m = MUTS.find((x) => x.id === b.dataset.m);
  let n = 0;
  while ((buyQty === "max" || n < buyQty) && mutLvl(m.id) < MUT_MAX) {
    const c = mutCost(m); // El coste actual de ese nivel
    if (state.coins < c) break;
    state.coins -= c;
    state.mut[m.id] = mutLvl(m.id) + 1;
    n++;
  }
  if (!n) return;
  replay(b, "bought"); sfx(660, .1); setTimeout(() => sfx(990, .14), 80); save(); render();
});
function updMuts() {
  if (mShop.hidden) return;
  MUTS.forEach((m) => {
    const b = $("muts").querySelector(`[data-m="${m.id}"]`), l = mutLvl(m.id), c = mutCost(m);
    b.querySelector(".n").textContent = l;
    b.querySelector("small").textContent = m.id[0] === "i" ? "Bonus de esos objetos x" + mutI(m.id.slice(2)).toFixed(2) : "Ricoins del cofre x" + mutC(m.id.slice(2)).toFixed(1);
    b.querySelector(".cost").textContent = l >= MUT_MAX ? "Máx." : fmt(bulkMutCost(m));
    b.disabled = l >= MUT_MAX || state.coins < bulkMutCost(m);
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
  for (const k of ["madera", "plata", "oro", "arcano", "legendario"]) if ((r -= Math.round(CHESTS[k].w)) < 0) return k;
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
const slotEls = [...slotsEl.querySelectorAll(".slot")];
function updSlots() {
  slotEls.forEach((el, i) => {
    const s = state.slots[i], key = s ? s.k : "";
    if (el.dataset.k !== key) { el.dataset.k = key; el.querySelector(".si").innerHTML = s ? chestSvg(s.k) : ""; }
    let t = "Vacío", cls = "";
    if (s) {
      if (!s.end) { t = CHESTS[s.k].mins + " min"; cls = " idle"; }
      else if (s.end <= Date.now()) { t = "¡Abrir!"; cls = " ready"; }
      else { t = fmtT(s.end - Date.now()); cls = " going"; }
    }
    const cn = "slot" + cls + (s && s.k === "mitico" ? " mit" : ""); if (el._c !== cn) { el._c = cn; el.className = cn; }
    setT(el._b || (el._b = el.querySelector("b")), t);
  });
}
slotsEl.addEventListener("click", (e) => {
  const b = e.target.closest(".slot");
  if (!b) return;
  const i = +b.dataset.i, s = state.slots[i];
  if (!s) return toast("Ranura vacía: consigue cofres en la ruleta y en el mapa");
  if (!s.end) {
    if (state.slots.some((x) => x && x.end > Date.now())) return toast("Ya hay un cofre abriéndose");
    s.end = Date.now() + CHESTS[s.k].mins * 60000 * (1 - .05 * gl("gchest")) * (1 - skinBn("cspd")); sfx(740, .1); save(); return updSlots();
  }
  if (s.end <= Date.now()) { state.slots[i] = null; save(); updSlots(); return openChestNow(s.k); }
  const left = (s.end - Date.now()) / 1000, c = Math.ceil(left * Math.max(5, perSec()) * .6);
  if (state.coins < c) return toast("Para abrirlo ya necesitas " + fmt(c) + " ricoins");
  showModal("Abrir cofre", "¿Abrir ya por " + fmt(c) + " ricoins?", "Abrir", () => {
    if (state.slots[i] !== s || state.coins < c) return;
    state.coins -= c; state.slots[i] = null; save(); updSlots(); render(); openChestNow(s.k);
  });
});

// ===== Ruleta (cada 5 min) =====
const SEG = ["coin", "item", "coin", "chest", "coin", "cosm", "coin", "item", "coin", "chest", "coin", "mitico"];
const SEGC = { coin: ["#ffd84a", "Ricoins"], item: ["#8bd078", "Objeto"], chest: ["#d9a15b", "Cofre"], cosm: ["#ff9ec7", "Aspecto"], mitico: ["#15151b", "MÍTICO"] };
let wheelRot = 0, spinning = false;
const wheelCd = () => 300000 * Math.max(.2, 1 - skinBn("wheel") - petBn("wheel")) * (1 - .03 * gl("gwheel"));
function updWheel() {
  const left = state.wheelAt - Date.now(), ok = left <= 0 && !spinning;
  $("spinBtn").disabled = !ok;
  setT($("wheelInfo"), spinning ? "Girando…" : left <= 0 ? "¡Tirada gratis lista!" : "Próxima tirada en " + fmtT(left));
}
function spin() {
  if (spinning || state.wheelAt > Date.now()) return;
  spinning = true; $("m-wheel").classList.add("spinning"); bumpStreak(); state.st.spins = (state.st.spins || 0) + 1; passXp(3);
  let r = Math.random() * 100, cat = "coin";
  if (r < .1 + .02 * Math.min(10, state.wstreak || 0)) cat = "mitico"; else if (r < 18.1) cat = "item"; else if (r < 38.1) cat = "chest"; else if (r < 50) cat = "cosm"; else cat = "coin";
  const idx = (() => { const l = SEG.map((s, i) => (s === cat ? i : -1)).filter((i) => i >= 0); return l[Math.floor(Math.random() * l.length)]; })();
  const c = idx * 30 + 15 + (Math.random() * 18 - 9);
  wheelRot += 1800 + ((((-c - wheelRot) % 360) + 360) % 360);
  $("wheel").style.transform = `rotate(${wheelRot}deg)`;
  state.wheelAt = Date.now() + wheelCd(); save(); updWheel();
  for (let i = 0; i < 24; i++) setTimeout(() => sfx(300 + (i % 4) * 40, .04), 250 * Math.pow(i, 1.3));
  setTimeout(() => { spinning = false; $("m-wheel").classList.remove("spinning"); flash(cat === "mitico" ? "#ff2d6f" : "#fff3a6"); givePrize(cat); updWheel(); }, 4700);
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
  if (b) b.classList.toggle("ready", left <= 0);
  if ($("wheelTxt")) setT($("wheelTxt"), left <= 0 ? "¡Girar!" : fmtT(left));
  if ($("m-wheel") && !$("m-wheel").hidden) updWheel();

  // Llamadas centralizadas sin monkey-patching:
  if (typeof tick3 === "function") tick3();
  if (typeof tick4 === "function") tick4();
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
function gl(id) { return (state.gp && state.gp[id]) || 0; }
// showModal(titulo, mensaje, textoOk, callback, input?, valor?)  input: "text"|"number"|"area"|"copy"
function showModal(title, msg, okText, cb, input, value) {
  const d = document.createElement("div"); d.className = "cgdlg";
  const field = !input ? "" : input === "copy" || input === "area"
    ? `<textarea class="cgta" id="cgIn"${input === "copy" ? " readonly" : ""}></textarea>`
    : `<input class="cgin" id="cgIn" type="${input}" autocomplete="off">`;
  d.innerHTML = `<div class="mbox" style="width:min(440px,100%)"><header><h2></h2></header><div class="mbody"><p class="sum"></p>${field}<div class="foot">${input === "copy" ? "" : '<button class="btn" data-x="0">Cancelar</button>'}<button class="btn" data-x="1"></button></div></div></div>`;
  d.querySelector("h2").textContent = title; d.querySelector(".sum").textContent = msg;
  d.querySelector('[data-x="1"]').textContent = okText || "Aceptar";
  const f = d.querySelector("#cgIn"); if (f && value) f.value = value;
  const kd = (e) => { if (e.key === "Escape") { e.stopPropagation(); close(false); } else if (e.key === "Enter" && f && f.tagName === "INPUT") close(true); };
  const close = (ok) => { document.removeEventListener("keydown", kd, true); d.remove(); if (ok && cb) cb(f ? f.value : undefined); };
  document.addEventListener("keydown", kd, true);
  d.addEventListener("click", (e) => { const b = e.target.closest("[data-x]"); if (b) close(b.dataset.x === "1"); else if (e.target === d) close(false); e.stopPropagation(); });
  document.body.appendChild(d);
  if (f) { f.focus(); if (input === "copy") f.select(); }
}
// ---- Menú Más
mkModal("hub", "Más", '<div class="hubg">' + [["m-quests", "Misiones"], ["m-codes", "Códigos"], ["m-pets", "Mascotas"], ["m-fuse", "Fusión"], ["m-album", "Álbum"], ["m-gal", "Huevos de oro"], ["m-games", "Minijuegos"], ["m-stats", "Estadísticas"], ["m-asc", "Ascender"], ["m-social", "Social"]].map(([i, n]) => `<button class="btn" data-open="${i}">${n}</button>`).join("") + "</div>");
mkModal("quests", "Misiones"); mkModal("pets", "Mascotas"); mkModal("fuse", "Fusión de objetos"); mkModal("album", "Álbum de cartas"); mkModal("gal", "Huevos de oro");
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
  if (mShop.hidden) return;
  const e = UPGRADES.filter((u) => owned(u) >= 25), sig = e.map((u) => u.id + ":" + state.br[u.id]).join();
  if (sig === _bs) return; _bs = sig;
  $("branches").innerHTML = e.length ? e.map((u) => {
    const current = state.br[u.id];
    if (current === undefined) {
      return `<li class="br"><b>${u.name}</b><button class="btn" data-b="${u.id}:0">Vapor: prod x2, coste +20%</button><button class="btn" data-b="${u.id}:1">Taller: prod x1.5, coste -30%</button></li>`;
    } else {
      const swapTo = current === 0 ? 1 : 0;
      const swapName = current === 0 ? "Taller" : "Vapor";
      const cost = 50000; // Coste fijo o dinámico para cambiar
      return `<li class="br"><b>${u.name}</b><small>Elegido: ${current === 0 ? "Vapor" : "Taller"}</small> <button class="btn" data-swap="${u.id}:${swapTo}:${cost}">Cambiar a ${swapName} (${fmt(cost)})</button></li>`;
    }
  }).join("") : '<li class="sum small">Aún no tienes mejoras al nivel 25.</li>';
}
$("branches").addEventListener("click", (e) => {
  const btnSwap = e.target.closest("[data-swap]");
  if (btnSwap) {
    const [id, to, cost] = btnSwap.dataset.swap.split(":");
    if (state.coins < +cost) return toast("Te faltan ricoins para cambiar de camino");
    showModal("Cambiar camino", `¿Cambiar camino por ${fmt(+cost)} ricoins?`, "Cambiar", () => {
      if (state.coins < +cost) return;
      state.coins -= +cost;
      state.br[id] = +to;
      _bs = ""; save(); render(); updBranches(); sfx(880, .15);
    });
    return;
  }
  const b = e.target.closest("[data-b]"); if (!b) return; const [id, n] = b.dataset.b.split(":"); state.br[id] = +n; _bs = ""; sfx(880, .15); save(); render(); });

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

// ---- 15 Mensajes del pollo / 18 Emociones
function say(t, ms = 3200) { const b = $("bubble"); b.textContent = t; b.hidden = false; clearTimeout(b._t); b._t = setTimeout(() => (b.hidden = true), ms); }
let nextSay = Date.now() + 15000;

// ---- 10 Hitos de combo
let hit = {};
$("chick").addEventListener("click", (e) => {
  state.cc = (state.cc || 0) + 1; updCC();
  if (combo < 5) hit = {};
  for (const m of [10, 25, 50, 100]) if (combo >= m && !hit[m]) {
    hit[m] = 1; const g = Math.max(100, perSec() * m * 2); gain(g);
    toast("¡Combo x" + m + "! +" + fmt(g)); say("¡Combo x" + m + "!"); confetti(stage.clientWidth / 2, stage.clientHeight / 2, m >= 50 ? 50 : 20);
    [660, 880, 1100].forEach((f, i) => setTimeout(() => sfx(f, .12), i * 70));
    if (m === 50) addChest("madera"); if (m === 100) { addChest("plata"); if (state.set.shake) replay(stage, "shake"); }
  }
  const r = $("floaters").getBoundingClientRect(), x = e.clientX ? e.clientX - r.left : r.width / 2, y = e.clientY ? e.clientY - r.top : r.height / 2;
  const t = TAPFX[state.cosm.eq.tap]; if (t && state.set.fx) charBurst(x, y, t, 7);
});

// ---- 22 Efectos de toque y estelas
const TAPFX = { estrellas: { ch: "★", c: ["#ffd84a", "#fff3a6"] }, corazones: { ch: "♥", c: ["#ff5d73", "#ff9aa8"] }, burbujas: { ch: "●", c: ["#8fe0ff", "#d6f4ff"] }, llamas: { ch: "▲", c: ["#ff7a2e", "#ffd84a"] }, arcoiris: { ch: "✦", c: null }, chispas: { ch: "✦", c: ["#ffe27a", "#fff"] } };
function charBurst(x, y, d, n) {
  if (!state.set.fx || floatersEl.childElementCount > 50) return;
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
  if (!state.set.fx) return; const sk = COSM.skin.find((x) => x.id === state.cosm.eq.skin); if (!sk) return;
  const c = FXC[sk.id], col = !c && FXA.includes(sk.rar) ? sk.au || sk.v[1] : null; if (!c && !col) return;
  spray("conf", stage.clientWidth / 2 + (Math.random() - .5) * 160, stage.clientHeight / 2 + 40 + (Math.random() - .5) * 100, 1, 1100, 60, () => `--c:${c ? pick(c) : col}`);
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
function effScene0() {
  const s = state.cosm.eq.scene; if (!state.set.auto) return s;
  const h = new Date().getHours(), id = h >= 7 && h < 18 ? "dia" : h >= 18 && h < 21 ? "tarde" : "noche", o = COSM.scene.find((x) => x.id === id);
  return o && has({ ...o, cat: "scene", key: "scene:" + id }) ? id : s;
}
const effScene = ttl(effScene0, 1000);
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

// ---- 5 Mascotas (animales; solo salen de huevos) y atributos por rareza
const RFV = { comun: 1, raro: 1.5, epico: 2.5, legendario: 4, mitico: 7 };
const BV = { sec: .04, clk: .04, crit: .004, chest: .06, wheel: .02, xp: .04, all: .02 };
const ATY = Object.keys(BV), NATT = { comun: 1, raro: 2, epico: 3, legendario: 4, mitico: 5 };
function hashS(s) { let h = 0; for (const c of s) h = (h * 31 + c.charCodeAt(0)) >>> 0; return h; }
function genAttrs(id, rar, first) {
  const out = first ? [first] : [], used = new Set(out.map((a) => a[0])), h = hashS(id); let k = 0;
  while (out.length < NATT[rar] && k < 40) { const t = ATY[(h + k * 3) % ATY.length]; k++; if (used.has(t)) continue; used.add(t); out.push([t, Math.round(BV[t] * RFV[rar] * 1000) / 1000]); }
  return out;
}
const ATX = { sec: ["+", "% producción"], clk: ["+", "% por toque"], crit: ["+", " pts de crítico"], chest: ["+", "% ricoins de cofres"], wheel: ["-", "% espera de ruleta"], xp: ["+", "% XP al renacer"], all: ["+", "% a todo"] };
const atText = (a) => ATX[a[0]][0] + (a[1] * 100).toFixed(a[1] * 100 < 10 ? 1 : 0) + ATX[a[0]][1];
const bnArr = (b) => (typeof b[0] === "string" ? [b] : b);
const bnLine = (b) => bnArr(b).map(atText).join(" · ");
const petSvg = (c) => `<svg viewBox="0 0 40 40" aria-hidden="true"><ellipse cx="20" cy="36" rx="12" ry="3" fill="rgba(0,0,0,.2)"/><circle cx="20" cy="22" r="14" fill="${c}" stroke="#2b2118" stroke-width="3"/><circle cx="15" cy="20" r="2.4" fill="#2b2118"/><circle cx="25" cy="20" r="2.4" fill="#2b2118"/><path d="M17 25h6l-3 5z" fill="#ff8a1f" stroke="#2b2118" stroke-width="1.5"/></svg>`;
const K = "#2b2118", eyes = `<circle cx="15" cy="21" r="2.2" fill="${K}"/><circle cx="25" cy="21" r="2.2" fill="${K}"/>`;
const ART = {
  gato: (c) => `<path d="M7 17L9 3l9 8zM33 17L31 3l-9 8z" fill="${c}" stroke="${K}" stroke-width="2" stroke-linejoin="round"/><circle cx="20" cy="23" r="14" fill="${c}" stroke="${K}" stroke-width="2.5"/>${eyes}<path d="M18 26h4l-2 2.500z" fill="#ff8aa8"/><path d="M4 25h8M4 29h8M28 25h8M28 29h8" stroke="${K}" stroke-width="1.200"/>`,
  perro: (c) => `<ellipse cx="8" cy="20" rx="5" ry="10" fill="#8a5a1f" stroke="${K}" stroke-width="2"/><ellipse cx="32" cy="20" rx="5" ry="10" fill="#8a5a1f" stroke="${K}" stroke-width="2"/><circle cx="20" cy="22" r="13" fill="${c}" stroke="${K}" stroke-width="2.500"/>${eyes}<ellipse cx="20" cy="27" rx="4" ry="3" fill="${K}"/><path d="M18 30q2 6 4 0z" fill="#ff6a8a"/>`,
  tortuga: (c) => `<ellipse cx="22" cy="24" rx="15" ry="11" fill="#2f8f46" stroke="${K}" stroke-width="2.500"/><path d="M10 22h24M17 14v20M27 14v20" stroke="#1b5e2a" stroke-width="1.500"/><circle cx="6" cy="22" r="6" fill="${c}" stroke="${K}" stroke-width="2"/><circle cx="4.500" cy="21" r="1.400" fill="${K}"/><rect x="11" y="31" width="6" height="6" rx="2" fill="${c}" stroke="${K}" stroke-width="1.500"/><rect x="28" y="31" width="6" height="6" rx="2" fill="${c}" stroke="${K}" stroke-width="1.500"/>`,
  conejo: (c) => `<ellipse cx="14" cy="9" rx="4" ry="9" fill="${c}" stroke="${K}" stroke-width="2"/><ellipse cx="26" cy="9" rx="4" ry="9" fill="${c}" stroke="${K}" stroke-width="2"/><ellipse cx="14" cy="9" rx="2" ry="6" fill="#ffb3c8"/><ellipse cx="26" cy="9" rx="2" ry="6" fill="#ffb3c8"/><circle cx="20" cy="26" r="12" fill="${c}" stroke="${K}" stroke-width="2.500"/><circle cx="15" cy="24" r="2" fill="${K}"/><circle cx="25" cy="24" r="2" fill="${K}"/><path d="M18 28h4l-2 2z" fill="#ff8aa8"/><rect x="18.500" y="31" width="3" height="4" fill="#fff" stroke="${K}" stroke-width="1"/>`,
  cocodrilo: (c) => `<rect x="3" y="16" width="34" height="19" rx="8" fill="${c}" stroke="${K}" stroke-width="2.500"/><circle cx="12" cy="14" r="5" fill="${c}" stroke="${K}" stroke-width="2"/><circle cx="28" cy="14" r="5" fill="${c}" stroke="${K}" stroke-width="2"/><circle cx="12" cy="14" r="2" fill="${K}"/><circle cx="28" cy="14" r="2" fill="${K}"/><circle cx="14" cy="22" r="1.200" fill="${K}"/><circle cx="26" cy="22" r="1.200" fill="${K}"/><path d="M6 30l2 4 2-4 2 4 2-4 2 4 2-4 2 4 2-4 2 4 2-4 2 4 2-4" fill="#fff" stroke="${K}" stroke-width="1"/>`,
  zorro: (c) => `<path d="M6 18L9 3l9 9zM34 18L31 3l-9 9z" fill="${c}" stroke="${K}" stroke-width="2" stroke-linejoin="round"/><circle cx="20" cy="23" r="14" fill="${c}" stroke="${K}" stroke-width="2.500"/><path d="M7 27Q20 40 33 27Q20 31 7 27z" fill="#fff"/>${eyes}<ellipse cx="20" cy="27" rx="3" ry="2.200" fill="${K}"/>`,
  elefante: (c) => `<circle cx="8" cy="19" r="8" fill="${c}" stroke="${K}" stroke-width="2"/><circle cx="32" cy="19" r="8" fill="${c}" stroke="${K}" stroke-width="2"/><circle cx="20" cy="21" r="12" fill="${c}" stroke="${K}" stroke-width="2.500"/>${eyes}<path d="M18 26q-4 10 2 12 3 0 3-6" fill="none" stroke="${K}" stroke-width="7" stroke-linecap="round"/><path d="M18 26q-4 10 2 12 3 0 3-6" fill="none" stroke="${c}" stroke-width="4" stroke-linecap="round"/>`,
  panda: () => `<circle cx="8" cy="9" r="5" fill="${K}"/><circle cx="32" cy="9" r="5" fill="${K}"/><circle cx="20" cy="23" r="14" fill="#fff" stroke="${K}" stroke-width="2.500"/><ellipse cx="14" cy="21" rx="4" ry="5" fill="${K}"/><ellipse cx="26" cy="21" rx="4" ry="5" fill="${K}"/><circle cx="14" cy="21" r="1.300" fill="#fff"/><circle cx="26" cy="21" r="1.300" fill="#fff"/><ellipse cx="20" cy="28" rx="3" ry="2" fill="${K}"/>`,
  leon: (c) => `<circle cx="20" cy="22" r="18" fill="#c7791a" stroke="${K}" stroke-width="2.500"/><circle cx="20" cy="23" r="12" fill="${c}" stroke="${K}" stroke-width="2"/>${eyes}<path d="M17 26h6l-3 3z" fill="${K}"/><path d="M20 29v2M17 32q3 2 6 0" stroke="${K}" stroke-width="1.200" fill="none"/>`,
  dragon: (c) => `<path d="M8 14L4 2l10 8zM32 14L36 2l-10 8z" fill="#ffd84a" stroke="${K}" stroke-width="2" stroke-linejoin="round"/><path d="M5 22L-1 14 9 18zM35 22L41 14 31 18z" fill="#b05cff" stroke="${K}" stroke-width="2"/><circle cx="20" cy="23" r="14" fill="${c}" stroke="${K}" stroke-width="2.500"/><ellipse cx="14" cy="20" rx="3.500" ry="2.500" fill="#ffe27a" stroke="${K}" stroke-width="1.200"/><ellipse cx="26" cy="20" rx="3.500" ry="2.500" fill="#ffe27a" stroke="${K}" stroke-width="1.200"/><circle cx="17" cy="28" r="1.200" fill="${K}"/><circle cx="23" cy="28" r="1.200" fill="${K}"/><path d="M15 31l1.500 3 1.500-3M22 31l1.500 3 1.500-3" fill="#fff" stroke="${K}" stroke-width=".8"/>`,
  unicornio: (c) => `<path d="M20 0l4 12h-8z" fill="#ffd84a" stroke="${K}" stroke-width="1.500" stroke-linejoin="round"/><path d="M8 12Q0 22 7 33" fill="none" stroke="#ff5d73" stroke-width="3"/><path d="M10 12Q3 22 10 33" fill="none" stroke="#ffd84a" stroke-width="3"/><path d="M12 12Q6 22 12 32" fill="none" stroke="#3d9bff" stroke-width="3"/><circle cx="21" cy="24" r="13" fill="${c}" stroke="${K}" stroke-width="2.500"/><circle cx="16" cy="22" r="2.200" fill="${K}"/><circle cx="26" cy="22" r="2.200" fill="${K}"/><ellipse cx="21" cy="29" rx="3" ry="2" fill="#ffb3c8"/>`,
};
const animalSvg = (sp, c) => `<svg viewBox="-4 -2 48 44" aria-hidden="true">${ART[sp](c)}</svg>`;
const PETS = [
  { id: "gato", n: "Gato Michi", sp: "gato", r: "comun", c: "#f5a25d", f: ["clk", .03] }, { id: "perro", n: "Perro Toby", sp: "perro", r: "comun", c: "#d9a15b", f: ["sec", .03] }, { id: "tortuga", n: "Tortuga Tula", sp: "tortuga", r: "comun", c: "#8fd08a", f: ["chest", .05] },
  { id: "conejo", n: "Conejo Nube", sp: "conejo", r: "raro", c: "#f4f4f4", f: ["clk", .05] }, { id: "cocodrilo", n: "Cocodrilo Cro", sp: "cocodrilo", r: "raro", c: "#58b04a", f: ["sec", .05] }, { id: "zorro", n: "Zorrito Rojo", sp: "zorro", r: "raro", c: "#ff8a3d", f: ["crit", .005] },
  { id: "elefante", n: "Elefante Dumbo", sp: "elefante", r: "epico", c: "#9aa4b3", f: ["sec", .08] }, { id: "panda", n: "Panda Bambú", sp: "panda", r: "epico", c: "#fff", f: ["chest", .1] },
  { id: "leon", n: "León Rey", sp: "leon", r: "legendario", c: "#f0a830", f: ["sec", .15] },
  { id: "dragon", n: "Dragón Chispa", sp: "dragon", r: "mitico", c: "#7a3cff", f: ["all", .05] }, { id: "unicornio", n: "Unicornio Iris", sp: "unicornio", r: "mitico", c: "#ffe9fb", f: ["clk", .2] },
].map((p) => ({ ...p, at: genAttrs("pet" + p.id, p.r, p.f) }));
const petLv = (id) => 1 + .25 * ((state.pets[id] || 1) - 1);
let _pbS = "", _pbV = {};
function petBn(t) {
  const sig = state.petEq.map((id) => id + (state.pets[id] || 1)).join();
  if (sig !== _pbS) { _pbS = sig; _pbV = {}; state.petEq.forEach((id) => { const p = PETS.find((x) => x.id === id); if (p) p.at.forEach((a) => { _pbV[a[0]] = (_pbV[a[0]] || 0) + a[1] * petLv(id); }); }); }
  return _pbV[t] || 0;
}
const RW = { comun: 60, raro: 28, epico: 9, legendario: 2.5, mitico: .5 };
function rollRar() { let r = Math.random() * 100; for (const k in RW) if ((r -= RW[k]) < 0) return k; return "comun"; }
function givePet() { state.peggs = (state.peggs || 0) + 1; toast("¡Huevo de mascota! Ábrelo en Más → Mascotas"); save(); }
function hatchPet() {
  if (!state.peggs) return toast("No tienes huevos de mascota");
  state.peggs--; const rr = rollRar(), p = pick(PETS.filter((x) => x.r === rr)), had = state.pets[p.id] || 0;
  state.pets[p.id] = Math.min(10, had + 1); if (!had && state.petEq.length < 3) state.petEq.push(p.id);
  showCard(`${animalSvg(p.sp, p.c)}<b>${p.n}</b><span class="rar">${RAR[p.r].n}</span><small>${had ? "¡Sube a nivel " + state.pets[p.id] + "!" : "¡Mascota nueva!"}</small>`, RAR[p.r].c);
  save(); setTimeout(() => RENDER["m-pets"] && RENDER["m-pets"](), 1400);
}
let _pe = "";
function petsStage() {
  const s = state.petEq.join(); if (s === _pe) return; _pe = s;
  $("pets").innerHTML = state.petEq.map((id, i) => { const p = PETS.find((x) => x.id === id); return `<span class="pet p${i}" title="${p.n}">${animalSvg(p.sp, p.c)}</span>`; }).join("");
}
RENDER["m-pets"] = () => {
  $("b-pets").innerHTML = `<div class="peggs"><span class="egg-ic" style="background:radial-gradient(circle at 35% 30%,#fff,#ffd0e4 55%,#ff78ad)"></span><b>Huevos de mascota: ${state.peggs || 0}</b><button class="btn" data-hatch="1"${state.peggs ? "" : " disabled"}>Abrir huevo</button></div><p class="sum small">Solo salen de huevos (cofres, misiones, pase, códigos). Repetidas suben de nivel (máx. 10). Llevas hasta 3.</p><ul class="pets-list">` + PETS.map((p) => {
    const l = state.pets[p.id] || 0, on = state.petEq.includes(p.id);
    return `<li><button class="sk${on ? " on" : ""}${l ? "" : " lk"}" data-pet="${p.id}" style="border-color:${RAR[p.r].c}"><span class="pi">${animalSvg(p.sp, l ? p.c : "#999")}</span><b>${l ? p.n : "???"}</b><em style="color:${RAR[p.r].c}">${RAR[p.r].n}</em>${l ? p.at.map((a) => `<small>${atText([a[0], a[1] * petLv(p.id)])}</small>`).join("") : "<small>Sin descubrir</small>"}<em>${l ? "Nv " + l + (on ? " · puesta" : "") : ""}</em></button></li>`;
  }).join("") + "</ul>";
};
document.addEventListener("click", (e) => {
  if (e.target.closest("[data-hatch]")) return hatchPet();
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
function cardBonus0() { return CARDS.reduce((n, c) => { const k = state.cards[c.id]; return n + (k ? .004 * (k.foil ? 2 : 1) : 0); }, 0); }
const cardBonus = ttl(cardBonus0, 500);
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
const STAT = { clicks: () => state.st.clicks, crits: () => state.st.crits, chests: () => state.st.chests, golds: () => state.st.golds, spins: () => state.st.spins || 0, games: () => state.st.games || 0, fusions: () => state.st.fusions || 0 };
const QP = [
  { s: "clicks", n: "Toca a Ricopio %n veces", d: 150, w: 2500 }, { s: "crits", n: "Consigue %n golpes críticos", d: 10, w: 120 }, { s: "chests", n: "Abre %n cofres", d: 2, w: 14 },
  { s: "golds", n: "Atrapa %n huevos de oro", d: 1, w: 6 }, { s: "spins", n: "Gira la ruleta %n veces", d: 1, w: 7 }, { s: "clicks", n: "Maratón: toca %n veces", d: 400, w: 6000 },
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
  if (liveOn("2026-10")) hwS().reg++;
  const m = 1 + .1 * Math.min(10, q.streak), g = Math.max(2000, perSec() * 900) * m * (k === "w" ? 8 : 1); gain(g);
  if (k === "w") addChest("oro"); passXp(k === "w" ? 100 : 25);
  confetti(stage.clientWidth / 2, stage.clientHeight / 2, 30); toast("Misión completada +" + fmt(g)); sfx(990, .15); save(); render(); RENDER["m-quests"](); renderPW(true);
});
const PASS_N = 60, PASS_XP = 100, MESES = "Enero,Febrero,Marzo,Abril,Mayo,Junio,Julio,Agosto,Septiembre,Octubre,Noviembre,Diciembre".split(",");
function passState() { const k = monthKey(); if (!state.pass || state.pass.key !== k) state.pass = { key: k, xp: 0, claimed: [] }; return state.pass; }
function passXp(n) { passState().xp += n; }
const passLvl = () => Math.min(PASS_N, Math.floor(passState().xp / PASS_XP));
const seasonId = (k) => "pase" + k.replace("-", "");
for (let i = 0; i < 12; i++) {
  const d = new Date(); d.setDate(1); d.setMonth(d.getMonth() - i); const k = dayKey(d).slice(0, 7), m = d.getMonth();
  COSM.skin.push({ id: seasonId(k), n: "Temporada " + MESES[m] + (i ? " " + d.getFullYear() : ""), secret: 1, bn: ["sec", .4], cls: "shine", v: [`hsl(${m * 30} 80% 60%)`, `hsl(${m * 30} 70% 45%)`, `hsl(${m * 30} 90% 85%)`] });
}
// ---- 4 Ascender
const PERKS = [{ id: "gprod", n: "Plumas de poder", d: "+20% producción global", c: 1 }, { id: "gxp", n: "Sabiduría", d: "+25% XP al renacer", c: 2 }, { id: "gchest", n: "Cofres veloces", d: "-5% espera de cofres", c: 2 }, { id: "gwheel", n: "Ruleta veloz", d: "-3% espera de ruleta", c: 3 }];
RENDER["m-asc"] = () => {
  const can = state.reb >= 5, g = Math.max(1, Math.floor(state.reb / 5));
  $("b-asc").innerHTML = `<p class="sum">Ascensiones: <b>${state.asc}</b> (cada una da +50% de producción global) · Plumas doradas: <b>${state.gf}</b></p><p class="sum small">Necesitas 5 renacimientos. Ascender reinicia renacimientos, ricoins y mejoras. Conservas el árbol, la XP, aspectos, logros, objetos, cartas, mascotas y mutaciones. Ganarías <b>${g}</b> pluma${g > 1 ? "s" : ""}.</p><button id="ascGo" class="btn wide reb"${can ? "" : " disabled"}>Ascender</button><h3>Plumas doradas</h3>` + PERKS.map((p) => { const l = gl(p.id), c = p.c * (l + 1); return `<button class="node${l ? " has" : ""}" data-perk="${p.id}"${l >= 10 || state.gf < c ? " disabled" : ""}><b>${p.n} ${l}/10</b><small>${p.d}</small><span>${l >= 10 ? "Máx." : c + " 🪶"}</span></button>`; }).join("");
};
document.addEventListener("click", (e) => {
  if (e.target.id === "ascGo") {
    if (state.reb < 5) return;
    return showModal("Ascender", "Reinicias renacimientos, ricoins y mejoras (conservas el árbol y la XP).", "Ascender", () => {
      if (state.reb < 5) return;
      state.gf += Math.max(1, Math.floor(state.reb / 5)); state.asc++; state.reb = 0; state.coins = 0; state.run = 0; state.owned = {}; combo = 0; state.cc = 0; updCC();
      confetti(innerWidth / 2, innerHeight / 3, 80); toast("¡Has ascendido! Ascensión " + state.asc); passXp(100); save(); render(); renderTree(); RENDER["m-asc"]();
    });
  }
  const p = e.target.closest("[data-perk]"); if (!p) return; const pk = PERKS.find((x) => x.id === p.dataset.perk), c = pk.c * (gl(pk.id) + 1);
  if (state.gf < c || gl(pk.id) >= 10) return; state.gf -= c; state.gp[pk.id] = gl(pk.id) + 1; sfx(880, .12); save(); render(); RENDER["m-asc"]();
});

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
  $("b-stats").innerHTML = `<p class="sum">Evolución: <b>${EVO[evoIdx()]}</b></p>` + row("Tiempo jugado", fmtH(s.time || 0)) + row("Toques", L(s.clicks)) + row("Críticos", L(s.crits)) + row("Mejor combo", s.maxCombo) + row("Cofres abiertos", s.chests) + row("Huevos de oro", s.golds) + row("Giros de ruleta", s.spins || 0) + row("Minijuegos", s.games || 0) + row("Ricoins totales", fmt(state.total)) + row("Renacimientos / Ascensiones", state.reb + " / " + state.asc) + row("Cartas / Mascotas", Object.keys(state.cards).length + " / " + Object.keys(state.pets).length) +
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
const wkMod0 = () => WK[Math.floor(seedRand("wk" + weekKey())() * WK.length)];
const wkMod = ttl(wkMod0, 5000);
function wkM(t) { const m = wkMod(); return t === "crit" ? 1 : m[t] || 1; }
function wkScore() { if (!state.wk || state.wk.key !== weekKey()) state.wk = { key: weekKey(), start: state.total }; return state.total - state.wk.start; }
// ---- 9 Huevo sorpresa al abrir
const crack = document.createElement("div"); crack.id = "crack"; crack.className = "crack"; crack.hidden = true;
crack.innerHTML = '<svg viewBox="0 0 100 130" aria-hidden="true"><path class="eg" d="M50 6C78 6 94 56 94 82a44 44 0 0 1-88 0C6 56 22 6 50 6z" fill="#fff8e6" stroke="#2b2118" stroke-width="5"/><path class="ck" d="M18 70l14 12 12-14 12 14 14-12 14 12" fill="none" stroke="#2b2118" stroke-width="4" stroke-linejoin="round"/></svg>';
document.body.appendChild(crack);
function showCard(html, color) {
  if (state.set.rm) return revealCard(html, color);
  crack.hidden = false; crack.style.setProperty("--rc", color); crack.classList.remove("go"); void crack.offsetWidth; crack.classList.add("go");
  [300, 380, 460].forEach((f, i) => setTimeout(() => sfx(f, .09), i * 380));
  setTimeout(() => { crack.hidden = true; revealCard(html, color); }, 1300);
}

// ---- 13 Música dinámica
let mStep = 0;
function mus(f, d, type, g) {
  if (state.muted || !state.set.music) return;
  try { ac = ac || new AudioContext(); if (ac.state === "suspended") ac.resume(); const o = ac.createOscillator(), gn = ac.createGain(), t = ac.currentTime; o.type = type; o.frequency.value = f; gn.gain.setValueAtTime(g * state.set.vol, t); gn.gain.exponentialRampToValueAtTime(.0005, t + d); o.connect(gn); gn.connect(ac.destination); o.start(); o.stop(t + d); } catch {}
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
$("m-set").querySelector(".mbody").insertAdjacentHTML("afterbegin", `<label class="row">Música <input id="music" type="checkbox"></label><label class="row">Idioma <select id="lang"><option value="es">Español</option><option value="en">English</option></select></label><label class="row">Tamaño de texto <select id="big"><option value="100">Normal</option><option value="115">Grande</option><option value="130">Muy grande</option></select></label><label class="row">Modo daltonismo <input id="cb" type="checkbox"></label><label class="row">Reducir animaciones <input id="rm" type="checkbox"></label><label class="row">Mundo según la hora <input id="auto" type="checkbox"></label><label class="row">Notificaciones <input id="notif" type="checkbox"></label><div class="foot"><button id="codeCopy" class="btn">Copiar código</button><button id="codePaste" class="btn">Pegar código</button></div><p class="sum small">Atajos: 1 Tienda · 2 Aspectos · 3 Armario · 4 Renacer · 5 Ruleta · 6 Logros · 7 Secretos · 8 Ajustes · 9 Más</p>`);
["music", "cb", "rm", "auto", "notif"].forEach((k) => ($(k).onchange = () => { state.set[k] = $(k).checked; if (k === "notif" && $(k).checked && typeof Notification !== "undefined") Notification.requestPermission(); if (k === "auto") applyLook(); save(); applySet(); }));
$("lang").onchange = () => { state.set.lang = $("lang").value; save(); applySet(); };
$("big").onchange = () => { state.set.big = +$("big").value; save(); applySet(); };
// ---- 31 Guardado por código
function loadState(d) { if (typeof d.coins !== "number") throw 0; if (!verify(d)) return toast("Partida corrupta o modificada"); state = fix(d); save(); rank = rankIndex(); _ap = ""; applyLook(); renderColl(); renderWard(); render(); syncIntro(); toast("Partida cargada"); }
$("codeCopy").onclick = () => { save(); copyText("RC-" + enc(JSON.stringify(state)), "Código de partida copiado"); };
$("codePaste").onclick = () => showModal("Pegar código", "Pega tu código de partida:", "Cargar", importCode, "text");


// Atajos de teclado
addEventListener("keydown", (e) => {
  if (!started || /INPUT|TEXTAREA|SELECT/.test((e.target && e.target.tagName) || "")) return;
  const ri = rankIndex(); if (("25".includes(e.key) && ri < 1) || (e.key === "3" && ri < 2) || (e.key === "4" && ri < 3)) return;   // atajos bloqueados hasta desbloquear el menú
  const m = { 1: "m-shop", 2: "m-skins", 4: "m-reb", 5: "m-wheel", 6: "m-ach", 7: "m-egg", 8: "m-set", 9: "m-hub" }[e.key];
  if (m) openM(m); else if (e.key === "3") { $("wardrobe").hidden = false; renderWard(); }
});

// ---- Logros y easter eggs nuevos
EGGS.push(
  { id: "vuelta", n: "Te echaba de menos", h: "Ricopio se alegra cuando vuelves después de dejarlo solo un buen rato (cambia de pestaña unos segundos)." },
  { id: "fecha", n: "Día señalado", h: "Juega en Navidad, Año Nuevo o Halloween." },
  { id: "marcos", n: "Marcos", h: "Hay un nombre propio que, al escribirlo con el teclado, hace que Ricopio se alegre." },
  { id: "gallina", n: "La pareja", h: "Escribe el nombre de la compañera de Ricopio." },
  { id: "corto", n: "Rápido y furioso", h: "Toca a Ricopio 15 veces en menos de 2 segundos." });
ACH.push(
  { id: "s1", n: "Sin manos", d: "Compra 10 mejoras con menos de 100 toques", r: "epico", sec: 1, f: () => tierMax() >= 10 && state.st.clicks < 100 },
  { id: "s2", n: "Domador", d: "Ten 3 mascotas de nivel 5", r: "epico", sec: 1, f: () => Object.values(state.pets).filter((v) => v >= 5).length >= 3 },
  { id: "s3", n: "Maratón", d: "Juega 2 horas en total", r: "raro", sec: 1, f: () => (state.st.time || 0) >= 7200 },
  { id: "s4", n: "Oro negro", d: "Atrapa un huevo de oro negro", r: "legendario", sec: 1, f: () => (state.gold.negro || 0) >= 1 },
  { id: "s5", n: "Ascendido", d: "Asciende por primera vez", r: "legendario", sec: 1, f: () => state.asc >= 1 },
  { id: "s6", n: "Álbum completo", d: "Consigue las 24 cartas", r: "mitico", sec: 1, f: () => CARDS.every((c) => state.cards[c.id]) },
  { id: "s8", n: "Pase completo", d: "Completa los 60 niveles del pase de temporada", r: "epico", f: () => passLvl() >= PASS_N });

// ---- Bucle extra
let T3 = 0, notified = {}, _tl = "";
function notify(k, msg) { if (!state.set.notif || !document.hidden || typeof Notification === "undefined" || Notification.permission !== "granted" || notified[k]) return; notified[k] = 1; try { new Notification("Ricopio", { body: msg }); } catch {} }
let hideAt = 0;
document.addEventListener("visibilitychange", () => { if (document.hidden) hideAt = Date.now(); else if (started && hideAt && Date.now() - hideAt > 10000) egg("vuelta"); });
let cl2 = [];
document.addEventListener("click", (e) => {   // "Rápido y furioso": 15 toques al pollo en menos de 2 s
  if (!started || !e.target.closest("#chick")) return;
  const n = Date.now(); cl2 = cl2.filter((x) => n - x < 2000); cl2.push(n); if (cl2.length >= 15) egg("corto");
});
addEventListener("keydown", (e) => { typed2 = (typed2 + (e.key.length === 1 ? e.key.toLowerCase() : "")).slice(-10); if (started && typed2.endsWith("gallina")) egg("gallina"); });
let typed2 = "";
function tick3() {
  T3++; if (!started) return;
  state.st.time = (state.st.time || 0) + UD;
  const idle = Date.now() - lastAct, h = new Date().getHours(), mood = idle > 90000 || (h < 6 && idle > 30000) ? "sleep" : idle > 30000 ? "bored" : combo >= 8 ? "happy" : "";
  if ($("chick").dataset.mood !== mood) $("chick").dataset.mood = mood;
  if (T3 % 100 === 0) { state.hist.push(perSec()); if (state.hist.length > 60) state.hist.shift(); ensureQuests(); passState(); const d = new Date(); if ((d.getMonth() === 11 && d.getDate() === 25) || (d.getMonth() === 0 && d.getDate() === 1) || (d.getMonth() === 9 && d.getDate() === 31)) egg("fecha"); }
  if (T3 % 5 === 0) ambient();
  if (T3 % 20 === 0) { applyEvo(); petsStage(); const t = TITLES.find((x) => x.id === (state.title || "nov")); titleLbl.textContent = t && t.f() ? t.n : "Pollito novato"; if (state.set.auto) applyLook(); }
  if (Date.now() > nextSay) { nextSay = Date.now() + 25000 + Math.random() * 20000; say(pick(idle > 45000 ? ["¿Hola? ¿Sigues ahí?", "Me aburro…"] : h < 6 ? ["Zzz…", "¿No es hora de dormir?"] : ["¡Pío!", "Hoy me siento rico.", "Dame toquecitos.", "¿Ya giraste la ruleta?", "Hay cofres esperando."])); }
  if (ev) { if (Date.now() >= ev.end) { ev = null; evBan.hidden = true; } else { evBan.hidden = false; evBan.textContent = ev.n.split("!")[0] + "! " + Math.ceil((ev.end - Date.now()) / 1000) + " s"; if (ev.id === "tormenta" && T3 % 3 === 0) spray("coin", Math.random() * stage.clientWidth, 0, 1, 800, 40); } }
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
});
ensureQuests(); passState(); wkScore();
function extraMult() { return (1 + .2 * gl("gprod")) * (1 + .5 * state.asc) * (1 + cardBonus()) * (1 + petBn("all") + skinBn("all")); }
function secX() { return (1 + petBn("sec")) * (1 + worldBn("sec")) * evM("sec") * wkM("sec"); }
function clkX() { return (1 + petBn("clk")) * (1 + worldBn("clk")) * evM("clk") * wkM("clk"); }

// ===================== RONDA 2 =====================
// ---- Rareza y atributos de aspectos y cosméticos
function rarOf(x) {
  if (x.rar) return x.rar; if (x.id === "ninguno") return "comun";
  if (x.rank !== undefined) return ["comun", "epico", "legendario", "mitico"][x.rank] || "epico";
  if (x.reb !== undefined) return x.reb <= 2 ? "epico" : x.reb <= 6 ? "legendario" : "mitico";
  if (x.achN) return x.achN >= 30 ? "mitico" : "legendario"; if (x.egg) return "mitico";
  const p = x.p || 0; return p <= 1500 ? "comun" : p <= 6000 ? "raro" : p <= 60000 ? "epico" : p <= 1e6 ? "legendario" : "mitico";
}
const rarCol = (x) => { const r = x.rar || rarOf(x); return RAR[r] ? RAR[r].c : "#2b2118"; };
const SKR = { clasico: "comun", rosa: "comun", menta: "comun", hielo: "comun", coral: "comun", lima: "raro", uva: "raro", noche: "raro", cielo: "raro", carbon: "raro", sandia: "raro", oro: "epico", plata: "epico", esmeralda: "epico", veterano: "epico", lava: "legendario", cosmos: "legendario", leyenda: "legendario", fantasma: "legendario", arcoiris: "legendario", fenix: "mitico", galaxia: "mitico", radio: "mitico", supremo: "mitico" };
const SKT = { fenix: "fuego", galaxia: "galaxia", radio: "radio", supremo: "iris" };
const SKA = { lava: "#ff7a2e", cosmos: "#8a7bdc", leyenda: "#ffd84a", fantasma: "#ffffff", arcoiris: "#ff5d73", fenix: "#ff6a1a", galaxia: "#ff3ca8", radio: "#b6ff1a", supremo: "#ffd84a" };
COSM.skin.push(
  { id: "naranja", n: "Naranja", p: 80, v: ["#ffa24a", "#ee8a2b", "#ffd9ae"], rar: "comun" },
  { id: "turquesa", n: "Turquesa", p: 2200, v: ["#3fd6c9", "#1fa89c", "#b8f5ee"], rar: "raro" },
  { id: "rubi", n: "Rubí", p: 6000, v: ["#e0314b", "#a8142f", "#ff9aa8"], rar: "raro" },
  { id: "amatista", n: "Amatista", p: 20000, v: ["#9b5de5", "#6a2fc4", "#d9b8ff"], rar: "epico", cls: "shine" },
  { id: "jade", n: "Jade", p: 40000, v: ["#3ec28f", "#1d8a63", "#b4f0d8"], rar: "epico", cls: "shine" },
  { id: "bronce", n: "Bronce", p: 90000, v: ["#cd7f32", "#9a5a1c", "#f0c58f"], rar: "epico", cls: "shine" },
  { id: "tormenta", n: "Tormenta", p: 8e6, v: ["#3a4a7a", "#2b3560", "#9fd0ff"], rar: "legendario", au: "#3db8ff", cls: "shine" },
  { id: "aurora", n: "Aurora", p: 3e7, v: ["#2de0b0", "#3d6cff", "#b6ffe8"], rar: "legendario", au: "#5fffd0", cls: "shine" },
  { id: "sombra", n: "Sombra", p: 1e8, v: ["#2a2a35", "#15151b", "#6a5acd"], rar: "legendario", au: "#b05cff" },
  { id: "dragon", n: "Dragón", p: 5e8, v: ["#1f7a3a", "#124d25", "#7cf08a"], rar: "mitico", tx: "escamas", au: "#3ccf6a" },
  { id: "oceano", n: "Océano", p: 2e9, v: ["#1d6fd6", "#0f4a99", "#9fe8ff"], rar: "mitico", tx: "olas", au: "#4fc3ff" },
  { id: "glitch", n: "Glitch", p: 1e10, v: ["#16161e", "#ff2d9a", "#00e5ff"], rar: "mitico", tx: "glitch", au: "#ff2d9a" },
  { id: "diamante", n: "Diamante", achN: 45, v: ["#9ff0ff", "#5fd0f0", "#e8fcff"], rar: "mitico", tx: "facetas", au: "#9ff0ff" });
COSM.hat.push({ id: "cuernos", n: "Cuernos de diablo", p: 12000 }, { id: "flores", n: "Corona de flores", p: 3500 }, { id: "vikingo", n: "Casco vikingo", p: 120000 });
COSM.eyes.push({ id: "laser", n: "Visor láser", p: 80000 }, { id: "fuegoojos", n: "Ojos de fuego", p: 2e6 });
COSM.neck.push({ id: "cadena", n: "Cadena de oro", p: 25000 }, { id: "perlas", n: "Collar de perlas", p: 4000 });
COSM.back.push({ id: "jetpack", n: "Jetpack", p: 400000 }, { id: "alasfuego", n: "Alas de fuego", p: 5e6 });
COSM.feet.push({ id: "patines", n: "Patines", p: 15000 });
COSM.skin.forEach((s) => {
  if (/^pase/.test(s.id)) { s.rar = "mitico"; s.tx = "pase"; s.au = "#ffd84a"; } else { s.rar = SKR[s.id] || s.rar || rarOf(s); if (SKT[s.id]) s.tx = SKT[s.id]; if (SKA[s.id]) s.au = SKA[s.id]; }
  if (s.id !== "clasico") s.bn = genAttrs("sk" + s.id, s.rar, s.bn ? bnArr(s.bn)[0] : null);
});
["hat", "eyes", "neck", "back", "feet", "tap", "trail"].forEach((c) => COSM[c].forEach((x) => { if (x.id === "ninguno") return; x.rar = rarOf(x); x.bn = genAttrs(c + x.id, x.rar, null); }));
_sbS = "";
function skinBn(t) {
  const categories = EQC || [];
  const sig = categories.map((c) => state.cosm.eq[c]).join();
  if (sig !== _sbS) { _sbS = sig; _sbV = {}; for (const c of categories) { const x = COSM[c].find((y) => y.id === state.cosm.eq[c]); if (x && x.bn) for (const a of bnArr(x.bn)) _sbV[a[0]] = (_sbV[a[0]] || 0) + a[1]; } }
  return _sbV[t] || 0;
}
const TXCSS = { galaxia: "radial-gradient(circle at 35% 30%,#ff6ad5,#5b3cff 50%,#12103a)", fuego: "linear-gradient(0deg,#c1190a,#ff6a1a,#ffe27a)", radio: "repeating-linear-gradient(90deg,#b6ff1a 0 6px,#1c2a05 6px 12px)", iris: "conic-gradient(#ff5d73,#ffb400,#6fd06f,#3d9bff,#b05cff,#ff5d73)", pase: "conic-gradient(#4b2a8c,#ffd84a,#4b2a8c,#ffd84a,#4b2a8c)", escamas: "radial-gradient(circle,#7cf08a 18%,#1f7a3a 22% 60%,#124d25)", olas: "repeating-linear-gradient(0deg,#1d6fd6 0 5px,#9fe8ff 5px 7px)", glitch: "linear-gradient(90deg,#ff2d9a,#16161e,#00e5ff,#16161e)", facetas: "conic-gradient(#e8fcff,#5fd0f0,#c8f6ff,#9ff0ff,#e8fcff)" };
function renderSkins() {
  $("skinGrid").innerHTML = COSM.skin.map((o) => {
    const x = { ...o, cat: "skin", key: "skin:" + o.id }, own = has(x), on = state.cosm.eq.skin === o.id, hid = !own && x.secret;
    const st = on ? "Puesto" : own ? "Poner" : x.p ? fmt(x.p) + " ricoins" : reqText(x), bg = o.tx ? TXCSS[o.tx] : `radial-gradient(circle at 30% 30%,${o.v[2]},${o.v[0]} 55%,${o.v[1]})`;
    return `<li><button class="sk r-${o.rar}${on ? " on" : ""}${own ? "" : " lk"}" data-k="${x.key}" style="--rc:${rarCol(o)}"><i class="${o.tx ? "txi" : ""}" style="background:${bg}"></i><b>${hid ? "Secreto" : o.n}</b><em class="rt" style="color:${rarCol(o)}">${RAR[o.rar].n}${o.tx ? " · textura" : ""}${o.rar === "legendario" || o.rar === "mitico" ? " · aura" : ""}</em>${hid ? "<small>???</small>" : o.bn ? bnArr(o.bn).map((a) => `<small>${atText(a)}</small>`).join("") : "<small>Sin bonus</small>"}<em>${st}</em>${own ? "" : LOCK}</button></li>`;
  }).join("");
}
function applyFx() {
  const e = state.cosm.eq, sk = COSM.skin.find((x) => x.id === e.skin) || COSM.skin[0], ch = $("chick"), halo = $("halo"), r = sk.rar || "comun", au = sk.au || sk.v[1];
  document.querySelectorAll("#chick .tx").forEach((g) => (g.style.display = sk.tx && g.dataset.t === sk.tx ? "inline" : "none"));
  ch.classList.toggle("al", r === "legendario"); ch.classList.toggle("am", r === "mitico" || r === "exclusivo"); ch.style.setProperty("--au", au);
  halo.className = "halo" + (r === "legendario" ? " l" : (r === "mitico" || r === "exclusivo") ? " m" : ""); halo.style.setProperty("--au", au);
  const m = { hat: e.hat, eyes: e.eyes, neck: e.neck, back: e.back, feet: e.feet };
  document.querySelectorAll("#chick .a").forEach((g) => {
    let cat = null; for (const c in m) if (m[c] === g.dataset.a) cat = c;
    const x = cat && COSM[cat].find((y) => y.id === g.dataset.a), rr = (x && x.rar) || "comun";
    g.setAttribute("class", "a" + (rr === "legendario" || rr === "mitico" || rr === "exclusivo" ? " r-" + rr : "")); g.style.setProperty("--ac", RAR[rr] ? RAR[rr].c : "#fff");
  });
}
const FXA = ["legendario", "mitico"];

// ---- Contador de clicks visual (hasta renacer)
const ccEl = document.createElement("div"); ccEl.id = "cc"; ccEl.className = "cc"; ccEl.innerHTML = '<span>CLICK</span><b id="ccN">x0</b>'; stage.appendChild(ccEl);
function updCC(quiet) {
  const n = state.cc || 0; $("ccN").textContent = "x" + n.toLocaleString("es"); ccEl.dataset.t = n >= 5000 ? 5 : n >= 1000 ? 4 : n >= 500 ? 3 : n >= 100 ? 2 : 1;
  if (quiet) return; replay(ccEl, "pop");
  if ([100, 250, 500, 1000, 2500, 5000, 10000, 25000, 50000, 100000].includes(n)) { replay(ccEl, "big"); toast("¡CLICK x" + n.toLocaleString("es") + "!"); confetti(stage.clientWidth * .85, 120, 20); sfx(1000, .15); }
}

// ---- Pase de batalla (modal a pantalla completa, 60 marcas, gratis + premium 50M)
const PASS_PREM = 50e6;
function passState() { const k = monthKey(); if (!state.pass || state.pass.key !== k) state.pass = { key: k, xp: 0, cf: [], cp: [], prem: false }; if (!state.pass.cf) { state.pass.cf = []; state.pass.cp = []; } return state.pass; }
const CK = { 10: "plata", 20: "oro", 40: "arcano", 50: "legendario" }, CKP = { 10: "oro", 20: "arcano", 40: "legendario", 50: "mitico" };
function passFree(i) {
  if (i === 30) return { t: "item", r: "mitico", x: "Objeto mítico", s: "Mítico" }; if (i === 60) return { t: "chest", k: "mitico", x: "Cofre mítico", s: "Mítico" };
  if (CK[i]) return { t: "chest", k: CK[i], x: "Cofre " + CK[i], s: CK[i] }; if (i % 5 === 0) return { t: "egg", n: 1, x: "Huevo de mascota", s: "x1" };
  if (i % 3 === 0) return { t: "chest", k: "madera", x: "Cofre de madera", s: "Madera" }; return { t: "coin", m: i, x: "Ricoins", s: "Ricoins" };
}
function passPrem(i) {
  if (i === 30) return { t: "item", r: "mitico", x: "Objeto mítico", s: "Mítico" }; if (i === 60) return { t: "skin", x: "Skin mítica exclusiva del pase", s: "SKIN" };
  if (CKP[i]) return { t: "chest", k: CKP[i], x: "Cofre " + CKP[i], s: CKP[i] }; if (i % 5 === 0) return { t: "egg", n: 2, x: "2 huevos de mascota", s: "x2" };
  if (i % 2 === 0) return { t: "chest", k: i % 4 === 0 ? "oro" : "plata", x: "Cofre", s: i % 4 === 0 ? "Oro" : "Plata" }; return { t: "coin", m: i * 3, x: "Ricoins x3", s: "Ricoins" };
}
const EGGSV = '<svg viewBox="0 0 40 40"><path d="M20 3c8 0 13 12 13 20a13 13 0 0 1-26 0C7 15 12 3 20 3z" fill="#fff8e6" stroke="#2b2118" stroke-width="2.500"/><circle cx="15" cy="22" r="2.500" fill="#ff9ec7"/><circle cx="24" cy="16" r="2" fill="#8fe0ff"/><circle cx="23" cy="27" r="2.400" fill="#ffd84a"/></svg>';
function ptIcon(r) {
  if (r.t === "coin") return svg("gema", "#ffd84a"); if (r.t === "chest") return chestSvg(r.k); if (r.t === "egg") return EGGSV; if (r.t === "item") return svg("huevonegro", "#2b2b33");
  const k = passState().key, m = +k.slice(5) - 1; return `<i class="psw" style="background:conic-gradient(#4b2a8c,#ffd84a,hsl(${m * 30} 80% 60%),#ffd84a,#4b2a8c)"></i>`;
}
function grantPass(r) {
  if (r.t === "coin") gain(Math.max(500, perSec() * 60) * (1 + r.m / 5)); else if (r.t === "chest") addChest(r.k); else if (r.t === "egg") state.peggs = (state.peggs || 0) + r.n;
  else if (r.t === "item") { const it = pick(ITEMS.filter((i) => i.r === r.r)); state.items[it.id] = (state.items[it.id] || 0) + 1; renderColl(); showCard(`${svg(it.id, it.col)}<b>${it.name}</b><span class="rar">${RAR[it.r].n}</span><small>Recompensa del pase</small>`, RAR[it.r].c); }
  else if (r.t === "skin") { const key = "skin:" + (passState().key === "2026-10" ? "fantasmareal" : seasonId(passState().key)); if (!state.cosm.own.includes(key)) state.cosm.own.push(key); renderWard(); showCard(`${ptIcon(r)}<b>Skin del pase</b><span class="rar">Mítico · exclusiva</span><small>Ya está en tus aspectos</small>`, "#ff2d6f"); }
}
function claimPass(lane, i) {
  const ps = passState(), arr = lane === "p" ? ps.cp : ps.cf; if (passLvl() < i || arr.includes(i) || (lane === "p" && !ps.prem)) return false;
  arr.push(i); grantPass(lane === "p" ? passPrem(i) : passFree(i)); return true;
}
let _pwSig = "", _pwL = -1;
mkModal("pass", "Pase de Temporada"); // Asegura que el modal b-pass existe
function renderPW(force) {
  const ps = passState(), L = passLvl(), sig = [L, ps.xp, ps.prem, ps.cf.length, ps.cp.length].join("|"); 
  if (!force && sig === _pwSig) return; 
  _pwSig = sig;
  
  const old = $("pwS") ? $("pwS").scrollLeft : 0; 
  const rdy = [...Array(PASS_N)].filter((_, j) => { const i = j + 1; return L >= i && (!ps.cf.includes(i) || (ps.prem && !ps.cp.includes(i))); }).length;
  
  const tile = (lane, i) => {
    const r = lane === "p" ? passPrem(i) : passFree(i), done = (lane === "p" ? ps.cp : ps.cf).includes(i), ok = L >= i && (lane === "f" || ps.prem);
    return `<button class="pt ${lane}${done ? " done" : ok ? " ready" : ""}${i === 30 || i === 60 ? " star" : ""}" data-pt="${lane}:${i}" title="${r.x}">${ptIcon(r)}<small>${done ? "✓" : r.s}</small>${lane === "p" && !ps.prem ? '<u class="lk">🔒</u>' : ""}</button>`;
  };

  // --- LÓGICA DE MISIONES INTEGRADA ---
  ensureQuests();
  const q = state.q;
  const list = (k) => q[k].ids.map((i) => {
    const p = QP[i], tg = k === "d" ? p.d : p.w, pr = Math.min(tg, STAT[p.s]() - q[k].base[p.s]), done = q[k].done.includes(i);
    return `<li class="qrow"><span><b>${p.n.replace("%n", tg)}</b><div class="bar"><div style="width:${pr / tg * 100}%"></div></div><small>${fmt(pr)} / ${tg}</small></span><button class="btn" data-q="${k}:${i}"${done || pr < tg ? " disabled" : ""}>${done ? "Hecho" : "Reclamar"}</button></li>`;
  }).join("");

  const questsHTML = `
    <div class="pass-quests">
      <div class="quests-col">
        <h3>Misiones Diarias <small>(Racha: ${q.streak} días)</small></h3>
        <ul class="quests">${list("d")}</ul>
      </div>
      <div class="quests-col">
        <h3>Misiones Semanales</h3>
        <ul class="quests">${list("w")}</ul>
      </div>
    </div>
  `;
  // -------------------------------------
  
  $("b-pass").innerHTML = `
    <div class="pwh">
      <b>Pase Ricopio · Nv ${L}/${PASS_N}</b>
      <div class="bar"><div style="width:${L >= PASS_N ? 100 : ps.xp % PASS_XP}%"></div></div>
      ${ps.prem ? '<em class="pm">PREMIUM</em>' : `<button class="btn" data-pw="prem">Premium ${fmt(PASS_PREM)}</button>`}
      ${rdy ? `<button class="btn rd" data-pw="all">Reclamar (${rdy})</button>` : ""}
    </div>
    <div class="pws" id="pwS">
      <div class="pwl">${[...Array(PASS_N)].map((_, j) => `<div class="pwc"><span class="pwn">${j + 1}</span>${tile("p", j + 1)}${tile("f", j + 1)}</div>`).join("")}</div>
    </div>
    ${questsHTML}
  `;
  
  const s = $("pwS"); 
  if (s) s.scrollLeft = L !== _pwL ? Math.max(0, (L - 2) * 62) : old; 
  _pwL = L;
}
RENDER["m-pass"] = () => { _pwL = -1; renderPW(true); };
function passBadge() {
  const ps = passState(), L = passLvl(); let n = 0;
  for (let i = 1; i <= Math.min(L, PASS_N); i++) { if (!ps.cf.includes(i)) n++; if (ps.prem && !ps.cp.includes(i)) n++; }
  setT($("passBtn"), "Pase de Temporada 🎫" + (n ? " (" + n + ")" : "")); $("passBtn").classList.toggle("ready", n > 0);
}
$("b-pass").addEventListener("click", (e) => {
  const b = e.target.closest("[data-pt],[data-pw]"); 
  if (!b) return;
  
  if (b.dataset.pt) { 
    const [l, i] = b.dataset.pt.split(":"); 
    if (l === "p" && !passState().prem) return toast("Necesitas el pase premium (" + fmt(PASS_PREM) + " ricoins)"); 
    if (claimPass(l, +i)) { confetti(innerWidth * .2, innerHeight * .8, 20); sfx(990, .12); save(); render(); renderPW(true); } 
    return; 
  }
  
  const a = b.dataset.pw;
  if (a === "prem") { 
    if (state.coins < PASS_PREM) return toast("Te faltan ricoins (" + fmt(PASS_PREM) + ")"); 
    return showModal("Pase premium", "¿Comprar el pase premium por " + fmt(PASS_PREM) + " ricoins?", "Comprar", () => {
      if (state.coins < PASS_PREM) return;
      state.coins -= PASS_PREM; passState().prem = true; confetti(innerWidth * .2, innerHeight * .8, 50); sfx(1200, .3); save(); render(); renderPW(true);
    });
  }
  
  if (a === "all") { 
    let n = 0; 
    for (let i = 1; i <= PASS_N; i++) { if (claimPass("f", i)) n++; if (claimPass("p", i)) n++; } 
    if (n) { toast(n + " recompensas reclamadas"); confetti(innerWidth * .2, innerHeight * .8, 40); save(); render(); renderPW(true); } 
  }
});

// ---- Códigos de canje
const CODES = {
  RICOPIO2026: { x: "1 hora de producción y un cofre de plata", f() { gain(Math.max(10000, perSec() * 3600)); addChest("plata"); } },
  BIENVENIDO: { x: "2 cofres de madera y ricoins", f() { addChest("madera"); addChest("madera"); gain(Math.max(2000, perSec() * 300)); } },
  POLLITO100: { x: "30 minutos de producción", f() { gain(Math.max(5000, perSec() * 1800)); } },
  HUEVODORADO: { x: "un cofre de oro", f() { addChest("oro"); } },
  LEYENDA2026: { x: "un cofre legendario", f() { addChest("legendario"); } },
  MITICO2026: { x: "un cofre mítico", f() { addChest("mitico"); } },
  MASCOTA2026: { x: "2 huevos de mascota", f() { state.peggs = (state.peggs || 0) + 2; } },
  PASE2026: { x: "600 XP de pase", f() { passXp(600); } },
  DOPAMINA: { x: "ruleta lista y 15 min de producción", f() { state.wheelAt = 0; gain(Math.max(2000, perSec() * 900)); } },
  AMIGOS2026: { x: "aspecto Menta y lazo", f() { ["skin:menta", "hat:lazo"].forEach((k) => { if (!state.cosm.own.includes(k)) state.cosm.own.push(k); }); renderWard(); } },
  ROBLOX2026: { x: "5 cofres de madera y 2 h de producción", f() { for (let i = 0; i < 5; i++) addChest("madera"); gain(Math.max(10000, perSec() * 7200)); } },
  FIESTA2026: { x: "hora dorada y un cofre de oro", f() { ev = { ...EVS[0], end: Date.now() + 60000 }; addChest("oro"); } },
};
mkModal("codes", "Códigos de canje", '<p class="sum">Escribe un código y pulsa Canjear. Cada código se usa una sola vez.</p><div class="cdrow"><input id="codeIn" placeholder="Tu código" maxlength="24" autocomplete="off"><button id="codeGo" class="btn">Canjear</button></div><p id="codeMsg" class="hintbox"></p>');
function redeem() {
  const c = $("codeIn").value.trim().toUpperCase().replace(/\s/g, ""), d = CODES[c], m = $("codeMsg");
  if (!d) { m.textContent = "Código no válido."; return toast("Código no válido"); }
  if (state.codes[c]) { m.textContent = "Ya has canjeado este código."; return toast("Código ya canjeado"); }
  state.codes[c] = 1; d.f(); m.textContent = "¡Código canjeado! Recibes " + d.x + "."; confetti(stage.clientWidth / 2, stage.clientHeight / 2, 50); [523, 659, 784, 1047].forEach((f, i) => setTimeout(() => sfx(f, .15), i * 80)); $("codeIn").value = ""; save(); render();
}
$("codeGo").onclick = redeem;
$("codeIn").addEventListener("keydown", (e) => { if (e.key === "Enter") redeem(); });

// ---- Fusión visual (altar)
let fzSel = null;
RENDER["m-fuse"] = () => {
  const own = ITEMS.filter((i) => state.items[i.id]), sel = fzSel && state.items[fzSel] ? ITEMS.find((i) => i.id === fzSel) : null, nx = sel && RK[RK.indexOf(sel.r) + 1], can = !!(sel && nx && state.items[sel.id] >= 3);
  $("b-fuse").innerHTML = `<div class="altar${can ? " can" : ""}" style="--rc:${nx ? RAR[nx].c : "#999"}"><div class="fz-in">${[0, 1, 2].map((i) => `<div class="fz-s${sel && state.items[sel.id] > i ? " on" : ""}" style="--rc:${sel ? RAR[sel.r].c : "#999"}">${sel ? svg(sel.id, sel.col) : "?"}</div>`).join("")}</div><div class="fz-arrow">➜</div><div class="fz-out"><div class="fz-r">${nx ? "?" : "—"}</div><small>${nx ? RAR[nx].n : ""}</small></div></div><p class="sum">${sel ? (nx ? (can ? "Listo para fusionar 3 × " + sel.name : "Necesitas 3 iguales (tienes " + state.items[sel.id] + ")") : "Rareza máxima: no se puede fusionar más") : "Elige un objeto de abajo."}</p><button class="btn big reb" id="fzGo"${can ? "" : " disabled"}>FUSIONAR</button><div class="fz-grid">` + (own.map((i) => { const n = state.items[i.id]; return `<button class="fz-c${sel && sel.id === i.id ? " sel" : ""}${n >= 3 && RK.indexOf(i.r) < 4 ? " ok" : ""}" data-fz="${i.id}" style="--rc:${RAR[i.r].c}">${svg(i.id, i.col)}<b>${i.name}</b><small>${RAR[i.r].n} x${n}</small></button>`; }).join("") || '<p class="sum">Aún no tienes objetos.</p>') + "</div>";
};
document.addEventListener("click", (e) => {
  const c = e.target.closest("[data-fz]"); if (c) { fzSel = c.dataset.fz; sfx(600, .06); return RENDER["m-fuse"](); }
  if (e.target.id !== "fzGo") return; const it = ITEMS.find((i) => i.id === fzSel), nx = it && RK[RK.indexOf(it.r) + 1]; if (!nx || state.items[it.id] < 3) return;
  const al = document.querySelector("#b-fuse .altar"); if (al) al.classList.add("fusing"); e.target.disabled = true;
  [300, 400, 520, 680, 880].forEach((f, i) => setTimeout(() => sfx(f, .15), i * 160));
  setTimeout(() => {
    state.items[it.id] -= 3; const r = pick(ITEMS.filter((i) => i.r === nx)); state.items[r.id] = (state.items[r.id] || 0) + 1; state.st.fusions = (state.st.fusions || 0) + 1; renderColl();
    showCard(`${svg(r.id, r.col)}<b>${r.name}</b><span class="rar">${RAR[r.r].n}</span><small>¡Fusión conseguida!</small>`, RAR[r.r].c); save(); RENDER["m-fuse"]();
    // Resplandor localizado en la tarjeta resultante (cuando termina el huevo que se abre)
    setTimeout(() => { const c = $("card"); c.classList.remove("in"); c.style.setProperty("--rarity-color", RAR[r.r].c); replay(c, "fusion-pop"); }, 1350);
  }, 1000);
});
function flash(c) { const f = document.createElement("div"); f.className = "flash"; f.style.background = c; document.body.appendChild(f); setTimeout(() => f.remove(), 700); }

// ---- Ruleta nueva (SVG con luces)
const WG = { coin: ["#fff3a6", "#e0a800"], item: ["#c8f5b0", "#3d9b4f"], chest: ["#f0c08a", "#8a4d1a"], cosm: ["#ffd0e4", "#e0508a"], mitico: ["#4a3470", "#0b0b10"] };
const GLY = {
  coin: '<circle cy="-72" r="10" fill="#ffd84a" stroke="#2b2118" stroke-width="2.500"/><text y="-68" font-size="12" font-weight="800" text-anchor="middle" fill="#2b2118">R</text>',
  item: '<path d="M0 -84l11 9-11 17-11-17z" fill="#8fe0ff" stroke="#2b2118" stroke-width="2.500" stroke-linejoin="round"/>',
  chest: '<rect x="-12" y="-78" width="24" height="16" rx="3" fill="#c27a3a" stroke="#2b2118" stroke-width="2.500"/><rect x="-3" y="-73" width="6" height="7" fill="#ffd84a"/>',
  cosm: '<path d="M0 -84l4 9 10 1-8 7 3 10-9-6-9 6 3-10-8-7 10-1z" fill="#ffd84a" stroke="#2b2118" stroke-width="2" stroke-linejoin="round"/>',
  mitico: '<path d="M-12 -64l-3-16 8 7 7-11 7 11 8-7-3 16z" fill="#ffd84a" stroke="#2b2118" stroke-width="2" stroke-linejoin="round"/>',
};
function buildWheel() {
  const R = 96, P = (a, r) => [(r * Math.sin(a * Math.PI / 180)).toFixed(1), (-r * Math.cos(a * Math.PI / 180)).toFixed(1)];
  let s = '<svg viewBox="-112 -112 224 224" class="wsvg"><defs>' + Object.entries(WG).map(([k, [a, b]]) => `<radialGradient id="wg_${k}" cx="0" cy="0" r="100" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="${a}"/><stop offset="1" stop-color="${b}"/></radialGradient>`).join("") + '</defs><circle r="109" fill="#2b2118"/><circle r="104" fill="#ffd84a" stroke="#2b2118" stroke-width="2"/>';
  SEG.forEach((c, k) => { const [x0, y0] = P(k * 30, R), [x1, y1] = P(k * 30 + 30, R); s += `<path d="M0 0L${x0} ${y0}A${R} ${R} 0 0 1 ${x1} ${y1}Z" fill="url(#wg_${c})" stroke="#2b2118" stroke-width="2.500"${c === "mitico" ? ' class="wmit"' : ""}/><g transform="rotate(${k * 30 + 15})"><g transform="translate(0 8) scale(1.18)">${GLY[c]}</g></g>`; });
  for (let i = 0; i < 24; i++) { const [x, y] = P(i * 15, 101); s += `<circle cx="${x}" cy="${y}" r="3" fill="#fff" stroke="#2b2118" stroke-width="1" class="wb" style="animation-delay:${i % 2 ? .35 : 0}s"/>`; }
  s += '<circle r="17" fill="#ffc928" stroke="#2b2118" stroke-width="4"/><circle cx="-6" cy="-3" r="2.500" fill="#2b2118"/><circle cx="6" cy="-3" r="2.500" fill="#2b2118"/><path d="M-4 3h8l-4 6z" fill="#ff8a1f"/></svg>';
  $("wheel").innerHTML = s;
}
buildWheel();

// ---- Salón de juegos
mkModal("games", "Salón de juegos", "");
const GCD = 240000, gcd = (k) => Math.max(0, (state.mgAt[k] || 0) - Date.now());
const GI = { c: '<svg viewBox="0 0 60 60"><path d="M8 32h44l-7 20H15z" fill="#c27a3a" stroke="#2b2118" stroke-width="3"/><ellipse cx="30" cy="20" rx="9" ry="12" fill="#fff8e6" stroke="#2b2118" stroke-width="3"/></svg>', m: '<svg viewBox="0 0 60 60"><rect x="6" y="10" width="22" height="30" rx="4" fill="#ff5d73" stroke="#2b2118" stroke-width="3"/><rect x="32" y="20" width="22" height="30" rx="4" fill="#ffd84a" stroke="#2b2118" stroke-width="3"/></svg>', s: '<svg viewBox="0 0 60 60"><rect x="6" y="14" width="48" height="32" rx="6" fill="#d8303f" stroke="#2b2118" stroke-width="3"/><text x="30" y="38" font-size="20" font-weight="800" text-anchor="middle" fill="#ffd84a">777</text></svg>' };
let gameStop = null;
function stopGame() { if (gameStop) { gameStop(); gameStop = null; } }
RENDER["m-games"] = () => {
  stopGame();
  $("b-games").innerHTML = '<div class="gcards">' + [["c", "Cesta Loca", "Mueve la cesta, atrapa huevos y esquiva los podridos. ¡Combos de hasta x5!"], ["m", "Memoria Pop", "Encuentra las 8 parejas contra el reloj. Cada acierto da tiempo extra."], ["s", "Tragaperras", "Apuesta, tira de la palanca y busca el jackpot de diamantes."]].map(([k, n, d]) => `<div class="gcard g-${k}"><div class="gi">${GI[k]}</div><b>${n}</b><small>${d}</small><small>Récord: ${state.hs[k] || 0}</small><button class="btn" data-g="${k}"${gcd(k) ? " disabled" : ""}>${gcd(k) ? fmtT(gcd(k)) : "¡Jugar!"}</button></div>`).join("") + "</div>";
};
$("b-games").addEventListener("click", (e) => { if (e.target.id === "gExit") return RENDER["m-games"](); const b = e.target.closest("[data-g]"); if (b) ({ c: gameCatch, m: gameMem, s: gameSlot })[b.dataset.g](); });
document.addEventListener("click", (e) => { if (e.target.closest("[data-close]") || e.target.classList.contains("modal")) stopGame(); });
function finishGame(k, score, rk, mult) {
  const g = Math.round(score * Math.max(100, perSec() * 8) * mult); if (g) gain(g); state.st.games = (state.st.games || 0) + 1; passXp(5);
  const best = score > (state.hs[k] || 0); if (best) state.hs[k] = score; confetti(stage.clientWidth / 2, stage.clientHeight / 2, 30 + Math.min(60, score / 2)); [523, 659, 784, 1047].forEach((f, i) => setTimeout(() => sfx(f, .15), i * 80)); save(); render();
  $("b-games").innerHTML = `<div class="gres"><h3>${rk}</h3><p>${score} puntos · multiplicador x${mult}</p><p class="gwin">+${fmt(g)} ricoins</p>${best ? '<p class="gwin">¡NUEVO RÉCORD!</p>' : ""}<button class="btn big" id="gExit">Volver al salón</button></div>`;
}
function gameCatch() {
  state.mgAt.c = Date.now() + GCD; const box = $("b-games");
  box.innerHTML = '<div class="gA" id="gA"><div class="ghud"><span id="gT">30</span>s · <b id="gS">0</b> pts · <i id="gM">x1</i></div><div class="gcl"></div><div class="bk" id="bk">' + petSvg("#ffc928") + '<span class="bsk"></span></div></div><p class="sum small">Mueve el ratón o el dedo. Dorados +5, relojes +3 s, podridos -3 pts.</p>';
  const A = $("gA"), bk = $("bk"); let W = A.clientWidth || 320, H = A.clientHeight || 340, bx = W / 2, tx = bx, t = 30, sc = 0, st = 0, items = [], fr = 0;
  const mv = (e) => { const r = A.getBoundingClientRect(); tx = e.clientX - r.left; }; A.addEventListener("pointermove", mv); A.addEventListener("pointerdown", mv);
  const kd = (e) => { if (e.key === "ArrowLeft") tx -= 50; if (e.key === "ArrowRight") tx += 50; }; addEventListener("keydown", kd);
  const mult = () => Math.min(5, 1 + Math.floor(st / 5)), hud = () => { $("gT").textContent = t; $("gS").textContent = sc; $("gM").textContent = "x" + mult(); };
  const pop = (x, y, txt, col) => { const p = document.createElement("i"); p.className = "gpop"; p.textContent = txt; p.style.cssText = `left:${x}px;top:${y}px;color:${col}`; A.appendChild(p); setTimeout(() => p.remove(), 700); };
  const spawn = () => { const r = Math.random(), type = r < .56 ? "egg" : r < .68 ? "gold" : r < .86 ? "bad" : r < .93 ? "clock" : "gold", el = document.createElement("i"), x = 20 + Math.random() * (W - 40); el.className = "ge " + type; el.style.left = x + "px"; A.appendChild(el); items.push({ el, x, y: -30, v: 2.4 + Math.random() * 1.6 + (30 - t) * .07, type }); };
  const loop = setInterval(() => {
    fr++; bx += (tx - bx) * .25; bx = Math.max(35, Math.min(W - 35, bx)); bk.style.left = bx - 35 + "px";
    if (fr % Math.max(12, 30 - Math.floor((30 - t) * .6)) === 0) spawn();
    items = items.filter((it) => {
      it.y += it.v; it.el.style.top = it.y + "px";
      if (it.y > H - 74 && it.y < H - 24 && Math.abs(it.x - bx) < 46) {
        if (it.type === "egg") { sc += mult(); st++; pop(it.x, H - 90, "+" + mult(), "#fff"); sfx(500 + Math.min(st, 30) * 18, .05); }
        else if (it.type === "gold") { sc += 5 * mult(); st++; pop(it.x, H - 90, "+" + 5 * mult(), "#ffd84a"); sfx(1100, .1); }
        else if (it.type === "clock") { t += 3; pop(it.x, H - 90, "+3s", "#8fe0ff"); sfx(900, .1); }
        else { sc = Math.max(0, sc - 3); st = 0; replay(A, "shake"); pop(it.x, H - 90, "-3", "#ff5d73"); sfx(120, .2, "sawtooth"); }
        it.el.remove(); hud(); return false;
      }
      if (it.y > H) { if (it.type === "egg") st = 0; it.el.remove(); return false; } return true;
    });
  }, 16);
  const clock = setInterval(() => { t--; hud(); if (t <= 0) { stopGame(); const rk = sc >= 120 ? ["DIAMANTE", 5] : sc >= 70 ? ["ORO", 2.5] : sc >= 30 ? ["PLATA", 1.5] : ["BRONCE", 1]; finishGame("c", sc, "Rango " + rk[0], rk[1]); } }, 1000);
  gameStop = () => { clearInterval(loop); clearInterval(clock); removeEventListener("keydown", kd); };
}
function gameMem() {
  state.mgAt.m = Date.now() + GCD; const S = ["gema", "estrella", "trebol", "llave", "diamante", "nido", "bolsa", "reloj"], C = ["#6fd3ff", "#ffe45c", "#6fd06f", "#ffd84a", "#9ff0ff", "#ff9ec7", "#d9a15b", "#ffe08a"];
  const deck = [...S, ...S].map((s) => ({ s, c: C[S.indexOf(s)] })).sort(() => Math.random() - .5); let open = [], moves = 0, found = 0, lock = false, t = 45;
  $("b-games").innerHTML = '<div class="ghud2"><span id="mT">45</span>s · <b id="mP">0/8</b> parejas · <span id="mV">0</span> mov.</div><div class="mem">' + deck.map((d, i) => `<button class="mcd" data-i="${i}"><span class="mf">${svg(d.s, d.c)}</span><span class="mb">?</span></button>`).join("") + "</div>";
  const hud = () => { $("mT").textContent = t; $("mP").textContent = found + "/8"; $("mV").textContent = moves; };
  const end = () => { stopGame(); const stars = found < 8 ? 0 : moves <= 12 ? 3 : moves <= 18 ? 2 : 1, score = Math.max(0, found * 100 + t * 10 - moves * 5); finishGame("m", score, found < 8 ? "Tiempo agotado (" + found + "/8)" : "¡Completado! " + "★".repeat(stars) + "☆".repeat(3 - stars), Math.max(.5, stars)); };
  const onc = (e) => {
    const b = e.target.closest(".mcd"); if (!b || lock || b.classList.contains("up")) return; b.classList.add("up"); open.push(b); sfx(500, .05);
    if (open.length === 2) { moves++; const [a, c] = open;
      if (deck[+a.dataset.i].s === deck[+c.dataset.i].s) { found++; t += 3; a.classList.add("ok"); c.classList.add("ok"); open = []; sfx(900, .12); confetti(stage.clientWidth / 2, stage.clientHeight / 2, 8); hud(); if (found === 8) end(); }
      else { lock = true; hud(); setTimeout(() => { a.classList.remove("up"); c.classList.remove("up"); open = []; lock = false; }, 650); } }
  };
  $("b-games").addEventListener("click", onc); const clock = setInterval(() => { t--; hud(); if (t <= 0) end(); }, 1000);
  gameStop = () => { clearInterval(clock); $("b-games").removeEventListener("click", onc); };
}
function gameSlot() {
  const base = Math.max(100, perSec() * 20), SY = ["gema", "estrella", "trebol", "llave", "diamante", "nido"], COL = { gema: "#6fd3ff", estrella: "#ffe45c", trebol: "#6fd06f", llave: "#ffd84a", diamante: "#9ff0ff", nido: "#d9a15b" }, PAY = { diamante: 50, estrella: 25, gema: 15, llave: 10, trebol: 8, nido: 5 }; let bet = 1, busy = false, cur = [pick(SY), pick(SY), pick(SY)];
  const cell = (s) => `<span class="sy">${svg(s, COL[s])}</span>`;
  const draw = () => { $("b-games").innerHTML = `<div class="slotm"><div class="reels2">${cur.map((s, i) => `<div class="reel"><div class="strip" id="st${i}">${cell(s)}</div></div>`).join("")}</div><p id="sMsg" class="gwin">Apuesta: ${fmt(base * bet)} ricoins</p><div class="bets">${[1, 5, 25].map((b) => `<button class="btn${b === bet ? " on" : ""}" data-bet="${b}">x${b}</button>`).join("")}<button class="btn big reb" id="sGo">¡TIRAR!</button></div><p class="sum small">3 iguales: diamante x50 · estrella x25 · gema x15 · llave x10 · trébol x8 · nido x5. 2 iguales: recuperas la apuesta.</p><button class="btn" id="gExit">Salir</button></div>`; };
  draw();
  const onc = (e) => {
    const b = e.target.closest("[data-bet]"); if (b && !busy) { bet = +b.dataset.bet; return draw(); }
    if (e.target.id !== "sGo" || busy) return; const cost = base * bet; if (state.coins < cost) return toast("Necesitas " + fmt(cost) + " ricoins");
    state.coins -= cost; busy = true; render(); const res = [pick(SY), pick(SY), pick(SY)];
    res.forEach((r, i) => { const st = $("st" + i); st.style.transition = "none"; st.style.transform = "translateY(0)"; st.innerHTML = cell(cur[i]) + Array.from({ length: 17 }, () => cell(pick(SY))).join("") + cell(r); void st.offsetWidth; st.style.transition = `transform ${1.3 + i * .55}s cubic-bezier(.2,.8,.2,1)`; st.style.transform = "translateY(-" + 18 * 84 + "px)"; for (let k = 0; k < 8; k++) setTimeout(() => sfx(280 + k * 25 + i * 60, .04), k * 150 + i * 200); });
    setTimeout(() => {
      cur = res; const u = new Set(res).size, m = u === 1 ? PAY[res[0]] : u === 2 ? 1 : 0, g = cost * m, msg = $("sMsg"); state.st.games = (state.st.games || 0) + 1; busy = false;
      if (u === 1) { flash("#ffd84a"); confetti(stage.clientWidth / 2, stage.clientHeight / 2, 40 + m * 2); [523, 659, 784, 1047, 1319].forEach((f, i) => setTimeout(() => sfx(f, .2), i * 90)); if (m >= 50) { state.hs.s = (state.hs.s || 0) + 1; replay(stage, "shake"); } }
      if (g) gain(g); if (msg) { msg.textContent = g ? (u === 1 ? "¡PREMIAZO! +" : "Recuperas ") + fmt(g) : "Mala suerte… ¡otra!"; msg.className = "gwin " + (u === 1 ? "jack" : ""); } render(); save();
    }, 3000);
  };
  $("b-games").addEventListener("click", onc); gameStop = () => $("b-games").removeEventListener("click", onc);
}

// ---- Árbol: reasignar puntos gratis
$("respec").onclick = () => {
  const spent = Object.values(state.tree).reduce((a, l) => a + (l * (l + 1)) / 2, 0); if (!spent) return toast("No tienes puntos gastados");
  state.xp += spent; state.tree = {}; sfx(700, .15); toast("Puntos devueltos: " + spent + " XP"); save(); renderTree(); render();
};

// ---- Social con códigos de jugador y servidor opcional
const ONLINE_URL = "https://ricopio-45b4d-default-rtdb.europe-west1.firebasedatabase.app", ID_CH = "0123456789ABCDEFGHJKLMNPQRSTUVWXYZ";
function genId() { let s = ""; for (let i = 0; i < 7; i++) s += ID_CH[Math.floor(Math.random() * ID_CH.length)]; return s; }
function ensurePid() { if (!state.pid) { state.pid = genId(); save(); } return state.pid; }
const pname = () => state.name || "Jugador " + ensurePid();
const srvUrl = () => (state.srv || ONLINE_URL || "").trim().replace(/\/+$/, "");
const meData = () => ({ id: ensurePid(), n: pname(), t: state.total, r: state.reb, a: state.asc, w: weekKey(), ws: wkScore(), u: Date.now() });
const myCard = () => "RC1." + enc(JSON.stringify(meData()));
function copyText(c, msg) {
  (typeof navigator !== "undefined" && navigator.clipboard ? navigator.clipboard.writeText(c) : Promise.reject())
    .then(() => toast(msg), () => showModal("Copia el texto manualmente", "El portal no permite copiar automáticamente. Selecciona y copia:", "Cerrar", null, "copy", c));
}
async function pub() { const u = srvUrl(); if (!u || typeof fetch === "undefined") return false; try { const r = await fetch(u + "/players/" + ensurePid() + ".json", { method: "PUT", body: JSON.stringify(meData()) }); return r.ok; } catch { return false; } }
async function getJ(p) { const u = srvUrl(); if (!u || typeof fetch === "undefined") return null; try { const r = await fetch(u + p); return await r.json(); } catch { return null; } }
// Orden del ranking: Ascensiones (a) > Renacimientos (r) > Ricoins totales (t)
const rankCmp = (a, b) => ((b.a || 0) - (a.a || 0)) || ((b.r || 0) - (a.r || 0)) || ((b.t || 0) - (a.t || 0));
let world = [], online = null;
async function refreshSocial() {
  const ok = await pub(); online = srvUrl() ? ok : null;
  if (ok) { const all = await getJ("/players.json"); world = all ? Object.values(all).filter((x) => x && typeof x.t === "number").sort(rankCmp).slice(0, 50) : []; for (const f of state.friends) if (f.id) { const d = await getJ("/players/" + f.id + ".json"); if (d && typeof d.t === "number") Object.assign(f, d); } save(); }
  if ($("m-social") && !$("m-social").hidden) RENDER["m-social"]();
}
async function addFriend(raw) {
  const c = raw.trim().toUpperCase();
  if (/^[A-Z0-9]{7}$/.test(c)) {
    if (c === ensurePid()) return toast("Ese es tu propio código");
    if (!srvUrl()) return toast("Para añadir por código de 7 caracteres necesitas el servidor online (ver abajo). Offline usa la tarjeta larga.");
    const d = await getJ("/players/" + c + ".json"); if (!d || typeof d.t !== "number") return toast("No existe ese jugador (¿ha abierto el juego con el mismo servidor?)");
    state.friends = state.friends.filter((x) => x.id !== c).concat(d).slice(-20); save(); toast("¡" + d.n + " añadido!"); return RENDER["m-social"]();
  }
  try { const d = JSON.parse(dec(raw.trim().replace(/^RC1\./, ""))); if (typeof d.t !== "number") throw 0; d.id = d.id || d.n; state.friends = state.friends.filter((x) => x.id !== d.id).concat(d).slice(-20); save(); toast("¡" + d.n + " añadido!"); RENDER["m-social"](); } catch { toast("Código no válido"); }
}
RENDER["m-social"] = () => {
  const me = { ...meData(), me: 1 }, fr = [me, ...state.friends].sort(rankCmp), wk = [me, ...state.friends].filter((x) => x.w === weekKey()).sort((a, b) => b.ws - a.ws);
  const li = (x, i, f) => `<li class="${x.me || x.id === state.pid ? "me" : ""}"><span class="rk">${i + 1}</span><b>${x.n}</b> <small>#${x.id || "—"}</small>${f === "w" ? "" : `<small>Asc ${x.a || 0} · Ren ${x.r || 0}</small>`}<span class="rv">${fmt(f === "w" ? x.ws : x.t)}</span></li>`;
  $("b-social").innerHTML = `<div class="myid"><small>Tu código de jugador</small><b id="myId">${ensurePid()}</b><button class="btn" data-s="copyid">Copiar</button></div>
  <label class="row">Tu nombre <input id="myName" maxlength="14" placeholder="Jugador ${state.pid}" value="${(state.name || "").replace(/"/g, "")}"></label>
  <div class="foot"><button class="btn" data-s="add">Añadir amigo (código o tarjeta)</button><button class="btn" data-s="card">Copiar mi tarjeta</button><button class="btn" data-s="refresh">Actualizar</button></div>
  <p class="sum small">${online === true ? "● Conectado al servidor online" : online === false ? "● Servidor no responde" : "● Sin servidor: ranking local con tarjetas"}</p>
  ${online ? `<h3>Ranking del mundo (ascensiones › renacimientos › ricoins)</h3><ol class="rank-l">${world.map((x, i) => li(x, i)).join("") || "<li>Aún no hay jugadores</li>"}</ol>` : ""}
  <h3>Ranking de amigos (ascensiones › renacimientos › ricoins)</h3><ol class="rank-l">${fr.map((x, i) => li(x, i)).join("")}</ol>
  <h3>Reto semanal ${weekKey()}</h3><p class="sum">${wkMod().n}. Tu puntuación: <b>${fmt(wkScore())}</b></p><ol class="rank-l">${wk.map((x, i) => li(x, i, "w")).join("")}</ol>
  <h3>Regalos</h3><div class="foot"><button class="btn" data-s="coin">Regalar ricoins</button><button class="btn" data-s="redeem">Canjear regalo</button></div><ul class="fuse">${ITEMS.filter((i) => state.items[i.id]).map((i) => `<li><span class="fi">${svg(i.id, i.col)}</span><span><b>${i.name} x${state.items[i.id]}</b></span><button class="btn" data-s="gift:${i.id}">Regalar 1</button></li>`).join("")}</ul>
  <h3>Servidor online (opcional)</h3><p class="sum small">Para ranking mundial y añadir amigos entre PCs distintos: crea una Firebase Realtime Database gratuita (reglas de lectura y escritura abiertas) y pega aquí su URL. Todos los amigos deben usar la misma URL.</p><label class="row"><input id="srvIn" class="wide" placeholder="https://tu-proyecto-default-rtdb.firebaseio.com" value="${(state.srv || "").replace(/"/g, "")}"></label>`;
};
$("b-social").addEventListener("change", (e) => {
  if (e.target.id === "myName") { state.name = e.target.value.trim(); save(); pub().then(() => refreshSocial()); }
  if (e.target.id === "srvIn") { state.srv = e.target.value.trim(); save(); refreshSocial(); }
});
$("b-social").addEventListener("click", (e) => {
  const b = e.target.closest("[data-s]"); if (!b) return; const a = b.dataset.s;
  if (a === "copyid") return copyText(ensurePid(), "Código copiado: " + ensurePid());
  if (a === "card") return copyText(myCard(), "Tarjeta copiada");
  if (a === "refresh") { toast("Actualizando…"); return refreshSocial(); }
  if (a === "add") return showModal("Añadir amigo", "Código del amigo (7 caracteres) o tarjeta larga:", "Añadir", (c) => { if (c) addFriend(c); }, "text");
  if (a === "coin") return showModal("Regalar ricoins", "¿Cuántos ricoins regalas?", "Regalar", (s) => {
    const v = Math.floor(+s || 0); if (v <= 0 || v > state.coins) return toast("Cantidad no válida");
    const x = Math.random().toString(36).slice(2, 9); state.coins -= v; state.gifts.push(x); save(); render();
    copyText("RG1." + enc(JSON.stringify({ t: "c", a: v, f: pname(), x })), "Regalo copiado: pásaselo a tu amigo");
  }, "number");
  if (a === "redeem") return showModal("Canjear regalo", "Pega el código de regalo:", "Canjear", (c) => {
    if (!c) return;
    try { const d = JSON.parse(dec(c.trim().replace(/^RG1\./, ""))); if (state.gifts.includes(d.x)) return toast("No puedes canjear tu propio regalo"); if (state.redeemed.includes(d.x)) return toast("Regalo ya canjeado"); state.redeemed.push(d.x); if (d.t === "c") gain(d.a); else state.items[d.id] = (state.items[d.id] || 0) + 1; confetti(stage.clientWidth / 2, stage.clientHeight / 2, 40); toast("¡Regalo de " + d.f + " recibido!"); save(); render(); renderColl(); } catch { toast("Código no válido"); }
  }, "text");
  if (a.startsWith("gift:")) { const id = a.slice(5), it = ITEMS.find((i) => i.id === id), x = Math.random().toString(36).slice(2, 9); if (!state.items[id]) return; state.items[id]--; state.gifts.push(x); save(); renderColl(); RENDER["m-social"](); copyText("RG1." + enc(JSON.stringify({ t: "i", id, f: pname(), x })), "Regalo copiado: " + it.name); }
});

// ---- Bucle ronda 2
function updGameCd() { $("b-games").querySelectorAll("[data-g]").forEach((b) => { const c = gcd(b.dataset.g); setT(b, c ? fmtT(c) : "¡Jugar!"); b.disabled = !!c; }); }
function tick4() {
  T4++; if (T4 % 5 === 0) renderPW(); if (!started) return;
  if (T4 % 20 === 0) { hwTick(); passBadge(); }
  if (T4 % 600 === 0) { passXp(2); if (srvUrl()) pub(); }
  if (!$("m-games").hidden && !gameStop && T4 % 10 === 0) updGameCd();
}
ensurePid(); updCC(true); renderPW(true); renderSkins();
if (srvUrl()) refreshSocial();

// ===================== MASCOTAS v2 =====================
const lob = { list: [], sig: "" };
function pickTarget(o) {
  const W = stage.clientWidth || 600, H = stage.clientHeight || 420, r = Math.random();
  if (r < .4) { o.tx = 8 + Math.random() * Math.max(10, W * .26); o.ty = H - 200 + Math.random() * 90; }
  else if (r < .8) { o.tx = W * .7 + Math.random() * Math.max(10, W * .26 - 70); o.ty = H - 200 + Math.random() * 90; }
  else { o.tx = W / 2 - 170 + Math.random() * 230; o.ty = H - 135 + Math.random() * 25; }
  o.tx = Math.max(4, Math.min(W - 80, o.tx));
  // Restringimos la Y máxima (H - 160) para que no pisen la barra de cofres
  o.ty = Math.max(30, Math.min(H - 160, o.ty));
}
function petEmote(o, ch) { const e = o.el.querySelector(".pem"); e.textContent = ch || pick(["♥", "♪", "★", "!", "✦"]); replay(e, "show"); }
function petCuddle(o) {
  replay(o.el, "jump"); petEmote(o, "♥"); if (state.set.fx) charBurst(o.x + 38, o.y + 10, { ch: "♥", c: ["#ff5d73", "#ff9aa8"] }, 6);
  const g = perClick() * 2; gain(g); floater("+" + fmt(g), o.x + 30, o.y - 10, false); sfx(850 + Math.random() * 350, .08); render();
}
function petsStage() {
  const s = state.petEq.join(); if (s === lob.sig) return; lob.sig = s;
  const box = $("pets"), H = stage.clientHeight || 420; box.innerHTML = ""; lob.list = [];
  state.petEq.forEach((id, i) => {
    const p = PETS.find((x) => x.id === id); if (!p) return;
    const el = document.createElement("div"); el.className = "pet r-" + p.r; el.style.transform = "translate3d(0, 0, 0)"; el.style.setProperty("--pc", RAR[p.r].c); el.title = p.n + " (toca para mimarla)";
    el.innerHTML = `<span class="pem"></span><span class="pb">${animalSvg(p.sp, p.c)}</span><span class="psh"></span>`; box.appendChild(el);
    const o = { p, el, x: 30 + i * 100, y: H - 150, tx: 0, ty: 0, wait: i * 600, emo: Date.now() + 3000 + i * 2500, n: 0 }; el.addEventListener("click", () => petCuddle(o)); pickTarget(o); lob.list.push(o);
  });
}
function petLoop(dt) {
  const W = stage.clientWidth || 600, H = stage.clientHeight || 420, k = dt / 50;
  lob.list.forEach((o) => {
    let moving = false;
    if (o.wait > 0) o.wait -= dt;
    else {
      const dx = o.tx - o.x, dy = o.ty - o.y, d = Math.hypot(dx, dy), sp = (3 + (o.p.r === "mitico" ? 1.5 : o.p.r === "legendario" ? 1 : 0)) * k;
      if (d < Math.max(sp, 2) + 1) { o.wait = 1500 + Math.random() * 3500; pickTarget(o); if (Math.random() < .5) petEmote(o); }
      else { o.x += (dx / d) * sp; o.y += (dy / d) * sp; moving = true; const dr = dx > 0 ? "1" : "-1"; if (o.dr !== dr) { o.dr = dr; o.el.dataset.d = dr; } }
    }
    o.x = Math.max(0, Math.min(W - 76, o.x)); o.y = Math.max(30, Math.min(H - 160, o.y)); // Límite inferior respetado
    // USAR TRANSFORM EN LUGAR DE LEFT/TOP PARA EVITAR LAG
    o.el.style.transform = `translate3d(${o.x.toFixed(1)}px, ${(o.y + (o.p.fly ? Math.sin(Date.now() / 350 + o.x / 40) * 10 - 20 : 0)).toFixed(1)}px, 0)`;
    if (o.mv !== moving) { o.mv = moving; o.el.classList.toggle("walk", moving); }
    if (Date.now() > o.emo) { o.emo = Date.now() + 6000 + Math.random() * 6000; petEmote(o); }
    o.tr = (o.tr || 0) + dt;
    if (moving && o.tr > 250 && state.set.fx && (o.p.r === "legendario" || o.p.r === "mitico")) { o.tr = 0; spray("conf", o.x + 38, o.y + 62, 1, 800, 28, () => `--c:${RAR[o.p.r].c}`); }
  });
}
let _rt = 0;
function frame(t) { const dt = Math.min(64, t - _rt || 16); _rt = t; petLoop(dt); requestAnimationFrame(frame); }
if (typeof requestAnimationFrame === "function") requestAnimationFrame(frame);
let _pcl = 0;
$("chick").addEventListener("click", () => {
  _pcl++; lob.list.forEach((o, i) => setTimeout(() => replay(o.el, "jump"), i * 70));
  if (_pcl % 6 === 0 && state.set.fx) lob.list.forEach((o) => charBurst(o.x + 38, o.y, { ch: "♥", c: ["#ff9aa8"] }, 2));
});
const POR = ["mitico", "legendario", "epico", "raro", "comun"];
RENDER["m-pets"] = () => {
  const eq = state.petEq.map((id) => PETS.find((x) => x.id === id)).filter(Boolean), tot = ATY.map((t) => [t, petBn(t)]).filter((a) => a[1] > 0), have = PETS.filter((p) => state.pets[p.id]).length;
  const sorted = [...PETS].sort((a, b) => POR.indexOf(a.r) - POR.indexOf(b.r));
  $("b-pets").innerHTML = `<div class="pteam"><div class="pteam-h"><b>Tu equipo</b><small>${eq.length}/3 · toca una para quitarla</small></div><div class="pslots">` +
    [0, 1, 2].map((i) => { const p = eq[i]; return p ? `<button class="pslot on r-${p.r}" data-pet="${p.id}" style="--pc:${RAR[p.r].c}"><span class="pb">${animalSvg(p.sp, p.c)}</span><b>${p.n}</b><small>Nivel ${state.pets[p.id]}</small></button>` : `<div class="pslot empty"><span>+</span><small>Hueco libre</small></div>`; }).join("") +
    `</div><div class="ptot">${tot.length ? tot.map((a) => `<span class="chip2">${atText(a)}</span>`).join("") : "<small>Equipa mascotas para ganar bonus</small>"}</div></div>` +
    `<div class="peggs2${state.peggs ? " has" : ""}"><div class="bigegg">${EGGSV}</div><div class="pe-t"><b>Huevos de mascota</b><span>${state.peggs || 0} disponibles</span></div><button class="btn big" data-hatch="1"${state.peggs ? "" : " disabled"}>¡Abrir!</button></div>` +
    `<div class="pcol-h"><b>Colección</b><small>${have}/${PETS.length} descubiertas</small></div><ul class="pgrid">` + sorted.map((p) => {
      const l = state.pets[p.id] || 0, on = state.petEq.includes(p.id);
      return `<li><button class="pcard r-${p.r}${l ? "" : " lk"}${on ? " on" : ""}" data-pet="${p.id}" style="--pc:${RAR[p.r].c}"><em class="pr">${RAR[p.r].n}</em><span class="pb">${animalSvg(p.sp, l ? p.c : "#8a8a8a")}</span><b>${l ? p.n : "???"}</b><span class="pips">${Array.from({ length: 10 }, (_, i) => `<i class="${i < l ? "on" : ""}"></i>`).join("")}</span><span class="pat">${l ? p.at.map((a) => `<small>${atText([a[0], a[1] * petLv(p.id)])}</small>`).join("") : "<small>Sin descubrir</small>"}</span><span class="pst">${on ? "✓ Equipada" : l ? "Equipar" : "Bloqueada"}</span></button></li>`;
    }).join("") + "</ul>";
  petsStage();
};

// ===================== HALLOWEEN 2026 =====================
// Rareza nueva (aquí y no en el literal RAR: RK, de Fusión, ya se calculó y así no fusiona hacia "exclusivo")
RAR.exclusivo = { n: "Exclusivo", c: "#ff8a00", w: 0, b: 2.5 };
CBC.exclusivo = "#f0e442"; FXA.push("exclusivo"); POR.unshift("exclusivo");
ATX.cspd = ["+", "% velocidad de cofres"]; ATX.cmul = ["+", "% valor de críticos"];

// Gestor de eventos
const LIVEOPS = { "2026-10": { from: +new Date(2026, 9, 1), to: +new Date(2026, 10, 1), n: "Truco o Trato" } };
const liveOn = (id) => { const e = LIVEOPS[id], t = Date.now(); return !!e && t >= e.from && t < e.to; };

// Cosméticos exclusivos (sin `p`: se compran en el modal del evento o se ganan por misión)
const X = (o) => ({ rar: "exclusivo", ev: 1, ...o });
COSM.hat.push(X({ id: "calabaza", n: "Calabaza Encantada", bn: [["clk", .02]] }));
COSM.eyes.push(X({ id: "ojosespiritu", n: "Ojos de Espíritu", bn: [["crit", .02]] }));
COSM.neck.push(X({ id: "capaconde", n: "Capa del Conde", bn: [["sec", .03]] }));
COSM.back.push(X({ id: "alasmurcielago", n: "Alas de Murciélago", bn: [["sec", .04]] }));
COSM.feet.push(X({ id: "humovioleta", n: "Pisadas de Humo Violeta", bn: [["cspd", .02]] }));
COSM.tap.push(X({ id: "truco", n: "Impacto Truco o Trato", bn: [["cmul", .05]] }));
COSM.trail.push(X({ id: "nocturna", n: "Estela Nocturna", bn: [["crit", .03]] }));
COSM.skin.push({ id: "fantasmareal", n: "Ricopio Fantasma Real", secret: 1, rar: "exclusivo", cls: "ghost", au: "#9b5de5", bn: [["all", .10]], v: ["#cdbfff", "#9b7be0", "#f1ebff"] });
Object.assign(TAPFX, { truco: { ch: "☠", c: ["#ff8a00", "#b05cff"] }, nocturna: { ch: "✦", c: ["#b05cff", "#6a5acd"] } });

// Batito (mascota exclusiva, vuela). No sale de huevos: rollRar() nunca devuelve "exclusivo".
ART.murcielago = (c) => `<path d="M2 12Q-4 24 6 34Q10 26 15 30L18 16zM38 12Q44 24 34 34Q30 26 25 30L22 16z" fill="#2a1840" stroke="${K}" stroke-width="2" stroke-linejoin="round"/><path d="M12 14L11 3l7 6zM28 14L29 3l-7 6z" fill="${c}" stroke="${K}" stroke-width="2" stroke-linejoin="round"/><circle cx="20" cy="22" r="11" fill="${c}" stroke="${K}" stroke-width="2.5"/><circle cx="16" cy="20" r="2.2" fill="#ffd84a"/><circle cx="24" cy="20" r="2.2" fill="#ffd84a"/><path d="M17 27l1.5 3 1.5-3 1.5 3 1.5-3" fill="#fff" stroke="${K}" stroke-width=".8"/>`;
PETS.push({ id: "batito", n: "Batito", sp: "murcielago", r: "exclusivo", c: "#5b3a9c", f: ["all", .06], at: [["all", .06]], fly: 1 });

// Título
TITLES.push({ id: "terror", n: "Terror del Corral", f: () => !!(state.hw && state.hw.done.includes("m5")) });

// Estado del evento (se guarda en state.hw; base = snapshot al empezar)
function hwS() {
  if (!state.hw || state.hw.key !== "2026-10") state.hw = { key: "2026-10", b: { clicks: state.st.clicks, chests: state.st.chests, spins: state.st.spins || 0 }, c60: 0, reg: 0, done: [] };
  return state.hw;
}
const HW_M = [
  { id: "m1", n: "Toca 50.000 veces", t: 5e4, p: (h) => state.st.clicks - h.b.clicks, k: "hat:calabaza", rw: "Calabaza Encantada" },
  { id: "m2", n: "Abre 80 cofres", t: 80, p: (h) => state.st.chests - h.b.chests, k: "neck:capaconde", rw: "Capa del Conde" },
  { id: "m3", n: "Gira la ruleta 40 veces", t: 40, p: (h) => (state.st.spins || 0) - h.b.spins, k: "feet:humovioleta", rw: "Pisadas de Humo Violeta" },
  { id: "m4", n: "Alcanza combo x60 30 veces", t: 30, p: (h) => h.c60, k: "trail:nocturna", rw: "Estela Nocturna" },
  { id: "m5", n: "Completa 45 misiones regulares", t: 45, p: (h) => h.reg, k: null, rw: "Título «Terror del Corral»" },
];
const HW_SHOP = [
  { k: "eyes:ojosespiritu", n: "Ojos de Espíritu", m: 1, f: 5e6, b: "+2% crítico" },
  { k: "back:alasmurcielago", n: "Alas de Murciélago", m: 2, f: 1e7, b: "+4% producción" },
  { k: "tap:truco", n: "Impacto Truco o Trato", m: 3, f: 1.5e7, b: "+5% valor crítico" },
  { k: "pet:batito", n: "Batito (mascota voladora)", m: 4, f: 2e7, b: "+6% producción global" },
];
const hwPrice = (s) => Math.max(s.f, perSec() * 86400 * s.m);
const hwOwned = (k) => k === "pet:batito" ? !!state.pets.batito : state.cosm.own.includes(k);
function hwGive(k) {
  if (k === "pet:batito") { state.pets.batito = 1; if (state.petEq.length < 3) state.petEq.push("batito"); petsStage(); return; }
  unlock(k, "¡Objeto exclusivo desbloqueado!", true);
}
function hwTick() {
  const on = liveOn("2026-10"); let b = $("octBtn");
  if (on && !b) { b = document.createElement("button"); b.id = "octBtn"; b.className = "btn ev-oct"; b.innerHTML = "🎃 Evento de Octubre"; b.onclick = () => openM("m-halo"); document.body.appendChild(b); }
  if (b) b.hidden = !on;
  if (on) hwS();
}

Object.assign(ICONS, {
  ojosespiritu: '<path d="M2 12c3-5 7-7 10-7s7 2 10 7c-3 5-7 7-10 7s-7-2-10-7z"/><circle cx="12" cy="12" r="4.500" fill="#b05cff"/><circle cx="12" cy="12" r="1.800" fill="#fff" stroke="none"/>',
  alasmurcielago: '<path d="M12 6c-1.500 0-2.500 1-3 3C7 7 3 7 1 9c2 1 2 3 2 6 2-2 3-1 4 1 1-2 2-3 3-3l2 2 2-2c1 0 2 1 3 3 1-2 2-3 4-1 0-3 0-5 2-6-2-2-6-2-8 0-.5-2-1.500-3-3-3z"/>',
  calabaza: '<ellipse cx="12" cy="14" rx="9" ry="7"/><path fill="none" d="M12 7v14M7 8c-3 4-2 9 0 12M17 8c3 4 2 9 0 12"/><path fill="none" d="M12 7c0-3 1-4 3-4"/>',
  capa: '<path d="M6 3h12l3 18c-5 2-13 2-18 0z"/><path fill="none" d="M9 3c1 3 5 3 6 0"/>',
  humo: '<circle cx="8" cy="16" r="5"/><circle cx="16" cy="14" r="4"/><circle cx="12" cy="8" r="4"/>',
  calavera: '<path d="M12 3a8 8 0 0 0-8 8c0 3 1 4 3 5v4h10v-4c2-1 3-2 3-5a8 8 0 0 0-8-8z"/><circle cx="9" cy="11" r="2" fill="#2b2118"/><circle cx="15" cy="11" r="2" fill="#2b2118"/><path fill="none" d="M10 20v-3M14 20v-3"/>',
});
const HW_IC = {
  m1: svg("calabaza", "#ff8a00"), m2: svg("capa", "#a8142f"), m3: svg("humo", "#b05cff"), m4: svg("estrella", "#b05cff"), m5: svg("gema", "#ff8a00"),
  "eyes:ojosespiritu": svg("ojosespiritu", "#e9d6ff"), "back:alasmurcielago": svg("alasmurcielago", "#6a3fa0"), "tap:truco": svg("calavera", "#fff8e6"), "pet:batito": animalSvg("murcielago", "#5b3a9c"),
};
function hwFx() {
  const cx = stage.clientWidth / 2, cy = stage.clientHeight / 2;
  spray("conf", cx, cy, 40, 1800, 250, () => `--c: #ff7a2e`);
  spray("conf", cx, cy, 40, 1800, 250, () => `--c: #b05cff`);
  confetti(cx, cy, 50);
  sfx(880, .2); setTimeout(() => sfx(1200, .3), 120);
  if (state.set.shake) replay(stage, "shake");
}

mkModal("halo", "🎃 Truco o Trato");
RENDER["m-halo"] = () => {
  const on = liveOn("2026-10"), h = hwS(), left = (LIVEOPS["2026-10"].to - Date.now()) / 1000;
  $("b-halo").innerHTML = `<p class="sum ev-sum">${on ? "Termina en " + fmtH(Math.max(0, left)) : "Evento finalizado"} · Todo es <b style="color:#ff8a00">Exclusivo</b>: bonus permanentes.</p>` +
    `<h3 class="ev-h">🎃 Misiones</h3><ul class="quests">` + HW_M.map((m) => { const pr = Math.min(m.t, m.p(h)), d = h.done.includes(m.id);
      return `<li class="ev-item"><div class="ev-item-header"><span class="ev-ico">${HW_IC[m.id]}</span><span class="ev-tx"><b>${m.n}</b><small>Premio: ${m.rw}</small></span><button class="ev-btn" data-hw="m:${m.id}"${d || pr < m.t || !on ? " disabled" : ""}>${d ? "Hecho ✓" : "Reclamar"}</button></div><div class="bar"><div style="width:${pr / m.t * 100}%"></div></div><small class="ev-pr">${fmt(pr)} / ${fmt(m.t)}</small></li>`; }).join("") + `</ul>` +
    `<h3 class="ev-h">🦇 Tienda del evento</h3><ul class="quests">` + HW_SHOP.map((s) => { const own = hwOwned(s.k), c = hwPrice(s);
      return `<li class="ev-item"><div class="ev-item-header"><span class="ev-ico">${HW_IC[s.k]}</span><span class="ev-tx"><b>${s.n}</b><small>${s.b}</small></span><button class="ev-btn" data-hw="s:${s.k}"${own || !on || state.coins < c ? " disabled" : ""}>${own ? "Tuyo ✓" : "Comprar · " + fmt(c)}</button></div></li>`; }).join("") + `</ul>`;
};
document.addEventListener("click", (e) => {
  const b = e.target.closest("[data-hw]"); if (!b || !liveOn("2026-10")) return;
  const v = b.dataset.hw, i = v.indexOf(":"), t = v.slice(0, i), id = v.slice(i + 1), h = hwS();
  if (t === "m") { const m = HW_M.find((x) => x.id === id); if (h.done.includes(id) || m.p(h) < m.t) return; h.done.push(id); if (m.k) hwGive(m.k); toast("Misión completada: " + m.rw); }
  else { const s = HW_SHOP.find((x) => x.k === id), c = hwPrice(s); if (hwOwned(id)) return; if (state.coins < c) return toast("Te faltan ricoins (" + fmt(c) + ")"); state.coins -= c; hwGive(id); }
  hwFx(); save(); render(); renderWard(); RENDER["m-halo"]();
});
$("chick").addEventListener("click", () => { if (combo === 60 && liveOn("2026-10")) hwS().c60++; });   // se ejecuta tras el listener principal: combo ya actualizado
hwTick(); passBadge();

applyLook();
$("introChick").appendChild($("chick").querySelector("svg").cloneNode(true));
$("mute").textContent = "Sonido: " + (state.muted ? "no" : "sí");
syncIntro(); renderColl(); renderWard();
rank = rankIndex();
render();
if (loadFlag) toast("Partida corrupta o modificada");

// =========================================================================
// PARCHE UX MÓVIL Y ACCESIBILIDAD
// =========================================================================

// 1. Eliminar la latencia al tocar (0ms delay) y soporte multitouch
const touchEls = ["chick", "golden", "chest"];
touchEls.forEach(id => {
  const el = document.getElementById(id);
  if (el) {
    // Evita que el click nativo posterior se cuente dos veces
    el.addEventListener("click", (e) => {
      if (e.isTrusted && Date.now() - (el._tp || 0) < 700) e.stopImmediatePropagation();
    }, true);
    el.addEventListener("pointerdown", (e) => {
      // Solo aplicamos la intercepción si el dispositivo es táctil
      if (e.pointerType !== "touch") return;
      
      e.preventDefault(); // Evitamos el retardo y el click fantasma del navegador
      el._tp = Date.now();
      
      // Feedback visual rápido (ya que preventDefault bloquea el :active de CSS)
      el.classList.add("pop");
      setTimeout(() => el.classList.remove("pop"), 100);
      
      // Lanzamos el click para que tus 5 listeners originales hagan su trabajo sin reescribir la lógica
      el.dispatchEvent(new MouseEvent("click", { bubbles: true, clientX: e.clientX, clientY: e.clientY }));
    });
  }
});

// 2. Alternativa táctil para los Easter Eggs de teclado
const origRenderEggs = renderEggs;
renderEggs = function() {
  origRenderEggs(); // Llama a la función original de dibujado
  
  // Si no existe, añadimos un botón al final de los secretos para escribir con el teclado virtual
  if(!document.getElementById("kbBtn")) {
    const btn = document.createElement("button");
    btn.id = "kbBtn"; 
    btn.className = "btn wide"; 
    btn.style.marginTop = "14px";
    btn.innerHTML = "⌨️ Introducir código secreto (Móvil)";
    
    btn.onclick = () => showModal("Código secreto", "Escribe una palabra o código secreto:", "Probar", (res) => {
      if(!res) return;
      const r = res.toLowerCase().replace(/\s+/g, "");
      
      if (r === "ricopio") { gain(1000); render(); toast("¡Me has llamado! +1000"); egg("ricopio", true); confetti(stage.clientWidth / 2, stage.clientHeight / 2, 30); }
      if (r === "marcos") egg("marcos");
      if (r === "gallina") egg("gallina");
      if (r.endsWith("piopio")) egg("pio");
      if (r === "upupdowndownleftrightleftrightba" || r === "arribaarribaabajooabajoizquierdaderechaizquierdaderechaba") {
        if (!state.cosm.own.includes("skin:arcoiris")) state.cosm.own.push("skin:arcoiris");
        toast("¡Código secreto! Plumaje arcoíris"); egg("konami", true);
        for (let i = 0; i < 8; i++) setTimeout(() => burst(Math.random() * stage.clientWidth, 0, 6), i * 120);
        renderWard();
      }
    }, "text");
    document.getElementById("eggHint").after(btn);
  }
};

    // Ricopio conserva su SVG como textura para que los aspectos y eventos existentes
    // sigan actualizándose mientras el modelo gira.
    function safeInit3D() {
      if (typeof THREE === "undefined") {
        console.warn("Three.js no está disponible; se mantiene el Ricopio SVG.");
        return;
      }

      const chick = document.querySelector("#chick");
      const canvas = chick && chick.querySelector(".c3d");
      const svg = chick && chick.querySelector("svg");
      if (!chick || !canvas || !svg) return;

      try {
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(40, 1, 0.1, 100);
        camera.position.set(0, 0, 5.5);

        const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
        renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
        renderer.shadowMap.enabled = true;
        renderer.shadowMap.type = THREE.PCFSoftShadowMap;
        renderer.outputEncoding = THREE.sRGBEncoding;
        const introChick = document.querySelector("#introChick");
        let introCanvas = null;
        let introRenderer = null;
        if (introChick) {
          introCanvas = document.createElement("canvas");
          introCanvas.className = "c3d-preview";
          introCanvas.setAttribute("aria-hidden", "true");
          try {
            introRenderer = new THREE.WebGLRenderer({ canvas: introCanvas, alpha: true, antialias: true });
            introRenderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
            introRenderer.outputEncoding = THREE.sRGBEncoding;
            introChick.appendChild(introCanvas);
            introChick.classList.add("is-3d");
          } catch (error) {
            introCanvas = null;
            introRenderer = null;
            console.warn("No se pudo activar el Ricopio 3D en la pantalla inicial:", error);
          }
        }

        scene.add(new THREE.AmbientLight(0xffffff, 0.4));
        const keyLight = new THREE.DirectionalLight(0xfff5ea, 0.7);
        keyLight.position.set(2.5, 4, 3.5);
        keyLight.castShadow = true;
        scene.add(keyLight);
        const rimLight = new THREE.DirectionalLight(0x7ecbf0, 0.25);
        rimLight.position.set(-2.5, 2, -3.5);
        scene.add(rimLight);

        const rig = new THREE.Group();
        const spinGroup = new THREE.Group();
        rig.add(spinGroup);
        scene.add(rig);

        const outline = new THREE.Mesh(
          new THREE.SphereGeometry(1, 40, 32),
          new THREE.MeshToonMaterial({ color: 0x2b2118, side: THREE.BackSide })
        );
        outline.scale.setScalar(1.035);
        spinGroup.add(outline);

        const bodyMaterial = new THREE.MeshPhongMaterial({
          color: 0xffffff,
          specular: 0x555555,
          shininess: 24
        });
        const body = new THREE.Mesh(new THREE.SphereGeometry(1, 40, 32), bodyMaterial);
        body.castShadow = true;
        body.receiveShadow = true;
        spinGroup.add(body);

        const chickMaterial = (color) => new THREE.MeshToonMaterial({ color });
        const addOval = (parent, color, position, scale, material = chickMaterial(color)) => {
          const mesh = new THREE.Mesh(new THREE.SphereGeometry(1, 24, 18), material);
          mesh.position.set(position[0], position[1], position[2]);
          mesh.scale.set(scale[0], scale[1], scale[2]);
          mesh.castShadow = true;
          parent.add(mesh);
          return mesh;
        };

        // Build the face from raised meshes on the spherical body, not a flat decal.
        const bellyMaterial = chickMaterial(0xffe27a);
        const wingMaterial = chickMaterial(0xf2b300);
        addOval(spinGroup, 0xffe27a, [0, -0.42, 0.9], [0.43, 0.31, 0.13], bellyMaterial);

        [-1, 1].forEach((side) => {
          const wing = addOval(spinGroup, 0xf2b300, [side * 0.84, -0.28, 0.27], [0.3, 0.42, 0.2], wingMaterial);
          wing.rotation.z = side * -0.42;

          addOval(spinGroup, 0xff9aa8, [side * 0.48, -0.02, 0.89], [0.12, 0.15, 0.07]);

          addOval(spinGroup, 0xfff8e6, [side * 0.28, 0.29, 0.96], [0.105, 0.16, 0.075]);
          addOval(spinGroup, 0x2b2118, [side * 0.28, 0.29, 1.025], [0.055, 0.105, 0.045]);
          addOval(spinGroup, 0xffffff, [side * 0.28 - 0.018, 0.34, 1.06], [0.022, 0.035, 0.018]);
        });

        const beak = new THREE.Mesh(
          new THREE.ConeGeometry(0.16, 0.24, 5),
          chickMaterial(0xff8a1f)
        );
        beak.position.set(0, 0.04, 1.02);
        beak.rotation.x = Math.PI / 2;
        beak.castShadow = true;
        spinGroup.add(beak);

        addOval(spinGroup, 0xff5d73, [0, 1.02, 0.12], [0.12, 0.23, 0.11]);

        const feetMaterial = chickMaterial(0xff8a1f);
        [-0.27, 0.27].forEach((x) => {
          const leg = new THREE.Mesh(new THREE.CylinderGeometry(0.035, 0.045, 0.34, 12), feetMaterial);
          leg.position.set(x, -1.08, 0.23);
          leg.castShadow = true;
          spinGroup.add(leg);
          [-0.06, 0, 0.06].forEach((toeOffset) => {
            const toe = new THREE.Mesh(new THREE.CylinderGeometry(0.025, 0.04, 0.16, 10), feetMaterial);
            toe.position.set(x + toeOffset, -1.21, 0.3);
            toe.rotation.z = toeOffset * 2;
            toe.castShadow = true;
            spinGroup.add(toe);
          });
        });

        const accessoryGroup = new THREE.Group();
        spinGroup.add(accessoryGroup);

        const makeAccessoryGroup = () => {
          const group = new THREE.Group();
          accessoryGroup.add(group);
          return group;
        };
        const hatGroup = makeAccessoryGroup();
        const eyeAccessoryGroup = makeAccessoryGroup();
        const neckGroup = makeAccessoryGroup();
        const backGroup = makeAccessoryGroup();
        const feetGroup = makeAccessoryGroup();
        const fireWings = [];
        const fireEmbers = [];
        const clearAccessoryGroup = (group) => {
          group.traverse((object) => {
            if (!object.isMesh) return;
            object.geometry.dispose();
            if (Array.isArray(object.material)) object.material.forEach((material) => material.dispose());
            else object.material.dispose();
          });
          group.clear();
        };
        const accessoryMaterial = (color, options = {}) => new THREE.MeshPhongMaterial({
          color,
          shininess: options.shininess === undefined ? 42 : options.shininess,
          specular: options.specular || 0x555555,
          emissive: options.emissive || 0x000000,
          emissiveIntensity: options.emissiveIntensity || 0,
          transparent: !!options.transparent,
          opacity: options.opacity === undefined ? 1 : options.opacity,
          side: options.side || THREE.FrontSide
        });
        const addAccessoryMesh = (group, geometry, material, position, scale, rotation) => {
          const mesh = new THREE.Mesh(geometry, material);
          if (position) mesh.position.set(position[0], position[1], position[2]);
          if (scale) mesh.scale.set(scale[0], scale[1], scale[2]);
          if (rotation) mesh.rotation.set(rotation[0], rotation[1], rotation[2]);
          mesh.castShadow = true;
          mesh.receiveShadow = true;
          group.add(mesh);
          return mesh;
        };
        const addAccessoryOval = (group, color, position, scale, options = {}) =>
          addAccessoryMesh(group, new THREE.SphereGeometry(1, 20, 14), accessoryMaterial(color, options), position, scale);
        const addAccessoryTube = (group, points, color, radius, options = {}) => {
          const curve = new THREE.CatmullRomCurve3(points.map((point) => new THREE.Vector3(point[0], point[1], point[2])));
          return addAccessoryMesh(group, new THREE.TubeGeometry(curve, 24, radius, 8, false), accessoryMaterial(color, options));
        };
        const addFeather = (group, color, position, scale, angle, options = {}) => {
          const feather = addAccessoryOval(group, color, position, scale, options);
          feather.rotation.z = angle || 0;
          return feather;
        };

        const pedestal = new THREE.Mesh(
          new THREE.CylinderGeometry(1.12, 1.2, 0.16, 40),
          new THREE.MeshToonMaterial({ color: 0x5a3e2b })
        );
        pedestal.position.y = -1.28;
        pedestal.receiveShadow = true;
        scene.add(pedestal);

        const resize = () => {
          const width = Math.max(1, canvas.clientWidth);
          const height = Math.max(1, canvas.clientHeight);
          renderer.setSize(width, height, false);
          camera.aspect = width / height;
          camera.updateProjectionMatrix();
          if (introRenderer && introCanvas && introCanvas.isConnected) {
            const previewWidth = Math.max(1, introCanvas.clientWidth);
            const previewHeight = Math.max(1, introCanvas.clientHeight);
            introRenderer.setSize(previewWidth, previewHeight, false);
          }
        };
        resize();
        window.addEventListener("resize", resize);
        if (typeof ResizeObserver !== "undefined") {
          const resizeObserver = new ResizeObserver(resize);
          resizeObserver.observe(chick);
          if (introChick) resizeObserver.observe(introChick);
        }

        let skinTexture = null;
        let syncedSkinId = "";
        let syncedHat = null, syncedEyes = null, syncedNeck = null, syncedBack = null, syncedFeet = null;
        const createSkinTexture = (skin) => {
          const textureCanvas = document.createElement("canvas");
          textureCanvas.width = 1024;
          textureCanvas.height = 512;
          const context = textureCanvas.getContext("2d");
          if (!context) throw new Error("No se pudo crear la textura de la skin.");

          const palette = skin.v || ["#ffc928", "#f2b300", "#ffe27a"];
          const gradient = context.createLinearGradient(0, 0, 0, textureCanvas.height);
          gradient.addColorStop(0, palette[2]);
          gradient.addColorStop(0.52, palette[0]);
          gradient.addColorStop(1, palette[1]);
          context.fillStyle = gradient;
          context.fillRect(0, 0, textureCanvas.width, textureCanvas.height);

          const pattern = skin.tx || skin.id;
          const colors = [...palette].reverse();
          if (pattern === "glitch") {
            context.fillStyle = "#101018";
            context.globalAlpha = 0.72;
            context.fillRect(0, 0, textureCanvas.width, textureCanvas.height);
            context.globalAlpha = 1;
            for (let row = 0; row < 24; row++) {
              const y = (row * 47) % textureCanvas.height;
              const x = (row * 139) % textureCanvas.width;
              const width = 80 + ((row * 73) % 340);
              context.fillStyle = row % 2 ? palette[1] : palette[2];
              context.globalAlpha = 0.75;
              context.fillRect(x, y, width, 7 + (row % 13));
              context.fillStyle = "#ffffff";
              context.globalAlpha = 0.55;
              context.fillRect((x + 113) % textureCanvas.width, y + 18, width * 0.4, 2);
            }
            context.globalAlpha = 1;
            context.fillStyle = "rgba(255,255,255,.13)";
            for (let y = 0; y < textureCanvas.height; y += 8) context.fillRect(0, y, textureCanvas.width, 1);
          } else if (pattern === "escamas") {
            context.lineWidth = 4;
            for (let row = -1; row < 12; row++) {
              for (let col = -1; col < 18; col++) {
                const x = col * 64 + (row % 2) * 32;
                const y = row * 48;
                context.fillStyle = colors[(row + col + 36) % colors.length];
                context.globalAlpha = 0.42;
                context.beginPath();
                context.arc(x, y, 37, 0.12 * Math.PI, 0.88 * Math.PI);
                context.lineTo(x - 34, y);
                context.closePath();
                context.fill();
                context.strokeStyle = "rgba(255,255,255,.32)";
                context.stroke();
              }
            }
            context.globalAlpha = 1;
          } else if (pattern === "olas" || pattern === "aurora") {
            for (let row = 0; row < 18; row++) {
              context.beginPath();
              for (let x = 0; x <= textureCanvas.width; x += 8) {
                const y = row * 34 + Math.sin(x * 0.018 + row * 0.8) * (pattern === "aurora" ? 24 : 12);
                if (x === 0) context.moveTo(x, y);
                else context.lineTo(x, y);
              }
              context.strokeStyle = colors[row % colors.length];
              context.globalAlpha = pattern === "aurora" ? 0.5 : 0.6;
              context.lineWidth = pattern === "aurora" ? 14 : 7;
              context.stroke();
            }
            context.globalAlpha = 1;
          } else if (pattern === "facetas" || pattern === "diamante") {
            for (let row = 0; row < 16; row++) {
              for (let col = 0; col < 24; col++) {
                const x = col * 48;
                const y = row * 36;
                context.fillStyle = colors[(row * 7 + col * 3) % colors.length];
                context.globalAlpha = 0.12 + ((row + col) % 4) * 0.09;
                context.beginPath();
                context.moveTo(x, y);
                context.lineTo(x + 48, y + ((row + col) % 2) * 36);
                context.lineTo(x + ((row + col) % 2) * 48, y + 36);
                context.closePath();
                context.fill();
              }
            }
            context.globalAlpha = 1;
          } else if (pattern === "fuego" || pattern === "lava" || pattern === "fenix") {
            for (let col = 0; col < 20; col++) {
              const x = col * 56;
              const height = 100 + ((col * 71) % 230);
              context.fillStyle = colors[col % colors.length];
              context.globalAlpha = 0.46;
              context.beginPath();
              context.moveTo(x, textureCanvas.height);
              context.lineTo(x + 22, textureCanvas.height - height * 0.62);
              context.lineTo(x + 30 + (col % 3) * 6, textureCanvas.height - height);
              context.lineTo(x + 46, textureCanvas.height - height * 0.48);
              context.lineTo(x + 56, textureCanvas.height);
              context.fill();
            }
            context.globalAlpha = 1;
          } else if (pattern === "radio") {
            context.save();
            context.translate(-textureCanvas.width, 0);
            context.rotate(-0.48);
            for (let x = 0; x < textureCanvas.width * 3; x += 56) {
              context.fillStyle = x % 112 ? "#18230a" : palette[0];
              context.globalAlpha = 0.42;
              context.fillRect(x, 0, 28, textureCanvas.height * 2);
            }
            context.restore();
            context.globalAlpha = 1;
          } else if (pattern === "galaxia" || pattern === "cosmos" || pattern === "pase" || pattern === "supremo") {
            for (let i = 0; i < 110; i++) {
              const x = (i * 193 + 47) % textureCanvas.width;
              const y = (i * 79 + 19) % textureCanvas.height;
              const radius = 1 + (i % 4);
              context.fillStyle = i % 3 ? "#ffffff" : palette[2];
              context.globalAlpha = 0.35 + (i % 5) * 0.12;
              context.beginPath();
              context.arc(x, y, radius, 0, Math.PI * 2);
              context.fill();
            }
            context.globalAlpha = 1;
          } else if (pattern === "arcoiris" || pattern === "iris") {
            const rainbow = context.createLinearGradient(0, 0, textureCanvas.width, 0);
            ["#ff5d73", "#ffb400", "#6fd06f", "#3d9bff", "#b05cff", "#ff5d73"].forEach((color, index, list) => {
              rainbow.addColorStop(index / (list.length - 1), color);
            });
            context.globalAlpha = 0.72;
            context.fillStyle = rainbow;
            context.fillRect(0, 0, textureCanvas.width, textureCanvas.height);
            context.globalAlpha = 1;
          } else if (pattern === "tormenta") {
            context.strokeStyle = "rgba(235,248,255,.86)";
            context.lineWidth = 8;
            for (let i = 0; i < 8; i++) {
              const x = 70 + i * 137;
              context.beginPath();
              context.moveTo(x, 0);
              context.lineTo(x - 26, 120);
              context.lineTo(x + 24, 150);
              context.lineTo(x - 42, 280);
              context.stroke();
            }
          } else {
            const rarity = skin.rar || rarOf(skin);
            if (rarity === "legendario" || rarity === "mitico" || skin.cls === "shine") {
              context.strokeStyle = "rgba(255,255,255,.28)";
              context.lineWidth = 12;
              for (let x = -textureCanvas.height; x < textureCanvas.width; x += 96) {
                context.beginPath();
                context.moveTo(x, 0);
                context.lineTo(x + textureCanvas.height, textureCanvas.height);
                context.stroke();
              }
              for (let i = 0; i < 45; i++) {
                const x = (i * 227 + 61) % textureCanvas.width;
                const y = (i * 101 + 23) % textureCanvas.height;
                context.fillStyle = "#ffffff";
                context.globalAlpha = 0.38;
                context.beginPath();
                context.arc(x, y, 2 + i % 3, 0, Math.PI * 2);
                context.fill();
              }
              context.globalAlpha = 1;
            }
          }

          const texture = new THREE.CanvasTexture(textureCanvas);
          texture.encoding = THREE.sRGBEncoding;
          texture.anisotropy = renderer.capabilities.getMaxAnisotropy();
          return texture;
        };
        const setMeshColor = (material, element) => {
          if (!element) return;
          material.color.set(getComputedStyle(element).fill);
        };
        const syncCharacter = () => {
          const equipped = state.cosm.eq;
          const skin = COSM.skin.find((item) => item.id === equipped.skin) || COSM.skin[0];
          if (skin.id !== syncedSkinId) {
            const nextTexture = createSkinTexture(skin);
            if (skinTexture) skinTexture.dispose();
            skinTexture = nextTexture;
            bodyMaterial.map = skinTexture;
            syncedSkinId = skin.id;
          }
          const rarity = skin.rar || rarOf(skin);
          bodyMaterial.color.set(0xffffff);
          bodyMaterial.shininess = rarity === "mitico" ? 95 : rarity === "legendario" ? 72 : 24;
          bodyMaterial.specular.set(rarity === "mitico" ? 0xffffff : rarity === "legendario" ? 0xd8eaff : 0x555555);
          bodyMaterial.emissive.set(skin.au || "#000000");
          bodyMaterial.emissiveIntensity = rarity === "mitico" ? 0.16 : rarity === "legendario" ? 0.1 : 0;
          const ghost = skin.cls === "ghost";
          bodyMaterial.transparent = ghost;
          bodyMaterial.opacity = ghost ? 0.84 : 1;
          bodyMaterial.depthWrite = !ghost;
          bodyMaterial.needsUpdate = true;
          setMeshColor(bellyMaterial, svg.querySelector(".belly"));
          setMeshColor(wingMaterial, svg.querySelector(".wing"));

          const gold = 0xffd34d;
          const metal = { shininess: 92, specular: 0xffffff };
          const darkMetal = { shininess: 72, specular: 0xbac7d5 };
          const addBand = (group, color, position, radius, tube, rotationX = Math.PI / 2) => {
            const band = addAccessoryMesh(group, new THREE.TorusGeometry(radius, tube, 10, 36), accessoryMaterial(color, metal), position);
            band.rotation.x = rotationX;
            return band;
          };

          const hat = equipped.hat;
          if (hat !== syncedHat) {
            syncedHat = hat;
            clearAccessoryGroup(hatGroup);
          if (hat === "paja") {
            addAccessoryMesh(hatGroup, new THREE.CylinderGeometry(0.48, 0.45, 0.09, 40), accessoryMaterial(0xd79a32), [0, 1.03, 0.1]);
            addAccessoryMesh(hatGroup, new THREE.CylinderGeometry(0.28, 0.32, 0.1, 32), accessoryMaterial(0xf5ca68), [0, 1.09, 0.1]);
            addAccessoryMesh(hatGroup, new THREE.CylinderGeometry(0.23, 0.34, 0.3, 32), accessoryMaterial(0xe6b64f), [0, 1.27, 0.1]);
            addBand(hatGroup, 0x9d4f27, [0, 1.18, 0.1], 0.29, 0.035, 0);
          } else if (hat === "gorra") {
            addAccessoryOval(hatGroup, 0xe54435, [0, 1.12, 0.08], [0.34, 0.24, 0.3]);
            addAccessoryMesh(hatGroup, new THREE.CylinderGeometry(0.25, 0.27, 0.08, 32), accessoryMaterial(0xc8342d), [0, 1.015, 0.08]);
            addAccessoryOval(hatGroup, 0xe54435, [0, 1.02, 0.35], [0.38, 0.055, 0.2]);
            addAccessoryOval(hatGroup, 0xffd84a, [0, 1.22, 0.32], [0.08, 0.08, 0.025]);
            [-0.14, 0.14].forEach((x) => addAccessoryTube(hatGroup, [[x, 1.0, 0.42], [x * 0.75, 1.02, 0.51]], 0x8f2826, 0.012));
          } else if (hat === "aureola") {
            const halo = addAccessoryMesh(hatGroup, new THREE.TorusGeometry(0.37, 0.045, 12, 48), accessoryMaterial(0xffe27a, { ...metal, emissive: 0xffa600, emissiveIntensity: 0.35 }), [0, 1.28, 0.1]);
            halo.rotation.x = Math.PI / 2;
            addAccessoryOval(hatGroup, 0xffffff, [-0.22, 1.33, 0.1], [0.045, 0.025, 0.025], { emissive: 0xffffff, emissiveIntensity: 0.6 });
          } else if (hat === "chistera") {
            addAccessoryMesh(hatGroup, new THREE.CylinderGeometry(0.43, 0.43, 0.08, 40), accessoryMaterial(0x25212a, darkMetal), [0, 1.04, 0.08]);
            addAccessoryMesh(hatGroup, new THREE.CylinderGeometry(0.25, 0.31, 0.5, 32), accessoryMaterial(0x211e26, darkMetal), [0, 1.31, 0.08]);
            addBand(hatGroup, 0xb1263b, [0, 1.15, 0.08], 0.28, 0.035, 0);
            addAccessoryOval(hatGroup, gold, [0.22, 1.16, 0.22], [0.045, 0.06, 0.03]);
          } else if (hat === "corona") {
            addAccessoryMesh(hatGroup, new THREE.CylinderGeometry(0.27, 0.34, 0.16, 10), accessoryMaterial(gold, metal), [0, 1.08, 0.1]);
            for (let i = 0; i < 7; i++) {
              const angle = (i / 7) * Math.PI * 2;
              const spike = addAccessoryMesh(hatGroup, new THREE.ConeGeometry(0.075, 0.22, 6), accessoryMaterial(gold, metal), [Math.cos(angle) * 0.28, 1.25, 0.1 + Math.sin(angle) * 0.15]);
              spike.rotation.z = -Math.cos(angle) * 0.32;
            }
            addAccessoryOval(hatGroup, 0x54c9ff, [0, 1.12, 0.42], [0.09, 0.08, 0.035], metal);
          } else if (hat === "cuernos") {
            [-1, 1].forEach((side) => {
              addAccessoryTube(hatGroup, [[side * 0.2, 1.02, 0.12], [side * 0.33, 1.12, 0.14], [side * 0.43, 1.32, 0.13], [side * 0.39, 1.49, 0.1]], 0x34202a, 0.065);
              addAccessoryTube(hatGroup, [[side * 0.2, 1.02, 0.17], [side * 0.32, 1.12, 0.19]], 0xc6b5a6, 0.012);
            });
            addBand(hatGroup, 0x6d2e42, [0, 1.02, 0.09], 0.28, 0.055, 0);
          } else if (hat === "flores") {
            for (let i = 0; i < 7; i++) {
              const angle = Math.PI * (0.12 + i * 0.126);
              const x = Math.cos(angle) * 0.31;
              const y = 1.01 + Math.sin(angle) * 0.18;
              const flowerColor = [0xff5b8a, 0xffd64f, 0x8a68e8, 0xff8a42][i % 4];
              for (let petal = 0; petal < 5; petal++) {
                const a = petal * Math.PI * 2 / 5;
                addAccessoryOval(hatGroup, flowerColor, [x + Math.cos(a) * 0.045, y + Math.sin(a) * 0.045, 0.2], [0.04, 0.025, 0.025]);
              }
              addAccessoryOval(hatGroup, 0xffe27a, [x, y, 0.23], [0.025, 0.025, 0.02]);
            }
          } else if (hat === "vikingo") {
            addAccessoryMesh(hatGroup, new THREE.SphereGeometry(0.38, 32, 18, 0, Math.PI * 2, 0, Math.PI / 2), accessoryMaterial(0x9ca9b6, darkMetal), [0, 1.0, 0.08]);
            addAccessoryMesh(hatGroup, new THREE.BoxGeometry(0.68, 0.09, 0.16), accessoryMaterial(0x687784, darkMetal), [0, 1.02, 0.16]);
            addAccessoryMesh(hatGroup, new THREE.BoxGeometry(0.12, 0.36, 0.12), accessoryMaterial(0x84919f, darkMetal), [0, 0.84, 0.25]);
            [-1, 1].forEach((side) => {
              addAccessoryOval(hatGroup, 0x8795a1, [side * 0.34, 0.91, 0.09], [0.12, 0.22, 0.12], darkMetal);
              addAccessoryTube(hatGroup, [[side * 0.28, 1.06, 0.08], [side * 0.42, 1.13, 0.07], [side * 0.53, 1.35, 0.05], [side * 0.58, 1.5, 0.02]], 0xf2ead8, 0.045);
            });
            addAccessoryOval(hatGroup, gold, [0, 1.08, 0.245], [0.07, 0.045, 0.025], metal);
          } else if (hat === "lazo") {
            [-1, 1].forEach((side) => {
              const bow = addAccessoryOval(hatGroup, 0xff4f87, [side * 0.13, 1.03, 0.2], [0.15, 0.11, 0.055]);
              bow.rotation.z = side * -0.34;
            });
            addAccessoryOval(hatGroup, gold, [0, 1.03, 0.26], [0.065, 0.07, 0.04], metal);
          } else if (hat === "gorro") {
            addAccessoryOval(hatGroup, 0x3d72ca, [0, 1.09, 0.08], [0.34, 0.25, 0.29]);
            addAccessoryMesh(hatGroup, new THREE.CylinderGeometry(0.3, 0.3, 0.13, 32), accessoryMaterial(0xe7efff), [0, 0.98, 0.08]);
            addAccessoryOval(hatGroup, 0xffffff, [0, 1.34, 0.08], [0.09, 0.09, 0.09]);
            [-0.2, 0, 0.2].forEach((x) => addAccessoryTube(hatGroup, [[x, 1.02, 0.35], [x * 0.8, 1.16, 0.33]], 0x9fc5ff, 0.014));
          } else if (hat === "mago") {
            addAccessoryMesh(hatGroup, new THREE.CylinderGeometry(0.42, 0.42, 0.07, 40), accessoryMaterial(0x362a72, darkMetal), [0, 1.02, 0.08]);
            const cone = addAccessoryMesh(hatGroup, new THREE.ConeGeometry(0.32, 0.72, 32), accessoryMaterial(0x44328c, darkMetal), [0, 1.38, 0.08]);
            cone.rotation.z = -0.1;
            addBand(hatGroup, 0xffd84a, [0, 1.18, 0.08], 0.27, 0.035, 0);
            addAccessoryOval(hatGroup, gold, [0.08, 1.42, 0.37], [0.07, 0.07, 0.025], { ...metal, emissive: 0xffc400, emissiveIntensity: 0.2 });
            for (let i = 0; i < 3; i++) {
              const star = addAccessoryMesh(hatGroup, new THREE.OctahedronGeometry(0.07), accessoryMaterial(0xffe27a, metal), [-0.18 + i * 0.16, 1.28 + (i % 2) * 0.18, 0.34]);
              star.scale.setScalar(0.55);
            }
          } else if (hat === "casco") {
            addAccessoryMesh(hatGroup, new THREE.SphereGeometry(0.36, 32, 20), accessoryMaterial(0x4d627a, darkMetal), [0, 1.02, 0.08], [1, 0.8, 1]);
            addAccessoryMesh(hatGroup, new THREE.BoxGeometry(0.7, 0.1, 0.16), accessoryMaterial(0x9cb5cc, metal), [0, 0.98, 0.15]);
            addBand(hatGroup, 0x32d9ed, [0, 1.04, 0.37], 0.27, 0.035, 0);
            [-1, 1].forEach((side) => addAccessoryOval(hatGroup, 0x19d7ed, [side * 0.34, 0.98, 0.08], [0.06, 0.1, 0.06], { emissive: 0x00cfff, emissiveIntensity: 0.45 }));
          } else if (hat === "calabaza") {
            addAccessoryOval(hatGroup, 0xf47a21, [0, 1.08, 0.12], [0.36, 0.28, 0.29]);
            [-0.18, 0, 0.18].forEach((x) => addAccessoryTube(hatGroup, [[x, 0.91, 0.28], [x * 0.75, 1.1, 0.39], [x, 1.31, 0.25]], 0xc55413, 0.018));
            addAccessoryMesh(hatGroup, new THREE.CylinderGeometry(0.05, 0.08, 0.18, 8), accessoryMaterial(0x538c36), [0, 1.37, 0.08]);
            addAccessoryOval(hatGroup, 0x21172d, [-0.14, 1.12, 0.38], [0.055, 0.07, 0.025]);
            addAccessoryOval(hatGroup, 0x21172d, [0.14, 1.12, 0.38], [0.055, 0.07, 0.025]);
            addAccessoryMesh(hatGroup, new THREE.ConeGeometry(0.11, 0.13, 3), accessoryMaterial(0x21172d), [0, 1.0, 0.39], null, [0, 0, Math.PI]);
          }
          }

          const eyes = equipped.eyes;
          if (eyes !== syncedEyes) {
            syncedEyes = eyes;
            clearAccessoryGroup(eyeAccessoryGroup);
          if (eyes === "gafas" || eyes === "monoculo") {
            const sides = eyes === "monoculo" ? [1] : [-1, 1];
            const frameMaterial = accessoryMaterial(0x302a2b, darkMetal);
            const lensMaterial = accessoryMaterial(0x182d42, { shininess: 110, specular: 0xcceeff, transparent: true, opacity: 0.88 });
            sides.forEach((side) => {
              addAccessoryMesh(eyeAccessoryGroup, new THREE.TorusGeometry(0.145, 0.035, 10, 28), frameMaterial, [side * 0.28, 0.29, 1.055]);
              addAccessoryOval(eyeAccessoryGroup, 0x27445a, [side * 0.28, 0.29, 1.045], [0.12, 0.13, 0.035], { ...metal, transparent: true, opacity: 0.82 });
              if (eyes === "monoculo") {
                addAccessoryTube(eyeAccessoryGroup, [[side * 0.4, 0.2, 1.02], [side * 0.47, 0.04, 0.94], [side * 0.46, -0.2, 0.89]], gold, 0.012);
              }
            });
            if (eyes === "gafas") {
              addAccessoryMesh(eyeAccessoryGroup, new THREE.BoxGeometry(0.16, 0.045, 0.045), frameMaterial, [0, 0.29, 1.055]);
              [-1, 1].forEach((side) => addAccessoryTube(eyeAccessoryGroup, [[side * 0.42, 0.3, 1.04], [side * 0.55, 0.26, 0.9], [side * 0.62, 0.22, 0.72]], 0x302a2b, 0.018));
              [-1, 1].forEach((side) => addAccessoryOval(eyeAccessoryGroup, 0xffffff, [side * 0.24, 0.35, 1.078], [0.025, 0.018, 0.01]));
            }
          } else if (eyes === "laser") {
            const casing = accessoryMaterial(0x202b38, darkMetal);
            const glass = accessoryMaterial(0x6d173a, { shininess: 120, specular: 0xffffff, emissive: 0xe50048, emissiveIntensity: 0.28, transparent: true, opacity: 0.92 });
            const glow = accessoryMaterial(0xff426d, { emissive: 0xff003c, emissiveIntensity: 0.9 });
            const visor = new THREE.Group();
            eyeAccessoryGroup.add(visor);
            addAccessoryMesh(visor, new THREE.BoxGeometry(0.62, 0.16, 0.09), casing, [0, 0.36, 1.01]);
            addAccessoryMesh(visor, new THREE.BoxGeometry(0.48, 0.105, 0.025), glass, [0, 0.36, 1.066]);
            addAccessoryMesh(visor, new THREE.BoxGeometry(0.43, 0.018, 0.012), glow, [0, 0.36, 1.083]);
            [-1, 1].forEach((side) => {
              addAccessoryMesh(visor, new THREE.BoxGeometry(0.1, 0.2, 0.14), accessoryMaterial(0x607487, metal), [side * 0.34, 0.36, 0.96]);
              addAccessoryMesh(visor, new THREE.BoxGeometry(0.07, 0.12, 0.025), accessoryMaterial(0x15d9e9, { emissive: 0x00bfff, emissiveIntensity: 0.65 }), [side * 0.34, 0.36, 1.04]);
              addAccessoryOval(visor, 0xc8fbff, [side * 0.2, 0.38, 1.087], [0.025, 0.012, 0.009], { emissive: 0x63efff, emissiveIntensity: 0.5 });
              addAccessoryTube(visor, [[side * 0.38, 0.37, 0.94], [side * 0.47, 0.35, 0.83], [side * 0.49, 0.28, 0.66]], 0x364959, 0.035, metal);
            });
            addAccessoryMesh(visor, new THREE.BoxGeometry(0.12, 0.028, 0.025), accessoryMaterial(0x9bb1c2, metal), [0, 0.455, 1.035]);
          } else if (eyes === "fuegoojos" || eyes === "ojosespiritu") {
            [-1, 1].forEach((side) => {
              const spirit = eyes === "ojosespiritu";
              addAccessoryOval(eyeAccessoryGroup, spirit ? 0x9d68ff : 0xff561f, [side * 0.28, 0.29, 1.05], [0.105, 0.14, 0.06], {
                emissive: spirit ? 0x672cff : 0xff2600,
                emissiveIntensity: 0.85
              });
              addAccessoryOval(eyeAccessoryGroup, spirit ? 0xe7d5ff : 0xffe26b, [side * 0.28, 0.29, 1.105], [0.043, 0.075, 0.025], { emissive: 0xffffff, emissiveIntensity: 0.7 });
              if (!spirit) {
                const flame = addAccessoryMesh(eyeAccessoryGroup, new THREE.ConeGeometry(0.055, 0.17, 6), accessoryMaterial(0xff3415, { emissive: 0xff1b00, emissiveIntensity: 0.65 }), [side * 0.28, 0.46, 1.04]);
                flame.rotation.z = -side * 0.2;
              }
            });
          } else if (eyes === "parche") {
            addAccessoryOval(eyeAccessoryGroup, 0x322329, [-0.28, 0.3, 1.07], [0.14, 0.17, 0.07]);
            addAccessoryTube(eyeAccessoryGroup, [[-0.48, 0.36, 1.02], [-0.28, 0.47, 0.91], [0, 0.43, 0.84], [0.22, 0.36, 0.9]], 0x573b2f, 0.025);
            addAccessoryOval(eyeAccessoryGroup, gold, [-0.28, 0.3, 1.14], [0.025, 0.025, 0.018], metal);
          } else if (eyes === "corazones") {
            [-1, 1].forEach((side) => {
              addAccessoryOval(eyeAccessoryGroup, 0xff3d78, [side * 0.28 - 0.04, 0.31, 1.055], [0.07, 0.07, 0.04]);
              addAccessoryOval(eyeAccessoryGroup, 0xff3d78, [side * 0.28 + 0.04, 0.31, 1.055], [0.07, 0.07, 0.04]);
              const point = addAccessoryMesh(eyeAccessoryGroup, new THREE.ConeGeometry(0.085, 0.13, 3), accessoryMaterial(0xff3d78), [side * 0.28, 0.23, 1.055]);
              point.rotation.z = Math.PI;
            });
          }
          }

          const neck = equipped.neck;
          if (neck !== syncedNeck) {
            syncedNeck = neck;
            clearAccessoryGroup(neckGroup);
          if (neck !== "ninguno") {
            if (neck === "bufanda") {
              addAccessoryTube(neckGroup, [[-0.38, -0.3, 0.69], [-0.44, -0.5, 0.73], [-0.28, -0.64, 0.85], [0, -0.67, 0.92], [0.28, -0.64, 0.85], [0.44, -0.5, 0.73], [0.38, -0.3, 0.69]], 0xb92743, 0.1);
              addAccessoryTube(neckGroup, [[-0.25, -0.62, 0.86], [-0.24, -0.79, 0.94], [-0.2, -0.97, 0.95], [-0.17, -1.08, 0.9]], 0xd83c56, 0.09);
              addAccessoryTube(neckGroup, [[-0.13, -0.64, 0.91], [-0.1, -0.8, 0.98], [-0.08, -0.94, 0.98]], 0xef5869, 0.065);
              addAccessoryTube(neckGroup, [[-0.24, -0.8, 1.025], [-0.2, -0.82, 1.03], [-0.17, -0.82, 1.02]], 0xffa3a0, 0.012);
            } else if (neck === "medalla" || neck === "cadena" || neck === "perlas") {
              const pearls = neck === "perlas";
              const chain = neck === "cadena";
              const beadMaterial = accessoryMaterial(pearls ? 0xfff8e8 : 0xffc928, { shininess: pearls ? 115 : 130, specular: 0xffffff });
              const highlightMaterial = accessoryMaterial(pearls ? 0xffffff : 0xfff2a0, { shininess: 140, specular: 0xffffff, emissive: pearls ? 0x3d3421 : 0x573600, emissiveIntensity: 0.08 });
              const count = chain ? 18 : 22;
              const points = [];
              for (let i = 0; i <= count; i++) {
                const t = Math.PI * i / count;
                points.push([Math.cos(t) * (chain ? 0.53 : 0.46), -0.38 - Math.sin(t) * (chain ? 0.48 : 0.4), 0.69 + Math.sin(t) * (chain ? 0.39 : 0.34)]);
              }
              addAccessoryTube(neckGroup, points, pearls ? 0xf4e7c9 : 0x8e5600, chain ? 0.055 : 0.018);
              if (pearls) {
                points.slice(0, -1).forEach((point, index) => addAccessoryOval(neckGroup, index % 4 === 0 ? 0xffffff : 0xfff7e7, point, [0.047, 0.047, 0.04], { shininess: 125, specular: 0xffffff }));
              } else if (chain) {
                for (let i = 0; i < points.length - 1; i++) {
                  const point = points[i];
                  const link = addAccessoryMesh(neckGroup, new THREE.TorusGeometry(0.067, 0.025, 8, 16), accessoryMaterial(i % 2 ? 0xffd84a : 0xf2a900, metal), point);
                  link.rotation.z = i / count * Math.PI * 0.68 - Math.PI * 0.34;
                  link.rotation.x = Math.PI / 2 + Math.sin(i / count * Math.PI) * 0.55;
                }
                addAccessoryOval(neckGroup, 0xd88b00, [0, -0.91, 1.015], [0.2, 0.17, 0.075], metal);
                addAccessoryOval(neckGroup, 0xffd84a, [0, -0.91, 1.07], [0.17, 0.145, 0.065], highlightMaterial);
                addAccessoryTube(neckGroup, [[0.03, -0.8, 1.14], [-0.035, -0.79, 1.15], [-0.09, -0.84, 1.15], [-0.075, -0.89, 1.15], [0.05, -0.91, 1.15], [0.085, -0.96, 1.15], [0.045, -1.02, 1.15], [-0.05, -1.02, 1.15]], 0x8f4d00, 0.014);
                addAccessoryTube(neckGroup, [[0, -0.76, 1.15], [0, -1.06, 1.15]], 0x8f4d00, 0.012);
                addAccessoryOval(neckGroup, 0xffffff, [-0.08, -0.85, 1.157], [0.025, 0.016, 0.009], { emissive: 0xffffff, emissiveIntensity: 0.28 });
              } else {
                const medallion = addAccessoryMesh(neckGroup, new THREE.CylinderGeometry(0.14, 0.14, 0.065, 32), accessoryMaterial(0xffd84a, metal), [0, -0.89, 1.0]);
                medallion.rotation.x = Math.PI / 2;
                addAccessoryOval(neckGroup, 0xfff0a1, [0, -0.89, 1.04], [0.075, 0.075, 0.025], highlightMaterial);
              }
            } else if (neck === "pajarita") {
              [-1, 1].forEach((side) => {
                const wing = addAccessoryOval(neckGroup, 0xc62843, [side * 0.15, -0.56, 1.01], [0.16, 0.1, 0.07]);
                wing.rotation.z = side * -0.35;
                addAccessoryOval(neckGroup, 0xf65c6b, [side * 0.15, -0.53, 1.075], [0.09, 0.035, 0.018]);
              });
              addAccessoryOval(neckGroup, gold, [0, -0.56, 1.08], [0.07, 0.075, 0.045], metal);
            } else if (neck === "capaconde") {
              const shape = new THREE.Shape();
              shape.moveTo(-0.46, 0.28);
              shape.quadraticCurveTo(0, 0.43, 0.46, 0.28);
              shape.lineTo(0.63, -0.62);
              shape.quadraticCurveTo(0, -0.85, -0.63, -0.62);
              shape.closePath();
              addAccessoryMesh(neckGroup, new THREE.ShapeGeometry(shape), accessoryMaterial(0x38245c, { side: THREE.DoubleSide, shininess: 68 }), [0, -0.24, -1.02]);
              addAccessoryTube(neckGroup, [[-0.48, 0.04, -0.99], [0, 0.1, -0.98], [0.48, 0.04, -0.99]], gold, 0.025);
              [-0.28, 0.28].forEach((x) => addAccessoryOval(neckGroup, gold, [x, 0.02, -0.92], [0.05, 0.07, 0.035], metal));
            }
          }
          }

          const back = equipped.back;
          if (back !== syncedBack) {
            syncedBack = back;
            clearAccessoryGroup(backGroup);
            fireWings.length = 0;
            fireEmbers.length = 0;
          if (back === "mochila" || back === "jetpack") {
            const jet = back === "jetpack";
            const shell = jet ? 0x627d91 : 0xe54a57;
            addAccessoryMesh(backGroup, new THREE.BoxGeometry(jet ? 0.5 : 0.72, jet ? 0.62 : 0.78, 0.32), accessoryMaterial(shell, darkMetal), [0, -0.08, -0.82]);
            addAccessoryMesh(backGroup, new THREE.BoxGeometry(jet ? 0.4 : 0.52, 0.29, 0.08), accessoryMaterial(jet ? 0x2d4759 : 0x24bbce, metal), [0, -0.25, -1.015]);
            [-1, 1].forEach((side) => {
              addAccessoryMesh(backGroup, new THREE.BoxGeometry(0.08, 0.7, 0.08), accessoryMaterial(0x4a2e1b), [side * 0.3, -0.04, -1.0]);
              if (jet) {
                addAccessoryMesh(backGroup, new THREE.CylinderGeometry(0.13, 0.16, 0.48, 16), accessoryMaterial(0x9eb5c4, metal), [side * 0.34, -0.02, -1.0]);
                addAccessoryMesh(backGroup, new THREE.CylinderGeometry(0.12, 0.09, 0.18, 16), accessoryMaterial(0x414b56, darkMetal), [side * 0.34, -0.36, -1.0]);
                addAccessoryOval(backGroup, 0x58eaff, [side * 0.34, -0.47, -1.0], [0.08, 0.06, 0.07], { emissive: 0x00bfff, emissiveIntensity: 0.7 });
                addAccessoryOval(backGroup, 0xffd84a, [side * 0.2, 0.18, -1.0], [0.07, 0.07, 0.04], metal);
              }
            });
            if (!jet) {
              addAccessoryMesh(backGroup, new THREE.CylinderGeometry(0.1, 0.1, 0.04, 20), accessoryMaterial(gold, metal), [0, -0.25, -1.07], null, [Math.PI / 2, 0, 0]);
              addAccessoryOval(backGroup, 0xfff1a0, [0, -0.25, -1.1], [0.045, 0.045, 0.02]);
              addAccessoryMesh(backGroup, new THREE.BoxGeometry(0.08, 0.2, 0.08), accessoryMaterial(0x9e2938), [0, 0.43, -0.8]);
            }
          } else if (back === "capa" || back === "alas" || back === "alasfuego" || back === "alasmurcielago") {
            if (back === "capa") {
              const cape = new THREE.Shape();
              cape.moveTo(-0.43, 0.36); cape.quadraticCurveTo(0, 0.48, 0.43, 0.36);
              cape.lineTo(0.7, -0.7); cape.quadraticCurveTo(0, -0.98, -0.7, -0.7); cape.closePath();
              addAccessoryMesh(backGroup, new THREE.ShapeGeometry(cape), accessoryMaterial(0x2672d8, { side: THREE.DoubleSide }), [0, -0.2, -1.02]);
              addAccessoryTube(backGroup, [[-0.45, 0.13, -0.99], [0, 0.19, -0.98], [0.45, 0.13, -0.99]], 0xffd84a, 0.035);
              addAccessoryOval(backGroup, 0xffd84a, [0, 0.11, -0.95], [0.1, 0.1, 0.04], metal);
            } else if (back === "alas") {
              const featherMat = { shininess: 90, specular: 0xffffff };
              [-1, 1].forEach((side) => {
                addAccessoryOval(backGroup, 0xe8e5da, [side * 0.38, 0.12, -0.9], [0.3, 0.2, 0.09], featherMat);
                for (let feather = 0; feather < 6; feather++) {
                  const x = 0.32 + feather * 0.145;
                  const y = 0.22 - feather * 0.09;
                  const plume = addFeather(backGroup, feather % 3 === 0 ? 0xfffdf3 : 0xffffff, [side * x, y, -0.96], [0.13, 0.3 - feather * 0.012, 0.055], side * -0.48, featherMat);
                  plume.rotation.x = side * 0.06;
                }
                for (let feather = 0; feather < 4; feather++) {
                  const x = 0.4 + feather * 0.16;
                  const y = 0.02 - feather * 0.11;
                  addFeather(backGroup, feather % 2 ? 0xfffdf5 : 0xf4f1e8, [side * x, y, -0.88], [0.12, 0.23, 0.05], side * -0.58, featherMat);
                }
                addAccessoryOval(backGroup, 0xffe9a8, [side * 0.23, 0.21, -0.84], [0.12, 0.1, 0.06], { emissive: 0x8c6a20, emissiveIntensity: 0.12, ...metal });
              });
            } else if (back === "alasfuego") {
              const outerShape = new THREE.Shape();
              outerShape.moveTo(0.02, -0.22);
              outerShape.quadraticCurveTo(0.13, 0.17, 0.21, 0.6);
              outerShape.quadraticCurveTo(0.35, 0.43, 0.37, 0.17);
              outerShape.quadraticCurveTo(0.59, 0.43, 0.65, 0.84);
              outerShape.quadraticCurveTo(0.82, 0.63, 0.76, 0.28);
              outerShape.quadraticCurveTo(1.04, 0.45, 1.2, 0.69);
              outerShape.quadraticCurveTo(1.27, 0.2, 0.98, -0.13);
              outerShape.quadraticCurveTo(0.65, -0.4, 0.02, -0.22);
              const innerShape = new THREE.Shape();
              innerShape.moveTo(0.05, -0.17);
              innerShape.quadraticCurveTo(0.23, 0.11, 0.29, 0.43);
              innerShape.quadraticCurveTo(0.48, 0.27, 0.55, 0.65);
              innerShape.quadraticCurveTo(0.73, 0.42, 0.68, 0.13);
              innerShape.quadraticCurveTo(0.94, 0.25, 1.06, 0.5);
              innerShape.quadraticCurveTo(1.06, 0.03, 0.76, -0.18);
              innerShape.quadraticCurveTo(0.39, -0.32, 0.05, -0.17);
              const coreShape = new THREE.Shape();
              coreShape.moveTo(0.09, -0.12);
              coreShape.quadraticCurveTo(0.26, 0.05, 0.34, 0.3);
              coreShape.quadraticCurveTo(0.49, 0.19, 0.56, 0.43);
              coreShape.quadraticCurveTo(0.67, 0.21, 0.57, -0.08);
              coreShape.quadraticCurveTo(0.34, -0.22, 0.09, -0.12);
              [-1, 1].forEach((side) => {
                const wing = new THREE.Group();
                wing.position.set(side * 0.2, 0.03, -0.9);
                wing.scale.x = side;
                backGroup.add(wing);
                fireWings.push({ group: wing, side });
                addAccessoryMesh(wing, new THREE.ShapeGeometry(outerShape), accessoryMaterial(0xa92120, { side: THREE.DoubleSide, emissive: 0x541010, emissiveIntensity: 0.38 }), [0, 0, 0]);
                addAccessoryMesh(wing, new THREE.ShapeGeometry(innerShape), accessoryMaterial(0xf0441f, { side: THREE.DoubleSide, emissive: 0xb62e08, emissiveIntensity: 0.48 }), [0, 0, 0.012]);
                addAccessoryMesh(wing, new THREE.ShapeGeometry(coreShape), accessoryMaterial(0xffa51e, { side: THREE.DoubleSide, emissive: 0xff5a0a, emissiveIntensity: 0.55 }), [0, 0, 0.024]);
                for (let ember = 0; ember < 3; ember++) {
                  const y = 0.05 + ember * 0.22;
                  const spark = addAccessoryOval(wing, ember === 1 ? 0xffe46b : 0xff7730, [0.43 + ember * 0.24, y, 0.04], [0.025, 0.045, 0.02], { emissive: 0xff3c08, emissiveIntensity: 0.9 });
                  fireEmbers.push({ mesh: spark, baseY: y, phase: ember * 2.1 + side });
                }
              });
            } else {
              const bat = back === "alasmurcielago";
              [-1, 1].forEach((side) => {
                const baseColor = 0x372246;
                addAccessoryOval(backGroup, baseColor, [side * 0.52, 0.14, -0.94], [0.5, 0.27, 0.12], { ...darkMetal, side: THREE.DoubleSide });
                for (let feather = 0; feather < 5; feather++) {
                  const x = side * (0.4 + feather * 0.19);
                  const y = 0.15 - feather * 0.14;
                  const featherColor = feather % 2 ? 0x4b2c65 : 0x271832;
                  const piece = addFeather(backGroup, featherColor, [x, y, -0.94], [0.17, 0.29, 0.07], side * -0.38);
                  if (bat) piece.scale.y *= 1 + feather * 0.04;
                }
                for (let rib = 0; rib < 4; rib++) {
                  const endX = side * (0.38 + rib * 0.19);
                  addAccessoryTube(backGroup, [[side * 0.18, 0.22, -0.88], [side * (0.32 + rib * 0.035), 0.12 - rib * 0.11, -0.9], [endX, -0.25 - rib * 0.06, -0.92]], 0xa889b5, 0.012);
                }
              });
            }
          }
          }

          const feet = equipped.feet;
          if (feet !== syncedFeet) {
            syncedFeet = feet;
            clearAccessoryGroup(feetGroup);
          if (feet === "zapas" || feet === "botas" || feet === "patines" || feet === "humovioleta") {
            [-1, 1].forEach((side) => {
              const x = side * 0.27;
              if (feet === "humovioleta") {
                addBand(feetGroup, 0x7a39bf, [x, -1.15, 0.25], 0.085, 0.035, 0);
                for (let puff = 0; puff < 3; puff++) {
                  addAccessoryOval(feetGroup, 0x9c66d9, [x + side * (0.08 + puff * 0.035), -1.12 - puff * 0.09, 0.25], [0.08 + puff * 0.015, 0.07, 0.07], { transparent: true, opacity: 0.48, emissive: 0x6125a5, emissiveIntensity: 0.22 });
                }
              } else {
                const boot = feet === "botas";
                const skate = feet === "patines";
                const shoeColor = boot ? 0x75452e : skate ? 0x4cc8e8 : 0xd94b4b;
                addAccessoryMesh(feetGroup, new THREE.BoxGeometry(0.34, boot ? 0.28 : 0.18, 0.38), accessoryMaterial(shoeColor, boot ? {} : metal), [x, -1.19, 0.31]);
                addAccessoryMesh(feetGroup, new THREE.BoxGeometry(0.37, 0.07, 0.42), accessoryMaterial(boot ? 0x34251f : 0xf4e7ce), [x, -1.31, 0.34]);
                if (boot) {
                  addAccessoryMesh(feetGroup, new THREE.CylinderGeometry(0.1, 0.12, 0.28, 16), accessoryMaterial(0x633a2a), [x, -1.08, 0.23]);
                  [-0.06, 0.02, 0.1].forEach((dy) => addAccessoryTube(feetGroup, [[x - 0.11, -1.18 + dy, 0.51], [x, -1.18 + dy, 0.53], [x + 0.11, -1.18 + dy, 0.51]], 0xf3d7ac, 0.012));
                } else if (skate) {
                  addAccessoryMesh(feetGroup, new THREE.BoxGeometry(0.27, 0.05, 0.32), accessoryMaterial(0x435767, darkMetal), [x, -1.36, 0.34]);
                  [-0.1, 0.1].forEach((z) => {
                    const wheel = addAccessoryMesh(feetGroup, new THREE.CylinderGeometry(0.07, 0.07, 0.05, 16), accessoryMaterial(0x384957, darkMetal), [x + side * 0.18, -1.35, 0.34 + z]);
                    wheel.rotation.z = Math.PI / 2;
                  });
                  addAccessoryTube(feetGroup, [[x - 0.08, -1.08, 0.48], [x, -1.1, 0.54], [x + 0.08, -1.08, 0.48]], 0xffffff, 0.018);
                } else {
                  addAccessoryOval(feetGroup, 0xffffff, [x, -1.17, 0.51], [0.16, 0.045, 0.025]);
                  [-0.05, 0.05].forEach((offset) => addAccessoryTube(feetGroup, [[x + offset, -1.14, 0.53], [x + offset, -1.21, 0.53]], 0xffd84a, 0.012));
                }
              }
            });
          }
          }
        };
        syncCharacter();
        const appearanceObserver = new MutationObserver(syncCharacter);
        appearanceObserver.observe(chick, { attributes: true, attributeFilter: ["class", "style"] });
        appearanceObserver.observe(svg, { attributes: true, subtree: true });
        chick.classList.add("is-3d");

        let dragging = false;
        let activePointer = null;
        let previousX = 0;
        let velocity = 0;
        let lastInteraction = Date.now();
        let dragged = false;
        let suppressClick = false;

        canvas.addEventListener("pointerdown", (event) => {
          if (dragging || (event.pointerType === "mouse" && event.button !== 0)) return;
          dragging = true;
          activePointer = event.pointerId;
          previousX = event.clientX;
          velocity = 0;
          dragged = false;
          lastInteraction = Date.now();
        });
        window.addEventListener("pointermove", (event) => {
          if (!dragging || event.pointerId !== activePointer) return;
          const deltaX = event.clientX - previousX;
          if (Math.abs(deltaX) > 4) dragged = true;
          spinGroup.rotation.y += deltaX * 0.012;
          velocity = deltaX * 0.012;
          previousX = event.clientX;
          lastInteraction = Date.now();
        });
        const stopDrag = (event) => {
          if (!dragging || event.pointerId !== activePointer) return;
          dragging = false;
          activePointer = null;
          if (dragged) {
            suppressClick = true;
            setTimeout(() => { suppressClick = false; }, 0);
          }
        };
        window.addEventListener("pointerup", stopDrag);
        window.addEventListener("pointercancel", stopDrag);
        canvas.addEventListener("click", (event) => {
          if (!suppressClick) return;
          event.preventDefault();
          event.stopImmediatePropagation();
          suppressClick = false;
        }, true);

        const animate = (now) => {
          requestAnimationFrame(animate);
          if (!dragging) {
            spinGroup.rotation.y += velocity;
            velocity *= 0.92;
            if (Date.now() - lastInteraction > 3000) {
              const target = Math.round(spinGroup.rotation.y / (Math.PI * 2)) * Math.PI * 2;
              spinGroup.rotation.y += (target - spinGroup.rotation.y) * 0.05;
            }
          }
          rig.position.y = Math.sin(now * 0.004) * 0.035;
          fireWings.forEach(({ group, side }) => {
            group.rotation.z = side * (0.025 + Math.sin(now * 0.006 + side) * 0.035);
            group.scale.y = 1 + Math.sin(now * 0.008 + side) * 0.025;
          });
          fireEmbers.forEach(({ mesh, baseY, phase }) => {
            mesh.position.y = baseY + Math.sin(now * 0.004 + phase) * 0.035;
          });
          if (chick.classList.contains("rainbow")) {
            body.material.color.setHSL((now % 5000) / 5000, 0.85, 0.58);
          }
          renderer.render(scene, camera);
          if (introRenderer && introCanvas) {
            if (introCanvas.isConnected) {
              introRenderer.render(scene, camera);
            } else {
              introRenderer.dispose();
              introRenderer = null;
              introCanvas = null;
            }
          }
        };
        requestAnimationFrame(animate);
      } catch (error) {
        console.warn("No se pudo inicializar el modelo 3D; se mantiene el Ricopio SVG:", error);
      }
    }

    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", safeInit3D, { once: true });
    } else {
      safeInit3D();
    }
