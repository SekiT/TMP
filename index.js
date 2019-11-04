import dependencies from './dependencies';
import { runPhase, idealTimeout } from './lib/runPhase';
import tapeView from './view/machine/tape';
import headView from './view/machine/head';
import caseTapesView from './view/case/tapes';
import caseNumbersView from './view/case/numbers';
import programWindowView from './view/program/window';
import controlView from './view/control/control';
import mainPhase from './phase/main/index';

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

runPhase(mainPhase, idealTimeout);
