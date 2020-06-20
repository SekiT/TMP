import dependencies from './dependencies';
import { runPhase, idealTimeout } from './lib/runPhase';
import { randomTape } from './subject/tape';
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
import indexPhase, { initialState } from './phase/index';
import titlePhase from './phase/title/title';

const { render, html } = dependencies.uhtml;

render(document.getElementById('root'), html`${
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
}`);

runPhase(indexPhase(titlePhase(0), initialState(randomTape(), randomTape())), idealTimeout);
