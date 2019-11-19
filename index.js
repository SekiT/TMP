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
import totalResultView from './view/result/totalResult';
import titleView from './view/title/title';
import mainPhase, { initialState } from './phase/index';
import titlePhase from './phase/title/title';

const { bind } = dependencies.hyperhtml;

bind(document.getElementById('root'))`${
  [
    caseNumbersView,
    caseTapesView,
    tapeView,
    headView,
    controlView,
    programWindowView,
    curtainView,
    caseResultView,
    totalResultView,
    titleView,
  ].map((view) => view.render())
}`;

const order = [...Array(10)].map(() => Math.round(Math.random()));
const tape = [...Array(10)].map(() => Math.round(Math.random()));
runPhase(mainPhase(titlePhase(0), initialState(order, tape)), idealTimeout);
