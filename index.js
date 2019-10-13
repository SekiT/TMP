import { bind } from 'hyperhtml/esm';
import runPhase from './lib/runPhase';
import tapeView from './view/machine/tape';
import headView from './view/machine/head';

bind(document.getElementById('root'))`
${tapeView.render()}
${headView.render()}
`;

const dummyPhase = (time) => () => {
  const tape = [...Array(10)].map((_, index) => (time & (1 << index) ? 1 : 0));
  tapeView.update((state) => ({ ...state, tape }));
  return dummyPhase(time + 1);
};

runPhase(dummyPhase(0));
