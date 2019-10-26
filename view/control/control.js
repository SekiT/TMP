import view from '../../lib/view';
import windowSize from '../../subject/windowSize';

const initialState = {
  show: true,
  disabled: true,
  fontSize: 0,
  height: 0,
};

const containerStyle = (show) => ({
  display: show ? 'table-cell' : 'none',
  position: 'absolute',
  top: '19%',
  width: '100%',
  height: '10%',
  'text-align': 'center',
  'vertical-align': 'middle',
  'font-family': 'Courier New',
});

const buttonStyle = (fontSize, height) => ({
  margin: `${(height - fontSize) / 2}px 0.5em`,
  width: `${fontSize * 5}px`,
  height: `${fontSize}px`,
  'font-size': `${fontSize}px`,
  'border-radius': `${fontSize * 0.15}px`,
});

const controlView = view(initialState, (render) => ({
  show, disabled, fontSize, height,
}) => render`<div style=${containerStyle(show)}>
  <button style=${buttonStyle(fontSize, height)} disabled=${disabled}>RESET</button>
  <button style=${buttonStyle(fontSize, height)} disabled=${disabled}>PASS</button>
</div>`);

windowSize.subscribe(({ width: windowWidth, height: windowHeight }) => {
  const fontSize = Math.min(windowWidth * 0.05, windowHeight * 0.065);
  const height = windowHeight * 0.1;
  controlView.update((state) => ({ ...state, fontSize, height }));
});

export default controlView;
