import view from '../../lib/view';
import windowSize from '../../subject/windowSize';

const initialState = {
  state: 0,
  cellWidth: window.innerWidth * 0.08,
};

const headView = view(initialState, (render) => ({ state, cellWidth }) => {
  const commonStyle = {
    position: 'absolute',
    height: `${cellWidth}px`,
    background: 'radial-gradient(#AAAAAA, #666666)',
  };
  const armStyle = {
    ...commonStyle,
    top: '0px',
    width: `${cellWidth * 0.125}px`,
    'border-radius': `${cellWidth * 0.0625}px ${cellWidth * 0.0625}px 0 0`,
  };
  const headStyle = {
    ...commonStyle,
    left: `${cellWidth * 5.1875}px`,
    top: `${cellWidth}px`,
    width: `${cellWidth * 1.125}px`,
    'border-radius': `0 0 ${cellWidth * 0.0625}px ${cellWidth * 0.0625}px`,
    color: 'white',
    'font-size': `${cellWidth * 0.8}px`,
    'line-height': `${cellWidth}px`,
    'text-align': 'center',
  };
  return render`
    <div style=${{ ...armStyle, left: `${cellWidth * 5.1875}px` }}></div>
    <div style=${{ ...armStyle, left: `${cellWidth * 6.1875}px` }}></div>
    <div style=${headStyle}>${state}</div>
  `;
});

windowSize.subscribe(({ width: windowWidth, height: windowHeight }) => {
  const cellWidth = Math.min(windowWidth * 0.08, windowHeight);
  headView.update((state) => ({ ...state, cellWidth }));
});

export default headView;
