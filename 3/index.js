const { input, example } = require('../utils/parser');

const DEBUG = false;

const memory = (DEBUG ? example : input)
  .split('\n')
  .join('');

const part1 = () => {
  return [...memory.matchAll(/mul\((\d{1,3}),(\d{1,3})\)/g)]
    .sum(operation => Number(operation[1]) * Number(operation[2]));
};

const part2 = () => {
  let shouldAdd = true;

  return [...memory.matchAll(/mul\((\d{1,3}),(\d{1,3})\)|don\'t|do/g)].reduce((sum, operation) => {
    switch (operation[0]) {
      case 'do':
        shouldAdd = true;
        break;
      case 'don\'t':
        shouldAdd = false;
        break;
      default:
        return sum + (shouldAdd ? Number(operation[1]) * Number(operation[2]) : 0);
    }

    return sum;
  }, 0);
};

console.log(`Part 1 : ${part1()}`);
console.log(`Part 2 : ${part2()}`);
