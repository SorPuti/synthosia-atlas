import "./fonts.css";
import "./style.css";
import person from "./data/person.json";
import { globe, projectArt } from "./art";
import { current, isLive, refreshData } from "./live";
import { period } from "../lib/resume.mjs";

const $ = <T extends Element = HTMLElement>(selector: string) =>
  document.querySelector<T>(selector)!;
const escape = (s: string) =>
  s.replace(
    /[&<>"']/g,
    (c) =>
      ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[
        c
      ]!,
  );
const external = 'target="_blank" rel="noopener noreferrer"';
const arrow = '<span aria-hidden="true">↗</span>';

$("#app").innerHTML = `
  <header class="site-header wrap">
    <a href="#inicio" class="brand" aria-label="Luh Gomes, início"><span class="brand-mark" aria-hidden="true">✳</span><span>LUH GOMES<small>SORPUTI / ENGENHARIA & IMAGINAÇÃO</small></span></a>
    <nav aria-label="Navegação principal"><a href="#atlas">O atlas</a><a href="#trajetoria">Trajetória</a><a href="#caderno">Caderno</a></nav>
    <button class="button header-cv" data-cv>Currículo <span aria-hidden="true">↓</span></button>
  </header>
  <main>
    <section class="hero wrap" id="inicio" aria-labelledby="hero-title">
      <div class="hero-top mono"><span class="status-dot">UM UNIVERSO PESSOAL, EM CONSTRUÇÃO</span><span class="place">ITAPOÁ, SC <span class="clock"></span></span></div>
      <div class="hero-layout">
        <div class="hero-copy"><span class="eyebrow">LUCAS (LUH) GOMES <span>/ ELA · DELA</span></span>
          <h1 id="hero-title">Eu construo<br><em>mundos.</em></h1>
          <p class="hero-subtitle">Alguns começam com uma pergunta.<br>Outros, com uma linha de código.</p>
          <p class="hero-description">Sou engenheira de software. Entre sistemas backend, ferramentas e experimentos, gosto de dar forma ao que ainda não existe — e entender o que faz tudo continuar de pé.</p>
          <a class="explore-link" href="#atlas"><span class="round-arrow" aria-hidden="true">↓</span> Explorar meu trabalho <span class="mono">01—04</span></a>
        </div>
        <div class="hero-world"><div class="world-top mono"><span>FIG. 001 — CARTOGRAFIA DO POSSÍVEL</span><button class="icon-button" id="motion-toggle" aria-pressed="false" aria-label="Pausar animações" title="Pausar animações">Ⅱ</button></div>
          <div class="world-drawing">${globe()}<button id="unknown-star" class="unknown-star" aria-label="Explorar coordenada desconhecida" title="Um território ainda sem nome">?</button></div>
          <div class="world-caption mono"><span>ESCALA: CURIOSIDADE / ∞</span><span class="hand-note">o mapa nunca está pronto.</span></div>
        </div>
      </div>
      <div class="hero-bottom"><span class="mono">BACKEND · FERRAMENTAS · OPEN SOURCE</span><span class="small-note">Uma ideia precisa de espaço para virar mundo.</span><a href="#caderno" class="mono hidden-path">SIGA AS PISTAS <span aria-hidden="true">⌁</span></a></div>
    </section>

    <section class="atlas-section wrap section-space" id="atlas" aria-labelledby="atlas-title">
      <div class="section-heading"><div><span class="eyebrow">01 / TERRITÓRIOS EXPLORADOS</span><h2 id="atlas-title">Ideias que ganharam <em>forma.</em></h2></div><p>Quatro recortes do meu trabalho aberto.<br>Entre o que funciona e o que ainda me intriga.</p></div>
      <div class="project-selector" role="tablist" aria-label="Projetos selecionados">${person.projects.map((p, i) => `<button id="tab-${i}" class="project-tab ${i === 0 ? "active" : ""}" role="tab" aria-selected="${i === 0}" aria-controls="project-panel" tabindex="${i === 0 ? 0 : -1}" data-project="${i}"><span class="mono">${p.number}</span><span>${p.name}</span><span class="tab-arrow" aria-hidden="true">↗</span></button>`).join("")}</div>
      <div class="project-stage" id="project-panel" role="tabpanel" aria-labelledby="tab-0" tabindex="0"></div>
      <div class="atlas-footer mono"><span>PROJETOS ABERTOS. PERGUNTAS TAMBÉM.</span><a href="${person.github}?tab=repositories" ${external}>Ver todos no GitHub ${arrow}</a></div>
    </section>

    <section class="trajectory" id="trajetoria" aria-labelledby="trajectory-title"><div class="wrap trajectory-layout">
      <div class="trajectory-intro"><span class="eyebrow">02 / O CAMINHO ATÉ AQUI</span><h2 id="trajectory-title">Nada nasce<br>do <em>nada.</em></h2><p>Antes dos mundos, vieram as peças: serviços, conexões, documentos e muita vontade de entender.</p><p>Hoje, meu trabalho atravessa o backend e a automação. Fora dele, sigo abrindo espaço para experimentar.</p><div class="signature">Luh Gomes <span>↗</span></div><a class="underlined-link" href="${person.linkedin}" ${external}>Minha trajetória no LinkedIn ${arrow}</a></div>
      <div class="timeline"><div class="timeline-label mono">EXPERIÊNCIA / REGISTROS DE PERCURSO</div>${person.work.map((w, i) => `<article class="timeline-entry"><div class="timeline-date mono">${escape(period(w.startDate, w.endDate))}${i < 2 ? '<span class="current-label">ATUAL</span>' : ""}</div><div><h3>${escape(w.name)}</h3><p class="timeline-role">${escape(w.position)}</p><p>${escape(w.summary)}</p>${w.mode ? `<span class="timeline-mode mono">${escape(w.mode)}</span>` : ""}</div></article>`).join("")}<div class="education"><span class="mono">FORMAÇÃO</span><p>Centro Universitário Unifacvest <span>2024—2026</span></p><small>Em curso · conclusão prevista para 2026</small><p class="education-secondary">Ensino médio concluído · eeb GmbH</p></div></div>
    </div></section>

    <section class="origins wrap section-space" aria-labelledby="origins-title"><div class="section-heading"><div><span class="eyebrow">03 / FIOS QUE SE CONECTAM</span><h2 id="origins-title">O código muda.<br>A curiosidade <em>fica.</em></h2></div><p>Um percurso pelo que está público.<br>As datas são de criação dos repositórios.</p></div><div class="origin-line">
      <a href="https://github.com/SorPuti/Core" ${external}><span class="origin-point"></span><span class="mono">2021</span><h3>As peças fundamentais</h3><p>Java, módulos e integrações. O Core como ponto de encontro entre serviços.</p>${arrow}</a>
      <a href="https://github.com/SorPuti/socket-engine-java" ${external}><span class="origin-point"></span><span class="mono">2022</span><h3>Entre uma ponta e outra</h3><p>Sockets e comunicação em Java. A curiosidade sobre o que acontece entre sistemas.</p>${arrow}</a>
      <a href="https://github.com/SorPuti/core-framework" ${external}><span class="origin-point"></span><span class="mono">2026 / FEVEREIRO</span><h3>Ferramentas para construir</h3><p>Stride: APIs assíncronas e a busca por uma experiência de desenvolvimento mais produtiva.</p>${arrow}</a>
      <a href="#atlas"><span class="origin-point final-point"></span><span class="mono">2026 / AGORA</span><h3>Novos territórios</h3><p>Memória para agentes, voz e colaboração. Outros jeitos de fazer as peças conversarem.</p>${arrow}</a>
    </div></section>

    <section class="notebook-section" id="caderno" aria-labelledby="notebook-title"><div class="wrap notebook-layout"><div class="notebook-intro"><span class="eyebrow">04 / NOTAS DE QUEM CONSTRÓI</span><h2 id="notebook-title">Nem tudo cabe<br>num <em>README.</em></h2><p>O lado de dentro do trabalho: como penso, o que uso e algumas coisas deixadas pelo caminho.</p><div class="notebook-tabs" role="tablist" aria-label="Páginas do caderno"><button role="tab" id="note-tab-0" aria-controls="note-panel" aria-selected="true" data-note="0">01. Princípios</button><button role="tab" id="note-tab-1" aria-controls="note-panel" aria-selected="false" tabindex="-1" data-note="1">02. A bancada</button><button role="tab" id="note-tab-2" aria-controls="note-panel" aria-selected="false" tabindex="-1" data-note="2">03. Entrelinhas</button></div></div><div class="notebook-page" id="note-panel" role="tabpanel" aria-labelledby="note-tab-0" tabindex="0"></div></div></section>

    <section class="activity-section wrap section-space" aria-labelledby="activity-title"><div class="activity-heading"><div><span class="eyebrow">05 / O ATLAS CONTINUA</span><h2 id="activity-title">Ainda <em>fazendo.</em></h2></div><div class="data-status mono" id="data-status" role="status"></div></div><div id="recent-work" class="recent-work"></div><p class="source-note">Atividade de repositórios públicos próprios. Uma atualização de código pode ser um experimento, uma correção ou uma nova pergunta.</p></section>

    <section class="contact wrap"><div class="contact-top mono"><span>FIM DO MAPA. COMEÇO DE UMA CONVERSA.</span><span>SC / BR</span></div><div class="contact-main"><h2>Tem um mundo<br>em <em>mente?</em></h2><div><p>Gosto de conversar sobre problemas difíceis,<br>ferramentas úteis e ideias que ainda não têm nome.</p><a class="button contact-button" href="${person.linkedin}" ${external}>Vamos conversar no LinkedIn ${arrow}</a><div class="contact-links"><a href="${person.github}" ${external}>GitHub ${arrow}</a><button class="text-button" data-cv>Baixar currículo ↓</button></div></div></div></section>
  </main>
  <footer class="wrap site-footer"><a href="#inicio" class="footer-brand">LUH GOMES <span>/ SORPUTI</span></a><div class="footer-note"><span>Synthosia agora é um lugar para minha história.</span><span>Feito para ser explorado. © ${new Date().getFullYear()}</span></div><button class="egg-counter text-button mono" id="egg-counter" title="Ver pistas">HÁ MAIS DO QUE PARECE <span aria-hidden="true">✳</span></button></footer>
  <dialog id="cv-dialog" aria-labelledby="cv-title"><div class="dialog-top mono"><span>DOCUMENTO DE PERCURSO / CV</span><button class="close-button" data-close aria-label="Fechar currículo">×</button></div><span class="eyebrow">LUCAS (LUH) GOMES · ELA/DELA</span><h2 id="cv-title">Leve a história<br><em>com você.</em></h2><p>Uma coluna, texto selecionável e títulos claros para pessoas e sistemas de recrutamento (ATS). Sem e-mail, telefone ou foto.</p><div id="cv-status" class="cv-status" role="status"></div><div class="cv-formats">${[
    ["pdf", "PDF", "Pronto para enviar"],
    ["docx", "Word", "Editável · .docx"],
    ["txt", "Texto", "Universal · .txt"],
    ["md", "Markdown", "Texto estruturado"],
    ["json", "JSON Resume", "Dados estruturados"],
  ]
    .map(
      ([f, t, d]) =>
        `<button data-format="${f}"><strong>${t}</strong><small>${d}</small><span aria-hidden="true">↓</span></button>`,
    )
    .join(
      "",
    )}</div><p class="cv-footnote">Experiência e formação revisadas em 11/11/2026 a partir dos dados do LinkedIn fornecidos por Luh. Projetos e datas de código são consultados no GitHub; a data da consulta aparece no arquivo.</p><p class="cv-error" id="cv-error" role="alert"></p></dialog>
  <dialog id="secret-dialog" aria-labelledby="secret-title"><div class="dialog-top mono"><span>UM CAMINHO FORA DO MAPA</span><button class="close-button" data-close-secret aria-label="Fechar descoberta">×</button></div><div id="secret-content"></div></dialog>
  <div class="toast mono" id="toast" role="status"></div>
`;

let projectIndex = 0;
function selectProject(index: number, focus = false) {
  projectIndex = index;
  const p = person.projects[index];
  document
    .querySelectorAll<HTMLButtonElement>("[data-project]")
    .forEach((b, i) => {
      b.classList.toggle("active", i === index);
      b.setAttribute("aria-selected", String(i === index));
      b.tabIndex = i === index ? 0 : -1;
    });
  const panel = $("#project-panel");
  panel.setAttribute("aria-labelledby", `tab-${index}`);
  panel.innerHTML = `<div class="project-copy"><span class="project-category mono">${p.category.toUpperCase()} <span>${p.year}</span></span><h3>${p.headline.split("\n").map(escape).join("<br>")}</h3><p class="project-description">${p.description}</p><p class="project-detail">${p.detail}</p><div class="project-actions"><a href="${p.url}" ${external}>Explorar o projeto ${arrow}</a>${p.demo ? `<a class="project-demo" href="${p.demo}" ${external}>Documentação ${arrow}</a>` : ""}</div><span class="project-stack mono">${p.stack}</span></div><div class="project-visual"><div class="visual-label mono"><span>ESTUDO ${p.number} / ${p.name.toUpperCase()}</span><span>+</span></div>${projectArt(index)}<div class="visual-bottom mono"><span>${p.tag.toUpperCase()}</span><span>FIG. 00${index + 2}</span></div></div>`;
  if (focus) $(`#tab-${index}`).focus();
}
document
  .querySelectorAll<HTMLButtonElement>("[data-project]")
  .forEach((b) =>
    b.addEventListener("click", () => selectProject(Number(b.dataset.project))),
  );
function tabKeys(
  e: KeyboardEvent,
  index: number,
  count: number,
  fn: (n: number, f: boolean) => void,
) {
  if (["ArrowRight", "ArrowLeft", "Home", "End"].includes(e.key)) {
    e.preventDefault();
    fn(
      e.key === "Home"
        ? 0
        : e.key === "End"
          ? count - 1
          : (index + (e.key === "ArrowRight" ? 1 : count - 1)) % count,
      true,
    );
  }
}
$(".project-selector").addEventListener("keydown", (e) =>
  tabKeys(e as KeyboardEvent, projectIndex, 4, selectProject),
);
selectProject(0);

const notes = [
  `<span class="mono page-number">PÁGINA 01 / PRINCÍPIOS</span><h3>Primeiro, entender.<br>Depois, dar forma.</h3><p>Uma versão pequena que funciona abre mais caminhos do que uma ideia enorme que nunca sai do lugar.</p><p>No meu trabalho, isso vira APIs, automações e ferramentas que outras pessoas conseguem usar e continuar. Clareza na documentação. Cuidado com o que já funciona. Espaço para melhorar.</p><button class="pencil-note" type="button">construir também é saber revisar.</button>`,
  `<span class="mono page-number">PÁGINA 02 / A BANCADA</span><h3>As ferramentas<br>seguem a pergunta.</h3>${person.skills.map((s) => `<div class="bench-item"><span class="mono">${s.name.toUpperCase()}</span><p>${s.keywords.join(" · ")}</p></div>`).join("")}<button class="pencil-note" type="button">não é coleção. é repertório.</button>`,
  `<span class="mono page-number">PÁGINA 03 / ENTRELINHAS</span><h3>Para quem olha<br>um pouco mais.</h3><p>Existem sete caminhos escondidos neste atlas. Alguns estão nas margens. Outros respondem a quem insiste — ou lembra de um código antigo.</p><p>Uma pista para começar: mundos não aparecem só quando a gente olha. Às vezes, é preciso escrever.</p><button class="margin-number" id="margin-42" aria-label="Explorar anotação 42">42</button><button class="pencil-note" type="button">o vazio também guarda coordenadas.</button>`,
];
let noteIndex = 0;
function selectNote(index: number, focus = false) {
  noteIndex = index;
  document
    .querySelectorAll<HTMLButtonElement>("[data-note]")
    .forEach((b, i) => {
      b.setAttribute("aria-selected", String(i === index));
      b.tabIndex = i === index ? 0 : -1;
    });
  $("#note-panel").innerHTML = notes[index];
  $("#note-panel").setAttribute("aria-labelledby", `note-tab-${index}`);
  $("#margin-42")?.addEventListener("click", () => discover("42"));
  if (focus) $(`#note-tab-${index}`).focus();
}
document
  .querySelectorAll<HTMLButtonElement>("[data-note]")
  .forEach((b) =>
    b.addEventListener("click", () => selectNote(Number(b.dataset.note))),
  );
$(".notebook-tabs").addEventListener("keydown", (e) =>
  tabKeys(e as KeyboardEvent, noteIndex, 3, selectNote),
);
selectNote(0);

const dateTime = (date: string) =>
  new Intl.DateTimeFormat("pt-BR", {
    dateStyle: "short",
    timeStyle: "short",
    timeZone: "America/Sao_Paulo",
  }).format(new Date(date));
function renderLive() {
  const date = dateTime(current.checkedAt);
  $("#data-status").innerHTML =
    `<span class="status-dot">${isLive ? "CONSULTA AO GITHUB" : "CÓPIA PÚBLICA SALVA"}</span><span>${date} · BRASÍLIA</span>`;
  $("#cv-status").textContent =
    `${isLive ? "GitHub consultado" : "Usando cópia pública salva"} em ${date} (Brasília).${isLive ? "" : " A consulta online está indisponível agora."}`;
  $("#recent-work").innerHTML = current.repos
    .filter((r) => !["SorPuti", "synthosia-atlas"].includes(r.name))
    .slice(0, 3)
    .map(
      (r, i) =>
        `<a href="${r.url}" ${external}><span class="mono recent-index">0${i + 1}</span><div><h3>${escape(r.name)}</h3><p>${escape(r.description || "Código, experimentos e novas possibilidades.")}</p></div><span class="mono recent-language">${escape(r.language || "CÓDIGO")}</span><time class="mono" datetime="${r.pushedAt}">${r.pushedAt ? new Intl.DateTimeFormat("pt-BR", { day: "2-digit", month: "short", year: "numeric", timeZone: "America/Sao_Paulo" }).format(new Date(r.pushedAt)) : "—"}</time>${arrow}</a>`,
    )
    .join("");
}
document.addEventListener("profile-updated", renderLive);
renderLive();
void refreshData();

const cvDialog = $<HTMLDialogElement>("#cv-dialog");
document.querySelectorAll("[data-cv]").forEach((b) =>
  b.addEventListener("click", () => {
    cvDialog.showModal();
    $("#cv-status").textContent =
      "Consultando os registros públicos no GitHub…";
    $("#cv-error").textContent = "";
    void refreshData();
  }),
);
$("[data-close]").addEventListener("click", () => cvDialog.close());
let exporting = false;
document.querySelectorAll<HTMLButtonElement>("[data-format]").forEach((b) =>
  b.addEventListener("click", async () => {
    if (exporting) return;
    exporting = true;
    $("#cv-error").textContent = "";
    document
      .querySelectorAll<HTMLButtonElement>("[data-format]")
      .forEach((el) => (el.disabled = true));
    $("#cv-status").textContent =
      "Conferindo os dados e preparando seu arquivo…";
    try {
      const data = await refreshData();
      const { downloadResume } = await import("./cv");
      await downloadResume(b.dataset.format!, data);
      toast("CURRÍCULO PREPARADO. BOM CAMINHO.");
    } catch {
      $("#cv-error").textContent =
        "Não foi possível gerar este arquivo. Tente novamente ou escolha o formato Texto.";
    } finally {
      exporting = false;
      document
        .querySelectorAll<HTMLButtonElement>("[data-format]")
        .forEach((el) => (el.disabled = false));
      renderLive();
    }
  }),
);

let motionPaused = false;
$("#motion-toggle").addEventListener("click", () => {
  motionPaused = !motionPaused;
  document.documentElement.classList.toggle("still", motionPaused);
  $("#motion-toggle").setAttribute("aria-pressed", String(motionPaused));
  $("#motion-toggle").setAttribute(
    "aria-label",
    motionPaused ? "Retomar animações" : "Pausar animações",
  );
  $("#motion-toggle").textContent = motionPaused ? "▷" : "Ⅱ";
});
function clock() {
  $(".clock").textContent =
    `· ${new Intl.DateTimeFormat("pt-BR", { hour: "2-digit", minute: "2-digit", timeZone: "America/Sao_Paulo" }).format(new Date())}`;
}
clock();
setInterval(clock, 60_000);

// Secrets are local, opt-in discoveries. No analytics or network side effects.
const secrets: Record<string, { name: string; body: string }> = {
  compass: {
    name: "A bússola insiste",
    body: "Três voltas no mesmo lugar também podem ser um começo. A marca virou uma bússola: agora ela aponta para o próximo experimento.",
  },
  unknown: {
    name: "Terra incognita",
    body: "Você encontrou uma coordenada sem nome. Todo mundo que existe hoje já foi esse pequeno ponto de interrogação no mapa de alguém.",
  },
  worlds: {
    name: "A palavra abre a porta",
    body: "Mundos. Uma palavra pequena para tudo o que ainda dá para inventar. Este atlas não precisa ter um fim — só precisa continuar tendo perguntas.",
  },
  konami: {
    name: "Continue?",
    body: "↑ ↑ ↓ ↓ ← → ← → B A. Há coisas que a memória guarda nas mãos. Um pequeno território de jogos apareceu no seu mapa.",
  },
  "42": {
    name: "Uma resposta na margem",
    body: "42. A resposta existe. A parte boa continua sendo descobrir qual era a pergunta.",
  },
  night: {
    name: "O outro lado do atlas",
    body: "A noite também é um jeito de olhar. A luz mudou; os caminhos continuam aqui. Digite “noite” outra vez para voltar.",
  },
  signal: {
    name: "O mapa respondeu",
    body: "Uma ilha pode ser um sinal. Este som foi desenhado aqui, sem voz ou gravação: só duas notas se encontrando. Clique em “Ouvir o sinal” se quiser escutar.",
  },
};
let found = new Set<string>();
try {
  const saved = JSON.parse(
    localStorage.getItem("luh-atlas-discoveries") || "[]",
  );
  if (Array.isArray(saved))
    found = new Set(
      saved.filter((k: unknown) => typeof k === "string" && k in secrets),
    );
} catch {
  /* Storage is optional. */
}
const secretDialog = $<HTMLDialogElement>("#secret-dialog");
function updateCounter() {
  $("#egg-counter").innerHTML = found.size
    ? `${found.size} / 7 CAMINHOS DESCOBERTOS <span aria-hidden="true">✳</span>`
    : 'HÁ MAIS DO QUE PARECE <span aria-hidden="true">✳</span>';
}
function discover(key: string) {
  const s = secrets[key];
  if (!s) return;
  found.add(key);
  try {
    localStorage.setItem("luh-atlas-discoveries", JSON.stringify([...found]));
  } catch {}
  updateCounter();
  document.documentElement.classList.toggle("has-secret", found.size > 0);
  $("#secret-content").innerHTML =
    `<span class="eyebrow">DESCOBERTA ${found.size.toString().padStart(2, "0")} / 07</span><h2 id="secret-title">${s.name}</h2><p>${s.body}</p>${key === "signal" ? '<button id="play-signal" class="button">Ouvir o sinal ♫</button>' : ""}${key === "konami" ? '<div class="pixel-world" aria-label="Pequena ilha em pixel art"><span>▟▙</span><span>▞██▚</span><span>▔▔▔▔</span></div>' : ""}<span class="secret-signoff mono">DE LUH, PARA QUEM EXPLORA.</span>`;
  if (!secretDialog.open) secretDialog.showModal();
  $("#play-signal")?.addEventListener("click", playSignal);
}
$("[data-close-secret]").addEventListener("click", () => secretDialog.close());
[cvDialog, secretDialog].forEach((d) =>
  d.addEventListener("click", (e) => {
    if (e.target !== d) return;
    const r = d.getBoundingClientRect();
    if (
      e.clientX < r.left ||
      e.clientX > r.right ||
      e.clientY < r.top ||
      e.clientY > r.bottom
    )
      d.close();
  }),
);
let brandClicks = 0;
let brandTimer: ReturnType<typeof setTimeout>;
$(".brand").addEventListener("click", () => {
  brandClicks++;
  clearTimeout(brandTimer);
  brandTimer = setTimeout(() => (brandClicks = 0), 1800);
  if (brandClicks === 3) {
    brandClicks = 0;
    $(".brand-mark").classList.add("compass-found");
    discover("compass");
  }
});
$("#unknown-star").addEventListener("click", () => discover("unknown"));
$("#egg-counter").addEventListener("click", () => {
  selectNote(2);
  $("#caderno").scrollIntoView({
    behavior: matchMedia("(prefers-reduced-motion: reduce)").matches
      ? "instant"
      : "smooth",
  });
});
const konami = [
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
];
let keyIndex = 0,
  typed = "";
document.addEventListener("keydown", (e) => {
  if (
    e.ctrlKey ||
    e.metaKey ||
    e.altKey ||
    (e.target instanceof HTMLElement &&
      e.target.matches('input,textarea,[contenteditable="true"]'))
  )
    return;
  if (cvDialog.open || secretDialog.open) return;
  if (e.key === konami[keyIndex]) {
    keyIndex++;
    if (keyIndex === konami.length) {
      keyIndex = 0;
      discover("konami");
    }
  } else keyIndex = e.key === konami[0] ? 1 : 0;
  if (e.key.length === 1) {
    typed = (typed + e.key.toLowerCase()).slice(-12);
    if (typed.endsWith("mundos")) {
      typed = "";
      discover("worlds");
    }
    if (typed.endsWith("noite")) {
      typed = "";
      document.documentElement.classList.toggle("night");
      discover("night");
    }
    if (typed.endsWith("sinal")) {
      typed = "";
      discover("signal");
    }
  }
});
async function playSignal() {
  try {
    const audio = new AudioContext();
    await audio.resume();
    [392, 523.25].forEach((frequency, i) => {
      const oscillator = audio.createOscillator(),
        gain = audio.createGain();
      oscillator.type = "sine";
      oscillator.frequency.value = frequency;
      gain.gain.setValueAtTime(0, audio.currentTime + i * 0.22);
      gain.gain.linearRampToValueAtTime(
        0.06,
        audio.currentTime + i * 0.22 + 0.03,
      );
      gain.gain.exponentialRampToValueAtTime(
        0.001,
        audio.currentTime + i * 0.22 + 0.7,
      );
      oscillator.connect(gain);
      gain.connect(audio.destination);
      oscillator.start(audio.currentTime + i * 0.22);
      oscillator.stop(audio.currentTime + i * 0.22 + 0.75);
    });
    setTimeout(() => void audio.close(), 1500);
  } catch {
    toast("O NAVEGADOR NÃO LIBEROU O ÁUDIO. A DESCOBERTA ESTÁ GUARDADA.");
  }
}
updateCounter();
let toastTimer: ReturnType<typeof setTimeout>;
function toast(message: string) {
  $("#toast").textContent = message;
  $("#toast").classList.add("visible");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => $("#toast").classList.remove("visible"), 4500);
}

// The typed secrets also have a touch route tucked into the notebook margin.
let marginClicks = 0;
$("#note-panel").addEventListener("click", (e) => {
  if (!(e.target instanceof Element) || !e.target.closest(".pencil-note"))
    return;
  marginClicks++;
  if (marginClicks === 3) {
    marginClicks = 0;
    $("#secret-content").innerHTML =
      '<span class="eyebrow">PARA EXPLORAR SEM TECLADO</span><h2 id="secret-title">Outra entrada.</h2><p>Alguns caminhos também cabem na palma da mão.</p><div class="touch-secrets"><button data-secret="worlds">Escrever mundos</button><button data-secret="night">Acender a noite</button><button data-secret="konami">Lembrar um código</button><button data-secret="signal">Encontrar um sinal</button></div>';
    secretDialog.showModal();
    document.querySelectorAll<HTMLButtonElement>("[data-secret]").forEach((b) =>
      b.addEventListener("click", () => {
        if (b.dataset.secret === "night")
          document.documentElement.classList.toggle("night");
        discover(b.dataset.secret!);
      }),
    );
  }
});
