import view from '../../lib/view';

const initialState = {
  state0: 0,
  char0: 0,
  direction: 'R',
  char1: 1,
  state1: 1,
  disabled: true,
};

const containerStyle = {
  display: 'inline-block',
  margin: '1% 3%',
  'text-align': 'center',
  'white-space': 'nowrap',
};

export default () => view(initialState, (render) => ({
  state0, char0, direction, char1, state1, disabled,
}) => render`<div style=${containerStyle}>&lt;${state0}, ${char0},
  <button disabled=${disabled}>${direction}</button>,
  <button>${char1}</button>,
  <button>${state1}</button>&gt;</div>`);
