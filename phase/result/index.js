import curtainView from 'view/curtain/curtain';
import caseResultView from 'view/result/caseResult';
import ids from '../ids';

export const initialState = (commandsSaved, steps, timeLeft) => ({
  time: 0,
  commandsSaved,
  steps,
  timeLeft,
});

export const caseResult = ({
  time, commandsSaved, steps, timeLeft,
}) => () => {
  curtainView.update(() => ({ opacity: Math.min(time / 10, 1) }));
  caseResultView.update(() => ({ opacity: Math.min(Math.max(0, (time - 10) / 30), 1) }));
  if (time === 0) {
    caseResultView.update(() => ({ commandsSaved, steps, timeLeft }));
  }
  return {
    nextId: ids.result.caseResult,
    nextArgs: [{
      time: time + 1,
      commandsSaved,
      steps,
      timeLeft,
    }],
  };
};

export const totalResult = () => () => {
};
