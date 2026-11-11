export function createSnake(size = 12) {
  let snake, direction, nextDirection, food, score, state, cursor;
  const same = (a, b) => a[0] === b[0] && a[1] === b[1];
  function reset() {
    snake = [
      [5, 6],
      [4, 6],
      [3, 6],
    ];
    direction = [1, 0];
    nextDirection = [1, 0];
    food = [8, 6];
    score = 0;
    state = "ready";
    cursor = 0;
    return snapshot();
  }
  function snapshot() {
    return {
      snake: snake.map((p) => [...p]),
      direction: [...direction],
      food: food && [...food],
      score,
      state,
      size,
    };
  }
  function turn(x, y) {
    if (Math.abs(x) + Math.abs(y) !== 1) return;
    if (x !== -direction[0] || y !== -direction[1]) nextDirection = [x, y];
  }
  function start() {
    if (state === "ready" || state === "paused") state = "running";
    return snapshot();
  }
  function pause() {
    if (state === "running") state = "paused";
    return snapshot();
  }
  function tick() {
    if (state !== "running") return snapshot();
    direction = [...nextDirection];
    const head = [snake[0][0] + direction[0], snake[0][1] + direction[1]];
    const eating = food && same(head, food);
    const occupied = eating ? snake : snake.slice(0, -1);
    if (
      head[0] < 0 ||
      head[1] < 0 ||
      head[0] >= size ||
      head[1] >= size ||
      occupied.some((p) => same(p, head))
    ) {
      state = "lost";
      return snapshot();
    }
    snake.unshift(head);
    if (!eating) snake.pop();
    else {
      score++;
      if (snake.length === size * size) {
        state = "won";
        food = null;
        return snapshot();
      }
      do {
        cursor = (cursor + 37) % (size * size);
        food = [cursor % size, Math.floor(cursor / size)];
      } while (snake.some((p) => same(p, food)));
    }
    return snapshot();
  }
  reset();
  return { reset, snapshot, turn, start, pause, tick };
}
