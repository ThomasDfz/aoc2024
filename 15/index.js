const { input, example } = require('../utils/parser');
const { key, unkey, range } = require('../utils/tools');

const DEBUG = false;

const data = (DEBUG ? example : input).split('\n\n');
const instructions = data[1].split('');


const part1 = () => {
  const walls = new Set();
  const boxes = new Set();
  let robot;

  data[0]
    .split('\n')
    .forEach((line, x) => {
      line
      .split('')
      .forEach((cell, y) => {
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

  data[0]
    .split('\n')
    .forEach((line, x) => {
      line
      .split('')
      .forEach((cell, y) => {
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
      boxes.set(key(x, y), true);
      range(robot.y + 2, y - 1).map(yb => boxes.set(key(x, yb), !boxes.get(key(x, yb))));
    }

    robot.y = robot.y + vy;
  };

  const moveVertical = vx => {
    // todo
  };

  instructions.forEach(instruction => {
    switch (instruction) {
      case '^':
        moveVertical(-1, 0);
        break;
      case 'v':
        moveVertical(1, 0);
        break;
      case '>':
        moveHorizontal(1);
        break;
      case '<':
        moveHorizontal(-1);
        break;
    }
  });

  return [...boxes.values()].sum(box => {
    const [x, y] = unkey(box);

    return x * 100 + y;
  });
};

console.log(`Part 1 : ${part1()}`);
console.log(`Part 2 : ${part2()}`);
