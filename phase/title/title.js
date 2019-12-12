import dependencies from 'dependencies';
import { signals, dequeue } from '@/subject/inputSignal';
import { randomTape } from '@/subject/tape';
import { programSubject, initialState as initialProgram } from '@/subject/program';
import { FRAMES_TO_EXECUTE_COMMAND, TIME_LIMIT } from '@/constant';
import { updateOrder } from '@/view/case/tapes';
import numbersView from '@/view/case/numbers';
import headView from '@/view/machine/head';
import curtainView from '@/view/curtain/curtain';
import titleView from '@/view/title/title';
import { animateTape } from '../main/animations';
import ids from '../ids';

const { now, random } = dependencies.globals;

export default (time = 0, backgroundTime = 0) => ({
  currentTape, position, machineState,
}) => {
  if (time === 0) {
    const order = randomTape();
    updateOrder(order);
    numbersView.update(() => ({ number: 1, timeLeft: TIME_LIMIT, score: 0 }));
    curtainView.update(() => ({ opacity: 1 }));
    return {
      nextId: ids.title.title,
      nextArgs: [1],
      stateUpdate: {
        position: 0,
        machineState: 0,
        order,
        currentTape: randomTape(),
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
      nextArgs: [
        dequeue() === signals.goNext ? 31 : 30,
        (backgroundTime + 1) % FRAMES_TO_EXECUTE_COMMAND,
      ],
      stateUpdate: backgroundTime === 0 ? {
        currentTape: [
          ...currentTape.slice(0, position),
          Math.round(random()),
          ...currentTape.slice(position + 1, 10),
        ],
        position: { 0: 1, 9: 8 }[position] || position + (random() < 0.5 ? -1 : 1),
        machineState: Math.floor(random() * 5),
      } : {},
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
  programSubject.next(() => initialProgram);
  const tape = randomTape();
  return {
    nextId: ids.main.programWindowOpening,
    nextArgs: [0],
    stateUpdate: {
      caseNumber: 1,
      score: 0,
      order: randomTape(),
      originalTape: tape,
      currentTape: tape,
      position: 0,
      machinState: 0,
      executedIndices: new Map(),
      startedAt: now(),
    },
  };
};
