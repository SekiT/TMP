import dependencies from 'dependencies';
import { randomTape } from '@/subject/tape';
import { view } from '@/lib/view';

const { wire } = dependencies.hyperhtml;

export default () => {
  const initialState = {
    tape: randomTape(),
    style: {},
    cellWidth: 0,
  };
  const cellDivs = initialState.tape.map(() => wire({}));
  return view(initialState, (render) => ({ tape, style, cellWidth }) => {
    const tapeStyle = {
      width: `${cellWidth * 10}px`,
      height: `${cellWidth}px`,
      ...style,
    };
    return render`<div style=${tapeStyle}>${
      tape.map((bit, index) => {
        const background = 255 * bit;
        const foreground = 255 - background;
        const cellStyle = {
          display: 'inline-block',
          width: `${cellWidth}px`,
          height: `${cellWidth}px`,
          lineHeight: `${cellWidth}px`,
          fontSize: `${cellWidth}px`,
          textAlign: 'center',
          backgroundColor: `rgb(${background},${background},${background})`,
          color: `rgb(${foreground},${foreground},${foreground})`,
        };
        return cellDivs[index]`<div style=${cellStyle}>${bit < 0.5 ? 0 : 1}</div>`;
      })
    }</div>`;
  });
};
