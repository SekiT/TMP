import dependencies from 'dependencies';
import ids from './ids';
import title from './title/title';
import {
  programWindowOpening, programming, programWindowClosing, running,
} from './main/index';
import { caseResult, totalResult } from './result/index';

const { now } = dependencies.globals;

const idToPhaseGenerator = new Map([
  [ids.title.title, title],
  [ids.main.programWindowOpening, programWindowOpening],
  [ids.main.programming, programming],
  [ids.main.programWindowClosing, programWindowClosing],
  [ids.main.running, running],
  [ids.result.caseResult, caseResult],
  [ids.result.totalResult, totalResult],
]);

export const initialState = (order, originalTape) => ({
  score: 0,
  caseNumber: 1,
  order,
  originalTape,
  currentTape: originalTape,
  position: 0,
  machineState: 0,
  startedAt: now(),
  runAt: null,
  steps: 0,
  executedIndices: new Set(),
});

const indexPhase = (phase, state) => () => {
  const { nextId, nextArgs, stateUpdate } = phase(state);
  return indexPhase(idToPhaseGenerator.get(nextId)(...nextArgs), { ...state, ...stateUpdate });
};

export default indexPhase;
