import { randomTape } from '@/subject/tape';
import { view, toCssText } from '@/lib/view';

const size = (vw, vh) => `min(${vw}vw, ${vh}vh)`;

const cellViewGen = (initialBit, sizeString) => view(
  { bit: initialBit },
  (render) => ({ bit }) => {
    const background = 255 * bit;
    const foreground = 255 - background;
    const cellStyle = toCssText({
      display: 'inline-block',
      width: sizeString,
      height: sizeString,
      lineHeight: sizeString,
      fontSize: sizeString,
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
  const cellSizeString = size(vw, vh);
  const cellViews = initialState.tape.map((bit) => cellViewGen(bit, cellSizeString));
  return view(initialState, (render) => ({ tape, style }) => {
    const tapeStyle = toCssText({
      width: size(vw * 10, vh * 10),
      height: cellSizeString,
      ...style,
    });
    cellViews.forEach((v, index) => v.update(() => ({ bit: tape[index] })));
    return render`<div style=${tapeStyle}>${cellViews.map((v) => v.render())}</div>`;
  });
};
