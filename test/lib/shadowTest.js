import { test } from 'tape';
import {
  shadow, mockFunction, mockFunctionSequence, mockConstructor, resetMock, resetAllMocks,
} from '../../lib/shadow';

test('shadow proxies functions', (t) => {
  t.plan(1);
  const expectedArgument = {};
  const expectedReturned = {};
  const shade = shadow({
    fun: (x) => x === expectedArgument && expectedReturned,
  });
  t.equal(shade.fun(expectedArgument), expectedReturned);
});

test('mockFunction replaces implementation', (t) => {
  t.plan(2);
  const originalArgument = {};
  const originalReturned = {};
  const shade = shadow({
    fun: (x) => x === originalArgument && originalReturned,
  });
  const mockedArgument = {};
  const mockedReturned = {};
  const mock = (originalFun) => (x) => (
    x === mockedArgument && originalFun(originalArgument) === originalReturned && mockedReturned
  );
  mockFunction(shade, 'fun', mock);
  t.equal(shade.fun(mockedArgument), mockedReturned);
  t.equal(shade.fun(mockedArgument), mockedReturned);
});

test('mockFunctionSequence replaces implementation n times', (t) => {
  t.plan(3);
  const originalArgument = {};
  const originalReturned = {};
  const shade = shadow({
    fun: (x) => x === originalArgument && originalReturned,
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
  mockFunctionSequence(shade, 'fun', [mock1, mock2]);
  t.equal(shade.fun(mockedArgument1), mockedReturned1);
  t.equal(shade.fun(mockedArgument2), mockedReturned2);
  t.throws(() => shade.fun(mockedArgument2), /RangeError.+2/);
});

test('mockConstructor replaces constructor', (t) => {
  t.plan(8);
  const originalArgument = {};
  const originalProperty = {};
  const shade = shadow({
    Constructor: function (x) {
      t.equal(x, originalArgument);
      this.value = originalProperty;
    },
  });
  const mockedArgument = {};
  const mockedProperty = {};
  const mock = (OriginalConstructor) => function MockedConstructor(x) {
    t.equal(x, mockedArgument);
    const { value } = new OriginalConstructor(originalArgument);
    t.equal(value, originalProperty);
    this.value = mockedProperty;
  };
  mockConstructor(shade, 'Constructor', mock);
  t.equal(new shade.Constructor(mockedArgument).value, mockedProperty);
  t.equal(new shade.Constructor(mockedArgument).value, mockedProperty);
});

test('resetMock clears single mock', (t) => {
  t.plan(4);
  const originalArgument = {};
  const originalReturned = {};
  const shade = shadow({
    fun1: (x) => x === originalArgument && originalReturned,
    fun2: (x) => x === originalArgument && originalReturned,
  });
  const mockedArgument = {};
  const mockedReturned = {};
  const mock = (originalFun) => (x) => (
    x === mockedArgument && originalFun(originalArgument) === originalReturned && mockedReturned
  );
  mockFunction(shade, 'fun1', mock);
  mockFunction(shade, 'fun2', mock);
  t.equal(shade.fun1(mockedArgument), mockedReturned);
  t.equal(shade.fun2(mockedArgument), mockedReturned);
  resetMock(shade, 'fun1');
  t.equal(shade.fun1(originalArgument), originalReturned);
  t.equal(shade.fun2(mockedArgument), mockedReturned);
});

test('resetAllMocks clears all the mocks', (t) => {
  t.plan(4);
  const originalArgument = {};
  const originalReturned = {};
  const shade = shadow({
    fun1: (x) => x === originalArgument && originalReturned,
    fun2: (x) => x === originalArgument && originalReturned,
  });
  const mockedArgument = {};
  const mockedReturned = {};
  const mock = (originalFun) => (x) => (
    x === mockedArgument && originalFun(originalArgument) === originalReturned && mockedReturned
  );
  mockFunction(shade, 'fun1', mock);
  mockFunction(shade, 'fun2', mock);
  t.equal(shade.fun1(mockedArgument), mockedReturned);
  t.equal(shade.fun2(mockedArgument), mockedReturned);
  resetAllMocks(shade);
  t.equal(shade.fun1(originalArgument), originalReturned);
  t.equal(shade.fun2(originalArgument), originalReturned);
});
