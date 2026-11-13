import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { contentFiles, validateContent, loadContent } from "../content.js";
const fixture = Object.fromEntries(
  await Promise.all(
    contentFiles.map(async (name) => [
      name,
      JSON.parse(
        await readFile(
          new URL(`../data/${name}.json`, import.meta.url),
          "utf8",
        ),
      ),
    ]),
  ),
);
const clone = () => structuredClone(fixture);

test("all published content files satisfy the dashboard contract", () => {
  assert.equal(validateContent(fixture), fixture);
});
test("loader requests JSON relative to its module and returns the complete content", async () => {
  const requests = [];
  const data = await loadContent(async (url, options) => {
    requests.push(url);
    assert.equal(options.cache, "no-cache");
    assert.ok(options.signal instanceof AbortSignal);
    const name = url.pathname.split("/").pop().replace(".json", "");
    return { ok: true, json: async () => fixture[name] };
  });
  assert.equal(requests.length, contentFiles.length);
  assert.deepEqual(data, fixture);
  assert.ok(requests.every((url) => url.pathname.includes("/data/")));
});
test("HTTP and malformed JSON failures identify the affected file", async () => {
  await assert.rejects(
    loadContent(async () => ({ ok: false, status: 404 })),
    /data\/project.json.*HTTP 404/,
  );
  await assert.rejects(
    loadContent(async () => ({
      ok: true,
      json: async () => {
        throw new SyntaxError("Invalid JSON");
      },
    })),
    /data\/project.json.*Invalid JSON/,
  );
});
test("invalid content is rejected before rendering", () => {
  const cases = [
    [(d) => (d.project.metrics[0].value = "48"), /metrics\[0\].value/],
    [(d) => (d.sections[0].id = "unknown"), /sections\[0\].id/],
    [(d) => (d.sections[0].id = d.sections[1].id), /IDs de seção/],
    [(d) => (d.areas[0].tags = null), /tags/],
    [(d) => (d.areas[0].category = "unknown"), /category/],
    [(d) => delete d.project.copy.sourceNote, /sourceNote/],
    [
      (d) => (d.opportunities[0].url = "javascript:alert(1)"),
      /opportunities\[0\].url/,
    ],
    [(d) => (d.project.map.src = "data:image/svg+xml,invalid"), /map.src/],
    [(d) => (d.deliverables[0].color = "arbitrary-class"), /color/],
    [(d) => (d.institutions[0].lead = "yes"), /lead/],
  ];
  for (const [mutate, error] of cases) {
    const data = clone();
    mutate(data);
    assert.throws(() => validateContent(data), error);
  }
});
test("empty content collections are valid so the UI can show empty states", () => {
  const data = clone();
  for (const name of [
    "areas",
    "regions",
    "deliverables",
    "roadmap",
    "institutions",
    "opportunities",
  ])
    data[name] = [];
  assert.equal(validateContent(data), data);
});
test("content remains plain text for rendering and lossless exports", async () => {
  const data = clone();
  data.areas[0].name = 'Dados <abertos> & "ciência"';
  assert.equal(
    validateContent(data).areas[0].name,
    'Dados <abertos> & "ciência"',
  );
});
