import dependencies from './dependencies';
import { runPhase, idealTimeout } from './lib/runPhase';
import tapeView from './view/machine/tape';
import headView from './view/machine/head';
import caseTapesView from './view/case/tapes';
import caseNumbersView from './view/case/numbers';
import programWindowView from './view/program/window';
import controlView from './view/control/control';
import curtainView from './view/curtain/curtain';
import caseResultView from './view/result/caseResult';
import mainPhase, { initialState } from './phase/index';
import { programWindowOpening } from './phase/main/index';

const { bind } = dependencies.hyperhtml;

bind(document.getElementById('root'))`${
  [
    tapeView,
    headView,
    programWindowView,
    controlView,
    curtainView,
    caseTapesView,
    caseNumbersView,
    caseResultView,
  ].map((view) => view.render())
}`;

const order = [...Array(10)].map(() => Math.round(Math.random()));
const tape = [...Array(10)].map(() => Math.round(Math.random()));
runPhase(mainPhase(programWindowOpening(0), initialState(order, tape)), idealTimeout);
