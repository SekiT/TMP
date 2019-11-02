import view from 'lib/view';
import windowSize from 'subject/windowSize';
import { programSubject } from 'subject/program';
import commandView from './command';

const commandViews = [...Array(10)].map((_, index) => commandView(index));

const containerStyle = (fontSize) => ({
  position: 'absolute',
  top: '29%',
  left: '50%',
  transform: 'translate(-50%, 0)',
  width: `${fontSize * 20}px`,
  padding: '5px 0 10px 0',
  'text-align': 'center',
  'font-size': `${fontSize}px`,
  'line-height': `${fontSize}px`,
  border: '1px solid #999',
  'background-color': 'rgba(51, 51, 153, 0.8)',
  color: 'white',
  'font-family': 'Courier New',
});

const titleStyle = {
  'margin-bottom': '10px',
};

const runButonStyle = (fontSize) => {
  const height = `${fontSize * 1.3}px`;
  return {
    height,
    'margin-top': '0.1em',
    padding: '0 1em',
    'font-size': height,
    'line-height': height,
    'border-radius': `${fontSize * 0.15}px`,
  };
};

const windowView = view({ fontSize: 0 }, (render) => ({ fontSize }) => render`<div style=${containerStyle(fontSize)}>
  <span style=${titleStyle}>Program</span>
  <div>${commandViews.map((v) => v.render())}</div>
  <button style=${runButonStyle(fontSize)}>RUN</button>
</div>`);

windowSize.subscribe(({ width: windowWidth, height: windowHeight }) => {
  const fontSize = Math.min(windowWidth * 0.04, windowHeight * 0.06);
  windowView.update(() => ({ fontSize }));
});

programSubject.subscribe((program) => {
  program.forEach(({ direction, nextChar, nextState }, index) => commandViews[index].update(() => ({
    state0: index / 2 | 0,
    char0: index & 1,
    direction,
    char1: nextChar,
    state1: nextState,
  })));
});

export default windowView;
