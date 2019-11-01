import { test } from 'tape';
import {
  buildDiContainer, mockFunction, mockFunctionSequence, resetMock, resetAllMocks,
} from '../../lib/di';

test('buildDiContainer proxies functions', (t) => {
  t.plan(1);
  const expectedArgument = {};
  const expectedReturned = {};
  const originalDeps = {
    package: {
      fun: (x) => x === expectedArgument && expectedReturned,
    },
  };
  const container = buildDiContainer(originalDeps);
  t.equal(container.package.fun(expectedArgument), expectedReturned);
});

test('mockFunction replaces implementation', (t) => {
  t.plan(2);
  const originalArgument = {};
  const originalReturned = {};
  const container = buildDiContainer({
    package: {
      fun: (x) => x === originalArgument && originalReturned,
    },
  });
  const mockedArgument = {};
  const mockedReturned = {};
  const mock = (originalFun) => (x) => (
    x === mockedArgument && originalFun(originalArgument) === originalReturned && mockedReturned
  );
  mockFunction(container, 'package', 'fun', mock);
  t.equal(container.package.fun(mockedArgument), mockedReturned);
  t.equal(container.package.fun(mockedArgument), mockedReturned);
});

test('mockFunctionSequence replaces implementation n times', (t) => {
  t.plan(3);
  const originalArgument = {};
  const originalReturned = {};
  const container = buildDiContainer({
    package: {
      fun: (x) => x === originalArgument && originalReturned,
    },
  });
  const mockedArgument1 = {};
  const mockedReturned1 = {};
  const mock1 = (originalFun) => (x) => (
    x === mockedArgument1 && originalFun(originalArgument) === originalReturned && mockedReturned1
  );
  const mockedArgument2 = {};
  const mockedReturned2 = {};
  const mock2 = (originalFun) => (x) => (
    x === mockedArgument2 && originalFun(originalArgument) === originalReturned && mockedReturned2
  );
  mockFunctionSequence(container, 'package', 'fun', [mock1, mock2]);
  t.equal(container.package.fun(mockedArgument1), mockedReturned1);
  t.equal(container.package.fun(mockedArgument2), mockedReturned2);
  t.throws(() => container.package.fun(mockedArgument2), /RangeError.+2/);
});

test('resetMock clears single mock', (t) => {
  t.plan(4);
  const originalArgument = {};
  const originalReturned = {};
  const container = buildDiContainer({
    package: {
      fun1: (x) => x === originalArgument && originalReturned,
      fun2: (x) => x === originalArgument && originalReturned,
    },
  });
  const mockedArgument = {};
  const mockedReturned = {};
  const mock = (originalFun) => (x) => (
    x === mockedArgument && originalFun(originalArgument) === originalReturned && mockedReturned
  );
  mockFunction(container, 'package', 'fun1', mock);
  mockFunction(container, 'package', 'fun2', mock);
  t.equal(container.package.fun1(mockedArgument), mockedReturned);
  t.equal(container.package.fun2(mockedArgument), mockedReturned);
  resetMock(container, 'package', 'fun1');
  t.equal(container.package.fun1(originalArgument), originalReturned);
  t.equal(container.package.fun2(mockedArgument), mockedReturned);
});

test('resetAllMocks clears all the mocks', (t) => {
  t.plan(4);
  const originalArgument = {};
  const originalReturned = {};
  const container = buildDiContainer({
    package: {
      fun1: (x) => x === originalArgument && originalReturned,
      fun2: (x) => x === originalArgument && originalReturned,
    },
  });
  const mockedArgument = {};
  const mockedReturned = {};
  const mock = (originalFun) => (x) => (
    x === mockedArgument && originalFun(originalArgument) === originalReturned && mockedReturned
  );
  mockFunction(container, 'package', 'fun1', mock);
  mockFunction(container, 'package', 'fun2', mock);
  t.equal(container.package.fun1(mockedArgument), mockedReturned);
  t.equal(container.package.fun2(mockedArgument), mockedReturned);
  resetAllMocks(container, 'package');
  t.equal(container.package.fun1(originalArgument), originalReturned);
  t.equal(container.package.fun2(originalArgument), originalReturned);
});
