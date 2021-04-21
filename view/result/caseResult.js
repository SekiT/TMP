import { TIME_LIMIT } from '@/constant';
import { view, toCssText } from '@/lib/view';
import { showTime, showScore } from '../case/numbers';

export const types = {
  pass: {},
  solved: {},
  timeup: {},
};

const initialState = {
  type: types.pass,
  commandsSaved: 0,
  accepted: false,
  steps: 0,
  timeLeft: 0,
  opacity: 0,
};

const containerStyle = (opacity) => toCssText({
  display: opacity === 0 ? 'none' : 'block',
  position: 'absolute',
  top: '10%',
  width: '100%',
  textAlign: 'center',
  color: 'white',
  opacity,
  filter: 'drop-shadow(0 0 0.3rem black)',
});

const titleColor = new Map([
  [types.pass, '#ccc'],
  [types.solved, '#cfc'],
  [types.timeup, '#ccf'],
]);

const fontSize = 'min(4vw, 6vh)';

const titleStyle = (type) => toCssText({
  color: titleColor.get(type),
  fontSize: `calc(${fontSize} * 1.3)`,
});

const titleText = new Map([
  [types.pass, 'Pass'],
  [types.solved, 'Solved!'],
  [types.timeup, "Time's up."],
]);

const scoreBoardStyle = toCssText({
  display: 'inline-block',
  margin: `${fontSize} 0`,
  fontSize,
  color: 'white',
});

const bonusStyle = toCssText({ fontSize });

export const bonus = (commandsSaved, accepted, steps, timeLeft) => (
  (commandsSaved + (accepted ? 1 : 0)) * 100 * steps * 0.1 * (timeLeft / TIME_LIMIT) * 3 | 0
);

const caseResultView = view(initialState, (render) => ({
  type, commandsSaved, accepted, steps, timeLeft, opacity,
}) => (
  render`<div style=${containerStyle(opacity)}>
    <div style=${titleStyle(type)}>${titleText.get(type)}</div>
    <table style=${scoreBoardStyle}>
      <tr>
        <td>Saved + accepted</td>
        <td />
        <td>Steps</td>
        <td />
        <td>Time left</td>
      </tr>
      <tr>
        <td>((${commandsSaved} + ${accepted ? 1 : 0}) &times; 100)</td>
        <td>&times;</td>
        <td>(${steps} &times; 0.1)</td>
        <td>&times;</td>
        <td>(${showTime(timeLeft)} / ${TIME_LIMIT}.00 &times; 3)</td>
      </tr>
    </table>
    <div style=${bonusStyle}>Score: +${
    showScore(bonus(commandsSaved, accepted, steps, timeLeft))
  }</div>
  </div>`
));

export default caseResultView;
