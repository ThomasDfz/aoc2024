const { input, example } = require('../utils/parser');
const { range } = require('../utils/tools');

const DEBUG = false;

const map = (DEBUG ? example : input)
  .split('')
  .map(Number);

// test golf
const part1 = () => {let f=[...map],c=s=i=0,j=f.length-1-+(!(f.length%2));while(1){if(i>j)return s;if(!f[i]&&i++)continue;if(!(i%2))f[i]--&&(s+=c++*(i/2));else if(!f[j])j-=2;else f[j]--&&f[i]--&&(s+=c++*(j/2))}}

class Segment {
  constructor(addresses, takenSpace, freeSpace, id = 'N/A') {
    this.addresses = addresses;
    this.id = id;
    this.takenSpace = takenSpace;
    this.freeSpace = freeSpace;
  }
}

const moveFile = (from, to) => {
  to.takenSpace += from.takenSpace;
  to.freeSpace -= from.takenSpace;
  from.freeSpace += from.takenSpace;
  from.takenSpace = 0;
};

const part2 = () => {
  let currentAddress = 0;
  let sum = 0;

  const segments = map.map((blocks, i) => {
    const addresses = range(currentAddress, currentAddress + blocks - 1);
    currentAddress += blocks;

    return i % 2 === 0
      ? new Segment(addresses, blocks, 0, i / 2)
      : new Segment(addresses, 0, blocks);
    }
  );

  let pointer = (segments.length - 1) % 2 === 0 ? segments.length - 1 : segments.length - 2;

  while (pointer >= 0) {
    for (let i = 1; i <= pointer + 1; i += 2) {
      if (segments[i].freeSpace >= segments[pointer].takenSpace) {
        range(0, segments[pointer].takenSpace - 1).forEach(_ => sum += (segments[pointer].id * segments[i].addresses.shift()));
        moveFile(segments[pointer], segments[i]);
        break;
      }

      if (i >= pointer) {
        range(0, segments[pointer].takenSpace - 1).forEach(_ => sum += (segments[pointer].id * segments[pointer].addresses.shift()));
      }
    }

    pointer -= 2;
  }

  return sum;
};

console.log(`Part 1 : ${part1()}`);
console.assert(part1() === (DEBUG ? 1928 : 6288599492129));
console.log(`Part 2 : ${part2()}`);
console.assert(part2() === (DEBUG ? 2858 : 6321896265143));
