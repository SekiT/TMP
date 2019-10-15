import view from '../../lib/view';
import windowSize from '../../subject/windowSize';

const initialState = {
  state: 0,
  cellWidth: window.innerWidth * 0.08,
};

const headView = view(initialState, (render) => ({ state, cellWidth }) => {
  const containerStyle = {
    position: 'absolute',
    top: `${cellWidth}px`,
    left: `${cellWidth * 5.6875}px`,
  };
  const commonStyle = {
    position: 'absolute',
    height: `${cellWidth}px`,
    background: 'radial-gradient(#aaa, #666)',
  };
  const w16 = cellWidth * 0.0625;
  const armStyle = {
    ...commonStyle,
    top: '0px',
    width: `${w16 * 2}px`,
    'border-radius': `${w16}px ${w16}px 0 0`,
  };
  const headStyle = {
    ...commonStyle,
    top: `${cellWidth}px`,
    width: `${cellWidth * 1.125}px`,
    'border-radius': `0 0 ${w16}px ${w16}px`,
    'font-size': `${cellWidth * 0.8}px`,
    'line-height': `${cellWidth}px`,
    'text-align': 'center',
    color: 'white',
  };
  return render`<div style=${containerStyle}>
    <div style=${armStyle}></div>
    <div style=${{ ...armStyle, left: `${cellWidth}px` }}></div>
    <div style=${headStyle}>${state}</div>
  </div>`;
});

windowSize.subscribe(({ width: windowWidth, height: windowHeight }) => {
  const cellWidth = Math.min(windowWidth * 0.08, windowHeight / 3);
  headView.update((state) => ({ ...state, cellWidth }));
});

export default headView;
