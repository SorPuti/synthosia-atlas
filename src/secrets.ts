import { mountSnake, mountBlocks, mountWorkbench } from "./play";
import "./play.css";
type Secret = { name: string; body: string };
const secrets: Record<string, Secret> = {
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
    body: "A noite também é um jeito de olhar. Digite “noite” outra vez para voltar. O mundo continua trabalhando, mesmo depois que o céu escurece.",
  },
  signal: {
    name: "O mapa respondeu",
    body: "Uma ilha pode ser um sinal. Este som foi desenhado aqui, sem voz ou gravação: só duas notas se encontrando. Ouça se quiser.",
  },
  portrait: {
    name: "Fora do enquadramento",
    body: "Antes dos sistemas, existe alguém curioso do outro lado da tela. Lucas, Luh, SorPuti: nomes diferentes para a mesma vontade de fazer as peças conversarem.",
  },
  blueprint: {
    name: "Antes da matéria",
    body: "Você encontrou o desenho antes do mundo. O atlas virou uma planta em azul: uma lembrança de que tudo começou como estrutura, tentativa e imaginação. “azul” devolve o papel.",
  },
  orbit: {
    name: "As ideias têm órbita",
    body: "Nem toda ideia precisa pousar agora. Algumas ficam por perto até encontrarem a conexão certa. As órbitas do seu mundo estão visíveis; “orbita” as recolhe.",
  },
  echo: {
    name: "Escutar também é construir",
    body: "Uma pequena homenagem às perguntas do TalkWeave: voz não é só emitir. É perceber o outro lado, deixar espaço e continuar a conversa.",
  },
  seed: {
    name: "Uma semente no código",
    body: "Nem tudo o que cresce precisa parecer uma máquina. Você plantou uma árvore na ilha. Ela fica guardada neste navegador — um pequeno pedaço vivo entre as construções.",
  },
  thread: {
    name: "O fio entre as coisas",
    body: "Backend, memória, voz, colaboração. Você costurou os quatro territórios. Um mundo fica maior quando uma parte consegue conversar com a outra.",
  },
  homecoming: {
    name: "404 não é o fim",
    body: "Você leu a coordenada na ordem certa. O portal abriu: um caminho que não existia agora consegue levar alguém para casa.",
  },
  beacon: {
    name: "O farol de quem se perde",
    body: "Nem toda falha pede uma parede. Às vezes pede uma luz, uma direção e outra tentativa. O farol ficou aceso para o próximo viajante.",
  },
  lostwords: {
    name: "A palavra que faltava",
    body: "Ainda. Talvez seja a palavra mais útil para quem constrói: não funciona ainda, não entendi ainda, não existe ainda. O céu encontrou sua anotação.",
  },
  childhood: {
    name: "Aos doze, um mundo no terminal",
    body: "Comecei a aprender Java aos 12 anos, escrevendo jogos de cobrinha no terminal. Vieram também os servidores de Minecraft e a vontade de criar mundos inteiros, bloco por bloco. A escala mudou; a curiosidade vem de lá.",
  },
  snake: {
    name: "Um primeiro mundo de cobrinha",
    body: "Uma homenagem aos jogos que eu escrevia no terminal quando comecei a aprender Java. Aqui, o mundo cabe em doze linhas — e continua dando vontade de jogar mais uma.",
  },
  blocks: {
    name: "Só mais um bloco",
    body: "Criar servidores de Minecraft e inventar mundos em blocos faz parte da minha história. Este pequeno terreno é seu por alguns minutos: acrescente camadas e descubra o que aparece.",
  },
  workbench: {
    name: "O rei da informática",
    body: "Quando eu era pequeno, meu pai era o rei da informática aos meus olhos. Com ele, eu consertava celulares, PS2 e componentes antigos, e também aprendia nos desbloqueios. Essa bancada fazia parte do meu jeito de descobrir o mundo.",
  },
};
export const SECRET_COUNT = Object.keys(secrets).length;
const storageKey = "luh-atlas-discoveries";
const commands: Record<string, string> = {
  mundos: "worlds",
  noite: "night",
  sinal: "signal",
  azul: "blueprint",
  orbita: "orbit",
  eco: "echo",
  semente: "seed",
  juntos: "thread",
  ainda: "lostwords",
  doze: "childhood",
  cobrinha: "snake",
  blocos: "blocks",
  bancada: "workbench",
};

export function mountSecrets(options: {
  context: "atlas" | "lost";
  toast?: (message: string) => void;
}) {
  const $ = <T extends Element = HTMLElement>(selector: string) =>
    document.querySelector<T>(selector);
  const dialog = $<HTMLDialogElement>("#secret-dialog")!;
  const content = $("#secret-content")!;
  let cleanupGame: (() => void) | undefined;
  const stopGame = () => {
    cleanupGame?.();
    cleanupGame = undefined;
  };
  dialog.addEventListener("close", stopGame);
  let found = new Set<string>();
  try {
    const saved: unknown = JSON.parse(localStorage.getItem(storageKey) || "[]");
    if (Array.isArray(saved))
      found = new Set(
        saved.filter(
          (k: unknown): k is string =>
            typeof k === "string" && Object.hasOwn(secrets, k),
        ),
      );
  } catch {
    /* Discoveries work even when storage is unavailable. */
  }
  const updateCounter = () => {
    document
      .querySelectorAll<HTMLElement>("[data-egg-counter]")
      .forEach((el) => {
        el.innerHTML = found.size
          ? `${found.size} / ${SECRET_COUNT} CAMINHOS DESCOBERTOS <span aria-hidden="true">✳</span>`
          : 'HÁ MAIS DO QUE PARECE <span aria-hidden="true">✳</span>';
      });
  };
  const restoreWorld = () => {
    for (const [key, css] of [
      ["seed", "seed-planted"],
      ["thread", "thread-found"],
      ["beacon", "beacon-lit"],
      ["lostwords", "lost-words-found"],
    ])
      document.documentElement.classList.toggle(css, found.has(key));
    const portal = $<HTMLAnchorElement>("[data-return-portal]");
    if (portal) portal.hidden = !found.has("homecoming");
  };
  function discover(key: string) {
    if (!Object.hasOwn(secrets, key)) return;
    if (
      options.context !== "lost" &&
      ["homecoming", "beacon", "lostwords"].includes(key)
    )
      return;
    if (key === "night") {
      document.documentElement.classList.remove("blueprint");
      document.documentElement.classList.toggle("night");
    }
    if (key === "blueprint") {
      document.documentElement.classList.remove("night");
      document.documentElement.classList.toggle("blueprint");
    }
    if (key === "orbit")
      document.documentElement.classList.toggle("orbit-found");
    if (key === "compass") $(".brand-mark")?.classList.add("compass-found");
    found.add(key);
    try {
      localStorage.setItem(storageKey, JSON.stringify([...found]));
    } catch {}
    restoreWorld();
    updateCounter();
    stopGame();
    const s = secrets[key];
    content.innerHTML = `<span class="eyebrow">DESCOBERTA ${found.size.toString().padStart(2, "0")} / ${SECRET_COUNT}</span><h2 id="secret-title">${s.name}</h2><p>${s.body}</p>${
      key === "signal"
        ? '<button id="play-signal" class="button">Ouvir o sinal ♫</button>'
        : key === "portrait"
          ? '<figure class="secret-portrait"><img src="/luh-github-avatar.jpg" alt="Lucas (Luh) Gomes" width="220" height="220"><figcaption class="mono">LUH / SORPUTI — A PESSOA POR TRÁS DO MAPA</figcaption></figure>'
          : key === "konami"
            ? '<div class="pixel-world" aria-label="Pequena ilha em pixel art"><span>▟▙</span><span>▞██▚</span><span>▔▔▔▔</span></div>'
            : key === "echo"
              ? '<div class="secret-echo" aria-label="Oi. Estou aqui. Vamos construir?"><span>oi.</span><span>estou aqui.</span><span>vamos construir?</span></div>'
              : key === "snake"
                ? '<div id="secret-play" class="terminal-game"></div>'
                : key === "blocks"
                  ? '<div id="secret-play" class="block-game"></div>'
                  : key === "workbench"
                    ? '<div id="secret-play"></div>'
                    : key === "homecoming"
                      ? '<a href="/#atlas" class="button secret-home-link">Atravessar o portal ↗</a>'
                      : ""
    }<span class="secret-signoff mono">DE LUH, PARA QUEM EXPLORA.</span>${found.size === SECRET_COUNT ? '<div class="atlas-complete"><span aria-hidden="true">✳</span><p>Você percorreu todos os caminhos.<br>Agora o mapa também é um pouco seu.</p></div>' : ""}`;
    if (!dialog.open) dialog.showModal();
    $("#play-signal")?.addEventListener("click", playSignal);
    const play = $("#secret-play");
    if (play && key === "snake") cleanupGame = mountSnake(play);
    if (play && key === "blocks") cleanupGame = mountBlocks(play);
    if (play && key === "workbench") cleanupGame = mountWorkbench(play);
  }
  $("[data-close-secret]")?.addEventListener("click", () => {
    stopGame();
    dialog.close();
  });
  document.querySelectorAll<HTMLDialogElement>("dialog").forEach((d) =>
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
  function repeatedClick(selector: string, count: number, key: string) {
    let clicks = 0;
    let timer: ReturnType<typeof setTimeout>;
    $(selector)?.addEventListener("click", () => {
      clicks++;
      clearTimeout(timer);
      timer = setTimeout(() => (clicks = 0), 1800);
      if (clicks === count) {
        clicks = 0;
        discover(key);
      }
    });
  }
  repeatedClick(".brand", 3, "compass");
  repeatedClick(".hero-portrait", 2, "portrait");
  $("#unknown-star")?.addEventListener("click", () => discover("unknown"));
  $("[data-beacon]")?.addEventListener("click", () => discover("beacon"));

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
    typed = "",
    lastTyped = 0;
  document.addEventListener("keydown", (e) => {
    if (
      e.ctrlKey ||
      e.metaKey ||
      e.altKey ||
      e.isComposing ||
      (e.target instanceof HTMLElement &&
        e.target.closest('input,textarea,select,[contenteditable="true"]'))
    )
      return;
    if (document.querySelector("dialog[open]")) return;
    const k = e.key.length === 1 ? e.key.toLowerCase() : e.key;
    if (k === konami[keyIndex]) {
      keyIndex++;
      if (keyIndex === konami.length) {
        keyIndex = 0;
        discover("konami");
      }
    } else keyIndex = k === konami[0] ? 1 : 0;
    if (k.length !== 1) return;
    if (Date.now() - lastTyped > 4000) typed = "";
    lastTyped = Date.now();
    typed = (typed + k).slice(-16);
    for (const [word, key] of Object.entries(commands)) {
      if (typed.endsWith(word)) {
        typed = "";
        discover(key);
        break;
      }
    }
  });

  const touchEntries: [string, string][] = [
    ["worlds", "Escrever mundos"],
    ["night", "Acender a noite"],
    ["konami", "Lembrar um código"],
    ["signal", "Encontrar um sinal"],
    ["blueprint", "Abrir uma planta azul"],
    ["orbit", "Seguir uma órbita"],
    ["echo", "Escutar um eco"],
    ["seed", "Plantar uma semente"],
    ["thread", "Costurar conexões"],
    ["childhood", "Abrir uma velha gaveta"],
    ["snake", "Ligar o terminal"],
    ["blocks", "Colocar só mais um bloco"],
    ["workbench", "Sentar na bancada"],
  ];
  if (options.context === "lost")
    touchEntries.push(["lostwords", "Completar uma frase"]);
  const touchMenu = () => {
    stopGame();
    content.innerHTML = `<span class="eyebrow">PARA EXPLORAR SEM TECLADO</span><h2 id="secret-title">Outra entrada.</h2><p>Alguns caminhos também cabem na palma da mão.</p><div class="touch-secrets">${touchEntries.map(([key, name]) => `<button data-secret="${key}">${name}</button>`).join("")}</div>`;
    if (!dialog.open) dialog.showModal();
    content
      .querySelectorAll<HTMLButtonElement>("[data-secret]")
      .forEach((b) =>
        b.addEventListener("click", () => discover(b.dataset.secret!)),
      );
  };
  let marginClicks = 0;
  $("#note-panel")?.addEventListener("click", (e) => {
    if (!(e.target instanceof Element) || !e.target.closest(".pencil-note"))
      return;
    if (++marginClicks === 3) {
      marginClicks = 0;
      touchMenu();
    }
  });
  $("[data-lost-notes]")?.addEventListener("click", touchMenu);

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
      options.toast?.(
        "O NAVEGADOR NÃO LIBEROU O ÁUDIO. A DESCOBERTA ESTÁ GUARDADA.",
      );
    }
  }
  restoreWorld();
  updateCounter();
  return { discover };
}
