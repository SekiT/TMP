import { shadow } from 'lib/shadow';

export default {
  hyperhtml: shadow({
    bind: () => {},
    wire: () => {},
  }),
  globals: shadow({
    Date,
    setTimeout,
    window: {
      innerWidth: 0,
      innerHeight: 0,
      addEventListener: () => {},
    },
  }),
};
