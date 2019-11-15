import { signals, dequeue } from 'subject/inputSignal';
import { programSubject, initialState as initialProgram } from 'subject/program';
import caseNumbersView from 'view/case/numbers';
import curtainView from 'view/curtain/curtain';
import caseResultView, { bonus } from 'view/result/caseResult';
import totalResultView from 'view/result/totalResult';
import ids from '../ids';

export const initialState = (type, accepted, timeLeft) => ({
  type,
  time: 0,
  accepted,
  timeLeft,
});

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
  }
  const signal = dequeue();
  if (time >= 40 && signal === signals.goNext) {
    const nextCaseNumber = caseNumber + 1;
    caseNumbersView.update(() => ({ number: nextCaseNumber }));
    const nextTape = [...Array(10)].map(() => (Math.random() < 0.5 ? 1 : 0));
    curtainView.update(() => ({ opacity: 0 }));
    caseResultView.update(() => ({ opacity: 0 }));
    programSubject.next(() => initialProgram);
    return {
      nextId: ids.main.programWindowOpening,
      nextArgs: [0],
      stateUpdate: {
        caseNumber: nextCaseNumber,
        order: [...Array(10)].map(() => (Math.random() < 0.5 ? 1 : 0)),
        originalTape: nextTape,
        currentTape: nextTape,
        position: 0,
        startedAt: Date.now(),
        score: score + bonus(10 - executedIndices.length, accepted, steps, timeLeft),
      },
    };
  }
  return {
    nextId: ids.result.caseResult,
    nextArgs: [{ ...state, time: time + 1 }],
  };
};

export const totalResult = (time) => ({ score, caseNumber }) => {
  curtainView.update(() => ({ opacity: Math.min(time / 10, 1) }));
  totalResultView.update(() => ({
    opacity: Math.min(Math.max(0, (time - 10) / 30), 1),
    score,
    caseNumber,
  }));
  return {
    nextId: ids.result.totalResult,
    nextArgs: [time + 1],
  };
};
