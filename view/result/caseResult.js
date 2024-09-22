import { css } from '@linaria/core';
import { TIME_LIMIT } from '@/constant';
import { view } from '@/lib/view';
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

const container = css`
  display: var(--display);
  position: absolute;
  top: 10%;
  width: 100%;
  text-align: center;
  color: white;
  opacity: var(--opacity);
  filter: drop-shadow(0 0 0.3rem black);
`;

const containerStyle = (opacity) => `
--display:${opacity ? 'block' : 'none'};
--opacity:${opacity};
`;

const titleColor = new Map([
  [types.pass, '#ccc'],
  [types.solved, '#cfc'],
  [types.timeup, '#ccf'],
]);

const fontSize = 'min(4vw, 6vh)';

const title = css`
  color: var(--titleColor);
  font-size: calc(${fontSize} * 1.3);
`;

const titleStyle = (type) => `
--titleColor:${titleColor.get(type)};
`;

const titleText = new Map([
  [types.pass, 'Pass'],
  [types.solved, 'Solved!'],
  [types.timeup, "Time's up."],
]);

const scoreBoard = css`
  display: inline-block;
  margin: ${fontSize} 0;
  font-size: ${fontSize};
  color: white;
`;

const bonusClass = css`font-size: ${fontSize}`;

export const bonus = (commandsSaved, accepted, steps, timeLeft) => (
  (commandsSaved + (accepted ? 1 : 0)) * 100 * steps * 0.1 * (timeLeft / TIME_LIMIT) * 3 | 0
);

const caseResultView = view(initialState, (render) => ({
  type, commandsSaved, accepted, steps, timeLeft, opacity,
}) => (
  render`<div class=${container} style=${containerStyle(opacity)}>
    <div class=${title} style=${titleStyle(type)}>${titleText.get(type)}</div>
    <table class=${scoreBoard}>
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
    <div class=${bonusClass}>Score: +${showScore(bonus(commandsSaved, accepted, steps, timeLeft))
    }</div>
  </div>`
));

export default caseResultView;
