import test from "node:test";
import assert from "node:assert/strict";
import { build } from "vite";
import { JSDOM } from "jsdom";

test("abas, currículo, pausa e sete descobertas funcionam inclusive com API indisponível", async () => {
  await build({
    configFile: false,
    logLevel: "silent",
    build: {
      lib: { entry: "src/main.ts", formats: ["es"], fileName: "app" },
      outDir: "work/dom-test",
      emptyOutDir: true,
      minify: false,
    },
  });
  const dom = new JSDOM(
    '<!doctype html><html><body><div id="app"></div></body></html>',
    { url: "https://synthosia.com/" },
  );
  const globals = [
    "window",
    "document",
    "HTMLElement",
    "Element",
    "CustomEvent",
    "localStorage",
    "matchMedia",
    "fetch",
    "setInterval",
  ];
  const originals = new Map(globals.map((k) => [k, globalThis[k]]));
  for (const key of [
    "window",
    "document",
    "HTMLElement",
    "Element",
    "CustomEvent",
    "localStorage",
  ])
    globalThis[key] = dom.window[key];
  globalThis.matchMedia = () => ({ matches: true });
  globalThis.fetch = async () => new Response("{}", { status: 503 });
  globalThis.setInterval = () => 0;
  dom.window.HTMLDialogElement.prototype.showModal = function () {
    this.open = true;
  };
  dom.window.HTMLDialogElement.prototype.close = function () {
    this.open = false;
  };
  dom.window.HTMLElement.prototype.scrollIntoView = function () {};
  const $ = (s) => document.querySelector(s);
  const click = (s) => $(s).click();
  const key = (k) =>
    document.dispatchEvent(
      new dom.window.KeyboardEvent("keydown", { key: k, bubbles: true }),
    );
  const word = (w) => [...w].forEach(key);
  try {
    await import("../work/dom-test/app.js");
    assert.equal($("h1").textContent, "Eu construomundos.");
    click('[data-project="2"]');
    assert.equal($("#project-panel").getAttribute("aria-labelledby"), "tab-2");
    assert($("#project-panel").textContent.includes("estado atual"));
    $("#tab-2").dispatchEvent(
      new dom.window.KeyboardEvent("keydown", {
        key: "ArrowRight",
        bubbles: true,
      }),
    );
    assert.equal($("#tab-3").getAttribute("aria-selected"), "true");
    click('[data-note="1"]');
    assert($("#note-panel").textContent.includes("PostgreSQL"));
    click("[data-cv]");
    assert($("#cv-dialog").open);
    assert.equal(document.querySelectorAll("[data-format]").length, 5);
    click("[data-close]");
    click("#motion-toggle");
    assert(document.documentElement.classList.contains("still"));
    assert.equal($("#motion-toggle").getAttribute("aria-pressed"), "true");
    const close = () => click("[data-close-secret]");
    click(".brand");
    click(".brand");
    click(".brand");
    assert($("#secret-dialog").open);
    close();
    click("#unknown-star");
    close();
    word("mundos");
    close();
    [
      "ArrowUp",
      "ArrowUp",
      "ArrowDown",
      "ArrowDown",
      "ArrowLeft",
      "ArrowRight",
      "ArrowLeft",
      "ArrowRight",
      "b",
      "a",
    ].forEach(key);
    assert($(".pixel-world"));
    close();
    click('[data-note="2"]');
    click("#margin-42");
    close();
    word("noite");
    assert(document.documentElement.classList.contains("night"));
    close();
    word("sinal");
    assert($("#play-signal"));
    close();
    assert.equal(
      JSON.parse(localStorage.getItem("luh-atlas-discoveries")).length,
      7,
    );
    assert($("#egg-counter").textContent.includes("7 / 7"));
    // Touch/keyboard route to hidden commands has real buttons.
    click(".pencil-note");
    click(".pencil-note");
    click(".pencil-note");
    assert.equal(document.querySelectorAll("[data-secret]").length, 4);
    close();
    await new Promise((resolve) => setTimeout(resolve, 20));
    assert($("#data-status").textContent.includes("CÓPIA PÚBLICA SALVA"));
    assert(!/[\w.+-]+@[\w.-]+\.[a-z]{2,}/i.test(document.body.textContent));
  } finally {
    for (const [key, value] of originals) globalThis[key] = value;
    dom.window.close();
  }
});
