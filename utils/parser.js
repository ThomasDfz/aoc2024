const fs = require('fs');
const path = require('path');

const parse = file => fs
  .readFileSync(path.join(path.dirname(require.main.filename), file), 'utf8')
  .toString()
  .trim()
  .replaceAll('\r\n', '\n');

module.exports = {
  input: parse('input.txt'),
  example: parse('example.txt'),
};
