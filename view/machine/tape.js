import { wire } from 'hyperhtml/esm';
import view from '../../lib/view';
import windowSize from '../../subject/windowSize';

const defaultState = {
  tape: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  position: 4,
  width: 0,
};

const cellDivs = defaultState.tape.map(() => wire({}));

const tapeView = view(defaultState, (render) => ({ tape, position, cellWidth }) => {
  const containerStyle = {
    position: 'absolute',
    top: `${cellWidth}px`,
    left: `${cellWidth * (5.75 - position)}px`,
    width: `${cellWidth * 10}px`,
    height: `${cellWidth}px`,
  };
  const cellStyle = {
    display: 'inline-block',
    width: `${cellWidth}px`,
    height: `${cellWidth}px`,
    'font-size': `${cellWidth * 0.8}px`,
    'line-height': `${cellWidth}px`,
    'text-align': 'center',
  };
  return render`<div style=${containerStyle}>${
    cellDivs.map((div, index) => {
      const character = tape[index];
      const className = `cell${character}`;
      return div`<div class=${className} style=${cellStyle}>${character}</div>`;
    })
  }</div>`;
});

windowSize.subscribe(({ width: windowWidth, height: windowHeight }) => {
  const cellWidth = Math.min(windowWidth * 0.08, windowHeight / 3);
  tapeView.update((state) => ({ ...state, cellWidth }));
});

export default tapeView;
