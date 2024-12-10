const { input, example } = require('../utils/parser');
const { transpose, flip, diagonals } = require('../utils/tools');

const DEBUG = false;

const grid = (DEBUG ? example : input)
  .split('\n')
  .map(line => line.split(''))

const part1 = () => {
  const countOccurrences = text => [...text.matchAll(/(?=(XMAS))|(?=(SAMX))/g)].length;

  return [...grid, ...transpose(grid), ...diagonals(grid), ...diagonals(flip(grid))]
    .sum(curr => countOccurrences(curr.join('')));
};

const part2 = () => {
  const isXMas = (x, y) => (
    grid[x][y] === 'A'
    && ((grid[x - 1][y + 1] === 'S' && grid[x + 1][y - 1] === 'M') || (grid[x - 1][y + 1] === 'M' && grid[x + 1][y - 1] === 'S'))
    && ((grid[x - 1][y - 1] === 'S' && grid[x + 1][y + 1] === 'M') || (grid[x - 1][y - 1] === 'M' && grid[x + 1][y + 1] === 'S'))
  );

  let sum = 0;

  for (let x = 1; x < grid.length - 1; x += 1) {
    for (let y = 1; y < grid[0].length - 1; y += 1) {
      if (isXMas(x, y)) {
        sum++;
      }
    }
  }

  return sum;
};

console.log(`Part 1 : ${part1()}`);
console.log(`Part 2 : ${part2()}`);

