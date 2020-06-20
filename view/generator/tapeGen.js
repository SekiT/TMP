import { randomTape } from '@/subject/tape';
import { view, toCssText } from '@/lib/view';

const cellViewGen = (initialBit) => view(
  { bit: initialBit, cellWidth: 0 },
  (render) => ({ bit, cellWidth }) => {
    const background = 255 * bit;
    const foreground = 255 - background;
    const cellStyle = toCssText({
      display: 'inline-block',
      width: `${cellWidth}px`,
      height: `${cellWidth}px`,
      lineHeight: `${cellWidth}px`,
      fontSize: `${cellWidth}px`,
      textAlign: 'center',
      backgroundColor: `rgb(${background},${background},${background})`,
      color: `rgb(${foreground},${foreground},${foreground})`,
    });
    return render`<div style=${cellStyle}>${bit < 0.5 ? 0 : 1}</div>`;
  },
);

export default () => {
  const initialState = {
    tape: randomTape(),
    style: {},
    cellWidth: 0,
  };
  const cellViews = initialState.tape.map((bit) => cellViewGen(bit));
  return view(initialState, (render) => ({ tape, style, cellWidth }) => {
    const tapeStyle = toCssText({
      width: `${cellWidth * 10}px`,
      height: `${cellWidth}px`,
      ...style,
    });
    cellViews.forEach((v, index) => v.update(() => ({ cellWidth, bit: tape[index] })));
    return render`<div style=${tapeStyle}>${cellViews.map((v) => v.render())}</div>`;
  });
};
