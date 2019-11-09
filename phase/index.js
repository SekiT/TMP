import dependencies from 'dependencies';
import ids from './ids';
import {
  programWindowOpening, programming, programWindowClosing, running,
} from './main/index';

const { Date } = dependencies.globals;

const idToPhaseGenerator = new Map([
  [ids.main.programWindowOpening, programWindowOpening],
  [ids.main.programming, programming],
  [ids.main.programWindowClosing, programWindowClosing],
  [ids.main.running, running],
]);

export const initialState = (order, originalTape) => ({
  order,
  originalTape,
  currentTape: originalTape,
  position: 0,
  machineState: 0,
  startedAt: Date.now(),
});

const indexPhase = (phase, state) => () => {
  const { nextId, nextArgs, stateUpdate } = phase(state);
  return indexPhase(idToPhaseGenerator.get(nextId)(...nextArgs), { ...state, ...stateUpdate });
};

export default indexPhase;
