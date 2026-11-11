import test from "node:test";
import assert from "node:assert/strict";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import { build } from "vite";
import { PDFDocument } from "pdf-lib";
import { execFileSync } from "node:child_process";

test("os cinco downloads geram arquivos reais, legíveis e sem e-mail", async () => {
  await build({
    configFile: false,
    logLevel: "silent",
    build: {
      lib: { entry: "src/cv.ts", formats: ["es"], fileName: "cv" },
      outDir: "work/export-test",
      emptyOutDir: true,
      minify: false,
    },
  });
  const data = JSON.parse(await readFile("src/data/github.json", "utf8"));
  const exportsDir = "work/verified-cv";
  await mkdir(exportsDir, { recursive: true });
  let downloaded;
  const originalDocument = globalThis.document,
    originalTimeout = globalThis.setTimeout,
    originalCreate = URL.createObjectURL,
    originalFetch = globalThis.fetch;
  globalThis.document = {
    createElement: () => ({ click() {}, remove() {} }),
    body: { append() {} },
  };
  globalThis.setTimeout = (fn, ms, ...args) => {
    const timer = originalTimeout(fn, ms, ...args);
    if (ms === 30_000) timer.unref();
    return timer;
  };
  URL.createObjectURL = (blob) => {
    downloaded = blob;
    return "blob:verified";
  };
  globalThis.fetch = async (url) =>
    new Response(await readFile(`public${url}`));
  try {
    const { downloadResume } = await import("../work/export-test/cv.js");
    for (const format of ["pdf", "docx", "txt", "md", "json"]) {
      await downloadResume(format, data);
      assert.ok(downloaded instanceof Blob);
      const buffer = Buffer.from(await downloaded.arrayBuffer());
      assert(buffer.length > 500);
      await writeFile(
        `${exportsDir}/Lucas-Luh-Gomes-Curriculo.${format}`,
        buffer,
      );
      if (format === "pdf") {
        assert.equal(buffer.subarray(0, 5).toString(), "%PDF-");
        const pdf = await PDFDocument.load(buffer);
        assert(pdf.getPageCount() >= 2);
        assert(pdf.getPageCount() <= 5);
        const extracted = execFileSync(
          "pdftotext",
          ["-layout", `${exportsDir}/Lucas-Luh-Gomes-Curriculo.pdf`, "-"],
          { encoding: "utf8" },
        );
        for (const text of [
          "Lucas (Luh) Gomes",
          "Reddin",
          "UniVault",
          "TalkWeave",
          "FORMAÇÃO ACADÊMICA",
          "2026",
        ])
          assert(extracted.includes(text), `PDF contém ${text}`);
        assert(!/[\w.+-]+@[\w.-]+\.[a-z]{2,}/i.test(extracted));
      } else if (format === "docx") {
        assert.equal(buffer.subarray(0, 2).toString(), "PK");
        const xml = execFileSync(
          "unzip",
          [
            "-p",
            `${exportsDir}/Lucas-Luh-Gomes-Curriculo.docx`,
            "word/document.xml",
          ],
          { encoding: "utf8" },
        );
        assert(xml.includes("EXPERIÊNCIA PROFISSIONAL"));
        assert(xml.includes("Lucas (Luh) Gomes"));
        assert(!xml.includes("mailto:"));
      } else {
        assert(buffer.toString().includes("Lucas (Luh) Gomes"));
        assert(!/[\w.+-]+@[\w.-]+\.[a-z]{2,}/i.test(buffer.toString()));
      }
    }
  } finally {
    globalThis.document = originalDocument;
    globalThis.setTimeout = originalTimeout;
    URL.createObjectURL = originalCreate;
    globalThis.fetch = originalFetch;
  }
});
