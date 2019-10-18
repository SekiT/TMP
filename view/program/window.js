import view from '../../lib/view';
import windowSize from '../../subject/windowSize';
import commandView from './command';

const commandViews = [...Array(10)].map((_, index) => commandView(index % 2));

commandViews.forEach((v, index) => v.update((state) => ({
  ...state,
  state0: index / 2 | 0,
  char0: index & 1,
  direction: 'R',
  char1: index & 1,
  state1: [1, 2, 3, 4, 'A'][(index / 2 | 0)],
})));

const containerStyle = {
  position: 'absolute',
  top: '30%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  border: '1px solid #999',
  'background-color': 'rgba(51, 51, 153, 0.8)',
};

const commandsListStyle = {
  width: '90%',
  margin: '3% 5% 3% 5%',
  'text-align': 'center',
};

const titleStyle = {
  padding: '0 0 10px 10px',
  'font-size': '150%',
  'font-family': 'Courier New',
  color: 'white',
};

export default view(null, (render) => () => render`<div style=${containerStyle}>
  <span style=${titleStyle}>Program</span>
  <div style=${commandsListStyle}>
    ${commandViews.map((v) => v.render())}
  </div>
</div>`);

windowSize.subscribe(({ width: windowWidth, height: windowHeight }) => {
  const fontSize = Math.min(windowWidth * 0.0225, windowHeight * 0.05);
  commandViews.forEach((v) => v.update((state) => ({ ...state, fontSize })));
});
