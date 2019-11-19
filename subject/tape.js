import { CHAR_DELTA } from 'constant';
import subject from 'lib/subject';

const tapeSubject = subject(Array(10).fill(0));

export default tapeSubject;

export const graduallyUpdate = (desiredTape) => {
  tapeSubject.next((currentTape) => (
    currentTape.map((char, index) => {
      const goal = desiredTape[index];
      return char === goal ? char : Math.min(Math.max(char - CHAR_DELTA, goal), char + CHAR_DELTA);
    })
  ));
};
