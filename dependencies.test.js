import { shadow } from './lib/shadow';

export default {
  hyperhtml: shadow({
    bind: () => {},
    wire: () => {},
  }),
  globals: shadow({
    Date,
    setTimeout,
  }),
};
