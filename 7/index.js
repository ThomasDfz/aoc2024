const { input, example } = require('../utils/parser');

const DEBUG = false;

const equations = (DEBUG ? example : input)
  .split('\n')
  .map(line => {
    const [target, operands] = line.split(': ');

    return { target: Number(target), operands: operands.split(' ').map(Number) };
  });

const add = (operand, remainings) => [operand + remainings[0], ...remainings.slice(1)];
const multiply = (operand, remainings) => [operand * remainings[0], ...remainings.slice(1)];
const concat = (operand, remainings) => [Number([operand, remainings[0]].join('')), ...remainings.slice(1)];

const isValid = (target, operands, operators) => {
  if (operands[0] > target) {
    return false;
  }

  if (operands.length === 1) {
    return operands[0] === target;
  }

  const [operand, ...remainings] = operands;

  return operators.some(operator => isValid(target, operator(operand, remainings), operators));
};

const part1 = () => {
  return equations.sum(({ target, operands }) => isValid(target, operands, [add, multiply]) ? target : 0);
};

const part2 = () => {
  return equations.sum(({ target, operands }) => isValid(target, operands, [add, multiply, concat]) ? target : 0);
};

console.log(`Part 1 : ${part1()}`);
console.log(`Part 2 : ${part2()}`);
