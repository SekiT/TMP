import dependencies from 'dependencies';

import ids from '../ids';

import { CASES_TO_COMPLETE } from '@/constant';
import { dequeue, signals } from '@/subject/inputSignal';
import { initialState as initialProgram, programSubject } from '@/subject/program';
import { randomTape } from '@/subject/tape';
import caseNumbersView from '@/view/case/numbers';
import curtainView from '@/view/curtain/curtain';
import headView from '@/view/machine/head';
import windowView from '@/view/program/window';
import caseResultView, { bonus } from '@/view/result/caseResult';
import totalResultView from '@/view/result/totalResult';

const { now } = dependencies.globals;

export const initialState = (type, accepted, timeLeft) => ({
  type,
  time: 0,
  accepted,
  timeLeft,
});

const updateScore = (displayedScore, goal) => (
  (displayedScore * 6 + goal) / 7 | 0
);

export const caseResult = (state) => ({
  executedIndices, steps, caseNumber, score,
}) => {
  const {
    time, type, accepted, timeLeft,
  } = state;
  curtainView.update(() => ({ opacity: Math.min(time / 10, 1) }));
  caseResultView.update(() => ({ opacity: Math.min(Math.max(0, (time - 10) / 30), 1) }));
  if (time === 0) {
    caseResultView.update(() => ({
      type,
      commandsSaved: 10 - executedIndices.size,
      accepted,
      steps,
      timeLeft,
    }));
    windowView.update(() => ({ disabled: true }));
  }
  caseNumbersView.update(({ score: displayedScore }) => ({
    score: time === 40 ? score : updateScore(displayedScore, score),
  }));
  const signal = dequeue();
  if (time >= 40 && signal === signals.goNext) {
    caseResultView.update(() => ({ opacity: 0 }));
    if (caseNumber === CASES_TO_COMPLETE) {
      return {
        nextId: ids.result.totalResult,
        nextArgs: [true, 0],
      };
    }
    const nextCaseNumber = caseNumber + 1;
    caseNumbersView.update(() => ({ number: nextCaseNumber }));
    const nextTape = randomTape();
    curtainView.update(() => ({ opacity: 0 }));
    programSubject.next(() => initialProgram);
    headView.update(() => ({ state: 0 }));
    return {
      nextId: ids.main.programWindowOpening,
      nextArgs: [0],
      stateUpdate: {
        caseNumber: nextCaseNumber,
        order: randomTape(),
        originalTape: nextTape,
        currentTape: nextTape,
        position: 0,
        machineState: 0,
        executedIndices: new Map(),
        startedAt: now(),
      },
    };
  }
  return {
    nextId: ids.result.caseResult,
    nextArgs: [{ ...state, time: time + 1 }],
    stateUpdate: time === 0
      ? { score: score + bonus(10 - executedIndices.size, accepted, steps, timeLeft) }
      : {},
  };
};

export const totalResult = (finished, time) => ({
  order, originalTape, score, caseNumber,
}) => {
  const signal = dequeue();
  if (time <= 40) {
    curtainView.update(() => ({ opacity: Math.min(time / 10, 1) }));
    totalResultView.update(() => ({
      opacity: Math.max(0, (time - 10) / 30),
      finished,
      score,
      caseNumber,
      order,
      tape: originalTape,
    }));
    return {
      nextId: ids.result.totalResult,
      nextArgs: [finished, time + 1],
    };
  }
  if (time === 41) {
    return {
      nextId: ids.result.totalResult,
      nextArgs: [finished, signal === signals.goNext ? 42 : 41],
    };
  }
  if (time <= 61) {
    totalResultView.update(() => ({ opacity: (61 - time) / 20 }));
    return {
      nextId: ids.result.totalResult,
      nextArgs: [finished, time + 1],
    };
  }
  return {
    nextId: ids.title.title,
    nextArgs: [0],
  };
};
