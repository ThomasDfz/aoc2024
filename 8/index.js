const { input, example } = require('../utils/parser');
const { key } = require('../utils/tools');

const DEBUG = false;

const antennas = new Map();
let xMax = 0, yMax = 0;

(DEBUG ? example : input)
  .split('\n')
  .forEach((line, x) => {
    line
      .split('')
      .forEach((cell, y) => {
        if (cell !== '.') {
          antennas.has(cell)
            ? antennas.get(cell).push({ x, y })
            : antennas.set(cell, [{ x, y }]);
        }

        yMax = Math.max(yMax, y);
    });

    xMax = Math.max(xMax, x);
  });

const isInbounds = coords => coords.x >= 0 && coords.y >= 0 && coords.x <= xMax && coords.y <= yMax;

const getAntinodes = (coords, harmonics) => {
  const antinodes = [];

  if (coords?.length <= 1) return antinodes;

  for (let i = 0; i < coords.length - 1; i += 1) {
    for (let j = i + 1; j < coords.length; j += 1) {
      const [a, b] = [coords[i], coords[j]];
      const v = { x: b.x - a.x, y: b.y - a.y };
      let period = harmonics ? 0 : 1;
      let p1, p2;

      do {
        p1 = { x: b.x + period * v.x, y: b.y + period * v.y };
        p2 = { x: a.x - period * v.x, y: a.y - period * v.y };

        if (isInbounds(p1)) antinodes.push(p1);
        if (isInbounds(p2)) antinodes.push(p2);

        period++;
      } while (harmonics && (isInbounds(p1) || isInbounds(p2)));
    }
  }

  return antinodes;
};

const countAntinodes = (harmonics = false) => {
  const antinodes = new Set();

  antennas
    .forEach(antenna => getAntinodes(antenna, harmonics)
      .forEach(antinode => antinodes.add(key(antinode.x, antinode.y))));

  return antinodes.size;
};

const part1 = () => countAntinodes();

const part2 = () => countAntinodes(true);

console.log(`Part 1 : ${part1()}`);
console.log(`Part 2 : ${part2()}`);
