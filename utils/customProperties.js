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
  }
});
