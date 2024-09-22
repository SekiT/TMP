import { css } from '@linaria/core';
import { signals, enqueue } from '@/subject/inputSignal';
import { view } from '@/lib/view';

const curtain = css`
  display: var(--display);
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.6);
  opacity: var(--opacity);
`;

const curtainStyle = (opacity) => `
--display:${opacity ? 'block' : 'none'};
--opacity:${opacity};
`;

const onClick = () => enqueue(signals.goNext);

export default view({ opacity: 0 }, (render) => ({ opacity }) => (
  render`<div class=${curtain} style=${curtainStyle(opacity)} onclick=${onClick}></div>`
));
