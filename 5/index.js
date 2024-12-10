const { input, example } = require('../utils/parser');

const DEBUG = false;

const [rules, updates] = (DEBUG ? example : input)
  .split('\n\n')
  .map(part => part
    .split('\n')
    .map(line => line
      .split(/\||,/)
      .map(Number)
    )
  );

const isOrdered = update => rules.none(
  ([a, b]) =>
    update.includes(a)
    && update.includes(b)
    && update.indexOf(a) > update.indexOf(b)
);

const fix = update => {
  const appliedRules = rules.filter(([a, b]) => update.includes(a) && update.includes(b));

  do {
    appliedRules.forEach(([a, b]) => {
      if (update.indexOf(a) < update.indexOf(b)) return;
      update.splice(update.indexOf(a), 1);
      update.splice(update.indexOf(b), 0, a);
    });
  } while (!isOrdered(update));

  return update;
};

const part1 = () => {
  return updates.sum(update => isOrdered(update) ? update.middle : 0, 0);
};

const part2 = () => {
  return updates.sum(update => isOrdered(update) ? 0 : fix(update).middle, 0);
};

console.log(`Part 1 : ${part1()}`);
console.log(`Part 2 : ${part2()}`);
