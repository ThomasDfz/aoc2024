const { input, example } = require('../parser');

/**
 * Part 1
 */
const leftList = [];
const rightList = [];

input
  .split('\n')
  .forEach(line => {
    const [, id1, id2] = line.match(/(\d+)\s+(\d+)/);
    leftList.push(Number(id1));
    rightList.push(Number(id2));
  });

leftList.sort();
rightList.sort();

const sum = leftList.reduce((acc, curr, i) => acc + Math.abs(curr - rightList[i]), 0);

console.log(`Part 1 : ${sum}`);

/**
 * Part 2
 */
const occurrences = new Map();
rightList.forEach(id => occurrences.set(id, 1 + (occurrences.get(id) || 0)));

const score = leftList.reduce((acc, curr) => acc + curr * (occurrences.get(curr) || 0), 0);

console.log(`Part 2 : ${score}`);
