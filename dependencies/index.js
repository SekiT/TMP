import { bind, wire } from 'hyperhtml/esm';

export default {
  hyperhtml: { bind, wire },
  globals: {
    now: Date.now,
    window,
    setTimeout,
    random: Math.random,
  },
};
