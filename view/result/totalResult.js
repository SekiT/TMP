import { view, toCssText } from '@/lib/view';
import tapeGen from '@/view/generator/tapeGen';
import { showScore } from '@/view/case/numbers';

const initialState = {
  finished: false,
  order: Array(10).fill(0),
  tape: Array(10).fill(0),
  score: 0,
  opacity: 0,
};

const containerStyle = (opacity, fontSize) => toCssText({
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

const fontSize = 'min(4vw, 6vh)';

const titleStyle = (finished) => toCssText({
  marginBottom: fontSize,
  fontSize: `calc(${fontSize} * 1.3)`,
  color: finished ? '#fc9' : '#c99',
});

const orderView = tapeGen(4, 6);
const tapeView = tapeGen(4, 6);

const tapeStyle = { display: 'inline-block' };
[orderView, tapeView].forEach((v) => v.update(() => ({ style: tapeStyle })));

const scoreStyle = toCssText({
  fontSize,
  marginTop: fontSize,
});

const totalResult = view(initialState, (render) => ({
  finished, caseNumber, order, tape, score, opacity,
}) => {
  orderView.update(() => ({ tape: order }));
  tapeView.update(() => ({ tape }));
  const numberStyle = `display:${finished ? 'none' : 'block'}`;
  const numberTitle = finished ? '' : `at No.${caseNumber}`;
  return render`<div style=${containerStyle(opacity)}>
    <div style=${titleStyle(finished)}>${finished ? 'Finished!' : 'Game Over'}</div>
    <div style=${numberStyle}>${numberTitle}</div>
    ${finished ? '' : orderView.render()}<br>${finished ? '' : tapeView.render()}<br>
    <div style=${scoreStyle}>Total score: ${showScore(score)}</div>
  </div>`;
});

export default totalResult;
