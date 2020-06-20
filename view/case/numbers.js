import windowSize from '@/subject/windowSize';
import { CASES_TO_COMPLETE } from '@/constant';
import { view, toCssText } from '@/lib/view';

const initialState = {
  number: 1,
  timeLeft: 0,
  score: 0,
  fontSize: 0,
};

const leftUpContainerStyle = (fontSize) => toCssText({
  position: 'absolute',
  top: '1%',
  left: '1%',
  fontSize: `${fontSize}px`,
  color: 'white',
  fontFamily: 'serif',
});

const totalCasesStyle = (fontSize) => toCssText({
  fontSize: `${fontSize * 0.7}px`,
});

const leftDownConatinerStyle = (fontSize) => toCssText({
  position: 'absolute',
  bottom: '1%',
  left: '1%',
  fontSize: `${fontSize}px`,
  color: 'white',
  fontFamily: 'serif',
});

export const showScore = (score) => (
  [...score.toString()].reduceRight(
    ([chunk, acc], char) => (chunk.length === 3 ? [char, `,${chunk}${acc}`] : [`${char}${chunk}`, acc]),
    ['', ''],
  ).join``
);

export const showTime = (timeLeft) => (timeLeft * 100 | 0).toString().padStart(4, '0').replace(/^(..)(..)/, '$1.$2');

const numbersView = view(initialState, (render) => ({
  number, timeLeft, score, fontSize,
}) => render`
  <div style=${leftUpContainerStyle(fontSize)}>
    No.${number}<span style=${totalCasesStyle(fontSize)}>/${CASES_TO_COMPLETE}</span><br>
    ${showTime(timeLeft)}
  </div>
  <div style=${leftDownConatinerStyle(fontSize)}>Score: ${showScore(score)}</div>
`);

export default numbersView;

windowSize.subscribe(({ width, height }) => {
  numbersView.update(() => ({ fontSize: Math.min(width * 0.05, height * 0.07) * 0.6 }));
});
