const { input, example } = require('../utils/parser');

const DEBUG = false;

const leftList = [];
const rightList = [];

(DEBUG ? example : input)
  .split('\n')
  .forEach(line => {
    const [, id1, id2] = line.match(/(\d+)\s+(\d+)/);
    leftList.push(Number(id1));
    rightList.push(Number(id2));
  });

const part1 = () => {
  leftList.sort((a, b) => a - b);
  rightList.sort((a, b) => a - b);

  return leftList.reduce((acc, curr, i) => acc + Math.abs(curr - rightList[i]), 0);
};

const part2 = () => {
  const occurrences = new Map();
  rightList.forEach(id => occurrences.set(id, 1 + (occurrences.get(id) || 0)));

  return leftList.reduce((acc, curr) => acc + curr * (occurrences.get(curr) || 0), 0);
};

console.log(`Part 1 : ${part1()}`);
console.log(`Part 2 : ${part2()}`);
