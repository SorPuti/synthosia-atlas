import test from "node:test";
import assert from "node:assert/strict";
import { build } from "vite";

test("a função da Vercel serve apenas dados públicos e responde a falhas sem expor detalhes", async () => {
  await build({
    configFile: false,
    logLevel: "silent",
    build: {
      lib: { entry: "api/profile.ts", formats: ["es"], fileName: "profile" },
      outDir: "work/api-test",
      emptyOutDir: true,
      minify: false,
    },
  });
  const { default: handler } = await import("../work/api-test/profile.js");
  const originalFetch = globalThis.fetch;
  const response = () => ({
    status: 0,
    headers: {},
    body: "",
    writeHead(status, headers) {
      this.status = status;
      this.headers = headers;
    },
    end(body = "") {
      this.body = body;
    },
  });
  try {
    globalThis.fetch = async () => ({
      ok: true,
      json: async () => [
        {
          name: "public",
          private: false,
          owner: { login: "SorPuti" },
          description: "do not expose secret@example.com",
          created_at: "2026-01-01",
          pushed_at: "2026-11-10",
        },
        { name: "private", private: true, owner: { login: "SorPuti" } },
      ],
    });
    const ok = response();
    await handler({ method: "GET" }, ok);
    assert.equal(ok.status, 200);
    assert(ok.headers["Cache-Control"].includes("s-maxage=900"));
    assert.equal(JSON.parse(ok.body).repos.length, 1);
    assert(!ok.body.includes("@"));
    globalThis.fetch = async () => {
      throw new Error("sensitive upstream message");
    };
    const failed = response();
    await handler({ method: "GET" }, failed);
    assert.equal(failed.status, 503);
    assert(!failed.body.includes("sensitive"));
    assert.equal(failed.headers["Cache-Control"], "no-store");
    const invalid = response();
    await handler({ method: "POST" }, invalid);
    assert.equal(invalid.status, 405);
    assert.equal(invalid.headers.Allow, "GET");
  } finally {
    globalThis.fetch = originalFetch;
  }
});
