import { bind } from './node_modules/hyperhtml/esm';
import view from './lib/view';

const foo = view(0, (render) => (count) => render`
  <ul>
    <li>This is content</li>
    <li>The count is ${count}</li>
  </ul>
`);

const countUp = () => foo.update((count) => (count + 1));

bind(document.getElementById('root'))`${foo.render()}`;

setInterval(countUp, 1000);
