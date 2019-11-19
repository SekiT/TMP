import view from 'lib/view';
import windowSize from 'subject/windowSize';
import { programSubject } from 'subject/program';
import { enqueue, signals } from 'subject/inputSignal';
import commandView from './command';

const initialState = {
  fontSize: 0,
  style: { display: 'none' },
  disabled: true,
};

const commandViews = [...Array(10)].map((_, index) => commandView(index));

const containerStyle = (fontSize, style) => ({
  position: 'absolute',
  top: '29%',
  left: '50%',
  transform: 'translate(-50%, 0)',
  width: fontSize * 20,
  padding: '5px 0 10px 0',
  textAlign: 'center',
  fontSize: `${fontSize}px`,
  lineHeight: `${fontSize}px`,
  border: '1px solid #999',
  backgroundColor: 'rgba(51, 51, 153, 0.8)',
  color: 'white',
  fontFamily: 'Courier New',
  ...style,
});

const titleStyle = {
  marginBottom: '10px',
};

const runButonStyle = (fontSize) => {
  const height = `${fontSize * 1.3}px`;
  return {
    height,
    marginTop: '0.1em',
    padding: '0 1em',
    fontSize: height,
    lineHeight: height,
    borderRadius: `${fontSize * 0.15}px`,
  };
};

// Taking onClickRunButton as argument to go around `no-use-before-defined`
const windowView = view(initialState, (({ onClickRunButton }) => (render) => ({
  fontSize, style, disabled,
}) => {
  commandViews.forEach((v) => v.update(() => ({ disabled })));
  return render`<div style=${containerStyle(fontSize, style)}>
    <span style=${titleStyle}>Program</span>
    <div>${commandViews.map((v) => v.render())}</div>
    <button
      style=${runButonStyle(fontSize)}
      disabled=${disabled}
      onclick=${onClickRunButton}>RUN</button>
  </div>`;
})({
  onClickRunButton: () => {
    enqueue(signals.run);
    windowView.update(() => ({ disabled: true }));
  },
}));

windowSize.subscribe(({ width: windowWidth, height: windowHeight }) => {
  windowView.update(() => ({ fontSize: Math.min(windowWidth * 0.04, windowHeight * 0.06) }));
});

programSubject.subscribe((program) => {
  program.forEach(({ direction, nextChar, nextState }, index) => commandViews[index].update(() => ({
    state0: index >> 1,
    char0: index & 1,
    direction,
    char1: nextChar,
    state1: nextState,
  })));
});

export default windowView;
