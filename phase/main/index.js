import { dequeue, signals } from 'subject/inputSignal';
import { programSubject, initialState } from 'subject/program';
import { updateOrder } from 'view/case/tapes';
import controlView from 'view/control/control';
import headView from 'view/machine/head';
import { types as resultTypes } from 'view/result/caseResult';
import ids from '../ids';
import {
  TIME_LIMIT, FRAMES_TO_SWITCH_WINDOW,
  animateProgramWindow, animateTape, showTime,
} from './animations';
import { initialState as initialResultState } from '../result/index';

const timeLeft = (runAt, startedAt) => Math.max(TIME_LIMIT - (runAt - startedAt) / 1000, 0);

export const programWindowOpening = (time) => (state) => {
  updateOrder(state.order);
  const moving = time < FRAMES_TO_SWITCH_WINDOW;
  animateProgramWindow(time, moving);
  animateTape(state);
  controlView.update(() => ({ running: false, disabled: moving }));
  showTime(state);
  return moving ? {
    nextId: ids.main.programWindowOpening,
    nextArgs: [time + 1],
  } : {
    nextId: ids.main.programming,
    nextArgs: [],
  };
};

export const programming = () => (state) => {
  animateTape(state);
  showTime(state);
  const signal = dequeue();
  if (signal === signals.run) {
    headView.update(() => ({ state: 0 }));
    return {
      nextId: ids.main.programWindowClosing,
      nextArgs: [FRAMES_TO_SWITCH_WINDOW],
      stateUpdate: {
        currentTape: state.originalTape,
        machineState: 0,
        position: 0,
        runAt: Date.now(),
      },
    };
  }
  if (signal === signals.reset) {
    programSubject.next(() => initialState);
  }
  if (signal === signals.pass) {
    return {
      nextId: ids.result.caseResult,
      nextArgs: [
        initialResultState(resultTypes.pass, false, timeLeft(Date.now(), state.startedAt)),
      ],
      stateUpdate: { steps: 0 },
    };
  }
  return {
    nextId: ids.main.programming,
    nextArgs: [],
    stateUpdate: signal === signals.reset ? {
      currentTape: state.originalTape,
      machineState: 0,
      position: 0,
    } : {},
  };
};

export const programWindowClosing = (time) => (state) => {
  animateProgramWindow(time, true);
  animateTape(state);
  controlView.update(() => ({ running: time === 0, disabled: time > 0 }));
  return time === 0 ? {
    nextId: ids.main.running,
    nextArgs: [0],
    stateUpdate: {
      steps: 0,
      executedIndices: new Set(),
    },
  } : {
    nextId: ids.main.programWindowClosing,
    nextArgs: [time - 1],
  };
};

let program = initialState;
programSubject.subscribe((p) => { program = p; });

const executeCommand = ({
  currentTape, position, machineState, steps, executedIndices,
}) => {
  const executedIndex = (machineState << 1) | currentTape[position];
  const { direction, nextChar, nextState } = program[executedIndex];
  return {
    currentTape: [...currentTape.slice(0, position), nextChar, ...currentTape.slice(position + 1)],
    position: position + direction,
    machineState: nextState,
    steps: steps + 1,
    executedIndices: new Set([...executedIndices, executedIndex]),
  };
};

const FRAMES_TO_EXECUTE_COMMAND = 30;

export const running = (time) => (state) => {
  const {
    position, machineState, startedAt, runAt, order, currentTape,
  } = state;
  const signal = dequeue();
  if (signal === signals.halt) {
    headView.update(() => ({ state: 6 }));
    return timeLeft(Date.now(), startedAt) > 0 ? {
      nextId: ids.result.caseResult, // TODO: jump to totalResult
      nextArgs: [initialResultState(resultTypes.pass, false, 0)],
    } : {
      nextId: ids.main.programWindowOpening,
      nextArgs: [0],
    };
  }
  animateTape(state);
  const machineStateOrError = (position < 0 || 10 <= position) ? -1 : machineState;
  if ([-1, 5].includes(machineStateOrError) && time === FRAMES_TO_EXECUTE_COMMAND) {
    headView.update(() => ({ state: machineStateOrError }));
    if (order.join`` === currentTape.join``) {
      const left = timeLeft(runAt, startedAt);
      const resultType = left > 0 ? resultTypes.clear : resultTypes.timeout;
      return {
        nextId: ids.result.caseResult,
        nextArgs: [
          initialResultState(resultType, machineStateOrError === 5, left),
        ],
      };
    }
    return timeLeft(Date.now(), startedAt) > 0 ? {
      nextId: ids.main.programWindowOpening,
      nextArgs: [0],
      stateUpdate: { machineState: machineStateOrError },
    } : {
      nextId: ids.result.caseResult, // TODO: jump to totalResult
      nextArgs: [initialResultState(resultTypes.pass, false, 0)],
    };
  }
  headView.update(() => ({ state: machineState }));
  return {
    nextId: ids.main.running,
    nextArgs: [time === FRAMES_TO_EXECUTE_COMMAND ? 0 : time + 1],
    stateUpdate: time === 0 ? executeCommand(state) : {},
  };
};
