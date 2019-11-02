import { bind, wire } from 'hyperhtml/esm';

export default {
  hyperhtml: { bind, wire },
  globals: {
    Date,
    setTimeout,
  },
};
