import curtainView from 'view/curtain/curtain';
import caseResultView from 'view/result/caseResult';
import ids from '../ids';

export const initialState = (type, accepted, timeLeft) => ({
  type,
  time: 0,
  accepted,
  timeLeft,
});

export const caseResult = (state) => ({ executedIndices, steps }) => {
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
  return {
    nextId: ids.result.caseResult,
    nextArgs: [{ ...state, time: time + 1 }],
  };
};

export const totalResult = () => () => {
};
