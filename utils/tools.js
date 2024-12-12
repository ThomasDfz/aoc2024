const transpose = matrix => matrix[0].map((col, i) => matrix.map(row => row[i]));

const flip = matrix => matrix.map(row => row.reverse());

const diagonals = matrix => {
  const [width, length] = [matrix[0].length, matrix.length];
  const diagonals = [];

  for (let i = 0; i < (width + length - 1); i += 1) {
    const diagonal = [];

    let x = (width - 1 - i >= 0) ? 0 : Math.abs(width - 1 - i);
    let y = (width - 1 - i < 0) ? 0 : width - 1 - i;

    do {
      diagonal.push(matrix[x][y]);
    } while (matrix[++x]?.[++y] !== undefined);

    diagonals.push(diagonal);
  }

  return diagonals;
}

const key = (...args) => args.join('-');

const unkey = str => str.split('-').map(Number);

const range = (from, to) => Array.from({ length: to - from + 1 }, (_, index) => from + index);

const neighborhood = (x, y) => [
  { x: x + 1, y },
  { x: x - 1, y },
  { x, y: y + 1 },
  { x, y: y - 1 },
];

module.exports = {
  transpose,
  flip,
  diagonals,
  key,
  unkey,
  range,
  neighborhood,
};
