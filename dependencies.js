import { bind, wire } from 'hyperhtml/esm';
import { shadow } from './lib/shadow';

export default {
  hyperhtml: process.env.TEST ? shadow({ bind, wire }) : { bind, wire },
};
