import { bind } from 'hyperhtml/esm';
import runPhase from './lib/runPhase';
import tapeView from './view/tape';

bind(document.getElementById('root'))`
${tapeView.render()}
`;

const dummyPhase = (time = 0) => () => {
  const tape = [...Array(10)].map((_, index) => (time & (1 << index) ? 1 : 0));
  tapeView.update((state) => ({
    ...state,
    tape,
  }));
  return dummyPhase(time + 1);
};

runPhase(dummyPhase(0));
