import view from 'lib/view';
import windowSize from 'subject/windowSize';

const initialState = {
  number: 1,
  timeLeft: 30.2,
  score: 1234567890,
  fontSize: 0,
};

const leftUpContainerStyle = (fontSize) => ({
  position: 'absolute',
  top: '1%',
  left: '1%',
  'font-size': `${fontSize}px`,
  color: 'white',
  'font-family': 'serif',
});

const leftDownConatinerStyle = (fontSize) => ({
  position: 'absolute',
  bottom: '1%',
  left: '1%',
  'font-size': `${fontSize}px`,
  color: 'white',
  'font-family': 'serif',
});

const showScore = (score) => (
  [...score.toString()].reduceRight(
    ([chunk, acc], char) => (chunk.length === 3 ? [char, `,${chunk}${acc}`] : [`${char}${chunk}`, acc]),
    ['', ''],
  ).join``
);

const numbersView = view(initialState, (render) => ({
  number, timeLeft, score, fontSize,
}) => {
  const timeShown = timeLeft.toPrecision(timeLeft < 10 ? 3 : 4).padStart(5, '0');
  return render`<div style=${leftUpContainerStyle(fontSize)}>
    No.${number}<br>
    ${timeShown}
  </div><div style=${leftDownConatinerStyle(fontSize)}>
    Score: ${showScore(score)}
  </div>`;
});

export default numbersView;

windowSize.subscribe(({ width: windowWidth, height: windowHeight }) => {
  const fontSize = Math.min(windowWidth * 0.05, windowHeight * 0.07) * 0.6;
  numbersView.update(() => ({ fontSize }));
});
