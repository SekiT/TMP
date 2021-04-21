import { enqueue, signals } from '@/subject/inputSignal';
import { view, toCssText } from '@/lib/view';

const initialState = {
  running: false,
  disabled: true,
};

const containerStyle = toCssText({
  display: 'table-cell',
  position: 'absolute',
  top: '19%',
  width: '100%',
  height: '10%',
  textAlign: 'center',
  verticalAlign: 'middle',
  fontFamily: 'Courier New',
});

const fontSize = 'min(5vw, 6.5vh)';

const buttonStyle = toCssText({
  margin: `calc(5vh - ${fontSize} / 2) 0.5em`,
  width: 'min(25vw, 32.5vh)', // fontSize * 5
  height: fontSize,
  fontSize,
  borderRadius: 'min(0.75vw, 0.975vh)', // fontSize * 0.15
});

const onClickResetButton = () => enqueue(signals.reset);
const onClickHaltButton = () => enqueue(signals.halt);
const onClickPassButton = () => enqueue(signals.pass);

const controlView = view(initialState, (render) => ({ running, disabled }) => (
  render`<div style=${containerStyle}>
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
