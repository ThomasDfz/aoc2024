const { input, example } = require('../utils/parser');
const { key, range, neighborhood } = require('../utils/tools');
const MinHeap = require('../utils/min-heap');

const DEBUG = false;
const endX = DEBUG ? 6 : 70;
const endY = DEBUG ? 6 : 70;

const bytes = (DEBUG ? example : input)
  .split('\n')
  .map(line => line
    .split(',')
    .map(Number));

class Node {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.visited = false;
    this.fdist = Number.MAX_SAFE_INTEGER;
    this.gdist = Number.MAX_SAFE_INTEGER;
  }
}

const buildGraph = () => {
  const graph = new Map();

  for (let x = 0; x <= endX; x += 1) {
    for (let y = 0; y <= endY; y += 1) {
      graph.set(key(x, y), new Node(x, y));
    }
  }

  return graph;
};

const h = (x, y) => Math.sqrt(Math.pow(endX - x, 2) + Math.pow(endY - y, 2));

const part1 = (nBytes) => {
  const graph = buildGraph();
  range(0, nBytes - 1).forEach(i => graph.delete(key(bytes[i][1], bytes[i][0])));

  const start = graph.get(key(0, 0));
  start.gdist = 0;
  start.fdist = h(start.x, start.y);

  const queue = new MinHeap('fdist');
  queue.push(start);

  let current;

  while (!queue.isEmpty()) {
    current = queue.pop();
    current.visited = true;

    if (current.x === endX && current.y === endY) {
      return current.fdist;
    }

    neighborhood(current.x, current.y).forEach(({ x, y }) => {
      if (!graph.has(key(x, y))) return;

      const neighbour = graph.get(key(x, y));
      const newDist = current.gdist + 1;

      if (newDist < neighbour.gdist) {
        neighbour.gdist = newDist;
        neighbour.fdist = newDist + h(x, y);

        if (!neighbour.visited) {
          queue.push(neighbour);
        }
      }
    });
  }

  return -1;
};

const part2 = () => {
  let min = 1024, max = bytes.length - 1, mid;

  while (min <= max) {
    mid = Math.floor((min + max) / 2);

    if (part1(mid) === -1) {
      max = mid - 1;
    } else {
      min = mid + 1;
    }
  }

  return bytes[max].join(',');
};

console.log(`Part 1 : ${part1(1024)}`);
console.log(`Part 2 : ${part2()}`);
