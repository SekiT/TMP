import { css } from '@linaria/core';
import { CASES_TO_COMPLETE } from '@/constant';
import { view } from '@/lib/view';

const initialState = {
  number: 1,
  timeLeft: 0,
  score: 0,
};

const fontSize = 'min(3vw, 4.2vh)';

const leftUpContainer = css`
  position: absolute;
  top: 1%;
  left: 1%;
  font-size: ${fontSize};
  color: white;
  font-family: serif;
`;

const totalCasesStyle = css`
  font-size: calc(${fontSize} * 0.7);
`;

const leftDownContainer = css`
  position: absolute;
  bottom: 1%;
  left: 1%;
  font-size: ${fontSize};
  color: white;
  font-family: serif;
`;

export const showScore = (score) => (
  [...score.toString()].reduceRight(
    ([chunk, acc], char) => (chunk.length === 3 ? [char, `,${chunk}${acc}`] : [`${char}${chunk}`, acc]),
    ['', ''],
  ).join``
);

export const showTime = (timeLeft) => (timeLeft * 100 | 0).toString().padStart(4, '0').replace(/^(..)(..)/, '$1.$2');

const numbersView = view(initialState, (render) => ({ number, timeLeft, score }) => render`
  <div class=${leftUpContainer}>
    No.${number}<span style=${totalCasesStyle}>/${CASES_TO_COMPLETE}</span><br>
    ${showTime(timeLeft)}
  </div>
  <div class=${leftDownContainer}>Score: ${showScore(score)}</div>
`);

export default numbersView;
