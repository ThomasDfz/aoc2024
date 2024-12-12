const { input, example } = require('../utils/parser');
const { key, unkey, neighborhood } = require('../utils/tools');

const DEBUG = false;

const map = (DEBUG ? example : input)
  .split('\n')
  .map(line => line
    .split(''));

const visited = new Set();
const regions = [];

const recursivelyBuildRegion = (x, y, region) => {
  const cell = key(x, y);

  if (visited.has(cell)) {
    return;
  }

  visited.add(cell);
  region.add(cell);

  neighborhood(x, y)
    .filter(({ x: nx, y: ny }) => map[nx]?.[ny] === map[x][y])
    .forEach(({ x: nx, y: ny }) => recursivelyBuildRegion(nx, ny, region));
};

const searchRegions = () => {
  if (regions && regions.length) {
    return regions;
  }

  for (let x = 0; x < map.length; x += 1) {
    for (let y = 0; y < map[0].length; y += 1) {
      if (visited.has(key(x, y))) {
        continue;
      }

      const region = new Set();
      recursivelyBuildRegion(x, y, region);
      regions.push(region);
    }
  }
};

const getPerimeter = region => {
  return [...region].sum(cell => {
    const [x, y] = unkey(cell);

    return 4 - neighborhood(x, y).sum(neighbour => region.has(key(neighbour.x, neighbour.y)));
  });
};

const countConsecutives = array => {
  if (!array || !array.length) return 0;

  const sorted = [...new Set(array)].sort((a, b) => a - b);

  return sorted.reduce((count, current, index) => {
    if (index === 0 || current !== sorted[index - 1] + 1) {
      count++;
    }

    return count;
  }, 0);
};

const countSides = (region) => {
  let sum = 0;

  const regionSides = [...region].map(cell => {
    const [x, y] = unkey(cell);

    const sides = [];

    if (!region.has(key(x - 1, y)) && x >= 0) sides.push({ x, y, horizontal: true });
    if (!region.has(key(x + 1, y)) && x <= map.length) sides.push({ x: x + 1, y, horizontal: true });
    if (!region.has(key(x, y - 1)) && y >= 0) sides.push({ x, y, horizontal: false });
    if (!region.has(key(x, y + 1)) && y <= map[0].length) sides.push({ x, y: y + 1, horizontal: false });

    // check if the region has a diagonal - if so we manually add 2 to the number of sides
    if ((region.has(key(x + 1, y + 1)) && !region.has(key(x + 1, y)) && !region.has(key(x, y + 1)))
      || (region.has(key(x + 1, y - 1)) && !region.has(key(x, y - 1)) && !region.has(key(x + 1, y)))) {
      sum += 2;
    }

    return sides;
  }).flat();

  // bag sides by abscissa and for each abscissa, count the consecutives ordinates
  regionSides
    .filter(s => s.horizontal)
    .reduce((acc, { x, y }) => acc.append(x, y), new Map())
    .forEach(ordinates => sum += countConsecutives(ordinates));

  // bag sides by ordinate and for each ordinate, count the consecutives abscissas
  regionSides
    .filter(s => !s.horizontal)
    .reduce((acc, { x, y }) => acc.append(y, x), new Map())
    .forEach(abscissas => sum += countConsecutives(abscissas));

  return sum;
};

const part1 = () => {
  searchRegions();

  return regions.sum(region => region.size * getPerimeter(region));
};

const part2 = () => {
  searchRegions();

  return regions.sum(region => region.size * countSides(region));
};

console.log(`Part 1 : ${part1()}`);
console.log(`Part 2 : ${part2()}`);
