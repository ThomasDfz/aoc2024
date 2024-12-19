const { input, example } = require('../utils/parser');

const DEBUG = false;

const [tokens, designs] = (DEBUG ? example : input)
  .split('\n\n')
  .map((part, i) => part
    .split(i ? '\n' : ', '));

const memory = new Map();

const countArrangements = design => {
  if (memory.has(design)) {
    return memory.get(design);
  }

  const result = tokens
    .filter(token => design.startsWith(token))
    .sum(token => (token === design) ? 1 : countArrangements(design.slice(token.length)));

  memory.set(design, result);
  return result;
};

const part1 = () => {
  return designs.sum(design => countArrangements(design) > 0);
};

const part2 = () => {
  return designs.sum(countArrangements);
};

console.log(`Part 1 : ${part1()}`);
console.log(`Part 2 : ${part2()}`);
