import { dequeue, signals } from 'subject/inputSignal';
import { programSubject, initialState } from 'subject/program';
import windowView from 'view/program/window';
import controlView from 'view/control/control';

const FRAMES_TO_SWITCH_WINDOW = 45;

const clipPath = (time) => {
  const left = Math.max((1 - time / 20) * 50, 0);
  const right = Math.min((1 + time / 20) * 50, 100);
  const bottom = Math.min(Math.max((time - 30) / 10, 0) * 87 + 13, 100);
  return `polygon(${left}% 0, ${right}% 0, ${right}% ${bottom}%, ${left}% ${bottom}%)`;
};

export const programWindowClosing = (time = FRAMES_TO_SWITCH_WINDOW) => () => {
  windowView.update(() => ({
    style: { 'clip-path': clipPath(time) },
    disabled: true,
  }));
  controlView.update(() => ({ disabled: time > 0 }));
  return time === 0 ? programWindowClosing(0) : programWindowClosing(time - 1);
};

const programming = () => {
  const signal = dequeue();
  if (signal === signals.run) return programWindowClosing();
  if (signal === signals.reset) {
    programSubject.next(() => initialState);
  }
  return programming;
};

export const programWindowOpening = (time = 0) => () => {
  windowView.update(() => ({
    style: { 'clip-path': clipPath(time) },
    disabled: time < FRAMES_TO_SWITCH_WINDOW,
  }));
  controlView.update(() => ({ disabled: time < FRAMES_TO_SWITCH_WINDOW }));
  return time >= FRAMES_TO_SWITCH_WINDOW ? programming : programWindowOpening(time + 1);
};
