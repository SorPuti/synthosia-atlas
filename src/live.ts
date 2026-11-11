import snapshot from "./data/github.json";
export type Repo = {
  name: string;
  description: string;
  language: string;
  url: string;
  stars: number;
  createdAt: string;
  pushedAt: string;
};
export type PublicData = {
  schemaVersion: number;
  checkedAt: string;
  source: string;
  repos: Repo[];
};
export let current: PublicData = snapshot;
export let isLive = false;
export function validateData(d: unknown): d is PublicData {
  if (!d || typeof d !== "object") return false;
  const x = d as PublicData;
  return (
    x.schemaVersion === 1 &&
    typeof x.checkedAt === "string" &&
    !Number.isNaN(Date.parse(x.checkedAt)) &&
    Array.isArray(x.repos) &&
    x.repos.every(
      (r) =>
        r &&
        /^[\w.-]+$/.test(r.name) &&
        r.url === `https://github.com/SorPuti/${r.name}` &&
        typeof r.description === "string" &&
        typeof r.language === "string" &&
        typeof r.createdAt === "string" &&
        typeof r.pushedAt === "string",
    )
  );
}
export async function refreshData(): Promise<PublicData> {
  try {
    const response = await fetch("/api/profile", {
      signal: AbortSignal.timeout(12_000),
      headers: { Accept: "application/json" },
    });
    if (!response.ok) throw new Error("offline");
    const data: unknown = await response.json();
    if (!validateData(data)) throw new Error("invalid");
    current = data;
    isLive = true;
  } catch {
    isLive = false;
  }
  document.dispatchEvent(new CustomEvent("profile-updated"));
  return current;
}
