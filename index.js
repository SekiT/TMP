import { bind } from 'hyperhtml/esm';
import tape from './view/tape';

const shuffle = () => tape.update(({ position }) => ({
  tape: [...Array(10)].map(() => Math.round(Math.random())),
  position,
}));

bind(document.getElementById('root'))`
${tape.render()}
`;

setInterval(shuffle, 1000);
