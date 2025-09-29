import { toCssText, view } from '@/lib/view';
import tapeSubject from '@/subject/tape';
import tapeGen from '@/view/generator/tapeGen';

const orderView = tapeGen(5, 7);
const tapeView = tapeGen(5, 7);

export const updateOrder = (tape) => orderView.update(() => ({ tape }));

const containerStyle = toCssText({
  position: 'absolute',
  top: '3%',
  width: '100%',
  fontFamily: 'serif',
  color: 'white',
});

const tableStyle = toCssText({
  margin: '0 auto',
  fontSize: 'min(3vw, 4.2vh)',
  lineHeight: 'min(3vw, 4.2vh)',
});

const tapesView = view({}, (render) => () => render`<div style=${containerStyle}>
  <table style=${tableStyle}>
    <tr><td>ORDER:</td><td>${orderView.render()}</td></tr>
    <tr><td>TAPE:</td><td>${tapeView.render()}</td></tr>
  </table>
</div>`);

tapeSubject.subscribe((tape) => tapeView.update(() => ({ tape })));

export default tapesView;
