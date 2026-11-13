import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { filterCompanies } from "../catalog.js";
import { validateCompanies } from "../content.js";
const dataset = JSON.parse(
  await readFile(new URL("../data/companies.json", import.meta.url), "utf8"),
);
const all = { query: "", role: "all", segment: "all", status: "all" };
test("research records are valid and contain traceable sources", () => {
  assert.equal(validateCompanies(dataset), dataset);
  assert.ok(dataset.companies.every((c) => c.sources.length > 0));
});
test("catalog filters combine role, segment, evidence and accent-insensitive queries", () => {
  const result = filterCompanies(dataset, {
    query: "florianopolis",
    role: "downstream",
    segment: "earth_observation",
    status: "documented",
  });
  assert.ok(result.length > 0);
  assert.ok(
    result.every(
      (c) =>
        c.role === "downstream" &&
        c.segment === "earth_observation" &&
        c.status === "documented" &&
        c.city === "Florianópolis",
    ),
  );
  assert.equal(
    filterCompanies(dataset, {
      ...all,
      query: "not-a-real-matching-company-987",
    }).length,
    0,
  );
});
test("historical aliases find one profile instead of counting acquired names twice", () => {
  assert.equal(filterCompanies(dataset, { ...all, query: "Arvus" }).length, 1);
  assert.equal(
    filterCompanies(dataset, { ...all, query: "ORN Space" }).length,
    1,
  );
});
test("industrial users and pending cases stay outside documented supplier counts", () => {
  const providers = filterCompanies(dataset, {
    ...all,
    role: "downstream",
    status: "documented",
  });
  assert.ok(
    !providers.some((c) =>
      [
        "celesc",
        "brf-mbrf",
        "klabin-sc",
        "agrosatelite",
        "geomais",
        "satmaps",
        "tecnoraster",
      ].includes(c.id),
    ),
  );
  const klabin = dataset.companies.find((c) => c.id === "klabin-sc");
  assert.equal(klabin.status, "pending");
  assert.equal(klabin.usageScope, "not_confirmed");
});
test("invalid IDs, missing sources and unsafe links fail validation", () => {
  for (const mutate of [
    (d) => (d.companies[0].sources = []),
    (d) => (d.companies[0].website = "javascript:alert(1)"),
    (d) => (d.companies[0].id = d.companies[1].id),
    (d) => (d.companies[0].sources[0].supports = ["unverified-claim"]),
  ]) {
    const data = structuredClone(dataset);
    mutate(data);
    assert.throws(() => validateCompanies(data), /Conteúdo inválido/);
  }
});
test("upstream records stay separate from downstream suppliers and keep pending cases out of documented counts", () => {
  const upstream = filterCompanies(dataset, { ...all, role: "upstream" });
  assert.ok(upstream.length > 0);
  assert.ok(upstream.every((c) => c.segment !== "earth_observation"));
  const documented = filterCompanies(dataset, {
    ...all,
    role: "upstream",
    status: "documented",
  }).map((c) => c.id);
  assert.ok(!documented.includes("bold-jaragua"));
  assert.ok(!documented.includes("wega-aircraft"));
  assert.equal(
    filterCompanies(dataset, { ...all, query: "Catarina-A2" }).length,
    1,
  );
});
