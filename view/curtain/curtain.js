import { signals, enqueue } from '@/subject/inputSignal';
import { view, toCssText } from '@/lib/view';

const curtainStyle = (opacity) => toCssText({
  display: opacity === 0 ? 'none' : 'block',
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  backgroundColor: 'rgba(0, 0, 0, 0.6)',
  opacity,
});

const onClick = () => enqueue(signals.goNext);

export default view({ opacity: 0 }, (render) => ({ opacity }) => (
  render`<div style=${curtainStyle(opacity)} onclick=${onClick}></div>`
));
