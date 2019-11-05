import view from 'lib/view';
import windowSize from 'subject/windowSize';
import tapeGen from 'view/generator/tapeGen';

const orderView = tapeGen();
const tapeView = tapeGen();

export const updateOrder = (tape) => orderView.update(() => ({ tape }));
export const updateTape = (tape) => tapeView.update(() => ({ tape }));

const initialState = {
  fontSize: 10,
};

const containerStyle = {
  position: 'absolute',
  top: '3%',
  width: '100%',
  'font-family': 'serif',
  color: 'white',
};

const tableStyle = (fontSize) => ({
  margin: '0 auto',
  'font-size': `${fontSize}px`,
  'line-height': `${fontSize}px`,
});

const tapesView = view(initialState, (render) => ({ fontSize }) => render`<div style=${containerStyle}>
  <table style=${tableStyle(fontSize)}>
    <tr><td>ORDER:</td><td>${orderView.render()}</td></tr>
    <tr><td>TAPE:</td><td>${tapeView.render()}</td></tr>
  </table>
</div>`);

windowSize.subscribe(({ width: windowWidth, height: windowHeight }) => {
  const cellWidth = Math.min(windowWidth * 0.05, windowHeight * 0.07);
  tapesView.update(() => ({ fontSize: cellWidth * 0.6 }));
  orderView.update(() => ({ cellWidth }));
  tapeView.update(() => ({ cellWidth }));
});

export default tapesView;
