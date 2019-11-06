import { dequeue, signals } from 'subject/inputSignal';
import windowView from 'view/program/window';

const clipPath = (time) => {
  const left = Math.max((1 - time / 20) * 50, 0);
  const right = Math.min((1 + time / 20) * 50, 100);
  const bottom = Math.min(Math.max((time - 30) / 10, 0) * 87 + 13, 100);
  return `polygon(${left}% 0, ${right}% 0, ${right}% ${bottom}%, ${left}% ${bottom}%)`;
};

export const programWindowClosing = (time = 45) => () => {
  windowView.update(() => ({
    style: { 'clip-path': clipPath(time) },
    disabled: true,
  }));
  return time === 0 ? programWindowClosing(0) : programWindowClosing(time - 1);
};

const programming = () => () => {
  const signal = dequeue();
  if (signal === signals.run) {
    return programWindowClosing();
  }
  return programming();
};

export const programWindowOpening = (time = 0) => () => {
  windowView.update(() => ({
    style: { 'clip-path': clipPath(time) },
    disabled: time < 45,
  }));
  return time >= 45 ? programming() : programWindowOpening(time + 1);
};
