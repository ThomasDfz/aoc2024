Object.defineProperties(Array.prototype, {
  none: {
    value(f) {
      return !this.some(f);
    },
  },
  middle: {
    get() {
      return this[Math.floor(this.length / 2)];
    },
  },
  sum: {
    value(f) {
      return this.reduce((acc, curr) => acc + Number(f(curr)), 0);
    }
  }
});
