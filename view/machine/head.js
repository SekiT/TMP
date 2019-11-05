import view from 'lib/view';
import windowSize from 'subject/windowSize';

const initialState = {
  state: 0,
  cellWidth: 0,
};

const headView = view(initialState, (render) => ({ state, cellWidth }) => {
  const w16 = cellWidth / 16;
  const containerStyle = {
    position: 'absolute',
    top: '30%',
    left: '50%',
    transform: `translate(-${cellWidth / 2 + w16}px, 0)`,
  };
  const commonStyle = {
    position: 'absolute',
    height: `${cellWidth}px`,
    background: 'radial-gradient(#aaa, #666)',
  };
  const armStyle = {
    ...commonStyle,
    width: `${w16 * 2}px`,
    'border-radius': `${w16}px ${w16}px 0 0`,
  };
  const headStyle = {
    ...commonStyle,
    top: `${cellWidth}px`,
    width: `${cellWidth + w16 * 2}px`,
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
  const cellWidth = Math.min(windowWidth * 0.15, windowHeight * 0.3);
  headView.update(() => ({ cellWidth }));
});

export default headView;
