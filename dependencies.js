import { bind, wire } from 'hyperhtml/esm';
import { buildDiContainer } from './lib/di';

const deps = {
  hyperhtml: { bind, wire },
};

export default process.env.TEST ? buildDiContainer(deps) : deps;
