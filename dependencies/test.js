import { shadow } from 'lib/shadow';

export default {
  hyperhtml: {
    bind: shadow(() => {}),
    wire: shadow(() => {}),
  },
  globals: {
    Date: shadow(Date),
    setTimeout: shadow(setTimeout),
    window: shadow({
      innerWidth: 0,
      innerHeight: 0,
      addEventListener: () => {},
    }),
  },
};
