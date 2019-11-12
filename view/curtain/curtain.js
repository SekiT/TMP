import view from 'lib/view';

const curtainStyle = (opacity) => ({
  display: opacity === 0 ? 'none' : 'block',
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  'background-color': 'rgba(0, 0, 0, 0.6)',
  opacity,
});

export default view(0, (render) => (opacity) => (
  render`<div style=${curtainStyle(opacity)}></div>`
));
