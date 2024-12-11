const { input, example } = require('../utils/parser');
const { key } = require('../utils/tools');

const DEBUG = false;

const stones = (DEBUG ? example : input).split(' ');
const memory = new Map();

const blink = stone => {
  if (stone === '0') {
    return ['1'];
  }

  if (stone.length % 2 === 0) {
    return [stone.slice(0, stone.length / 2), `${Number(stone.slice(stone.length / 2))}`];
  }

  return [`${stone * 2024}`];
};

const recursiveStonesCount = (stones, depth) => {
  if (depth === 0) {
    return stones.length;
  }

  return stones.sum(stone => {
    if (memory.has(key(stone, depth))) {
      return memory.get(key(stone, depth));
    }

    const value = recursiveStonesCount(blink(stone), depth - 1);
    memory.set(key(stone, depth), value);

    return value;
  });
};

const part1 = () => {
  return recursiveStonesCount(stones, 25);
};

const part2 = () => {
  return recursiveStonesCount(stones, 75);
};

console.log(`Part 1 : ${part1()}`);
console.log(`Part 2 : ${part2()}`);
