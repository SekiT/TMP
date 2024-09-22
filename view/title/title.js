import { css } from '@linaria/core';
import { view } from '@/lib/view';

const initialState = { opacity: 0 };

const container = css`
  display: var(--display);
  position: absolute;
  width: 100%;
  top: 30%;
  text-align: center;
  color: white;
  opacity: var(--opacity);
`;

const containerStyle = (opacity) => `
--display:${opacity ? 'block' : 'none'};
--opacity:${opacity};
`;

const title = css`
  font-size: min(12vw, 18vh);
  color: orange;
`;

const titleView = view(initialState, (render) => ({ opacity }) => (
  render`<div class=${container} style=${containerStyle(opacity)}>
    <div class=${title}>TMP</div>
  </div>`
));

export default titleView;
