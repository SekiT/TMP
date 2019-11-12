import view from 'lib/view';
import { TIME_LIMIT } from 'phase/main/animations';
import { showTime, showScore } from '../case/numbers';

const initialState = {
  commandsSaved: 0,
  steps: 0,
  timeLeft: 0,
  opacity: 0,
  fontSize: 30,
};

const containerStyle = (opacity) => ({
  display: opacity === 0 ? 'none' : 'block',
  position: 'absolute',
  top: '20%',
  width: '100%',
  'text-align': 'center',
  color: 'white',
  opacity,
});

const titleStyle = (timeLeft, fontSize) => ({
  color: timeLeft === 0 ? '#ccf' : '#cfc',
  'font-size': `${fontSize}px`,
});

const title = (timeLeft) => (timeLeft === 0 ? 'Timed out!' : 'Clear!');

const scoreBoardStyle = (fontSize) => ({
  display: 'inline-block',
  margin: `${fontSize}px 0`,
  'font-size': `${fontSize}px`,
  color: 'white',
});

const bonusStyle = (fontSize) => ({
  'font-size': `${fontSize}px`,
});

const score = (commandsSaved, steps, timeLeft) => (
  commandsSaved * 1000 * steps * 0.1 * (timeLeft / TIME_LIMIT) * 3 | 0
);

export default view(initialState, (render) => ({
  commandsSaved, steps, timeLeft, opacity, fontSize,
}) => (
  render`<div style=${containerStyle(opacity)}>
    <div style=${titleStyle(timeLeft, fontSize * 1.3)}>${title(timeLeft)}</div>
    <table style=${scoreBoardStyle(fontSize)}>
      <tr><td>Commands saved</td><td></td><td>Steps</td><td></td><td>Time left</td></tr>
      <tr>
        <td>(${commandsSaved} &times; 1,000)</td><td>&times;</td>
        <td>(${steps} &times; 0.1)</td><td>&times;</td>
        <td>(${showTime(timeLeft)} / ${TIME_LIMIT}.00 &times; 3)</td></tr>
    </table>
    <div style=${bonusStyle(fontSize)}>Score: +${showScore(score(commandsSaved, steps, timeLeft))}</div>
  </div>`
));
