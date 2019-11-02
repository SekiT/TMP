import { test } from 'tape';
import dependencies from 'dependencies';
import { mockFunctionSequence, mockConstructor, resetAllMocks } from 'lib/shadow';
import { runPhase, idealTimeout } from 'lib/runPhase';

const { globals } = dependencies;

const timeoutSup = Math.ceil(idealTimeout);

test('runPhase runs phase with balancing timeout', (t) => {
  const cases = [
    [timeoutSup - 1, 16, 17],
    [timeoutSup, 17, 16],
    [timeoutSup - 1, 1, 2],
    [timeoutSup + 1, 1, 1],
  ];
  t.plan(cases.length * 4);
  cases.forEach(([timeTaken, timeoutBefore, timeoutAfter]) => {
    let getTimeCount = 0;
    mockConstructor(globals, 'Date', () => function MockDate() {
      getTimeCount += 1;
      if (getTimeCount === 3) t.pass('new Date() called 3 times');
      if (getTimeCount >= 4) return t.fail('new Date() called too many times!');
      this.getTime = () => [0, timeTaken, timeTaken][getTimeCount - 1];
    });
    const phase3 = () => t.fail('phase3 should not be called');
    const phase2 = () => { t.pass('phase2 called'); return phase3; };
    const phase1 = () => phase2;
    mockFunctionSequence(globals, 'setTimeout', [
      () => (fun, timeout) => {
        t.equal(timeout, timeoutBefore);
        fun();
      },
      () => (_, timeout) => t.equal(timeout, timeoutAfter),
    ]);
    runPhase(phase1, timeoutBefore);
  });
  resetAllMocks(globals);
});
