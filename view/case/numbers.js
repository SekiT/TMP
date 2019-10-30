import view from '../../lib/view';
import windowSize from '../../subject/windowSize';

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

const numbersView = view(initialState, (render) => ({
  number, timeLeft, score, fontSize,
}) => {
  const timeShown = timeLeft.toPrecision(timeLeft < 10 ? 3 : 4).padStart(5, '0');
  const scoreShown = score.toString().split``.reduceRight(
    ([chunk, acc], char) => (chunk.length === 3 ? [char, `,${chunk}${acc}`] : [`${char}${chunk}`, acc]),
    ['', ''],
  ).join``;

  return render`<div style=${leftUpContainerStyle(fontSize)}>
    No.${number}<br>
    ${timeShown}
  </div><div style=${leftDownConatinerStyle(fontSize)}>
    Score: ${scoreShown}
  </div>`;
});

export default numbersView;

windowSize.subscribe(({ width: windowWidth, height: windowHeight }) => {
  const fontSize = Math.min(windowWidth * 0.05, windowHeight * 0.07) * 0.6;
  numbersView.update(() => ({ fontSize }));
});
