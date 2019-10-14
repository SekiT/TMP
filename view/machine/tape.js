import { wire } from 'hyperhtml/esm';
import view from '../../lib/view';
import windowSize from '../../subject/windowSize';

const defaultState = {
  tape: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  position: 4,
  width: 0,
};

const cellDivs = defaultState.tape.map(() => wire({}));

const tapeView = view(defaultState, (render) => ({ tape, position, width }) => {
  const containerStyle = {
    position: 'absolute',
    top: `${width}px`,
    left: `${width * (5.25 - position)}px`,
    width: `${width * 10}px`,
    height: `${width}px`,
  };
  const cellStyle = {
    display: 'table-cell',
    width: `${width}px`,
    height: `${width}px`,
    'font-size': `${width * 0.8}px`,
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
  const tapeWidth = Math.min(windowWidth * 0.08, windowHeight / 3);
  tapeView.update((state) => ({ ...state, width: tapeWidth }));
});

export default tapeView;
