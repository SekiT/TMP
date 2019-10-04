import { wire } from 'hyperhtml/esm';
import view from '../lib/view';

const defaultState = {
  tape: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  position: 0,
};

const colors = ['black', 'white'];

const cellDivs = defaultState.tape.map(() => wire({}));

export default view(defaultState, (render) => ({ tape, position }) => {
  const containerStyle = {
    position: 'relative',
    left: `${position}px`,
  };
  return render`
  <div style=${containerStyle}>
  ${cellDivs.map((div, index) => {
    const character = tape[index];
    const cellStyle = {
      display: 'table-cell',
      width: '30px',
      height: '30px',
      'text-align': 'center',
      'vertical-align': 'middle',
      'background-color': colors[character],
      color: colors[1 - character],
    };
    return div`<div style=${cellStyle}>${character}</div>`;
  })}
  </div>
  `;
});
