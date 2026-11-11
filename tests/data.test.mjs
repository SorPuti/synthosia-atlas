import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import {
  cleanText,
  sanitizeRepos,
  fetchPublicProfile,
} from "../lib/github.mjs";
import { buildResume, toText } from "../lib/resume.mjs";
const person = JSON.parse(
  await readFile(new URL("../src/data/person.json", import.meta.url)),
);
const snapshot = JSON.parse(
  await readFile(new URL("../src/data/github.json", import.meta.url)),
);
const fixture = {
  name: "project",
  owner: { login: "SorPuti" },
  private: false,
  fork: false,
  archived: false,
  description: "Contato: person@example.com",
  language: "Rust",
  created_at: "2026-01-01",
  pushed_at: "2026-11-10",
  stargazers_count: 1,
};

test("o payload público usa allowlist e nunca carrega campos de contato ou privados", () => {
  const result = sanitizeRepos([
    { ...fixture, email: "secret@example.com", ssh_url: "private" },
    { ...fixture, name: "private", private: true },
    { ...fixture, name: "fork", fork: true },
    { ...fixture, name: "foreign", owner: { login: "other" } },
    { ...fixture, name: "archived", archived: true },
  ]);
  assert.equal(result.length, 1);
  assert(!JSON.stringify(result).includes("@"));
  assert.deepEqual(Object.keys(result[0]), [
    "name",
    "description",
    "language",
    "url",
    "stars",
    "createdAt",
    "pushedAt",
  ]);
  assert.equal(result[0].url, "https://github.com/SorPuti/project");
  assert.equal(cleanText("mailto:person@example.com").includes("@"), false);
});
test("consulta segue paginação antes de marcar os dados como atualizados", async () => {
  let pages = 0;
  const result = await fetchPublicProfile(async (url) => {
    pages++;
    return {
      ok: true,
      json: async () =>
        new URL(url).searchParams.get("page") === "1"
          ? Array.from({ length: 100 }, (_, i) => ({
              ...fixture,
              name: `p${i}`,
            }))
          : [{ ...fixture, name: "last" }],
    };
  });
  assert.equal(pages, 2);
  assert.equal(result.repos.length, 101);
  assert.ok(result.checkedAt);
});
test("erros e respostas inválidas nunca viram uma consulta bem-sucedida", async () => {
  await assert.rejects(
    fetchPublicProfile(async () => ({ ok: false, status: 403 })),
  );
  await assert.rejects(
    fetchPublicProfile(async () => ({
      ok: true,
      json: async () => ({ message: "rate limit" }),
    })),
  );
});
test("currículo preserva experiência fornecida e usa as datas recentes do GitHub", () => {
  const updated = structuredClone(snapshot);
  const repo = updated.repos.find((r) => r.name === "talkweave");
  repo.pushedAt = "2026-11-11T10:00:00.000Z";
  const resume = buildResume(person, updated);
  assert.equal(
    resume.projects.find((p) => p.name === "TalkWeave").lastUpdated,
    "2026-11-11",
  );
  assert.equal(resume.work[0].name, "Reddin");
  assert.equal(resume.work[0].startDate, "2025-02");
  assert.equal(resume.work[1].startDate, "2024-12");
  assert(!("email" in resume.basics));
  const text = toText(resume);
  assert(!/[\w.+-]+@[\w.-]+\.[a-z]{2,}/i.test(text));
  for (const label of [
    "EXPERIÊNCIA PROFISSIONAL",
    "FORMAÇÃO ACADÊMICA",
    "COMPETÊNCIAS",
    "Imóvel Periciado",
    "UniVault",
  ])
    assert.ok(text.includes(label));
  assert.ok(text.includes("conclusão prevista para 2026"));
  assert.ok(text.includes("marketplace"));
});
test("todos os registros de projeto têm fonte e a cópia salva não contém endereços de e-mail", () => {
  assert(snapshot.repos.length > 0);
  assert(!JSON.stringify(snapshot).includes("@"));
  assert(!JSON.stringify(person).includes("@"));
  for (const p of person.projects)
    assert(snapshot.repos.some((r) => r.url === p.url));
});
