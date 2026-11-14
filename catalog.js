const normalize = (value) =>
  value
    .toLocaleLowerCase("pt-BR")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
export function renderCatalogSnapshot(dataset, { escapeHtml: e, icon }) {
  const total = dataset.companies.length;
  const documented = dataset.companies.filter(
    (c) => c.status === "documented",
  ).length;
  const share = total ? (documented / total) * 100 : 0;
  return `<section class="panel ecosystem-snapshot" aria-labelledby="snapshot-title"><div class="snapshot-summary"><span class="eyebrow">INTELIGÊNCIA DO ECOSSISTEMA</span><h2 id="snapshot-title">Do espaço ao território.</h2><p>Explore os perfis identificados na pesquisa documental catarinense.</p><a class="text-link" href="#network">Explorar o levantamento ${icon("arrow")}</a><small>Consulta: ${e(dataset.metadata.asOf.split("-").reverse().join("/"))} · Perfis, não CNPJs únicos. Não é censo.</small></div><div class="snapshot-evidence"><div class="evidence-ring" style="--documented-share: ${share}%"><div><strong>${total}</strong><span>perfis no catálogo</span></div></div><p><span class="evidence-key"></span>${documented} documentados<br><span class="evidence-key pending"></span>${total - documented} históricos ou pendentes</p></div><div class="snapshot-roles"><span class="eyebrow">EXPLORE POR PAPEL</span>${Object.entries(
    dataset.metadata.roles,
  )
    .map(([role, label]) => {
      const count = dataset.companies.filter((c) => c.role === role).length;
      return `<button class="snapshot-role" data-catalog-role="${e(role)}"><span>${e(label)}</span><strong>${count}</strong>${icon("arrowUpRight")}</button>`;
    })
    .join("")}</div></section>`;
}
export function filterCompanies(dataset, filters) {
  const query = normalize(filters.query.trim());
  return dataset.companies.filter(
    (c) =>
      (filters.role === "all" || c.role === filters.role) &&
      (filters.segment === "all" || c.segment === filters.segment) &&
      (filters.status === "all" || c.status === filters.status) &&
      normalize(
        [
          c.name,
          c.city || "",
          c.description,
          ...c.aliases,
          ...c.technologies,
          ...c.markets,
        ].join(" "),
      ).includes(query),
  );
}
export function renderCompanyResults(
  dataset,
  filters,
  { escapeHtml: e, icon },
) {
  const companies = filterCompanies(dataset, filters);
  return `<p class="catalog-result-count" role="status">${companies.length} de ${dataset.companies.length} registros neste levantamento</p><div class="company-grid">${
    companies
      .map(
        (c) =>
          `<article class="panel company-card"><div class="company-meta"><span class="badge ${c.status === "documented" ? "green" : "orange"}">${e(dataset.metadata.statuses[c.status])}</span><span>${e(c.city || "Município a confirmar")}${c.state ? " · " + e(c.state) : ""}</span></div><h3>${e(c.name)}</h3><p class="company-segment">${e(dataset.metadata.segments[c.segment])}</p><p>${e(c.description)}</p><div class="tags">${c.technologies
            .slice(0, 3)
            .map((t) => `<span>${e(t)}</span>`)
            .join(
              "",
            )}</div><div class="company-bottom"><span>${c.sources.length} fontes</span><button class="text-link" data-company-detail="${c.id}">Evidências e fontes ${icon("arrowUpRight")}</button></div></article>`,
      )
      .join("") ||
    '<p class="empty-state">Nenhum registro corresponde aos filtros. Tente outro termo ou limpe os filtros.</p>'
  }</div>`;
}
export function renderCatalog(dataset, filters, helpers) {
  const { escapeHtml: e, icon } = helpers;
  const meta = dataset.metadata;
  const metric = (role, status = "documented") =>
    dataset.companies.filter((c) => c.role === role && c.status === status)
      .length;
  const options = (values, selected) =>
    Object.entries(values)
      .map(
        ([id, name]) =>
          `<option value="${id}" ${id === selected ? "selected" : ""}>${e(name)}</option>`,
      )
      .join("");
  return `<section class="catalog-intro"><div><span class="eyebrow">${e(meta.subtitle)}</span><h2>${e(meta.title)}</h2><p>Fontes consultadas em ${e(meta.asOf.split("-").reverse().join("/"))}. Atividades upstream, ofertas downstream e presença territorial identificadas em documentos públicos.</p></div><button class="button button-outline" id="export-companies">${icon("download")} Baixar levantamento JSON</button></section><div class="notice">${e(meta.notice)}</div><div class="catalog-metrics">${[
    [
      metric("upstream") + metric("research_unit"),
      "Upstream e centros documentados",
    ],
    [metric("downstream"), "Ofertas downstream documentadas"],
    [metric("integrator"), "Integradores documentados"],
    [metric("end_user"), "Usuárias documentadas¹"],
    [
      dataset.companies.filter((c) => c.status !== "documented").length,
      "Históricos e pendentes",
    ],
  ]
    .map(
      ([value, label]) =>
        `<div class="panel"><strong>${value}</strong><span>${label}</span></div>`,
    )
    .join(
      "",
    )}</div><p class="catalog-footnote">¹ Inclui aplicação corporativa com presença em SC; consulte o escopo territorial em cada registro. As categorias não indicam vínculo à Rede OESC.</p><details class="panel catalog-method"><summary>Como este levantamento foi construído</summary><ul>${meta.methodology.map((text) => `<li>${e(text)}</li>`).join("")}</ul><h3>Próximas validações</h3><ul>${meta.nextSteps.map((text) => `<li>${e(text)}</li>`).join("")}</ul><p>${dataset.excluded.length} nomes fora do recorte ou sem identidade/localização comprovada estão documentados no JSON e no relatório de pesquisa.</p></details><form class="catalog-filters" role="search" aria-label="Filtrar organizações e aplicações"><label class="catalog-query">Buscar organização, cidade ou tecnologia<input id="company-query" type="search" value="${e(filters.query)}" placeholder="Ex.: satélite, florestas, Joinville…"></label><label>Papel no ecossistema<select id="company-role"><option value="all" ${filters.role === "all" ? "selected" : ""}>Todos os papéis</option>${options(meta.roles, filters.role)}</select></label><label>Segmento<select id="company-segment"><option value="all">Todos os segmentos</option>${options(meta.segments, filters.segment)}</select></label><label>Evidência<select id="company-status"><option value="all">Todas as situações</option>${options(meta.statuses, filters.status)}</select></label><button type="button" id="clear-company-filters" class="button button-outline">Limpar filtros</button></form><div id="company-results">${renderCompanyResults(dataset, filters, helpers)}</div>`;
}
export function renderCompanyDetails(
  company,
  dataset,
  { escapeHtml: e, icon, link },
) {
  const scope = {
    corporate:
      "Aplicação corporativa; implantação específica em SC não comprovada",
    local_sc: "Aplicação local em Santa Catarina documentada",
    not_confirmed: "Implantação em Santa Catarina não confirmada",
    not_applicable: "Atividade ou oferta descrita no perfil",
  };
  return `<div class="dialog-heading"><span class="badge ${company.status === "documented" ? "green" : "orange"}">${e(dataset.metadata.statuses[company.status])}</span><button class="icon-button" aria-label="Fechar detalhes da organização">${icon("close")}</button></div><h2>${e(company.name)}</h2><p>${e(company.description)}</p><dl class="company-facts"><dt>Localização e presença</dt><dd>${e(company.city || "Município a confirmar")} · ${e(company.presence)}</dd><dt>Papel</dt><dd>${e(dataset.metadata.roles[company.role])}</dd><dt>Segmento</dt><dd>${e(dataset.metadata.segments[company.segment])}</dd><dt>Mercados e aplicações</dt><dd>${e(company.markets.join(" · "))}</dd><dt>Escopo da aplicação</dt><dd>${e(scope[company.usageScope])}</dd><dt>Nível de evidência</dt><dd>${company.confidence === "high" ? "Documentação pública identificada" : "Exige confirmação complementar"}. Cadastro empresarial e participação na rede não auditados.</dd></dl><div class="notice">${e(company.notes)}</div><h3>Evidências e fontes</h3><div class="company-sources">${company.sources.map((s) => `<article>${link(s.url, s.title)}<p>${e(s.evidence)}</p><small>Consulta: ${e(s.checkedAt)}${s.publishedAt ? " · Publicação: " + e(s.publishedAt) : ""}</small></article>`).join("")}</div>${link(company.website, "Visitar página de referência", "button button-primary")}`;
}
