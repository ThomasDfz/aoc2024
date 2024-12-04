const path = require('path');
const fs = require('fs');

const day = process.argv[2];

const folder = path.resolve(day);
const template = `const { input, example } = require('../utils/parser');

const DEBUG = false;

const data = (DEBUG ? example : input)

const part1 = () => {
  return 0;
};

const part2 = () => {
  return 0;
};

console.log(\`Part 1 : \${part1()}\`);
console.log(\`Part 2 : \${part2()}\`);`;

fs.mkdirSync(folder);
fs.writeFileSync(path.join(folder, 'index.js'), template);
fs.writeFileSync(path.join(folder, 'example.txt'), '');
fs.writeFileSync(path.join(folder, 'input.txt'), '');

console.log(`Day ${day} generated successfully.`);
