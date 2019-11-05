import windowView, { setDisabled } from 'view/program/window';
import programmingSubPhase from './programming';

const clipPath = (time) => {
  const left = Math.max((1 - time / 20) * 50, 0);
  const right = Math.min((1 + time / 20) * 50, 100);
  const bottom = Math.min(Math.max((time - 30) / 10, 0) * 87 + 13, 100);
  return `polygon(${left}% 0, ${right}% 0, ${right}% ${bottom}%, ${left}% ${bottom}%)`;
};

export const programWindowOpening = (time = 0) => () => {
  windowView.update(() => ({ style: { 'clip-path': clipPath(time) } }));
  setDisabled(time < 45);
  return time >= 45 ? programmingSubPhase() : programWindowOpening(time + 1);
};

export const programWindowClosing = (time = 45) => () => {
  windowView.update(() => ({ style: { 'clip-path': clipPath(time) } }));
  setDisabled(true);
  return time === 0 ? programmingSubPhase() : programWindowClosing(time - 1);
};
