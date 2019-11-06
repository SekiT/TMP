import view from 'lib/view';
import windowSize from 'subject/windowSize';
import tapeGen from 'view/generator/tapeGen';

const tapeView = tapeGen();

const containerView = view({ position: 0 }, (render) => ({
  position, cellWidth, ...tapeProps
}) => {
  const containerStyle = {
    position: 'absolute',
    top: '30%',
    left: '50%',
    transform: `translate(${cellWidth * (-0.5 - position)}px, 0)`,
  };
  tapeView.update(() => ({ ...tapeProps, cellWidth }));
  return render`<div style=${containerStyle}>${tapeView.render()}</div>`;
});

windowSize.subscribe(({ width: windowWidth, height: windowHeight }) => {
  const cellWidth = Math.min(windowWidth * 0.15, windowHeight * 0.3);
  containerView.update(() => ({ cellWidth }));
});

export default containerView;
