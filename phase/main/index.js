import dependencies from 'dependencies';
import numbersView from 'view/case/numbers';
import { updateOrder, updateTape } from 'view/case/tapes';
import machineTapeView from 'view/machine/tape';
import programWindowOpening from './programWindowOpening';

const { Date } = dependencies.globals;

const TIME_LIMIT = 32;
const FRAMES_TO_CHANGE_CELL = 15;

export const initialState = (order, originalTape) => ({
  subPhase: programWindowOpening(0),
  startedAt: Date.now(),
  order,
  originalTape,
  currentTape: [...originalTape],
  displayedTape: [1 - originalTape[0], ...originalTape.slice(1)],
});

const updateDisplayedTape = (displayedTape, currentTape) => (
  displayedTape.map((c, index) => {
    const goal = currentTape[index];
    if (c === goal) return c;
    if (c < goal) return Math.min(c + 1 / FRAMES_TO_CHANGE_CELL, goal);
    return Math.max(c - 1 / FRAMES_TO_CHANGE_CELL, goal);
  })
);

const mainPhase = ({
  subPhase, startedAt, order, originalTape, currentTape, displayedTape,
}) => () => {
  updateOrder(order);
  const newDisplayedTape = updateDisplayedTape(displayedTape, currentTape);
  updateTape(newDisplayedTape);
  machineTapeView.update(() => ({ tape: newDisplayedTape }));
  const timeLeft = Math.max(TIME_LIMIT - (Date.now() - startedAt) / 1000, 0);
  numbersView.update(() => ({ timeLeft }));
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
