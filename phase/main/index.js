import programWindowAppearing from './programWindowAppearing';

const initialState = {
  subPhase: programWindowAppearing(0),
};

const mainPhase = ({ subPhase }) => () => (
  mainPhase({ subPhase: subPhase() })
);

export default mainPhase(initialState);
