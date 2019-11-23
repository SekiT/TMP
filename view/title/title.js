import view from 'lib/view';
import windowSize from 'subject/windowSize';

const initialState = {
  opacity: 0,
  fontSize: 0,
};

const containerStyle = (opacity) => ({
  display: opacity === 0 ? 'none' : 'block',
  position: 'absolute',
  width: '100%',
  top: '30%',
  textAlign: 'center',
  color: 'white',
  opacity,
});

const titleStyle = (fontSize) => ({
  fontSize: `${fontSize}px`,
  color: 'orange',
});

const titleView = view(initialState, (render) => ({ opacity, fontSize }) => (
  render`<div style=${containerStyle(opacity)}>
    <div style=${titleStyle(fontSize)}>TMP</div>
  </div>`
));

windowSize.subscribe(({ width, height }) => {
  titleView.update(() => ({ fontSize: Math.min(width * 0.04, height * 0.6) * 3 }));
});

export default titleView;
