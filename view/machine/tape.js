import windowSize from 'subject/windowSize';
import tapeGen from 'view/generator/tapeGen';

const tapeView = tapeGen();

windowSize.subscribe(({ width: windowWidth, height: windowHeight }) => {
  const cellWidth = Math.min(windowWidth * 0.15, windowHeight * 0.3);
  const style = {
    position: 'absolute',
    top: '30%',
    left: '50%',
    transform: `translate(-${cellWidth / 2}px, 0)`,
  };
  tapeView.update(() => ({ style, cellWidth }));
});

export default tapeView;
