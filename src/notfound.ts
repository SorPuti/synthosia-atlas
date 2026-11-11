import "./fonts.css";
import "./style.css";
import "./world.css";
import "./notfound.css";
import { livingWorld } from "./world";
import { mountSecrets } from "./secrets";

const world = document.querySelector<HTMLElement>("#lost-world")!;
world.innerHTML = livingWorld();
const controller = mountSecrets({ context: "lost" });
let expectedDigit = 0;
const digits = document.querySelectorAll<HTMLButtonElement>("[data-digit]");
digits.forEach((button) =>
  button.addEventListener("click", () => {
    const index = Number(button.dataset.digit);
    if (index === expectedDigit) expectedDigit++;
    else expectedDigit = index === 0 ? 1 : 0;
    digits.forEach((digit, i) =>
      digit.setAttribute("aria-pressed", String(i < expectedDigit)),
    );
    document.querySelector("#lost-trace")!.textContent =
      expectedDigit === 3
        ? "Coordenada encontrada. O caminho de volta está aberto."
        : `${expectedDigit} / 3 sinais encontrados.`;
    if (expectedDigit === 3) {
      expectedDigit = 0;
      controller.discover("homecoming");
    }
  }),
);
const motion = document.querySelector<HTMLButtonElement>("#motion-toggle")!;
let paused = false;
motion.addEventListener("click", () => {
  paused = !paused;
  document.documentElement.classList.toggle("still", paused);
  motion.setAttribute("aria-pressed", String(paused));
  motion.setAttribute(
    "aria-label",
    paused ? "Retomar animações" : "Pausar animações",
  );
  motion.textContent = paused ? "▷" : "Ⅱ";
});
document.querySelector("#world-replay")!.addEventListener("click", () => {
  paused = false;
  document.documentElement.classList.remove("still");
  motion.setAttribute("aria-pressed", "false");
  motion.setAttribute("aria-label", "Pausar animações");
  motion.textContent = "Ⅱ";
  world.innerHTML = livingWorld();
});
document.querySelector("[data-egg-counter]")!.addEventListener("click", () => {
  document.querySelector<HTMLButtonElement>("[data-lost-notes]")!.click();
});
