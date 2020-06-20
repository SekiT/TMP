import { shadow } from '@/lib/shadow';

export default {
  hyperhtml: {
    bind: shadow(() => {}),
    wire: shadow(() => {}),
  },
  uhtml: {
    render: shadow(() => {}),
    html: shadow(() => {}),
  },
  globals: {
    now: shadow(Date.now),
    setTimeout: shadow(setTimeout),
    window: shadow({
      innerWidth: 0,
      innerHeight: 0,
      addEventListener: () => {},
    }),
    random: shadow(Math.random),
    DocumentFragment: shadow(() => {}),
  },
};
