import subject from 'lib/subject';

const tapeSubject = subject(Array(10).fill(0));

export default tapeSubject;

const CHAR_DELTA = 1 / 15;

export const graduallyUpdate = (desiredTape) => {
  tapeSubject.next((currentTape) => (
    currentTape.map((char, index) => {
      const goal = desiredTape[index];
      return char === goal ? char : Math.min(Math.max(char - CHAR_DELTA, goal), char + CHAR_DELTA);
    })
  ));
};
