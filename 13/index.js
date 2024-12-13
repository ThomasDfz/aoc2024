const { input, example } = require('../utils/parser');

const DEBUG = false;

const systems = (DEBUG ? example : input)
  .split('\n\n')
  .map(line => {
    const [buttonA, buttonB, prize] = line.split('\n');
    const [ax, ay] = [...buttonA.matchAll(/X\+([0-9]+)|Y\+([0-9]+)/g)].map(match => Number(match[1] || match[2]));
    const [bx, by] = [...buttonB.matchAll(/X\+([0-9]+)|Y\+([0-9]+)/g)].map(match => Number(match[1] || match[2]));
    const [px, py] = [...prize.matchAll(/X=([0-9]+)|Y=([0-9]+)/g)].map(match => Number(match[1] || match[2]));

    return { ax, ay, bx, by, px, py };
  });

const solve = ({ ax, ay, bx, by, px, py }) => {
  const a = (bx * py - by * px) / (bx * ay - by * ax);

  return {
    a,
    b: (px - a * ax) / bx,
  };
};

const part1 = () => {
  return systems.sum(system => {
    const { a, b } = solve(system);

    return (Number.isInteger(a) && a <= 100 && Number.isInteger(b) && b <= 100)
      ? a * 3 + b
      : 0;
  });
};

const part2 = () => {
  return systems.sum(({ ax, ay, bx, by, px, py }) => {
    const { a, b } = solve({ ax, ay, bx, by, px: px + 10000000000000, py: py + 10000000000000 });

    return (Number.isInteger(a) && Number.isInteger(b))
      ? a * 3 + b
      : 0;
  });
};

console.log(`Part 1 : ${part1()}`);
console.log(`Part 2 : ${part2()}`);
