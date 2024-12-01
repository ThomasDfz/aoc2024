const { spawn } = require('child_process');
const path = require('path');
const day = process.argv[2];

console.time(`Day ${day} execution`);
const child = spawn('node', ['--max-old-space-size=4096', path.resolve(day)], {
  stdio: 'inherit',
  shell: false
});

child.on('error', (err) => {
  console.error(`Failed to run Day ${day}:`, err);
  process.exit(1);
});

child.on('close', (code) => {
  console.timeEnd(`Day ${day} execution`);
  process.exit(code);
});
