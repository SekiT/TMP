import view from 'lib/view';

const curtainStyle = (show) => ({
  display: show ? 'block' : 'none',
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  'background-color': 'rgba(0, 0, 0, 0.6)',
});

export default view(true, (render) => (show) => (
  render`<div style=${curtainStyle(show)}></div>`
));
