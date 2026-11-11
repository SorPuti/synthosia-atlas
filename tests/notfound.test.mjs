import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { build } from "vite";
import { JSDOM } from "jsdom";

test("404 mantém progresso, abre portal, acende farol e completa os vinte caminhos", async () => {
  await build({
    configFile: false,
    logLevel: "silent",
    build: {
      lib: { entry: "src/notfound.ts", formats: ["es"], fileName: "lost" },
      outDir: "work/lost-test",
      emptyOutDir: true,
      minify: false,
    },
  });
  const dom = new JSDOM(await readFile("404.html", "utf8"), {
    url: "https://synthosia.com/coordenada-perdida",
  });
  const keys = [
    "window",
    "document",
    "HTMLElement",
    "Element",
    "CustomEvent",
    "localStorage",
    "matchMedia",
  ];
  const originals = new Map(keys.map((k) => [k, globalThis[k]]));
  for (const k of keys.filter((k) => k !== "matchMedia"))
    globalThis[k] = dom.window[k];
  globalThis.matchMedia = () => ({ matches: true });
  dom.window.HTMLDialogElement.prototype.showModal = function () {
    this.open = true;
  };
  dom.window.HTMLDialogElement.prototype.close = function () {
    this.open = false;
    this.dispatchEvent(new dom.window.Event("close"));
  };
  localStorage.setItem(
    "luh-atlas-discoveries",
    JSON.stringify([
      "compass",
      "unknown",
      "worlds",
      "konami",
      "42",
      "night",
      "signal",
      "portrait",
      "blueprint",
      "orbit",
      "echo",
      "seed",
      "thread",
      "childhood",
      "snake",
      "blocks",
      "workbench",
      "__proto__",
      "toString",
    ]),
  );
  const $ = (s) => document.querySelector(s),
    click = (s) => $(s).click(),
    close = () => click("[data-close-secret]");
  const word = (w) =>
    [...w].forEach((key) =>
      document.dispatchEvent(
        new dom.window.KeyboardEvent("keydown", { key, bubbles: true }),
      ),
    );
  try {
    await import("../work/lost-test/lost.js");
    assert($("h1").textContent.includes("ainda não chegou"));
    assert($("[data-egg-counter]").textContent.includes("17 / 20"));
    assert($("[data-return-portal]").hidden);
    click('[data-digit="1"]');
    assert($("#lost-trace").textContent.includes("0 / 3"));
    click('[data-digit="0"]');
    click('[data-digit="1"]');
    click('[data-digit="2"]');
    assert(!$("[data-return-portal]").hidden);
    assert($("#secret-dialog").open);
    close();
    click("[data-beacon]");
    assert(document.documentElement.classList.contains("beacon-lit"));
    close();
    word("ainda");
    assert(document.documentElement.classList.contains("lost-words-found"));
    assert($(".atlas-complete"));
    close();
    assert.equal(
      JSON.parse(localStorage.getItem("luh-atlas-discoveries")).length,
      20,
    );
    assert($("[data-egg-counter]").textContent.includes("20 / 20"));
    click("#motion-toggle");
    assert(document.documentElement.classList.contains("still"));
    click("#world-replay");
    assert(!document.documentElement.classList.contains("still"));
    assert($(".living-world"));
    click("[data-lost-notes]");
    assert.equal(document.querySelectorAll("[data-secret]").length, 14);
    close();
    const config = JSON.parse(await readFile("vercel.json", "utf8"));
    assert(
      config.redirects.some(
        (r) => r.source === "/about" && r.destination === "/#trajetoria",
      ),
    );
    assert(
      document.querySelector('meta[name="robots"]').content.includes("noindex"),
    );
  } finally {
    for (const [k, v] of originals) globalThis[k] = v;
    dom.window.close();
  }
});
