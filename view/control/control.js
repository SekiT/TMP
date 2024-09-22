import { css } from '@linaria/core';
import { enqueue, signals } from '@/subject/inputSignal';
import { view } from '@/lib/view';

const initialState = {
  running: false,
  disabled: true,
};

const container = css`
  display: table-cell;
  position: absolute;
  top: 19%;
  width: 100%;
  height: 10%;
  text-align: center;
  vertical-align: middle;
  font-family: Courier New;
`;

const fontSize = 'min(5vw, 6.5vh)';

const buttonStyle = css`
  margin: calc(5vh - ${fontSize} / 2) 0.5em;
  width: calc(${fontSize} * 5);
  height: ${fontSize};
  font-size: ${fontSize};
  border-radius: calc(${fontSize} * 0.15);
`;

const onClickResetButton = () => enqueue(signals.reset);
const onClickHaltButton = () => enqueue(signals.halt);
const onClickPassButton = () => enqueue(signals.pass);

const controlView = view(initialState, (render) => ({ running, disabled }) => (
  render`<div class=${container}>
    <button
      style=${buttonStyle}
      onclick=${running ? onClickHaltButton : onClickResetButton}
      .disabled=${disabled}>${running ? 'HALT' : 'RESET'}</button>
    <button
      style=${buttonStyle}
      onclick=${onClickPassButton}
      .disabled=${disabled || running}>PASS</button>
  </div>`
));

export default controlView;
