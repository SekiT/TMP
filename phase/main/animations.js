import dependencies from 'dependencies';
import { graduallyUpdate } from 'subject/tape';
import numbersView from 'view/case/numbers';
import machineTapeView from 'view/machine/tape';
import windowView from 'view/program/window';

const { Date } = dependencies.globals;

export const TIME_LIMIT = 32;

export const showTime = ({ startedAt }) => {
  const timeLeft = Math.max(TIME_LIMIT - (Date.now() - startedAt) / 1000, 0);
  numbersView.update(() => ({ timeLeft }));
};

const MOVE_RATIO = 1 / 5;
const MINIMUM_TAPE_SPEED = 1 / 15;

const newPosition = (currentPosition, desiredPosition) => {
  const diff = desiredPosition - currentPosition;
  const moved = diff * MOVE_RATIO;
  return MINIMUM_TAPE_SPEED < Math.abs(moved)
    ? currentPosition + moved
    : currentPosition + Math.min(Math.max(-MINIMUM_TAPE_SPEED, diff), MINIMUM_TAPE_SPEED);
};

export const animateTape = ({
  currentTape, position: desiredPosition,
}) => {
  graduallyUpdate(currentTape);
  machineTapeView.update(({ position: currentPosition }) => ({
    position: newPosition(currentPosition, desiredPosition),
  }));
};

export const FRAMES_TO_SWITCH_WINDOW = 45;

export const animateProgramWindow = (time, disabled) => {
  const left = Math.max((1 - time / 20) * 50, 0);
  const right = Math.min((1 + time / 20) * 50, 100);
  const bottom = Math.min(Math.max((time - 30) / 10, 0) * 87 + 13, 100);
  const clipPath = `polygon(${left}% 0, ${right}% 0, ${right}% ${bottom}%, ${left}% ${bottom}%)`;
  windowView.update(() => ({
    style: { 'clip-path': clipPath },
    disabled,
  }));
};
