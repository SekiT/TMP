import { dequeue, signals } from 'subject/inputSignal';
import { programSubject, initialState } from 'subject/program';
import { updateOrder } from 'view/case/tapes';
import controlView from 'view/control/control';
import ids from '../ids';
import {
  FRAMES_TO_SWITCH_WINDOW, animateProgramWindow, animateTape, showTime,
} from './animations';

export const programWindowOpening = (time) => (state) => {
  const { order, originalTape } = state;
  updateOrder(order);
  const moving = time < FRAMES_TO_SWITCH_WINDOW;
  animateProgramWindow(time, moving);
  animateTape(state);
  controlView.update(() => ({ disabled: moving }));
  showTime(state);
  return moving ? {
    nextId: ids.main.programWindowOpening,
    nextArgs: [time + 1],
    stateUpdate: { currentTape: originalTape },
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
    return {
      nextId: ids.main.programWindowClosing,
      nextArgs: [FRAMES_TO_SWITCH_WINDOW],
    };
  }
  if (signal === signals.reset) {
    programSubject.next(() => initialState);
  }
  return {
    nextId: ids.main.programming,
    nextArgs: [],
  };
};

export const programWindowClosing = (time) => (state) => {
  animateProgramWindow(time, true);
  animateTape(state);
  controlView.update(() => ({ disabled: time > 0 }));
  showTime(state);
  return time === 0 ? {
    nextId: ids.main.programWindowClosing,
    nextArgs: [0],
  } : {
    nextId: ids.main.programWindowClosing,
    nextArgs: [time - 1],
  };
};
