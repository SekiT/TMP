import { css, cx } from '@linaria/core';
import { view } from '@/lib/view';

const initialState = { state: 0 };

const stateToString = (state) => 'E01234AH'[state + 1];

const cellWidth = 'min(15vw, 30vh)';
const w16 = `calc(${cellWidth} / 16)`;

const container = css`
  position: absolute;
  top: 30%;
  left: calc(50% - ${cellWidth} * 9 / 16);
`;

const commonStyle = css`
  position: absolute;
  height: ${cellWidth};
  background: radial-gradient(#aaa, #666);
`;

const arm = css`
  width: calc(${cellWidth} / 8);
  border-radius: ${w16} ${w16} 0 0;
`;

const rightArm = css`left: ${cellWidth}`;

const head = css`
  top: ${cellWidth};
  width: calc(${cellWidth} * 9 / 8);
  border-radius: 0 0 ${w16} ${w16};
  font-size: calc(${cellWidth} * 0.8);
  line-height: ${cellWidth};
  text-align: center;
  color: white;
`;

const headView = view(initialState, (render) => ({ state }) => (
  render`<div class=${cx(commonStyle, container)}>
    <div class=${cx(commonStyle, arm)} />
    <div class=${cx(commonStyle, arm, rightArm)} />
    <div class=${cx(commonStyle, head)}>${stateToString(state)}</div>
  </div>`
));

export default headView;
