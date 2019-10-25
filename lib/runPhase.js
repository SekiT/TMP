const idealTimeout = 1000 / 60;

const runPhase = (phase, timeout) => {
  const startedAt = new Date().getTime();
  const newPhase = phase();
  setTimeout(() => {
    const now = new Date().getTime();
    const newTimeout = now - startedAt < idealTimeout ? timeout + 1 : Math.max(timeout - 1, 1);
    runPhase(newPhase, newTimeout);
  }, timeout);
};

export default (phase) => runPhase(phase, idealTimeout);
