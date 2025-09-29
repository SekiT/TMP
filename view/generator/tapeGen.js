import { toCssText, view } from '@/lib/view';
import { randomTape } from '@/subject/tape';

const cellViewGen = (initialBit, cellWidth) => view(
  { bit: initialBit },
  (render) => ({ bit }) => {
    const background = 255 * bit;
    const foreground = 255 - background;
    const cellStyle = toCssText({
      display: 'inline-block',
      width: cellWidth,
      height: cellWidth,
      lineHeight: cellWidth,
      fontSize: cellWidth,
      textAlign: 'center',
      backgroundColor: `rgb(${background},${background},${background})`,
      color: `rgb(${foreground},${foreground},${foreground})`,
    });
    return render`<div style=${cellStyle}>${bit < 0.5 ? 0 : 1}</div>`;
  },
);

export default (vw, vh) => {
  const initialState = {
    tape: randomTape(),
    style: {},
  };
  const cellWidth = `min(${vw}vw, ${vh}vh)`;
  const cellViews = initialState.tape.map((bit) => cellViewGen(bit, cellWidth));
  return view(initialState, (render) => ({ tape, style }) => {
    const tapeStyle = toCssText({
      width: `calc(${cellWidth} * 10)`,
      height: cellWidth,
      ...style,
    });
    cellViews.forEach((v, index) => v.update(() => ({ bit: tape[index] })));
    return render`<div style=${tapeStyle}>${cellViews.map((v) => v.render())}</div>`;
  });
};
