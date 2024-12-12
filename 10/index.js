const { input, example } = require('../utils/parser');
const { key, neighborhood } = require('../utils/tools');

const DEBUG = false;

const trailheads = [];
const memory = new Map();
const grid = new Map();

(DEBUG ? example : input)
  .split('\n')
  .forEach((line, x) => line
    .split('')
    .forEach((cell, y) => {
      grid.set(key(x, y), Number(cell));

      if (cell === '0') {
        trailheads.push({ x, y });
      }
    }));

const recursiveSearch = ({ x, y }) => {
  const position = key(x, y);

  if (memory.has(position)){
    return memory.get(position);
  }

  if (grid.get(position) === 9) {
    memory.set(position, [position]);

    return memory.get(position);
  }

  const neighbours = neighborhood(x, y);

  const height = grid.get(position);

  const summits = neighbours
    .filter(neighbour => grid.get(key(neighbour.x, neighbour.y)) === height + 1)
    .reduce((acc, neighbour) => [...acc, ...recursiveSearch(neighbour)], []);

  memory.set(position, summits);

  return summits;
};

const part1 = () => {
  return trailheads.sum(trailhead => new Set(recursiveSearch(trailhead)).size);
};

const part2 = () => {
  return trailheads.sum(trailhead => recursiveSearch(trailhead).length);
};

console.log(`Part 1 : ${part1()}`);
console.log(`Part 2 : ${part2()}`);
