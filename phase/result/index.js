import curtainView from 'view/curtain/curtain';
import caseResultView from 'view/result/caseResult';
import ids from '../ids';

export const initialState = (commandsSaved, accepted, steps, timeLeft) => ({
  time: 0,
  commandsSaved,
  accepted,
  steps,
  timeLeft,
});

export const caseResult = (state) => () => {
  const {
    time, commandsSaved, accepted, steps, timeLeft,
  } = state;
  curtainView.update(() => ({ opacity: Math.min(time / 10, 1) }));
  caseResultView.update(() => ({ opacity: Math.min(Math.max(0, (time - 10) / 30), 1) }));
  if (time === 0) {
    caseResultView.update(() => ({
      commandsSaved, accepted, steps, timeLeft,
    }));
  }
  return {
    nextId: ids.result.caseResult,
    nextArgs: [{ ...state, time: time + 1 }],
  };
};

export const totalResult = () => () => {
};
