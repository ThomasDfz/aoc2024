const { input, example } = require('../utils/parser');
const { mod, key, sleep, range } = require('../utils/tools');

const DEBUG = false;
const height = DEBUG ? 7 : 103;
const width = DEBUG ? 11 : 101;

const robots = (DEBUG ? example : input)
  .split('\n')
  .map(line => {
    const [, x, y, vx, vy] = line.match(/p=(-?\d+),(-?\d+) +v=(-?\d+),(-?\d+)/).map(Number);

    return { x, y, vx, vy };
  });

const part1 = () => {
  const map = new Map();

  robots.forEach(({ x, y, vx, vy }) => {
    const xf = mod(x + 100 * vx, width);
    const yf = mod(y + 100 * vy, height);

    if (xf < (width - 1) / 2 && yf < (height - 1) / 2) map.increment('Q1');
    if (xf > (width - 1) / 2 && yf < (height - 1) / 2) map.increment('Q2');
    if (xf < (width - 1) / 2 && yf > (height - 1) / 2) map.increment('Q3');
    if (xf > (width - 1) / 2 && yf > (height - 1) / 2) map.increment('Q4');
  });

  let safetyFactor = 1;
  map.forEach(value => safetyFactor *= value);

  return safetyFactor;
};

const part2 = async () => {
  const set = new Set();
  let i = 0;

  while (i++ < 1_000_000) {
    set.clear();

    robots.forEach(robot => {
      robot.x = mod(robot.x + robot.vx, width);
      robot.y = mod(robot.y + robot.vy, height);
      set.add(key(robot.x, robot.y));
    });

    // visualisation solution
    if ((i - 2) % 101 === 0 || (i - 76) % 103 === 0) {
      console.log(`\n~~~~~~~ Iteration ${i} ~~~~~~~ \n`);

      for (let x = 0; x < width; x += 1) {
        console.log(range(0, height - 1).map(y => set.has(key(x, y)) ? '#' : ' ').join(' '));
      }

      await sleep(250);
    }
  }
};

console.log(`Part 1 : ${part1()}`);
console.log(`Part 2 : ${part2()}`);
