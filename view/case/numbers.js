import { CASES_TO_COMPLETE } from '@/constant';
import { view, toCssText } from '@/lib/view';

const initialState = {
  number: 1,
  timeLeft: 0,
  score: 0,
  fontSize: 0,
};

const leftUpContainerStyle = toCssText({
  position: 'absolute',
  top: '1%',
  left: '1%',
  fontSize: 'min(3vw, 4.2vh)',
  color: 'white',
  fontFamily: 'serif',
});

const totalCasesStyle = toCssText({
  fontSize: 'min(2.1vw, 2.94vh)',
});

const leftDownConatinerStyle = toCssText({
  position: 'absolute',
  bottom: '1%',
  left: '1%',
  fontSize: 'min(3vw, 4.2vh)',
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

const numbersView = view(initialState, (render) => ({ number, timeLeft, score }) => render`
  <div style=${leftUpContainerStyle}>
    No.${number}<span style=${totalCasesStyle}>/${CASES_TO_COMPLETE}</span><br>
    ${showTime(timeLeft)}
  </div>
  <div style=${leftDownConatinerStyle}>Score: ${showScore(score)}</div>
`);

export default numbersView;
