import { toCssText, view } from '@/lib/view';
import tapeSubject from '@/subject/tape';
import tapeGen from '@/view/generator/tapeGen';

const insideView = tapeGen(15, 30);

const tapeView = view({ position: 0 }, (render) => ({ position }) => {
  const containerStyle = toCssText({
    position: 'absolute',
    top: '30%',
    left: '50%',
    transform: `translateX(calc(-5% - ${position} * 10%))`,
  });
  return render`<div style=${containerStyle}>${insideView.render()}</div>`;
});

tapeSubject.subscribe((tape) => insideView.update(() => ({ tape })));

export default tapeView;
