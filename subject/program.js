import subject from 'lib/subject';

export const initialState = [...Array(10)].map((_, index) => ({
  direction: 1,
  nextChar: index & 1,
  nextState: index >> 1,
}));

export const programSubject = subject(initialState);

export const updateCommand = (index, commandUpdateFunction) => programSubject.next((program) => [
  ...program.slice(0, index),
  commandUpdateFunction(program[index]),
  ...program.slice(index + 1),
]);
