import view from '../../lib/view';
import windowSize from '../../subject/windowSize';
import tapeGen from '../generator/tapeGen';

const orderView = tapeGen();
const tapeView = tapeGen();

const initialState = {
  order: [...Array(10)].map(() => Math.round(Math.random())),
  tape: [...Array(10)].map(() => Math.round(Math.random())),
  fontSize: 10,
};

const containerStyle = {
  position: 'absolute',
  top: '5%',
  width: '100%',
  'font-family': 'serif',
  color: 'white',
};

const tableStyle = (fontSize) => ({
  margin: '0 auto',
  'font-size': `${fontSize}px`,
  'line-height': `${fontSize}px`,
});

const caseView = view(initialState, (render) => ({ fontSize }) => render`<div style=${containerStyle}>
  <table style=${tableStyle(fontSize)}>
    <tr><td>ORDER:</td><td>${orderView.render()}</td></tr>
    <tr><td>TAPE:</td><td>${tapeView.render()}</td></tr>
  </table>
</div>`);

// FIXME
orderView.update(() => ({ tape: initialState.order, style: {}, cellWidth: 20 }));
tapeView.update(() => ({ tape: initialState.tape, style: {}, cellWidth: 20 }));

windowSize.subscribe(({ width: windowWidth, height: windowHeight }) => {
  const cellWidth = Math.min(windowWidth * 0.07, windowHeight * 0.07);
  caseView.update(() => ({ fontSize: cellWidth * 0.6 }));
  orderView.update((state) => ({ ...state, cellWidth }));
  tapeView.update((state) => ({ ...state, cellWidth }));
});

export default caseView;
