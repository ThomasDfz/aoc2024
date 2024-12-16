const { input, example } = require('../utils/parser');
const { key, unkey } = require('../utils/tools');

const DEBUG = false;

const data = (DEBUG ? example : input).split('\n\n');
const instructions = data[1].split('');
const warehouse = data[0]
  .split('\n')
  .map((line, x) => line
    .split('')
    .map((cell, y) => ({ x, y, cell })))
  .flat();

const part1 = () => {
  const walls = new Set();
  const boxes = new Set();
  let robot;

  warehouse.forEach(({ x, y, cell }) => {
    switch (cell) {
      case '#':
        walls.add(key(x, y));
        break;
      case 'O':
        boxes.add(key(x, y));
        break;
      case '@':
        robot = { x, y };
        break;
    }
  });

  const move = (vx, vy) => {
    let y = robot.y + vy;
    let x = robot.x + vx;
    let pushingBoxes = false;

    while (!walls.has(key(x, y)) && boxes.has(key(x, y))) {
      pushingBoxes = true;
      x += vx;
      y += vy;
    }

    if (walls.has(key(x, y))) {
      return;
    }

    if (pushingBoxes) {
      boxes.delete(key(robot.x + vx, robot.y + vy));
      boxes.add(key(x, y));
    }

    robot.x = robot.x + vx;
    robot.y = robot.y + vy;
  };

  instructions.forEach(instruction => {
    switch (instruction) {
      case '^':
        move(-1, 0);
        break;
      case 'v':
        move(1, 0);
        break;
      case '>':
        move(0, 1);
        break;
      case '<':
        move(0, -1);
        break;
    }
  });

  return [...boxes.values()].sum(box => {
    const [x, y] = unkey(box);

    return x * 100 + y;
  });
};

const part2 = () => {
  const walls = new Set();
  const boxes = new Map();
  let robot;

  warehouse.forEach(({ x, y, cell }) => {
    switch (cell) {
      case '#':
        walls.add(key(x, y * 2));
        walls.add(key(x, y * 2 + 1));
        break;
      case 'O':
        boxes.set(key(x, y * 2), true);
        boxes.set(key(x, y * 2 + 1), false);
        break;
      case '@':
        robot = { x, y: y * 2 };
        break;
    }
  });

  const moveHorizontal = vy => {
    let y = robot.y + vy;
    let x = robot.x;
    let pushingBoxes = false;

    while (!walls.has(key(x, y)) && boxes.has(key(x, y))) {
      pushingBoxes = true;
      y += vy;
    }

    if (walls.has(key(x, y))) {
      return;
    }

    if (pushingBoxes) {
      boxes.delete(key(robot.x, robot.y + vy));
      boxes.set(key(x, y), vy === -1);

      for (let i = robot.y + vy * 2; (i * vy) < (y * vy); i += vy) {
        boxes.set(key(x, i), !boxes.get(key(x, i)));
      }
    }

    robot.y = robot.y + vy;
  };

  const moveVertical = vx => {
    let y = robot.y;
    let x = robot.x + vx;

    if (walls.has(key(x, y))) {
      return;
    }

    if (!walls.has(key(x, y)) && !boxes.has(key(x, y))) {
      robot.x += vx;
      return;
    }

    let boxesToMove = new Map();

    const recursiveBoxSearch = (x, y, vx) => {
      if (walls.has(key(x + vx, y))) {
        throw new Error();
      }

      if (boxes.get(key(x + vx, y)) === true) {
        boxesToMove.set(key(x + vx, y), true);
        boxesToMove.set(key(x + vx, y + 1), false);
        recursiveBoxSearch(x + vx, y, vx);
        recursiveBoxSearch(x + vx, y + 1, vx);
      }

      if (boxes.get(key(x + vx, y)) === false) {
        boxesToMove.set(key(x + vx, y), false);
        boxesToMove.set(key(x + vx, y - 1), true);
        recursiveBoxSearch(x + vx, y, vx);
        recursiveBoxSearch(x + vx, y - 1, vx);
      }
    };

    try {
      recursiveBoxSearch(robot.x, robot.y, vx);

      boxesToMove.forEach((_, k) => boxes.delete(k));
      boxesToMove.forEach((value, k) => {
        const [x, y] = unkey(k);
        boxes.set(key(x + vx, y), value);
      });

      robot.x += vx;
    } catch (_) {}
  };

  instructions.forEach(instruction => {
    switch (instruction) {
      case '^':
        moveVertical(-1);
        break;
      case 'v':
        moveVertical(1);
        break;
      case '>':
        moveHorizontal(1);
        break;
      case '<':
        moveHorizontal(-1);
        break;
    }
  });

  let sum = 0;
  boxes.forEach((leftSide, key) => {
    if (leftSide) {
      const [x, y] = unkey(key);

      sum += 100 * x + y;
    }
  });

  return sum;
};

console.log(`Part 1 : ${part1()}`);
console.log(`Part 2 : ${part2()}`);
