import { fetchPublicProfile } from "../lib/github.mjs";
import type { IncomingMessage, ServerResponse } from "node:http";

export default async function handler(
  req: IncomingMessage,
  res: ServerResponse,
) {
  if (req.method !== "GET") {
    res.writeHead(405, { Allow: "GET" });
    return res.end();
  }
  try {
    const data = await fetchPublicProfile(
      fetch,
      process.env.GITHUB_PUBLIC_DATA_TOKEN || "",
    );
    res.writeHead(200, {
      "Content-Type": "application/json; charset=utf-8",
      "Cache-Control":
        "public, max-age=0, s-maxage=900, stale-while-revalidate=3600",
      "X-Content-Type-Options": "nosniff",
    });
    res.end(JSON.stringify(data));
  } catch {
    res.writeHead(503, {
      "Content-Type": "application/json",
      "Cache-Control": "no-store",
    });
    res.end(
      JSON.stringify({
        error:
          "GitHub temporariamente indisponível. A cópia pública revisada continua disponível.",
      }),
    );
  }
}
