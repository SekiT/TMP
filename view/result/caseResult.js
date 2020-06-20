import windowSize from '@/subject/windowSize';
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
  fontSize: 0,
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

const titleStyle = (type, fontSize) => toCssText({
  color: titleColor.get(type),
  fontSize: `${fontSize}px`,
});

const titleText = new Map([
  [types.pass, 'Pass'],
  [types.solved, 'Solved!'],
  [types.timeup, "Time's up."],
]);

const scoreBoardStyle = (fontSize) => toCssText({
  display: 'inline-block',
  margin: `${fontSize}px 0`,
  fontSize: `${fontSize}px`,
  color: 'white',
});

const bonusStyle = (fontSize) => toCssText({
  fontSize: `${fontSize}px`,
});

export const bonus = (commandsSaved, accepted, steps, timeLeft) => (
  (commandsSaved + (accepted ? 1 : 0)) * 100 * steps * 0.1 * (timeLeft / TIME_LIMIT) * 3 | 0
);

const caseResultView = view(initialState, (render) => ({
  type, commandsSaved, accepted, steps, timeLeft, opacity, fontSize,
}) => render`<div style=${containerStyle(opacity)}>
  <div style=${titleStyle(type, fontSize * 1.3)}>${titleText.get(type)}</div>
  <table style=${scoreBoardStyle(fontSize)}>
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
  <div style=${bonusStyle(fontSize)}>Score: +${
  showScore(bonus(commandsSaved, accepted, steps, timeLeft))
}</div>
</div>`);

windowSize.subscribe(({ width, height }) => {
  caseResultView.update(() => ({ fontSize: Math.min(width * 0.04, height * 0.06) }));
});

export default caseResultView;
