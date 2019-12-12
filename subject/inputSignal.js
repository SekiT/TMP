import subject from '@/lib/subject';

const inputSignalSubject = subject([]);

export const enqueue = (signal) => inputSignalSubject.next((queue) => [...queue, signal]);

// Note that dequeue() may be undefined.
export const dequeue = () => {
  let result;
  inputSignalSubject.next(([head, ...tail]) => {
    result = head;
    return tail;
  });
  return result;
};

export const signals = {
  reset: {},
  halt: {},
  pass: {},
  run: {},
  goNext: {},
};
