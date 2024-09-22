import { css } from '@linaria/core';
import { randomTape } from '@/subject/tape';
import { view } from '@/lib/view';

const cell = css`
  display: inline-block;
  width: var(--cellWidth);
  height: var(--cellWidth);
  line-height: var(--cellWidth);
  font-size: var(--cellWidth);
  text-align: center;
  background-color: rgb(var(--background),var(--background),var(--background));
  color: rgb(var(--foreground),var(--foreground),var(--foreground));
`;

const cellStyle = (cellWidth, bit) => `
--cellWidth:${cellWidth};
--background:${255 * bit};
--foreground:${255 * (1 - bit)};
`;

const cellViewGen = (initialBit, cellWidth) => view(
  { bit: initialBit },
  (render) => ({ bit }) => (
    render`<div class=${cell} style=${cellStyle(cellWidth, bit)}>${bit < 0.5 ? 0 : 1}</div>`
  ),
);

const tapeClass = css`
  display: var(--display);
  width: calc(var(--cellWidth) * 10);
  height: var(--cellWidth);
`;

const tapeStyle = (isInline, cellWidth) => `
--display:${isInline ? 'inline-block' : 'block'};
--cellWidth:${cellWidth};
`;

export default (vw, vh, isInline = false) => {
  const initialState = { tape: randomTape() };
  const cellWidth = `min(${vw}vw, ${vh}vh)`;
  const cellViews = initialState.tape.map((bit) => cellViewGen(bit, cellWidth));
  return view(initialState, (render) => ({ tape }) => {
    cellViews.forEach((v, index) => v.update(() => ({ bit: tape[index] })));
    return render`<div class=${tapeClass} style=${tapeStyle(isInline, cellWidth)}>
      ${cellViews.map((v) => v.render())}
    </div>`;
  });
};
