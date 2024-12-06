const { input, example } = require('../utils/parser');
const { key } = require('../utils/tools');

const DEBUG = false;

const obstacles = new Set();
let yMax = 0, xMax = 0;
let vector, guard, startingPosition;

(DEBUG ? example : input)
  .split('\n')
  .forEach((line, x) => line
    .split('')
    .forEach((cell, y) => {
      switch (cell) {
        case '#':
          obstacles.add(key(x, y));
          break;
        case '^':
          startingPosition = { x, y };
          break;
      }

      xMax = Math.max(xMax, x);
      yMax = Math.max(yMax, y);
    })
  );

const initialize = () => {
  vector = { x: -1, y: 0 };
  guard = startingPosition;
};

const isGuardInbounds = () => guard.x >= 0 && guard.x <= xMax && guard.y >= 0 && guard.y <= yMax;

const rotate = () => vector = ({ x: vector.y, y: -vector.x });

const move = () => {
  const newPosition = { x: guard.x + vector.x, y: guard.y + vector.y };

  obstacles.has(key(newPosition.x, newPosition.y))
    ? rotate()
    : guard = newPosition;
};

const isGuardLooping = () => {
  initialize();
  const visitedCellsWithVector = new Set();

  while (true) {
    if (!isGuardInbounds()) {
      return false;
    }

    if (visitedCellsWithVector.has(key(guard.x, guard.y, vector.x, vector.y))) {
      return true;
    }

    visitedCellsWithVector.add(key(guard.x, guard.y, vector.x, vector.y));
    move();
  }
};

const part1 = () => {
  initialize();
  const visitedCells = new Set();

  do {
    visitedCells.add(key(guard.x, guard.y));
    move();
  } while (isGuardInbounds());

  return visitedCells.size;
};

const part2 = () => {
  let sum = 0;

  for (let x = 0; x <= xMax; x += 1) {
    for (let y = 0; y <= yMax; y += 1) {
      if (obstacles.has(key(x, y))) continue;

      obstacles.add(key(x, y));
      sum += +isGuardLooping();
      obstacles.delete(key(x, y));
    }
  }

  return sum;
};

console.log(`Part 1 : ${part1()}`);
console.log(`Part 2 : ${part2()}`);
