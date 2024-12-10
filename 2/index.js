const { input, example } = require('../utils/parser');

const DEBUG = false;

const reports = (DEBUG ? example : input)
  .split('\n')
  .map(line => line.split(' ').map(Number));

const isSafe = report => {
  if (report.length === 1) {
    return true;
  }

  const descending = report[0] > report[1] ? 1 : -1;

  for (let i = 0; i < report.length - 1; i += 1) {
    const difference = (report[i] - report[i + 1]) * descending;

    if (difference < 1 || difference > 3) {
      return false;
    }
  }

  return true;
};

const dampener = report => report.map((_, i) => [...report.slice(0, i), ...report.slice(i + 1)]);

const part1 = () => {
  return reports.sum(isSafe);
};

const part2 = () => {
  return reports.sum(report => dampener(report).some(isSafe));
};

console.log(`Part 1 : ${part1()}`);
console.log(`Part 2 : ${part2()}`);
