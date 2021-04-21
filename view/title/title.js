import { view, toCssText } from '@/lib/view';

const initialState = { opacity: 0 };

const containerStyle = (opacity) => toCssText({
  display: opacity === 0 ? 'none' : 'block',
  position: 'absolute',
  width: '100%',
  top: '30%',
  textAlign: 'center',
  color: 'white',
  opacity,
});

const titleStyle = toCssText({
  fontSize: 'min(12vw, 18vh)',
  color: 'orange',
});

const titleView = view(initialState, (render) => ({ opacity }) => (
  render`<div style=${containerStyle(opacity)}>
    <div style=${titleStyle}>TMP</div>
  </div>`
));

export default titleView;
