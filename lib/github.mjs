const LOGIN = "SorPuti";
export function cleanText(value, max = 360) {
  return typeof value === "string"
    ? value
        .replace(
          /[\w.!#$%&'*+/=?^`{|}~-]+@[\w.-]+\.[A-Za-z]{2,}/g,
          "[contato removido]",
        )
        .replace(/mailto:[^\s)]+/gi, "[contato removido]")
        .replace(/[\u0000-\u001f\u007f]/g, " ")
        .slice(0, max)
    : "";
}
export function sanitizeRepos(input) {
  if (!Array.isArray(input)) throw new Error("Resposta inválida do GitHub");
  return input
    .filter(
      (r) =>
        r &&
        r.private === false &&
        r.owner?.login?.toLowerCase() === LOGIN.toLowerCase() &&
        !r.fork &&
        !r.archived &&
        /^[\w.-]+$/.test(r.name),
    )
    .map((r) => ({
      name: r.name,
      description: cleanText(r.description),
      language: cleanText(r.language, 40),
      url: `https://github.com/${LOGIN}/${r.name}`,
      stars: Number.isSafeInteger(r.stargazers_count)
        ? Math.max(0, r.stargazers_count)
        : 0,
      createdAt: validDate(r.created_at),
      pushedAt: validDate(r.pushed_at),
    }))
    .sort((a, b) => b.pushedAt.localeCompare(a.pushedAt));
}
function validDate(d) {
  return typeof d === "string" && !Number.isNaN(Date.parse(d))
    ? new Date(d).toISOString()
    : "";
}
export async function fetchPublicProfile(fetcher = fetch, token = "") {
  const headers = {
    Accept: "application/vnd.github+json",
    "User-Agent": "synthosia-atlas",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
  const repos = [];
  for (let page = 1; page <= 20; page++) {
    const r = await fetcher(
      `https://api.github.com/users/${LOGIN}/repos?type=owner&sort=pushed&per_page=100&page=${page}`,
      { headers, signal: AbortSignal.timeout(9000) },
    );
    if (!r.ok) throw new Error(`GitHub indisponível (${r.status})`);
    const data = await r.json();
    if (!Array.isArray(data)) throw new Error("Resposta inválida do GitHub");
    repos.push(...sanitizeRepos(data));
    if (data.length < 100)
      return {
        schemaVersion: 1,
        checkedAt: new Date().toISOString(),
        source: "github",
        repos,
      };
  }
  throw new Error("Paginação incompleta");
}
