import { dequeue, signals } from 'subject/inputSignal';
import { programSubject, initialState } from 'subject/program';
import { updateOrder } from 'view/case/tapes';
import controlView from 'view/control/control';
import headView from 'view/machine/head';
import ids from '../ids';
import {
  TIME_LIMIT, FRAMES_TO_SWITCH_WINDOW,
  animateProgramWindow, animateTape, showTime,
} from './animations';
import { initialState as initialResultState } from '../result/index';

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
    stateUpdate: { steps: 0 },
  } : {
    nextId: ids.main.programWindowClosing,
    nextArgs: [time - 1],
  };
};

let program = initialState;
programSubject.subscribe((p) => { program = p; });

const executeCommand = ({
  currentTape, position, machineState, steps,
}) => {
  const { direction, nextChar, nextState } = program[(machineState << 1) | currentTape[position]];
  return {
    currentTape: [...currentTape.slice(0, position), nextChar, ...currentTape.slice(position + 1)],
    position: position + direction,
    machineState: nextState,
    steps: steps + 1,
  };
};

const FRAMES_TO_EXECUTE_COMMAND = 30;

const timeLeft = (runAt, startedAt) => Math.max(TIME_LIMIT - (runAt - startedAt) / 1000, 0);

export const running = (time) => (state) => {
  const {
    position, machineState, startedAt, steps, runAt, currentTape, order,
  } = state;
  const signal = dequeue();
  if (signal === signals.halt) {
    headView.update(() => ({ state: 6 }));
    return (Date.now() - startedAt) / 1000 > TIME_LIMIT ? {
      nextId: ids.result.caseResult,
      nextArgs: [initialResultState(0, steps, 0)],
    } : {
      nextId: ids.main.programWindowOpening,
      nextArgs: [0],
    };
  }
  animateTape(state);
  const machineStateOrError = (position < 0 || 10 <= position) ? -1 : machineState;
  if ([-1, 5].includes(machineStateOrError) && time === FRAMES_TO_EXECUTE_COMMAND) {
    headView.update(() => ({ state: machineStateOrError }));
    return order.join`` === currentTape.join`` ? {
      nextId: ids.result.caseResult,
      nextArgs: [initialResultState(5, steps, timeLeft(runAt, startedAt))],
    } : {
      nextId: ids.main.programWindowOpening,
      nextArgs: [0],
      stateUpdate: { machineState: machineStateOrError },
    };
  }
  headView.update(() => ({ state: machineState }));
  return {
    nextId: ids.main.running,
    nextArgs: [time === FRAMES_TO_EXECUTE_COMMAND ? 0 : time + 1],
    stateUpdate: time === 0 ? executeCommand(state) : {},
  };
};
