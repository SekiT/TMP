import dependencies from './dependencies';
import runPhase from './lib/runPhase';
import tapeView from './view/machine/tape';
import headView from './view/machine/head';
import caseTapesView from './view/case/tapes';
import caseNumbersView from './view/case/numbers';
import programWindowView from './view/program/window';
import controlView from './view/control/control';

const { bind } = dependencies.hyperhtml;

bind(document.getElementById('root'))`${
  [
    tapeView,
    headView,
    caseTapesView,
    caseNumbersView,
    programWindowView,
    controlView,
  ].map((view) => view.render())
}`;

const dummyPhase = (time) => () => {
  const tape = [...Array(10)].map((_, index) => (time & (1 << index) ? 1 : 0));
  tapeView.update(() => ({ tape }));
  return dummyPhase(time + 1);
};

runPhase(dummyPhase(0));
