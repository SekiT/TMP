import dependencies from 'dependencies';
import { signals, dequeue } from 'subject/inputSignal';
import { updateOrder } from 'view/case/tapes';
import headView from 'view/machine/head';
import curtainView from 'view/curtain/curtain';
import titleView from 'view/title/title';
import { animateTape } from '../main/animations';
import ids from '../ids';

const { Date } = dependencies.globals;

export default (time = 0) => ({
  order, currentTape, position, machineState,
}) => {
  if (time === 0) {
    updateOrder(order);
    curtainView.update(() => ({ opacity: 1 }));
    return {
      nextId: ids.title.title,
      nextArgs: [1],
      stateUpdate: {
        position: 0,
        machineState: 0,
        order: [...Array(10)].map(() => Math.round(Math.random())),
        currentTape: [...Array(10)].map(() => Math.round(Math.random())),
      },
    };
  }
  animateTape({ currentTape, position });
  headView.update(() => ({ state: machineState }));
  if (time < 30) {
    titleView.update(() => ({ opacity: time / 30 }));
    return {
      nextId: ids.title.title,
      nextArgs: [time + 1],
    };
  }
  if (time === 30) {
    return {
      nextId: ids.title.title,
      nextArgs: [dequeue() === signals.goNext ? 31 : 30],
    };
  }
  if (time < 50) {
    const opacity = (50 - time) / 20;
    titleView.update(() => ({ opacity }));
    curtainView.update(() => ({ opacity }));
    return {
      nextId: ids.title.title,
      nextArgs: [time + 1],
    };
  }
  titleView.update(() => ({ opacity: 0 }));
  curtainView.update(() => ({ opacity: 0 }));
  const tape = [...Array(10)].map(() => Math.round(Math.random()));
  return {
    nextId: ids.main.programWindowOpening,
    nextArgs: [0],
    stateUpdate: {
      order: [...Array(10)].map(() => Math.round(Math.random())),
      originalTape: tape,
      currentTape: tape,
      position: 0,
      machinState: 0,
      startedAt: Date.now(),
    },
  };
};
