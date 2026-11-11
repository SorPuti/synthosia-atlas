import { createSnake } from "../lib/snake.mjs";

export function mountSnake(container: HTMLElement): () => void {
  const game = createSnake();
  let timer: ReturnType<typeof setInterval> | undefined;
  container.innerHTML =
    '<div class="terminal-top mono"><span>JAVA / PRIMEIROS MUNDOS</span><span>12 ANOS</span></div><pre class="snake-board" aria-hidden="true"></pre><p class="snake-status mono" role="status"></p><div class="snake-actions"><button class="button" data-snake-start>Começar</button><button class="text-button" data-snake-reset>Recomeçar</button></div><div class="snake-direction" aria-label="Controles da cobrinha"><button data-direction="up" aria-label="Cima">↑</button><button data-direction="left" aria-label="Esquerda">←</button><button data-direction="down" aria-label="Baixo">↓</button><button data-direction="right" aria-label="Direita">→</button></div><p class="game-instructions">Use as setas ou os botões. Coma ◆, evite as bordas. O primeiro mundo também podia caber num terminal.</p>';
  const start =
    container.querySelector<HTMLButtonElement>("[data-snake-start]")!;
  const stop = () => {
    if (timer !== undefined) clearInterval(timer);
    timer = undefined;
  };
  function render() {
    const s = game.snapshot();
    const grid = Array.from({ length: s.size }, () =>
      Array.from({ length: s.size }, () => "·"),
    );
    if (s.food) grid[s.food[1]][s.food[0]] = "◆";
    s.snake.forEach(
      ([x, y]: number[], i: number) => (grid[y][x] = i === 0 ? "●" : "■"),
    );
    container.querySelector(".snake-board")!.textContent = grid
      .map((row) => row.join(" "))
      .join("\n");
    container.querySelector(".snake-status")!.textContent =
      `${s.score} ponto${s.score === 1 ? "" : "s"} · ${s.state === "lost" ? "Fim de jogo. Outro mundo?" : s.state === "won" ? "Você preencheu o mundo!" : s.state === "running" ? "Em movimento" : s.state === "paused" ? "Em pausa" : "Pronto para começar"}`;
    start.textContent =
      s.state === "running"
        ? "Pausar"
        : s.state === "lost" || s.state === "won"
          ? "Outra partida"
          : s.state === "paused"
            ? "Continuar"
            : "Começar";
  }
  start.addEventListener("click", () => {
    if (game.snapshot().state === "running") {
      stop();
      game.pause();
      render();
      return;
    }
    if (["lost", "won"].includes(game.snapshot().state)) game.reset();
    game.start();
    stop();
    timer = setInterval(() => {
      if (!container.isConnected || !container.closest("dialog[open]")) {
        stop();
        return;
      }
      const s = game.tick();
      render();
      if (s.state !== "running") stop();
    }, 220);
    render();
  });
  container
    .querySelector("[data-snake-reset]")!
    .addEventListener("click", () => {
      stop();
      game.reset();
      render();
    });
  const directions: Record<string, [number, number]> = {
    ArrowUp: [0, -1],
    ArrowDown: [0, 1],
    ArrowLeft: [-1, 0],
    ArrowRight: [1, 0],
    up: [0, -1],
    down: [0, 1],
    left: [-1, 0],
    right: [1, 0],
  };
  container
    .querySelectorAll<HTMLButtonElement>("[data-direction]")
    .forEach((b) =>
      b.addEventListener("click", () =>
        game.turn(...directions[b.dataset.direction!]),
      ),
    );
  const onKey = (e: KeyboardEvent) => {
    if (
      !container.isConnected ||
      !container.closest("dialog[open]") ||
      !directions[e.key] ||
      game.snapshot().state !== "running"
    )
      return;
    e.preventDefault();
    game.turn(...directions[e.key]);
  };
  document.addEventListener("keydown", onKey);
  render();
  return () => {
    stop();
    document.removeEventListener("keydown", onKey);
  };
}

export function mountBlocks(container: HTMLElement): () => void {
  let heights: number[] = Array.from({ length: 25 }, (_, i) =>
    i === 12 ? 3 : i % 4 === 0 ? 1 : 0,
  );
  container.innerHTML =
    '<svg class="block-world" viewBox="0 0 360 270" role="group" aria-label="Mundo de blocos editável, cinco por cinco"></svg><p class="block-status mono" role="status">25 terrenos. Um mundo para inventar.</p><button class="text-button" data-block-reset>Recomeçar o terreno ↻</button><p class="game-instructions">Clique em um terreno ou use Tab e Enter. Cada toque acrescenta uma camada; depois da terceira, volta ao chão.</p>';
  const svg = container.querySelector<SVGElement>("svg")!;
  function render(focusIndex?: number) {
    svg.innerHTML = heights
      .map((h, i) => {
        const col = i % 5,
          row = Math.floor(i / 5),
          x = 180 + (col - row) * 29,
          y = 90 + (col + row) * 16,
          top = y - h * 15;
        return `<g data-cell="${i}" role="button" tabindex="0" aria-label="Bloco ${col + 1}, ${row + 1}; altura ${h}. Acrescentar camada."><path d="M${x - 29} ${top}l29 16v${h * 15 + 8}l-29-16z" fill="var(--block-left)"/><path d="M${x} ${top + 16}l29-16v${h * 15 + 8}l-29 16z" fill="var(--block-right)"/><path d="M${x} ${top - 16}l29 16-29 16-29-16z" fill="${h === 0 ? "var(--block-ground)" : "var(--block-top)"}"/></g>`;
      })
      .join("");
    if (focusIndex !== undefined)
      (
        svg.querySelector(`[data-cell="${focusIndex}"]`) as SVGElement & {
          focus: () => void;
        }
      )?.focus();
  }
  const add = (target: EventTarget | null, keyboard = false) => {
    if (!(target instanceof Element)) return;
    const cell = target.closest<SVGElement>("[data-cell]");
    if (!cell) return;
    const index = Number(cell.dataset.cell);
    heights[index] = (heights[index] + 1) % 4;
    render(keyboard ? index : undefined);
    container.querySelector(".block-status")!.textContent =
      `Terreno ${(index % 5) + 1}, ${Math.floor(index / 5) + 1}: altura ${heights[index]}. ${heights.reduce((a, b) => a + b, 0)} blocos no mundo.`;
  };
  svg.addEventListener("click", (e) => add(e.target));
  svg.addEventListener("keydown", (e) => {
    const key = (e as KeyboardEvent).key;
    if (key === "Enter" || key === " ") {
      e.preventDefault();
      add(e.target, true);
    }
  });
  container
    .querySelector("[data-block-reset]")!
    .addEventListener("click", () => {
      heights = Array(25).fill(0);
      render();
      container.querySelector(".block-status")!.textContent =
        "O terreno está vazio. Toda construção começa em algum lugar.";
    });
  render();
  return () => {};
}

export function mountWorkbench(container: HTMLElement): () => void {
  const memories: Record<string, string> = {
    phone:
      "Celulares abertos na bancada, peças pequenas e vontade de entender o que fazia tudo funcionar. Uma parte da minha curiosidade começou nesses consertos com meu pai.",
    ps2: "O PS2 também fazia parte dessa bancada. Entre consertos e desbloqueios com meu pai, o videogame era um objeto para investigar, além de um lugar para jogar.",
    parts:
      "Componentes antigos viravam motivo para olhar de perto, testar e aprender. Na minha visão de pequeno, meu pai era o rei da informática.",
  };
  container.innerHTML =
    '<div class="workbench" aria-label="Objetos da bancada de infância"><button data-memory="phone" aria-pressed="true"><span aria-hidden="true">▯</span>Celular</button><button data-memory="ps2" aria-pressed="false"><span aria-hidden="true">▤</span>PS2</button><button data-memory="parts" aria-pressed="false"><span aria-hidden="true">⌘</span>Componentes</button></div><p class="workbench-memory" role="status"></p>';
  const show = (key: string) => {
    container.querySelector(".workbench-memory")!.textContent = memories[key];
    container
      .querySelectorAll<HTMLButtonElement>("[data-memory]")
      .forEach((b) =>
        b.setAttribute("aria-pressed", String(b.dataset.memory === key)),
      );
  };
  container
    .querySelectorAll<HTMLButtonElement>("[data-memory]")
    .forEach((b) => b.addEventListener("click", () => show(b.dataset.memory!)));
  show("phone");
  return () => {};
}
