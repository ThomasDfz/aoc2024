Object.defineProperties(Array.prototype, {
  none: {
    value(f) {
      return !this.some(f);
    },
  },
  sum: {
    value(f) {
      return this.reduce((acc, curr) => acc + (f ? Number(f(curr)) : Number(curr)), 0);
    }
  },
  middle: {
    get() {
      return this[Math.floor(this.length / 2)];
    },
  },
});
