import { dequeue, signals } from 'subject/inputSignal';
import { programSubject, initialState } from 'subject/program';
import { updateOrder } from 'view/case/tapes';
import controlView from 'view/control/control';
import ids from '../ids';
import { FRAMES_TO_SWITCH_WINDOW, animateProgramWindow, animateTape } from './animations';

export const programWindowClosing = (time) => ({ currentTape, displayedTape }) => {
  animateProgramWindow(time, true);
  animateTape(currentTape, displayedTape);
  controlView.update(() => ({ disabled: time > 0 }));
  return time === 0 ? {
    nextId: ids.main.programWindowClosing,
    nextArgs: [0],
  } : {
    nextId: ids.main.programWindowClosing,
    nextArgs: [time - 1],
  };
};

export const programming = () => ({ currentTape, displayedTape }) => {
  animateTape(currentTape, displayedTape);
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

export const programWindowOpening = (time) => ({
  order, originalTape, currentTape, displayedTape,
}) => {
  updateOrder(order);
  const moving = time < FRAMES_TO_SWITCH_WINDOW;
  animateProgramWindow(time, moving);
  animateTape(currentTape, displayedTape);
  controlView.update(() => ({ disabled: moving }));
  return moving ? {
    nextId: ids.main.programWindowOpening,
    nextArgs: [time + 1],
    stateUpdate: { currentTape: originalTape },
  } : {
    nextId: ids.main.programming,
    nextArgs: [],
  };
};
