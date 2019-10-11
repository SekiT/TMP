const idealTimeout = 1000 / 60;

const runPhase = (phase, timeout) => {
  const startedAt = new Date().getTime();
  const newPhase = phase();
  setTimeout(() => {
    const newTimeout = new Date().getTime() - startedAt < idealTimeout ? timeout + 1 : timeout - 1;
    runPhase(newPhase, newTimeout);
  }, timeout);
};

export default (phase) => runPhase(phase, idealTimeout);
