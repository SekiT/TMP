import view from 'lib/view';
import windowSize from 'subject/windowSize';

const initialState = {
  opacity: 0,
  fontSize: 0,
};

const containerStyle = (opacity) => ({
  display: opacity === 0 ? 'none' : 'block',
  position: 'absolute',
  top: '10%',
  width: '100%',
  textAlign: 'center',
  color: 'white',
  opacity,
  filter: 'drop-shadow(0 0 0.3rem black)',
});

const titleStyle = (fontSize) => ({
  fontSize: `${fontSize}px`,
  color: '#c99',
});

const totalResult = view(initialState, (render) => ({
  opacity, fontSize,
}) => render`<div style=${containerStyle(opacity)}>
  <div style=${titleStyle(fontSize * 1.3)}>Game Over</div>
</div>`);

windowSize.subscribe(({ width, height }) => {
  const fontSize = Math.min(width * 0.04, height * 0.06);
  totalResult.update(() => ({ fontSize }));
});

export default totalResult;
