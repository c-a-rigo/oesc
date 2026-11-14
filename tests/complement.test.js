import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { filterCompanies } from "../catalog.js";

const read = async (path) =>
  JSON.parse(await readFile(new URL(path, import.meta.url), "utf8"));
const dataset = await read("../data/companies.json");
const audit = await read("../outputs/complemento-ecossistema-sc.reconciliation.json");
const normalize = (value) =>
  value.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();

test("organization names and aliases resolve to a single catalog identity", () => {
  const identities = new Map();
  for (const company of dataset.companies) {
    for (const name of [company.name, ...company.aliases]) {
      const key = normalize(name.trim());
      assert.ok(!identities.has(key) || identities.get(key) === company.id, name);
      identities.set(key, company.id);
    }
  }
  assert.equal(identities.get("orn space"), "nor-space");
  assert.equal(identities.get("agrosatelite"), "agrosatelite");
});

test("complement decisions point to real profiles and carry source provenance", () => {
  for (const decision of audit.matches) {
    const company = dataset.companies.find((c) => c.id === decision.companyId);
    assert.ok(company, decision.companyId);
    if (decision.action === "matched_existing") continue;
    assert.ok(company.sources.some((s) => s.provenance?.document === audit.source));
    for (const source of company.sources.filter((s) => s.provenance)) {
      assert.ok(source.provenance.page >= 1 && source.provenance.page <= 13);
      assert.ok(source.provenance.reference >= 81 && source.provenance.reference <= 157);
      if (source.provenance.verification === "document_only") {
        assert.equal(source.kind, "document_reference");
        assert.match(source.evidence, /não revalidada/);
      }
    }
    if (decision.action === "added" && company.status === "documented") {
      assert.ok(company.sources.some((s) => s.provenance?.verification === "direct"));
    }
    if (decision.action === "added") assert.equal(company.membershipVerified, false);
  }
});

test("education, support and inactive infrastructure stay outside industrial providers", () => {
  const suppliers = dataset.companies.filter(
    (c) => ["upstream", "research_unit", "downstream", "integrator"].includes(c.role)
      && c.status === "documented",
  );
  for (const id of ["kosmos-rocketry", "ifsc-formacao-espacial", "ifsc-satnogs-389",
    "telebras-gateway-florianopolis", "fapesc-fomento-espacial", "fiesc-condefesa"]) {
    assert.ok(!suppliers.some((c) => c.id === id));
  }
  assert.equal(dataset.companies.find((c) => c.id === "ifsc-satnogs-389").status, "historical");
  const kosmos = filterCompanies(dataset, {
    query: "Kosmos Rocketry", role: "education", segment: "all", status: "all",
  });
  assert.equal(kosmos.length, 1);
  assert.ok(!dataset.excluded.some((c) => c.name.includes("Kosmos")));
});
