import dependencies from 'dependencies';
import { CHAR_DELTA } from '@/constant';
import subject from '@/lib/subject';

const { random } = dependencies.globals;

export const randomTape = () => [...Array(10)].map(() => Math.round(random()));

const tapeSubject = subject(randomTape());

export default tapeSubject;

export const graduallyUpdate = (desiredTape) => {
  tapeSubject.next((currentTape) => (
    currentTape.map((char, index) => {
      const goal = desiredTape[index];
      return char === goal ? char : Math.min(Math.max(char - CHAR_DELTA, goal), char + CHAR_DELTA);
    })
  ));
};
