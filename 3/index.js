const { input, example } = require('../parser');

const memory = input
  .split('\n')
  .join('');

const sum = [...memory.matchAll(/mul\((\d{1,3}),(\d{1,3})\)/g)]
  .reduce((sum, operation) => sum + (Number(operation[1]) * Number(operation[2])), 0);

console.log(`Part 1 : ${sum}`);

/**
 * Part 2
 */
let shouldAdd = true;

const conditionalSum = [...memory.matchAll(/mul\((\d{1,3}),(\d{1,3})\)|don\'t|do/g)].reduce((sum, operation) => {
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

console.log(`Part 2 : ${conditionalSum}`);
