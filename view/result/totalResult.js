import view from 'lib/view';
import windowSize from 'subject/windowSize';
import tapeGen from 'view/generator/tapeGen';
import { showScore } from 'view/case/numbers';

const initialState = {
  finished: false,
  order: Array(10).fill(0),
  tape: Array(10).fill(0),
  score: 0,
  opacity: 0,
  fontSize: 0,
};

const containerStyle = (opacity, fontSize) => ({
  display: opacity === 0 ? 'none' : 'block',
  position: 'absolute',
  top: '10%',
  width: '100%',
  fontSize: `${fontSize}px`,
  lineHeight: `${fontSize}px`,
  textAlign: 'center',
  color: 'white',
  opacity,
  filter: 'drop-shadow(0 0 0.3rem black)',
});

const titleStyle = (finished, fontSize) => ({
  marginBottom: `${fontSize}px`,
  fontSize: `${fontSize}px`,
  color: finished ? '#fc9' : '#c99',
});

const orderView = tapeGen();
const tapeView = tapeGen();

const tapeStyle = { display: 'inline-block' };
[orderView, tapeView].forEach((v) => v.update(() => ({ style: tapeStyle })));

const scoreStyle = (fontSize) => ({
  fontSize: `${fontSize}px`,
  marginTop: `${fontSize}px`,
});

const totalResult = view(initialState, (render) => ({
  finished, caseNumber, order, tape, score, opacity, fontSize,
}) => {
  orderView.update(() => ({ tape: order, cellWidth: fontSize }));
  tapeView.update(() => ({ tape, cellWidth: fontSize }));
  return render`<div style=${containerStyle(opacity, fontSize)}>
    <div style=${titleStyle(finished, fontSize * 1.3)}>${finished ? 'Finished!' : 'Game Over'}</div>
    <div style=${{ display: finished ? 'none' : 'block' }}>${finished ? '' : `at No.${caseNumber}`}</div>
    ${finished ? '' : orderView.render()}<br>${finished ? '' : tapeView.render()}<br>
    <div style=${scoreStyle(fontSize)}>Total score: ${showScore(score)}</div>
  </div>`;
});

windowSize.subscribe(({ width, height }) => {
  totalResult.update(() => ({ fontSize: Math.min(width * 0.04, height * 0.06) }));
});

export default totalResult;
