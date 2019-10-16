import view from '../../lib/view';

const initialState = {
  state0: 0,
  char0: 0,
  direction: 'R',
  char1: 1,
  state1: 1,
  fontSize: 18,
};

export default () => view(initialState, (render) => ({
  state0, char0, direction, char1, state1, fontSize,
}) => {
  const containerStyle = {
    display: 'inline-block',
    width: '46%',
    margin: `${fontSize * 0.1}px 2%`,
    'text-align': 'center',
    'font-size': `${fontSize}px`,
    'line-height': `${fontSize}px`,
    color: 'white',
    'font-family': 'Courier New',
  };
  return render`<div style=${containerStyle}>
    &lt;${state0}, ${char0}, ${direction}, ${char1}, ${state1}&gt;
  </div>`;
});
