// Content is fetched relative to this module, including when hosted under /oesc/.
export const contentFiles = [
  "project",
  "sections",
  "areas",
  "regions",
  "deliverables",
  "roadmap",
  "institutions",
  "opportunities",
  "companies",
];
const colors = new Set(["blue", "purple", "green", "orange", "pink"]);
const sectionIds = [
  "overview",
  "network",
  "areas",
  "regions",
  "deliverables",
  "roadmap",
  "opportunities",
];
function requireValue(condition, path) {
  if (!condition) throw new Error(`Conteúdo inválido: ${path}`);
}
function text(value, path) {
  requireValue(typeof value === "string" && value.trim().length > 0, path);
}
function records(value, path) {
  requireValue(Array.isArray(value), path);
}
function fields(record, names, path) {
  requireValue(
    record !== null && typeof record === "object" && !Array.isArray(record),
    path,
  );
  names.forEach((name) => text(record[name], `${path}.${name}`));
}
function url(value, path) {
  text(value, path);
  const parsed = new URL(value, "https://oesc.invalid/");
  requireValue(["https:", "http:"].includes(parsed.protocol), path);
}
function visual(record, path) {
  text(record.icon, `${path}.icon`);
  requireValue(colors.has(record.color), `${path}.color`);
}
export function validateContent(data) {
  const p = data.project;
  fields(p, ["participationUrl", "summaryNote"], "project");
  url(p.participationUrl, "project.participationUrl");
  fields(p.source, ["url", "label", "consultedAt"], "project.source");
  url(p.source.url, "project.source.url");
  fields(p.hero, ["eyebrow", "linkLabel", "caption", "index"], "project.hero");
  for (const key of ["title", "description"]) {
    records(p.hero[key], `project.hero.${key}`);
    p.hero[key].forEach((v, i) => text(v, `project.hero.${key}[${i}]`));
  }
  records(p.metrics, "project.metrics");
  p.metrics.forEach((m, i) => {
    fields(m, ["id", "title", "note"], `project.metrics[${i}]`);
    visual(m, `project.metrics[${i}]`);
    requireValue(
      Number.isFinite(m.value) && m.value >= 0,
      `project.metrics[${i}].value`,
    );
    requireValue(typeof m.unit === "string", `project.metrics[${i}].unit`);
  });
  requireValue(
    new Set(p.metrics.map((m) => m.id)).size === p.metrics.length,
    "project.metrics: IDs duplicados",
  );
  for (const id of ["team", "areas", "axes", "duration"])
    requireValue(
      p.metrics.some((m) => m.id === id),
      `project.metrics.${id}`,
    );
  fields(p.map, ["src", "alt", "coordinates", "label"], "project.map");
  url(p.map.src, "project.map.src");
  records(p.filters, "project.filters");
  p.filters.forEach((f, i) => {
    fields(f, ["id", "name"], `project.filters[${i}]`);
    requireValue(/^[a-z][a-z0-9-]*$/.test(f.id), `project.filters[${i}].id`);
  });
  requireValue(
    p.filters.some((f) => f.id === "all"),
    "project.filters.all",
  );
  requireValue(
    new Set(p.filters.map((f) => f.id)).size === p.filters.length,
    "project.filters: IDs duplicados",
  );
  requireValue(
    p.copy && typeof p.copy === "object" && !Array.isArray(p.copy),
    "project.copy",
  );
  const copyKeys = [
    "mapEyebrow",
    "mapTitle",
    "mapFullTitle",
    "mapCoverage",
    "mapLegend",
    "mapLink",
    "regionTitle",
    "regionDescription",
    "regionOverview",
    "regionNotice",
    "opportunitiesEyebrow",
    "opportunitiesTitle",
    "opportunitiesCompactTitle",
    "opportunitiesNotice",
    "roadmapEyebrow",
    "roadmapTitle",
    "roadmapNotice",
    "areasEyebrow",
    "areasTitle",
    "areasLink",
    "areasDescription",
    "areasOpenTitle",
    "areasOpenDescription",
    "areasOpenLink",
    "areaNotice",
    "areaLink",
    "sourceNote",
    "networkTitle",
    "networkDescription",
    "networkLink",
    "institutionsEyebrow",
    "institutionsTitle",
    "institutionsDescription",
    "institutionsNotice",
    "deliverablesNotice",
    "workspaceTitle",
    "workspaceLocation",
    "sidebarTitle",
    "sidebarDescription",
    "institutionMark",
    "institutionCredit",
    "institutionSupport",
    "footer",
  ];
  fields(p.copy, copyKeys, "project.copy");
  records(data.sections, "sections");
  data.sections.forEach((s, i) => {
    fields(
      s,
      ["id", "name", "icon", "eyebrow", "description"],
      `sections[${i}]`,
    );
    requireValue(sectionIds.includes(s.id), `sections[${i}].id`);
  });
  requireValue(
    data.sections.length === sectionIds.length &&
      new Set(data.sections.map((s) => s.id)).size === sectionIds.length,
    "sections: sete IDs de seção únicos",
  );
  records(data.areas, "areas");
  data.areas.forEach((a, i) => {
    fields(a, ["name", "full", "category", "description"], `areas[${i}]`);
    visual(a, `areas[${i}]`);
    requireValue(
      p.filters.some((f) => f.id === a.category && f.id !== "all"),
      `areas[${i}].category`,
    );
    records(a.tags, `areas[${i}].tags`);
    a.tags.forEach((v, j) => text(v, `areas[${i}].tags[${j}]`));
  });
  records(data.regions, "regions");
  data.regions.forEach((r, i) => text(r, `regions[${i}]`));
  requireValue(
    new Set(data.regions).size === data.regions.length,
    "regions: nomes duplicados",
  );
  records(data.deliverables, "deliverables");
  data.deliverables.forEach((d, i) => {
    fields(d, ["name", "description", "status"], `deliverables[${i}]`);
    visual(d, `deliverables[${i}]`);
  });
  records(data.roadmap, "roadmap");
  data.roadmap.forEach((r, i) =>
    fields(r, ["name", "months", "description"], `roadmap[${i}]`),
  );
  records(data.institutions, "institutions");
  data.institutions.forEach((r, i) => {
    fields(r, ["name", "initials", "description"], `institutions[${i}]`);
    requireValue(typeof r.lead === "boolean", `institutions[${i}].lead`);
  });
  records(data.opportunities, "opportunities");
  data.opportunities.forEach((o, i) => {
    fields(
      o,
      ["label", "status", "title", "description", "url", "linkLabel"],
      `opportunities[${i}]`,
    );
    requireValue(colors.has(o.color), `opportunities[${i}].color`);
    url(o.url, `opportunities[${i}].url`);
  });
  validateCompanies(data.companies);
  return data;
}
export function validateCompanies(data) {
  requireValue(data && typeof data === "object", "companies");
  fields(
    data.metadata,
    ["asOf", "title", "subtitle", "scope", "notice"],
    "companies.metadata",
  );
  const meta = data.metadata;
  for (const key of ["roles", "statuses", "segments"]) {
    requireValue(
      meta[key] && typeof meta[key] === "object" && !Array.isArray(meta[key]),
      `companies.metadata.${key}`,
    );
    Object.entries(meta[key]).forEach(([id, label]) => {
      requireValue(
        /^[a-z][a-z0-9_]*$/.test(id),
        `companies.metadata.${key}.${id}`,
      );
      text(label, `companies.metadata.${key}.${id}`);
    });
  }
  for (const key of ["methodology", "nextSteps"]) {
    records(meta[key], `companies.metadata.${key}`);
    meta[key].forEach((v, i) => text(v, `companies.metadata.${key}[${i}]`));
  }
  records(data.companies, "companies.companies");
  const ids = new Set();
  data.companies.forEach((c, i) => {
    const path = `companies.companies[${i}]`;
    fields(
      c,
      [
        "id",
        "name",
        "presence",
        "website",
        "role",
        "status",
        "segment",
        "description",
        "notes",
        "confidence",
        "usageScope",
      ],
      path,
    );
    requireValue(
      /^[a-z][a-z0-9-]*$/.test(c.id) && !ids.has(c.id),
      `${path}.id`,
    );
    ids.add(c.id);
    requireValue(c.city === null || typeof c.city === "string", `${path}.city`);
    requireValue(c.state === null || c.state === "SC", `${path}.state`);
    requireValue(
      Object.hasOwn(meta.roles, c.role) &&
        Object.hasOwn(meta.statuses, c.status) &&
        Object.hasOwn(meta.segments, c.segment),
      `${path}.classification`,
    );
    requireValue(
      ["high", "medium"].includes(c.confidence),
      `${path}.confidence`,
    );
    requireValue(
      ["corporate", "local_sc", "not_confirmed", "not_applicable"].includes(
        c.usageScope,
      ),
      `${path}.usageScope`,
    );
    for (const key of ["aliases", "technologies", "markets"]) {
      records(c[key], `${path}.${key}`);
      c[key].forEach((v, j) => text(v, `${path}.${key}[${j}]`));
    }
    url(c.website, `${path}.website`);
    records(c.sources, `${path}.sources`);
    requireValue(c.sources.length > 0, `${path}.sources`);
    c.sources.forEach((s, j) => {
      const p = `${path}.sources[${j}]`;
      fields(s, ["url", "title", "kind", "evidence", "checkedAt"], p);
      url(s.url, `${p}.url`);
      records(s.supports, `${p}.supports`);
      s.supports.forEach((v) =>
        requireValue(
          ["location", "identity", "offering", "usage"].includes(v),
          `${p}.supports`,
        ),
      );
      requireValue(
        s.publishedAt === null || typeof s.publishedAt === "string",
        `${p}.publishedAt`,
      );
    });
  });
  records(data.excluded, "companies.excluded");
  data.excluded.forEach((c, i) => {
    fields(c, ["name", "reason"], `companies.excluded[${i}]`);
    records(c.sources, `companies.excluded[${i}].sources`);
    c.sources.forEach((s) => url(s, `companies.excluded[${i}].sources`));
  });
  return data;
}
export async function loadContent(fetcher = fetch) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 15000);
  try {
    const entries = await Promise.all(
      contentFiles.map(async (name) => {
        try {
          const response = await fetcher(
            new URL(`data/${name}.json`, import.meta.url),
            { signal: controller.signal, cache: "no-cache" },
          );
          if (!response.ok) throw new Error(`HTTP ${response.status}`);
          return [name, await response.json()];
        } catch (error) {
          throw new Error(
            `Não foi possível carregar data/${name}.json: ${error.message}`,
          );
        }
      }),
    );
    return validateContent(Object.fromEntries(entries));
  } finally {
    clearTimeout(timer);
    controller.abort();
  }
}
