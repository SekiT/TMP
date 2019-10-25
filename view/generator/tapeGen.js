import { wire } from 'hyperhtml';
import view from '../../lib/view';

const colors = ['black', 'white'];

export default () => {
  const initialState = { tape: Array(10).fill(0), style: {}, cellWidth: 0 };
  const cellDivs = [...Array(10)].map(() => wire({}));
  return view(initialState, (render) => ({ tape, style, cellWidth }) => {
    const tapeStyle = {
      width: `${cellWidth * 10}px`,
      height: `${cellWidth}px`,
      ...style,
    };
    return render`<div style=${tapeStyle}>${
      tape.map((bit, index) => {
        const cellStyle = {
          display: 'inline-block',
          width: `${cellWidth}px`,
          height: `${cellWidth}px`,
          'line-height': `${cellWidth}px`,
          'font-size': `${cellWidth}px`,
          'text-align': 'center',
          'background-color': colors[bit],
          color: colors[1 - bit],
        };
        return cellDivs[index]`<div style=${cellStyle}>${bit}</div>`;
      })
    }</div>`;
  });
};
