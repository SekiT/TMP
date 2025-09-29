import commandView from './command';

import { toCssText, view } from '@/lib/view';
import { enqueue, signals } from '@/subject/inputSignal';
import { programSubject } from '@/subject/program';

const initialState = {
  style: { display: 'none' },
  disabled: true,
};

const commandViews = [...Array(10)].map((_, index) => commandView(index));

const fontSize = 'min(4vw, 6vh)';

const containerStyle = (style) => toCssText({
  position: 'absolute',
  top: '29%',
  left: '50%',
  transform: 'translate(-50%, 0)',
  width: `calc(${fontSize} * 20)`,
  padding: '5px 0 10px 0',
  textAlign: 'center',
  fontSize,
  lineHeight: fontSize,
  border: '1px solid #999',
  backgroundColor: 'rgba(51, 51, 153, 0.8)',
  color: 'white',
  fontFamily: 'Courier New',
  ...style,
});

const titleStyle = toCssText({
  marginBottom: '10px',
});

const buttonHeight = `calc(${fontSize} * 1.3)`;

const runButonStyle = toCssText({
  height: buttonHeight,
  marginTop: '0.1em',
  padding: '0 1em',
  fontSize: buttonHeight,
  lineHeight: buttonHeight,
  borderRadius: `calc(${fontSize} * 0.15)`,
});

// Taking onClickRunButton as argument to go around `no-use-before-defined`
const windowView = view(initialState, (({ onClickRunButton }) => (render) => ({
  style, disabled,
}) => {
  commandViews.forEach((v) => v.update(() => ({ disabled })));
  return render`<div style=${containerStyle(style)}>
    <span style=${titleStyle}>Program</span>
    <div>${commandViews.map((v) => v.render())}</div>
    <button
      style=${runButonStyle}
      .disabled=${disabled}
      onclick=${onClickRunButton}>RUN</button>
  </div>`;
})({
  onClickRunButton: () => {
    enqueue(signals.run);
    windowView.update(() => ({ disabled: true }));
  },
}));

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
