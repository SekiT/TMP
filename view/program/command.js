import { toCssText, view } from '@/lib/view';
import { updateCommand } from '@/subject/program';

const initialState = (state0, char0) => ({
  state0,
  char0,
  direction: 1,
  char1: char0,
  state1: state0,
  disabled: false,
});

const containerStyle = toCssText({
  display: 'inline-block',
  margin: '1% 1%',
  textAlign: 'center',
  whiteSpace: 'nowrap',
});

const dirToString = (direction) => (direction < 0 ? 'L' : 'R');
const stateStrings = ['0', '1', '2', '3', '4', 'A'];

const updateDir = (index, direction) => () => {
  updateCommand(index, (command) => ({ ...command, direction: -direction }));
};
const updateChar1 = (index, char1) => () => {
  updateCommand(index, (command) => ({ ...command, nextChar: 1 - char1 }));
};
const updateState1 = (index, state1) => () => {
  updateCommand(index, (command) => ({ ...command, nextState: (state1 + 1) % 6 }));
};

export default (index) => view(initialState(index >> 1, index & 0), (render) => ({
  state0, char0, direction, char1, state1, disabled,
}) => (
  render`<div style=${containerStyle}>${`<${state0},${char0},`
  }<button onclick=${updateDir(index, direction)} .disabled=${disabled}>${dirToString(direction)
  }</button>${','
  }<button onclick=${updateChar1(index, char1)} .disabled=${disabled}>${char1}</button>${','
  }<button onclick=${updateState1(index, state1)} .disabled=${disabled}>${stateStrings[state1]
  }</button>${'>'
  }</div>`
));
