import view from '../../lib/view';
import windowSize from '../../subject/windowSize';
import { programSubject } from '../../subject/program';
import commandView from './command';

const commandViews = [...Array(10)].map((_, index) => commandView(index));

const containerStyle = (fontSize) => ({
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: `${fontSize * 23}px`,
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

const windowView = view({ fontSize: 0 }, (render) => ({ fontSize }) => render`<div style=${containerStyle(fontSize)}>
  <span style=${titleStyle}>Program</span>
  <div>${commandViews.map((v) => v.render())}</div>
</div>`);

windowSize.subscribe(({ width: windowWidth, height: windowHeight }) => {
  const fontSize = Math.min(windowWidth * 0.03, windowHeight * 0.08);
  windowView.update((state) => ({ ...state, fontSize }));
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
