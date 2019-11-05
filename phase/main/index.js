import numbersView from 'view/case/numbers';
import programWindowAppearing from './programWindowAppearing';

const TIME_LIMIT = 32;

const initialState = {
  subPhase: programWindowAppearing(0),
  startedAt: null,
};

const mainPhase = ({ subPhase, startedAt: nullableStartedAt }) => () => {
  const startedAt = nullableStartedAt || Date.now();
  const timeLeft = Math.max(TIME_LIMIT - (Date.now() - startedAt) / 1000, 0);
  numbersView.update(() => ({ timeLeft }));
  return mainPhase({ subPhase: subPhase(), startedAt });
};

export default mainPhase(initialState);
