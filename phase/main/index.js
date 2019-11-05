import dependencies from 'dependencies';
import numbersView from 'view/case/numbers';
import { updateOrder, updateTape } from 'view/case/tapes';
import machineTapeView from 'view/machine/tape';
import programWindowAppearing from './programWindowAppearing';

const { Date } = dependencies.globals;

const TIME_LIMIT = 32;
const FRAMES_TO_CHANGE_CELL = 15;

export const initialState = (order, originalTape) => ({
  subPhase: programWindowAppearing(0),
  startedAt: Date.now(),
  order,
  originalTape,
  currentTape: [...originalTape],
  displayedTape: [...Array(10)].map(() => Math.round(Math.random())),
});

const mainPhase = ({
  subPhase, startedAt, order, originalTape, currentTape, displayedTape,
}) => () => {
  numbersView.update(() => ({
    timeLeft: Math.max(TIME_LIMIT - (Date.now() - startedAt) / 1000, 0),
  }));
  updateOrder(order);
  const newDisplayedTape = displayedTape.map((c, index) => {
    const goal = currentTape[index];
    if (c === goal) return c;
    if (c < goal) return Math.min(c + 1 / FRAMES_TO_CHANGE_CELL, goal);
    return Math.max(c - 1 / FRAMES_TO_CHANGE_CELL, goal);
  });
  updateTape(newDisplayedTape);
  machineTapeView.update(() => ({ tape: newDisplayedTape }));
  return mainPhase({
    subPhase: subPhase(),
    startedAt,
    order,
    originalTape,
    currentTape,
    displayedTape: newDisplayedTape,
  });
};

export default mainPhase;
