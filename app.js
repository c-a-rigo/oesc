"use strict";
const paths = {
  grid: '<rect x="3" y="3" width="7" height="7" rx="1.5"/><rect x="14" y="3" width="7" height="7" rx="1.5"/><rect x="3" y="14" width="7" height="7" rx="1.5"/><rect x="14" y="14" width="7" height="7" rx="1.5"/>',
  orbit:
    '<circle cx="12" cy="12" r="3"/><ellipse cx="12" cy="12" rx="11" ry="5" transform="rotate(-35 12 12)"/><path d="M9 3a9 9 0 0 1 12 12M15 21A9 9 0 0 1 3 9"/>',
  network:
    '<circle cx="12" cy="5" r="3"/><circle cx="5" cy="19" r="3"/><circle cx="19" cy="19" r="3"/><path d="m10 8-4 8m8-8 4 8M8 19h8"/>',
  layers:
    '<path d="m12 3 10 5-10 5L2 8Z"/><path d="m2 12 10 5 10-5M2 16l10 5 10-5"/>',
  map: '<path d="m3 6 6-3 6 3 6-3v15l-6 3-6-3-6 3Z"/><path d="M9 3v15M15 6v15"/>',
  box: '<path d="m12 3 9 5v9l-9 5-9-5V8Z"/><path d="m3 8 9 5 9-5M12 13v9M7.5 5.5l9 5"/>',
  route:
    '<circle cx="6" cy="5" r="3"/><circle cx="18" cy="19" r="3"/><path d="M6 8v7a4 4 0 0 0 4 4h5M18 16V9a4 4 0 0 0-4-4h-3"/>',
  spark:
    '<path d="m12 3 2.5 6.5L21 12l-6.5 2.5L12 21l-2.5-6.5L3 12l6.5-2.5Z"/>',
  arrowUpRight: '<path d="M6 18 18 6M6 6h12v12"/>',
  arrow: '<path d="M4 12h16m-6-6 6 6-6 6"/>',
  chevron: '<path d="m9 5 7 7-7 7"/>',
  down: '<path d="m6 9 6 6 6-6"/>',
  search: '<circle cx="10.5" cy="10.5" r="7"/><path d="m16 16 5 5"/>',
  panel: '<rect x="3" y="4" width="18" height="16" rx="2"/><path d="M9 4v16"/>',
  close: '<path d="m6 6 12 12M6 18 18 6"/>',
  download: '<path d="M12 3v12m-5-5 5 5 5-5M4 16v5h16v-5"/>',
  users:
    '<circle cx="9" cy="7" r="4"/><path d="M2 21v-3a7 7 0 0 1 14 0v3m1-18a4 4 0 0 1 0 8m2 4a6 6 0 0 1 3 5"/>',
  clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
  info: '<circle cx="12" cy="12" r="9"/><path d="M12 11v6M12 7h.01"/>',
  rocket:
    '<path d="M14 4c3-2 6-1 7-1 0 1 1 4-1 7l-8 8-6-6Z"/><circle cx="16" cy="8" r="2"/><path d="m7 11-4 1 1-6 6-1m3 12-1 4 6-1 1-6M7 17l-4 4m1-5-2 2m6 2-2 2"/>',
  planet:
    '<circle cx="12" cy="12" r="8"/><path d="M4 10c-6 5 0 9 9 4s13-9 7-8M7 6l3 3-1 3 4 2 1 5"/>',
  antenna:
    '<path d="M5 5a10 10 0 0 0 14 14L5 5Zm7 7 6-6M14 4l6 6M9 19l-2 3m8-3 2 3M3 2l19 20"/>',
  data: '<path d="m8 5-6 7 6 7m8-14 6 7-6 7M14 3l-4 18"/>',
  chart: '<path d="M3 3v18h18M7 16l4-5 4 2 5-7"/>',
  globe:
    '<circle cx="12" cy="12" r="9"/><ellipse cx="12" cy="12" rx="4" ry="9"/><path d="M3 12h18"/>',
};
const icon = (name) =>
  `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${paths[name] || paths.grid}</svg>`;
function hydrateIcons(root = document) {
  root.querySelectorAll("[data-icon]").forEach((el) => {
    el.innerHTML = icon(el.dataset.icon);
  });
}
const sections = [
  {
    id: "overview",
    name: "Visão geral",
    icon: "grid",
    eyebrow: "PAINEL DO OBSERVATÓRIO",
    description: "Um novo olhar para a economia espacial de Santa Catarina.",
  },
  {
    id: "network",
    name: "Rede OESC",
    icon: "network",
    eyebrow: "CONEXÕES QUE TRANSFORMAM",
    description:
      "Universidades, empresas, governo e sociedade em uma mesma órbita.",
  },
  {
    id: "areas",
    name: "Áreas de interesse",
    icon: "layers",
    eyebrow: "COMPETÊNCIAS E APLICAÇÕES",
    description: "Explore as conexões entre o espaço e os setores da economia.",
  },
  {
    id: "regions",
    name: "Território",
    icon: "map",
    eyebrow: "PRESENÇA ESTADUAL",
    description: "Diferentes regiões. Um ecossistema de possibilidades.",
  },
  {
    id: "deliverables",
    name: "Entregas",
    icon: "box",
    eyebrow: "DO CONHECIMENTO À AÇÃO",
    description:
      "Os instrumentos previstos para apoiar decisões e novas conexões.",
  },
  {
    id: "roadmap",
    name: "Roadmap",
    icon: "route",
    eyebrow: "HORIZONTE DO PROJETO",
    description: "Da mobilização à consolidação de uma rede permanente.",
  },
  {
    id: "opportunities",
    name: "Oportunidades",
    icon: "spark",
    eyebrow: "FAÇA PARTE",
    description:
      "Encontre caminhos para participar da economia espacial catarinense.",
  },
];
const areas = [
  {
    name: "Sistemas espaciais",
    full: "Sistemas Espaciais, Indústria e Infraestrutura",
    icon: "rocket",
    color: "blue",
    category: "upstream",
    tags: ["Sistemas embarcados", "Manufatura", "Sensores"],
    description:
      "Da eletrônica às estações de solo: capacidades para desenvolver a infraestrutura espacial.",
  },
  {
    name: "Terra, clima e recursos",
    full: "Terra, Clima e Recursos Naturais",
    icon: "planet",
    color: "green",
    category: "downstream",
    tags: ["Agricultura", "Economia do mar", "Defesa civil"],
    description:
      "Dados espaciais a serviço dos recursos naturais, do território e da resiliência climática.",
  },
  {
    name: "Conectividade e IoT",
    full: "Conectividade, IoT e Infraestrutura Territorial",
    icon: "antenna",
    color: "purple",
    category: "downstream",
    tags: ["Telecomunicações", "GNSS", "Mobilidade"],
    description:
      "Conexões para aproximar pessoas, monitorar ativos e integrar territórios.",
  },
  {
    name: "Dados e inteligência",
    full: "Dados, IA e Inteligência Geoespacial",
    icon: "data",
    color: "orange",
    category: "enabling",
    tags: ["Inteligência artificial", "GIS", "Sensoriamento remoto"],
    description:
      "Transformação de dados em conhecimento para resolver desafios reais.",
  },
  {
    name: "Economia e inovação",
    full: "Economia, Inovação, Mercado e Políticas Públicas",
    icon: "chart",
    color: "pink",
    category: "enabling",
    tags: ["Startups", "Investimentos", "Políticas públicas"],
    description:
      "Novos negócios, cadeias de valor e políticas para desenvolver o setor.",
  },
];
const regions = [
  "Oeste Catarinense",
  "Norte Catarinense",
  "Serrana",
  "Vale do Itajaí",
  "Grande Florianópolis",
  "Sul Catarinense",
];
const deliverables = [
  [
    "Atlas da Economia Espacial",
    "map",
    "Uma visão integrada das competências, estruturas e oportunidades do estado.",
  ],
  [
    "Censo Estadual do Setor Espacial",
    "users",
    "Um retrato dos atores, laboratórios e talentos do ecossistema.",
  ],
  [
    "Plataforma Digital OESC",
    "data",
    "Um ponto de acesso a dados, mapas e indicadores do setor.",
  ],
  [
    "Roadmap Estadual",
    "route",
    "Prioridades e caminhos para o desenvolvimento da economia espacial.",
  ],
  [
    "Carteira de Projetos Prioritários",
    "box",
    "Oportunidades para orientar pesquisa, cooperação e investimento.",
  ],
  [
    "Rede Catarinense",
    "network",
    "Conexões duradouras entre pesquisa, setor produtivo e sociedade.",
  ],
];
const phases = [
  [
    "Mobilizar",
    "M1–M3",
    "Governança, formação da equipe e desenho da plataforma.",
  ],
  [
    "Mapear",
    "M2–M10",
    "Levantamento de atores, infraestrutura, demandas e competências.",
  ],
  [
    "Entender",
    "M8–M18",
    "Diagnóstico e investigação das conexões e tendências do setor.",
  ],
  [
    "Priorizar e demonstrar",
    "M12–M24",
    "Cenários, projetos prioritários e provas de conceito.",
  ],
  [
    "Consolidar",
    "M20–M26",
    "Plataforma pública, disseminação e continuidade da rede.",
  ],
];
const institutions = [
  "UFSC",
  "UNIVALI",
  "UDESC",
  "IFSC",
  "UNIFA",
  "UnB",
  "SATC",
  "ANATEL",
  "Webphy",
  "Instituto START",
  "Univ. Montpellier",
];
const state = { section: "overview", area: "all", region: "", view: "map" };
const main = document.querySelector("main");
const link = (href, label, cls = "text-link") =>
  `<a class="${cls}" href="${href}" target="_blank" rel="noopener">${label}${icon("arrowUpRight")}</a>`;
const sectionLink = (id, label) =>
  `<a class="text-link" href="#${id}">${label}${icon("arrow")}</a>`;
const panelHeading = (eyebrow, title, action = "") =>
  `<div class="panel-heading"><div><span class="eyebrow">${eyebrow}</span><h2>${title}</h2></div>${action}</div>`;
function stats() {
  return `<div class="stats-grid">${[
    [
      "Equipe do projeto",
      "48",
      "pesquisadores e profissionais",
      "users",
      "blue",
    ],
    [
      "Áreas de interesse",
      "05",
      "comunidades de conhecimento",
      "layers",
      "purple",
    ],
    [
      "Eixos de execução",
      "06",
      "frentes integradas de atuação",
      "orbit",
      "green",
    ],
    ["Horizonte de execução", "26", "meses no planejamento", "clock", "orange"],
  ]
    .map(
      ([title, value, note, glyph, color]) =>
        `<article class="stat-card"><div class="stat-label">${title}<span class="icon-tile ${color}">${icon(glyph)}</span></div><div class="stat-value">${value}<span>${title === "Horizonte de execução" ? "meses" : ""}</span></div><p>${note}</p></article>`,
    )
    .join("")}</div>`;
}
function mapPanel(full = false) {
  return `<section class="panel map-panel">${panelHeading("INTELIGÊNCIA TERRITORIAL", full ? "O observatório em todo o estado" : "Um estado, muitas possibilidades", `<div class="segmented" aria-label="Visualização territorial"><button data-map-view="map" class="${state.view === "map" ? "selected" : ""}" aria-pressed="${state.view === "map"}">${icon("map")} Mapa</button><button data-map-view="list" class="${state.view === "list" ? "selected" : ""}" aria-pressed="${state.view === "list"}">${icon("layers")} Regiões</button></div>`)}<div class="map-intro"><span><span class="status-dot"></span> Abrangência estadual</span><span>6 mesorregiões</span></div><div class="map-stage ${state.view === "list" ? "list-view" : ""}">${state.view === "map" ? `<span class="map-coordinate">27° S &nbsp; 50° O</span><img src="assets/mapasc.png" alt="Santa Catarina dividida em seis mesorregiões: Oeste, Norte, Serrana, Vale do Itajaí, Grande Florianópolis e Sul."><span class="map-compass">N<br>↑</span><span class="map-watermark">SANTA CATARINA</span>` : `<div class="region-list">${regions.map((r, i) => `<button data-region="${r}" class="region-row ${state.region === r ? "active" : ""}"><span class="region-number">0${i + 1}</span><span>${r}</span>${icon("arrowUpRight")}</button>`).join("")}</div>`}</div><div class="map-bottom"><div><span class="legend-dot"></span><span>Território de abrangência do projeto</span></div>${sectionLink("regions", "Explorar território")}</div>${full ? `<div class="region-filter"><label for="region-select">Explorar uma mesorregião</label><select id="region-select"><option value="">Todas as mesorregiões</option>${regions.map((r) => `<option ${state.region === r ? "selected" : ""}>${r}</option>`).join("")}</select><div id="region-detail" aria-live="polite">${regionDetail()}</div></div>` : ""}</section>`;
}
function regionDetail() {
  return `<strong>${state.region || "Cobertura estadual"}</strong><p>${state.region ? "Esta mesorregião integra a abrangência prevista do OESC. O levantamento de atores e competências será realizado durante o mapeamento." : "O mapeamento previsto contempla as seis mesorregiões catarinenses. Indicadores locais serão disponibilizados após a coleta e validação dos dados."}</p>`;
}
function opportunities(compact = false) {
  return `<section class="panel opportunities-panel">${panelHeading("FIQUE POR DENTRO", compact ? "No radar" : "Conecte-se ao OESC", compact ? sectionLink("opportunities", "Ver tudo") : "")}<div class="opportunity-card"><div class="opportunity-meta"><span class="badge blue">BOLSAS</span><span>Seleção do projeto</span></div><h3>Talentos para a nova economia espacial</h3><p>O edital do OESC prevê 41 bolsas nas modalidades IC, DTI-B e DTI-A.</p>${link("https://oesc.ufsc.br/oportunidades.html#bolsas", "Consultar edital e resultados")}</div><div class="opportunity-card"><div class="opportunity-meta"><span class="badge green">REDE OESC</span><span>Canal permanente</span></div><h3>Sua competência também tem espaço aqui.</h3><p>Registre seu interesse e descubra possibilidades de colaboração.</p>${link("https://oesc.ufsc.br/participar.html", "Conhecer formas de participação")}</div><div class="radar-note">${icon("info")} Consulte prazos e situação no site oficial.</div></section>`;
}
function areaCards(compact = false) {
  const list = areas.filter(
    (a) => compact || state.area === "all" || a.category === state.area,
  );
  return `<div class="areas-grid ${compact ? "compact" : ""}">${list.map((a, i) => `<button class="area-card" data-area-detail="${areas.indexOf(a)}"><span class="icon-tile ${a.color}">${icon(a.icon)}</span><span class="area-card-title">${a.name}</span>${!compact ? `<span class="area-description">${a.description}</span>` : `<span class="area-subtitle">${a.tags.slice(0, 2).join(" · ")}</span>`}<span class="area-arrow">${icon("arrowUpRight")}</span></button>`).join("")}</div>`;
}
function roadmap(compact = false) {
  return `<section class="panel roadmap-panel">${panelHeading("DA VISÃO À REALIZAÇÃO", "O caminho do projeto", compact ? sectionLink("roadmap", "Ver roadmap") : '<span class="badge neutral">Planejamento · 26 meses</span>')}<div class="timeline">${phases.map(([name, months, desc], i) => `<article class="phase"><div class="phase-dot">${String(i + 1).padStart(2, "0")}</div><span class="phase-month">${months}</span><h3>${name}</h3>${!compact ? `<p>${desc}</p>` : ""}</article>`).join("")}</div>${!compact ? '<div class="notice">O cronograma apresenta janelas previstas de execução. Não representa acompanhamento de progresso ou etapas concluídas.</div>' : ""}</section>`;
}
function overview() {
  return `<section class="welcome-banner"><div class="welcome-content"><span class="hero-eyebrow"><span class="status-dot"></span> CONHECIMENTO QUE CONECTA</span><h2>O futuro espacial também<br>começa em Santa Catarina.</h2><p>Competências locais. Conexões estratégicas.<br>Novas possibilidades para todo o ecossistema.</p><a class="button button-light" href="#network">Conheça a rede OESC ${icon("arrow")}</a></div><div class="orbit-art" aria-hidden="true"><div class="orbit-ring ring-one"></div><div class="orbit-ring ring-two"></div><div class="orbit-ring ring-three"></div><div class="planet-core"></div><span class="orbital-point point-one"></span><span class="orbital-point point-two"></span><span class="orbital-point point-three"></span><span class="orbit-caption">MAPEAR. CONECTAR. TRANSFORMAR.</span></div><span class="hero-index">SC / BR &nbsp; — &nbsp; NEW SPACE</span></section>${stats()}<div class="overview-grid">${mapPanel()}${opportunities(true)}</div><section class="areas-section">${panelHeading("UM ECOSSISTEMA MULTIDISCIPLINAR", "Onde o espaço encontra a economia", sectionLink("areas", "Explorar áreas"))}${areaCards(true)}</section>${roadmap(true)}<div class="source-note">${icon("info")} Números e conteúdos do projeto publicados pelo OESC. Dados do censo e indicadores do ecossistema aguardam mapeamento.</div>`;
}
function network() {
  return `<div class="intro-card"><span class="icon-tile blue">${icon("network")}</span><div><h2>Uma rede de conhecimento. Muitas perspectivas.</h2><p>Uma articulação multidisciplinar coordenada pelo SpaceLab da Universidade Federal de Santa Catarina.</p></div>${link("https://oesc.ufsc.br/participar.html", "Integrar a rede", "button button-primary")}</div>${stats()}<section class="panel">${panelHeading("EQUIPE E ARTICULAÇÃO", "Instituições representadas")}<p class="panel-description">Instituições e organizações citadas na apresentação pública da equipe do projeto.</p><div class="institution-grid">${institutions.map((name, i) => `<article class="institution-card"><span class="institution-initial ${i === 0 ? "lead" : ""}">${name === "Univ. Montpellier" ? "UM" : name.slice(0, 2).toUpperCase()}</span><div><h3>${name}</h3><p>${i === 0 ? "Instituição líder · SpaceLab" : "Representação na equipe"}</p></div></article>`).join("")}</div></section><div class="notice">Este diretório apresenta as instituições mencionadas pelo site oficial; não representa um censo completo de organizações do setor.</div>`;
}
function areaPage() {
  return `<div class="filterbar"><div class="tabs" role="group" aria-label="Filtrar áreas por aplicação">${[
    ["all", "Todas as áreas"],
    ["upstream", "Upstream"],
    ["downstream", "Downstream"],
    ["enabling", "Tecnologias e negócios"],
  ]
    .map(
      ([id, name]) =>
        `<button data-area-filter="${id}" class="${state.area === id ? "selected" : ""}" aria-pressed="${state.area === id}">${name}</button>`,
    )
    .join(
      "",
    )}</div><span class="result-count">${areas.filter((a) => state.area === "all" || a.category === state.area).length} áreas</span></div><p class="panel-description">Explore as cinco comunidades iniciais de interesse. A organização por aplicação abaixo é uma navegação editorial deste painel.</p>${areaCards()}<section class="open-areas"><span class="icon-tile green">${icon("spark")}</span><div><h2>As próximas conexões ainda estão por descobrir.</h2><p>O mapeamento pode revelar novas competências e ampliar as áreas de interesse do observatório.</p></div>${link("https://oesc.ufsc.br/participar.html", "Compartilhar meu interesse")}</section>`;
}
function deliveryPage() {
  return `<div class="delivery-grid">${deliverables.map(([name, glyph, description], i) => `<article class="panel delivery-card"><div class="delivery-top"><span class="icon-tile ${["blue", "purple", "green", "orange", "pink", "blue"][i]}">${icon(glyph)}</span><span class="badge neutral">Entrega prevista</span></div><span class="eyebrow">0${i + 1} / ENTREGAS DO PROJETO</span><h2>${name}</h2><p>${description}</p></article>`).join("")}</div><div class="notice">As entregas são previstas no projeto. A apresentação neste painel não indica que já estejam publicadas.</div>`;
}
function render() {
  const current = sections.find((s) => s.id === state.section) || sections[0];
  document.title = `${current.name} · OESC`;
  document.querySelector("#breadcrumb-title").textContent = current.name;
  document.querySelector("#navigation").innerHTML = sections
    .map(
      (s, i) =>
        `${i === 6 ? '<p class="nav-label secondary-label">PARTICIPAR</p>' : ""}<a href="#${s.id}" class="nav-item ${s.id === current.id ? "active" : ""}" ${s.id === current.id ? 'aria-current="page"' : ""}>${icon(s.icon)}<span>${s.name}</span>${s.id === "opportunities" ? '<span class="nav-new"></span>' : ""}</a>`,
    )
    .join("");
  main.innerHTML = `<div class="page-heading"><div><span class="eyebrow">${current.eyebrow}</span><h1>${current.name}<span class="heading-dot">.</span></h1><p>${current.description}</p></div><div class="page-actions"><span class="public-badge">${icon("globe")} Painel público</span><button class="button button-outline" id="export-button">${icon("download")} Exportar resumo</button></div></div>${{ overview, network, areas: areaPage, regions: () => `${mapPanel(true)}<div class="notice">A divisão em mesorregiões segue a apresentação territorial do projeto no site OESC. O mapa não representa densidade de atores ou cobertura de coleta.</div>`, deliverables: deliveryPage, roadmap: () => roadmap(false), opportunities: () => opportunities(false) }[current.id]()}`;
  hydrateIcons();
}
function navigate() {
  state.section = sections.some((s) => s.id === location.hash.slice(1))
    ? location.hash.slice(1)
    : "overview";
  render();
  closeMenu();
}
function closeMenu() {
  document.body.classList.remove("menu-open");
  updateMenuAria();
}
function updateMenuAria() {
  document
    .querySelector("#menu-toggle")
    .setAttribute(
      "aria-expanded",
      String(
        innerWidth <= 900
          ? document.body.classList.contains("menu-open")
          : !document.body.classList.contains("sidebar-collapsed"),
      ),
    );
}
window.addEventListener("hashchange", () => {
  navigate();
  window.scrollTo({ top: 0 });
  main.focus({ preventScroll: true });
});
window.addEventListener("resize", updateMenuAria);
document.querySelector("#menu-toggle").addEventListener("click", () => {
  document.body.classList.toggle(
    innerWidth <= 900 ? "menu-open" : "sidebar-collapsed",
  );
  updateMenuAria();
});
document.querySelector("#backdrop").addEventListener("click", closeMenu);
document.querySelector("#navigation").addEventListener("click", (event) => {
  if (event.target.closest("a")) closeMenu();
});
function escapeHtml(value) {
  const span = document.createElement("span");
  span.textContent = value;
  return span.innerHTML;
}
function showArea(index) {
  const a = areas[index];
  if (!a) return;
  const dialog = document.createElement("dialog");
  dialog.className = "area-dialog";
  dialog.innerHTML = `<div class="dialog-heading"><span class="icon-tile ${a.color}">${icon(a.icon)}</span><button class="icon-button" aria-label="Fechar detalhes">${icon("close")}</button></div><span class="eyebrow">ÁREA DE INTERESSE</span><h2>${a.full}</h2><p>${a.description}</p><div class="tags">${a.tags.map((t) => `<span>${t}</span>`).join("")}</div><div class="notice">Uma comunidade inicial de interesse do OESC. Organizações e competências serão identificadas pelo mapeamento.</div>${link("https://oesc.ufsc.br/participar.html", "Quero me conectar", "button button-primary")}`;
  document.body.append(dialog);
  dialog
    .querySelector("button")
    .addEventListener("click", () => dialog.close());
  dialog.addEventListener("close", () => dialog.remove());
  dialog.showModal();
}
function exportSummary() {
  const data = {
    fonte: "https://oesc.ufsc.br/",
    natureza:
      "Resumo de informações públicas do projeto; não é um censo do ecossistema.",
    equipe: 48,
    areas: areas.map((a) => a.full),
    eixos: 6,
    horizonte_meses: 26,
    instituicoes_mencionadas: institutions,
    mesorregioes: regions,
    entregas_previstas: deliverables.map((d) => d[0]),
    fases_planejadas: phases.map(([nome, janela, descricao]) => ({
      nome,
      janela,
      descricao,
    })),
  };
  const url = URL.createObjectURL(
    new Blob([JSON.stringify(data, null, 2)], {
      type: "application/json;charset=utf-8",
    }),
  );
  const a = document.createElement("a");
  a.href = url;
  a.download = "oesc-resumo-projeto.json";
  a.click();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
  const toast = document.querySelector("#toast");
  toast.textContent = "Resumo do projeto exportado em JSON.";
  toast.classList.add("visible");
  clearTimeout(exportSummary.timer);
  exportSummary.timer = setTimeout(
    () => toast.classList.remove("visible"),
    3500,
  );
}
main.addEventListener("click", (event) => {
  const filter = event.target.closest("[data-area-filter]");
  if (filter) {
    state.area = filter.dataset.areaFilter;
    render();
    main.querySelector(`[data-area-filter="${state.area}"]`).focus();
  }
  const detail = event.target.closest("[data-area-detail]");
  if (detail) showArea(Number(detail.dataset.areaDetail));
  const mapView = event.target.closest("[data-map-view]");
  if (mapView) {
    state.view = mapView.dataset.mapView;
    render();
    main.querySelector(`[data-map-view="${state.view}"]`).focus();
  }
  const region = event.target.closest("[data-region]");
  if (region) {
    state.region = region.dataset.region;
    if (state.section !== "regions") location.hash = "regions";
    else {
      render();
      main.querySelector(`[data-region="${state.region}"]`).focus();
    }
  }
  if (event.target.closest("#export-button")) exportSummary();
});
main.addEventListener("change", (event) => {
  if (event.target.id === "region-select") {
    state.region = event.target.value;
    document.querySelector("#region-detail").innerHTML = regionDetail();
  }
});
const searchDialog = document.querySelector("#search-dialog");
const searchInput = document.querySelector("#global-search");
const searchEntries = [
  ...sections.map((s) => ({
    title: s.name,
    description: s.description,
    section: s.id,
  })),
  ...areas.map((a) => ({
    title: a.full,
    description: a.tags.join(" · "),
    section: "areas",
  })),
  ...deliverables.map((d) => ({
    title: d[0],
    description: d[2],
    section: "deliverables",
  })),
];
function search() {
  const normalize = (text) =>
    text
      .toLocaleLowerCase("pt-BR")
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "");
  const query = normalize(searchInput.value.trim());
  const results = searchEntries.filter((e) =>
    normalize(`${e.title} ${e.description}`).includes(query),
  );
  document.querySelector("#search-results").innerHTML = results.length
    ? results
        .map(
          (e) =>
            `<a class="search-result" href="#${e.section}"><span><strong>${escapeHtml(e.title)}</strong><small>${escapeHtml(e.description)}</small></span>${icon("arrow")}</a>`,
        )
        .join("")
    : '<p class="empty-state">Nenhum resultado. Tente “dados”, “rede” ou “roadmap”.</p>';
}
function openSearch() {
  searchInput.value = "";
  search();
  searchDialog.showModal();
  searchInput.focus();
}
document.querySelector("#open-search").addEventListener("click", openSearch);
document
  .querySelector("#close-search")
  .addEventListener("click", () => searchDialog.close());
searchInput.addEventListener("input", search);
document.querySelector("#search-results").addEventListener("click", (event) => {
  if (event.target.closest("a")) searchDialog.close();
});
document.addEventListener("keydown", (event) => {
  if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
    event.preventDefault();
    if (!document.querySelector("dialog[open]")) openSearch();
  }
  if (event.key === "Escape") closeMenu();
});
navigate();
