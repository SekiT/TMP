import { bind, wire } from 'hyperhtml/esm';
import { render, html } from 'uhtml';

export default {
  hyperhtml: { bind, wire },
  uhtml: { render, html },
  globals: {
    now: Date.now,
    window,
    setTimeout,
    random: Math.random,
  },
};
