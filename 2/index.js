const { input, example } = require('../parser');

const reports = input
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

const count = reports.reduce((acc, report) => acc + +isSafe(report), 0);

console.log(`Part 1 : ${count}`);

/**
 * Part 2
 */
const dampener = report => report.map((_, i) => [...report.slice(0, i), ...report.slice(i + 1)]);

const newCount = reports.reduce((acc, report) => acc + +dampener(report).some(isSafe), 0);

console.log(`Part 2 : ${newCount}`);
