import windowSize from '../../subject/windowSize';
import tapeGen from '../generator/tapeGen';

const tapeView = tapeGen();

windowSize.subscribe(({ width: windowWidth, height: windowHeight }) => {
  const cellWidth = Math.min(windowWidth * 0.08, windowHeight / 3);
  const style = {
    position: 'absolute',
    top: `${cellWidth}px`,
    left: `${cellWidth * 5.75}px`,
    transform: `translate(${cellWidth * -4})`,
  };
  tapeView.update((state) => ({ ...state, style, cellWidth }));
});

export default tapeView;
