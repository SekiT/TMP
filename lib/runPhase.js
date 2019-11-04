import dependencies from 'dependencies';

const { Date, setTimeout } = dependencies.globals;

export const idealTimeout = 1000 / 60;

export const runPhase = (phase, timeout) => {
  const startedAt = Date.now();
  const newPhase = phase();
  setTimeout(() => {
    const now = Date.now();
    const newTimeout = now < startedAt + idealTimeout ? timeout + 1 : Math.max(timeout - 1, 1);
    runPhase(newPhase, newTimeout);
  }, timeout);
};
