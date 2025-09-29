import dependencies from './dependencies';
import { idealTimeout, runPhase } from './lib/runPhase';
import indexPhase, { initialState } from './phase';
import titlePhase from './phase/title/title';
import { randomTape } from './subject/tape';
import numbersView from './view/case/numbers';
import tapesView from './view/case/tapes';
import controlView from './view/control/control';
import curtainView from './view/curtain/curtain';
import headView from './view/machine/head';
import tapeView from './view/machine/tape';
import windowView from './view/program/window';
import caseResultView from './view/result/caseResult';
import totalResultView from './view/result/totalResult';
import titleView from './view/title/title';

const { render, html } = dependencies.uhtml;

render(document.getElementById('root'), html`${[
  numbersView,
  tapesView,
  tapeView,
  headView,
  controlView,
  windowView,
  curtainView,
  caseResultView,
  totalResultView,
  titleView,
].map((view) => view.render())
}`);

runPhase(indexPhase(titlePhase(0), initialState(randomTape(), randomTape())), idealTimeout);
