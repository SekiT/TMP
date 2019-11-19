import view from 'lib/view';
import windowSize from 'subject/windowSize';

const initialState = {
  opacity: 0,
  fontsize: 0,
};

const containerStyle = (opacity, fontSize) => ({
  display: opacity === 0 ? 'none' : 'block',
  position: 'absolute',
  width: '100%',
  top: '30%',
  fontSize: `${fontSize}px`,
  textAlign: 'center',
  color: 'white',
  opacity,
});

const titleStyle = (fontSize) => ({
  fontSize: `${fontSize}px`,
  color: 'orange',
});

const titleView = view(initialState, (render) => ({ opacity, fontSize }) => (
  render`<div style=${containerStyle(opacity, fontSize)}>
    <div style=${titleStyle(fontSize * 2)}>TMP</div>
  </div>`
));

windowSize.subscribe(({ width, height }) => {
  const fontSize = Math.min(width * 0.04, height * 0.6);
  titleView.update(() => ({ fontSize }));
});

export default titleView;
