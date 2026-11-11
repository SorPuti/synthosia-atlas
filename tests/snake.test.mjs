import test from "node:test";
import assert from "node:assert/strict";
import { createSnake } from "../lib/snake.mjs";

test("cobrinha cresce ao comer, impede reversão e termina na borda", () => {
  const game = createSnake();
  assert.equal(game.snapshot().state, "ready");
  assert.deepEqual(game.tick().snake[0], [5, 6]);
  game.start();
  game.turn(-1, 0);
  assert.deepEqual(game.tick().snake[0], [6, 6]);
  game.tick();
  const eating = game.tick();
  assert.equal(eating.score, 1);
  assert.equal(eating.snake.length, 4);
  assert(
    !eating.snake.some(
      ([x, y]) => x === eating.food[0] && y === eating.food[1],
    ),
  );
  while (game.snapshot().state === "running") game.tick();
  assert.equal(game.snapshot().state, "lost");
  assert.equal(game.snapshot().score, 1);
  assert.equal(game.reset().state, "ready");
  assert.equal(game.snapshot().score, 0);
});
test("pausa preserva posição e continuar retoma a partida", () => {
  const game = createSnake();
  game.start();
  game.tick();
  game.pause();
  const position = game.snapshot().snake;
  game.tick();
  assert.deepEqual(game.snapshot().snake, position);
  game.start();
  game.turn(0, -1);
  game.tick();
  assert.deepEqual(game.snapshot().snake[0], [6, 5]);
});
