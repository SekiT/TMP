import dependencies from 'dependencies';
import ids from './ids';
import { programWindowOpening, programming, programWindowClosing } from './main/program';

const { Date } = dependencies.globals;

const idToPhaseGenerator = new Map([
  [ids.main.programWindowOpening, programWindowOpening],
  [ids.main.programming, programming],
  [ids.main.programWindowClosing, programWindowClosing],
]);

export const initialState = (order, originalTape) => ({
  order,
  originalTape,
  currentTape: originalTape,
  displayedTape: originalTape,
  startedAt: Date.now(),
});

const indexPhase = (phase, state) => () => {
  const { nextId, nextArgs, stateUpdate } = phase(state);
  return indexPhase(idToPhaseGenerator.get(nextId)(...nextArgs), { ...state, ...stateUpdate });
};

export default indexPhase;
