const { input, example } = require('../utils/parser');
const { key } = require('../utils/tools');
const MinHeap = require('../utils/min-heap');

const DEBUG = false;

const end = {};

const map = (DEBUG ? example : input)
  .split('\n')
  .map((line, x) => line
    .split('')
    .map((cell, y) => ({ x, y, cell })))
  .flat();

class Node {
  constructor(x, y, orientation) {
    this.x = x;
    this.y = y;
    this.o = orientation;
    this.visited = false;
    this.dist = Number.MAX_SAFE_INTEGER;
    this.prev = null;
    this.otherBestPaths = [];
  }
}

const buildGraph = () => {
  const graph = new Map();
  const queue = new MinHeap('dist');

  map.forEach(({ x, y, cell }) => {
    if (cell === '#') return;

    graph.set(key(x, y, 'N'), new Node(x, y, 'N'));
    graph.set(key(x, y, 'S'), new Node(x, y, 'S'));
    graph.set(key(x, y, 'E'), new Node(x, y, 'E'));
    graph.set(key(x, y, 'W'), new Node(x, y, 'W'));

    if (cell === 'E') {
      end.x = x;
      end.y = y;
    }

    if (cell === 'S') {
      const start = graph.get(key(x, y, 'E'));
      start.dist = 0;
      queue.push(start);
    }
  });

  return { graph, queue };
};

const getAvailableNeighbours = (node, graph) => {
  const neighbours = [];

  const north = key(node.x - 1, node.y, 'N');
  const south = key(node.x + 1, node.y, 'S');
  const east = key(node.x , node.y + 1, 'E');
  const west = key(node.x, node.y - 1, 'W');

  if (node.o === 'N' || node.o === 'S') {
    if (node.o === 'N' && graph.has(north)) neighbours.push({ node: graph.get(north), d: 1 });
    if (node.o === 'S' && graph.has(south)) neighbours.push({ node: graph.get(south), d: 1 });
    if (graph.has(west)) neighbours.push({ node: graph.get(west), d: 1001 });
    if (graph.has(east)) neighbours.push({ node: graph.get(east), d: 1001 });
  } else if (node.o === 'W' || node.o === 'E') {
    if (graph.has(south)) neighbours.push({ node: graph.get(south), d: 1001 });
    if (graph.has(north)) neighbours.push({ node: graph.get(north), d: 1001 });
    if (node.o === 'W' && graph.has(west)) neighbours.push({ node: graph.get(west), d: 1 });
    if (node.o === 'E' && graph.has(east)) neighbours.push({ node: graph.get(east), d: 1 });
  }

  return neighbours;
};

const part1 = () => {
  const { graph, queue } = buildGraph();
  let current, target;

  while (!queue.isEmpty()) {
    current = queue.pop();
    current.visited = true;

    getAvailableNeighbours(current, graph).forEach(({ node: neighbour, d }) => {
      const newDist = current.dist + d;

      if (newDist < neighbour.dist) {
        neighbour.dist = newDist;
        neighbour.prev = current;

        if (!neighbour.visited) {
          queue.push(neighbour);
        }

        if (neighbour.x === end.x && neighbour.y === end.y) {
          target = neighbour;
        }
      } else if (newDist === neighbour.dist) {
        neighbour.otherBestPaths.push(current);
      }
    });

    if (target) {
      return target;
    }
  }
};

const part2 = (target) => {
  const positions = new Set();

  let queue = [target];

  while (queue.length) {
    let current = queue.shift();

    do {
      if (current.otherBestPaths.length) {
        queue.push(...current.otherBestPaths);
      }

      positions.add(key(current.x, current.y));
      current = current.prev;
    } while (current);
  }

  return positions.size;
};


const target = part1();
console.log(`Part 1 : ${target.dist}`);
console.log(`Part 2 : ${part2(target)}`);
