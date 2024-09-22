import { css } from '@linaria/core';
import tapeSubject from '@/subject/tape';
import { view } from '@/lib/view';
import tapeGen from '@/view/generator/tapeGen';

const orderView = tapeGen(5, 7);
const tapeView = tapeGen(5, 7);

export const updateOrder = (tape) => orderView.update(() => ({ tape }));

const container = css`
  position: absolute;
  top: 3%;
  width: 100%;
  font-family: serif;
  color: white;
`;

const table = css`
  margin: 0 auto;
  font-size: min(3vw, 4.2vh);
  line-height: min(3vw, 4.2vh);
`;

const tapesView = view({}, (render) => () => render`<div class=${container}>
  <table class=${table}>
    <tr><td>ORDER:</td><td>${orderView.render()}</td></tr>
    <tr><td>TAPE:</td><td>${tapeView.render()}</td></tr>
  </table>
</div>`);

tapeSubject.subscribe((tape) => tapeView.update(() => ({ tape })));

export default tapesView;
