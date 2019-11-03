import { test } from 'tape';
import {
  shadow,
  mockFunction, mockFunctionSequence, mockConstructor, mockPropertyGetter,
  resetMock, resetAllMocks,
} from 'lib/shadow';

const originalObject = (originalArgument, originalReturned) => ({
  fun1: (x) => x === originalArgument && originalReturned,
  fun2: (x) => x === originalArgument && originalReturned,
  Con: function (x) {
    this.value = x === originalArgument && originalReturned;
  },
  obj: {
    child: originalReturned,
    fun: (x) => x === originalArgument && originalReturned,
  },
});

test('shadow initially proxies functions', (t) => {
  const [originalArgument, originalReturned] = [{}, {}];
  const shade = shadow(originalObject(originalArgument, originalReturned));
  t.equal(shade.fun1(originalArgument), originalReturned);
  t.equal(shade.fun2(originalArgument), originalReturned);
  t.equal(new shade.Con(originalArgument).value, originalReturned);
  t.equal(shade.obj.child, originalReturned);
  t.equal(shade.obj.fun(originalArgument), originalReturned);
  t.end();
});

test('mockFunction replaces implementation', (t) => {
  const [originalArgument, originalReturned] = [{}, {}];
  const shade = shadow({
    fun: (x) => x === originalArgument && originalReturned,
  });
  const [mockedArgument, mockedReturned] = [{}, {}];
  const mock = (originalFun) => (x) => (
    x === mockedArgument && originalFun(originalArgument) === originalReturned && mockedReturned
  );
  mockFunction(shade, 'fun', mock);
  t.equal(shade.fun(mockedArgument), mockedReturned);
  t.equal(shade.fun(mockedArgument), mockedReturned);
  t.end();
});

test('mockFunctionSequence replaces implementation n times', (t) => {
  const [originalArgument, originalReturned] = [{}, {}];
  const shade = shadow({
    fun: (x) => x === originalArgument && originalReturned,
  });
  const [mockedArgument1, mockedReturned1] = [{}, {}];
  const mock1 = (originalFun) => (x) => (
    x === mockedArgument1 && originalFun(originalArgument) === originalReturned && mockedReturned1
  );
  const [mockedArgument2, mockedReturned2] = [{}, {}];
  const mock2 = (originalFun) => (x) => (
    x === mockedArgument2 && originalFun(originalArgument) === originalReturned && mockedReturned2
  );
  mockFunctionSequence(shade, 'fun', [mock1, mock2]);
  t.equal(shade.fun(mockedArgument1), mockedReturned1);
  t.equal(shade.fun(mockedArgument2), mockedReturned2);
  t.throws(() => shade.fun(mockedArgument2), /RangeError.+2/);
  t.end();
});

test('mockConstructor replaces constructor', (t) => {
  const [originalArgument, originalReturned] = [{}, {}];
  const shade = shadow(originalObject(originalArgument, originalReturned));
  const [mockedArgument, mockedReturned] = [{}, {}];
  const mock = (OriginalConstructor) => function MockedConstructor(x) {
    const { value } = new OriginalConstructor(originalArgument);
    this.value = x === mockedArgument && value === originalReturned && mockedReturned;
  };
  mockConstructor(shade, 'Con', mock);
  t.equal(new shade.Con(mockedArgument).value, mockedReturned);
  t.equal(new shade.Con(mockedArgument).value, mockedReturned);
  t.end();
});

test('mockPropertyGetter replaces getter of the object', (t) => {
  const [originalArgument, originalReturned] = [{}, {}];
  const shade = shadow(originalObject(originalArgument, originalReturned));
  const [mockedArgument, mockedReturned] = [{}, {}];
  mockPropertyGetter(shade, 'obj', (originalObj, key) => {
    if (key === 'child') {
      t.equal(originalObj[key], originalReturned);
      return mockedReturned;
    }
    if (key === 'fun') {
      t.equal(originalObj[key](originalArgument), originalReturned);
      return (x) => x === mockedArgument && mockedReturned;
    }
    return t.fail(`Unknown property accessed: ${key}`);
  });
  t.equal(shade.obj.child, mockedReturned);
  t.equal(shade.obj.fun(mockedArgument), mockedReturned);
  t.end();
});

test('resetMock clears single mock', (t) => {
  const [originalArgument, originalReturned] = [{}, {}];
  const shade = shadow(originalObject(originalArgument, originalReturned));
  const [mockedArgument, mockedReturned] = [{}, {}];
  const mockFun = (originalFun) => (x) => (
    x === mockedArgument && originalFun(originalArgument) === originalReturned && mockedReturned
  );
  const mockCon = (OriginalConstructor) => function MockedConstructor(x) {
    const { value } = new OriginalConstructor(originalArgument);
    this.value = x === mockedArgument && value === originalReturned && mockedReturned;
  };
  const mockObjGetter = (originalObj, key) => {
    if (key === 'child') {
      return originalObj[key] === originalReturned && mockedReturned;
    }
    if (key === 'fun') {
      return originalObj[key](originalArgument) === originalReturned
        && ((x) => x === mockedArgument && mockedReturned);
    }
    return t.fail(`Unknown property access: ${key}`);
  };
  mockFunction(shade, 'fun1', mockFun);
  mockFunction(shade, 'fun2', mockFun);
  mockConstructor(shade, 'Con', mockCon);
  mockPropertyGetter(shade, 'obj', mockObjGetter);
  t.equal(shade.fun1(mockedArgument), mockedReturned);
  t.equal(shade.fun2(mockedArgument), mockedReturned);
  t.equal(new shade.Con(mockedArgument).value, mockedReturned);
  t.equal(shade.obj.child, mockedReturned);
  t.equal(shade.obj.fun(mockedArgument), mockedReturned);
  resetMock(shade, 'fun1');
  t.equal(shade.fun1(originalArgument), originalReturned);
  t.equal(shade.fun2(mockedArgument), mockedReturned);
  t.equal(new shade.Con(mockedArgument).value, mockedReturned);
  t.equal(shade.obj.child, mockedReturned);
  t.equal(shade.obj.fun(mockedArgument), mockedReturned);
  resetMock(shade, 'Con');
  t.equal(shade.fun1(originalArgument), originalReturned);
  t.equal(shade.fun2(mockedArgument), mockedReturned);
  t.equal(new shade.Con(originalArgument).value, originalReturned);
  t.equal(shade.obj.child, mockedReturned);
  t.equal(shade.obj.fun(mockedArgument), mockedReturned);
  resetMock(shade, 'obj');
  t.equal(shade.fun1(originalArgument), originalReturned);
  t.equal(shade.fun2(mockedArgument), mockedReturned);
  t.equal(new shade.Con(originalArgument).value, originalReturned);
  t.equal(shade.obj.child, originalReturned);
  t.equal(shade.obj.fun(originalArgument), originalReturned);
  t.end();
});

test('resetAllMocks clears all the mocks', (t) => {
  const [originalArgument, originalReturned] = [{}, {}];
  const shade = shadow(originalObject(originalArgument, originalReturned));
  const [mockedArgument, mockedReturned] = [{}, {}];
  const mockFun = (originalFun) => (x) => (
    x === mockedArgument && originalFun(originalArgument) === originalReturned && mockedReturned
  );
  const mockCon = (OriginalConstructor) => function MockedConstructor(x) {
    const { value } = new OriginalConstructor(originalArgument);
    this.value = x === mockedArgument && value === originalReturned && mockedReturned;
  };
  const mockObjGetter = (originalObj, key) => {
    if (key === 'child') {
      return originalObj[key] === originalReturned && mockedReturned;
    }
    if (key === 'fun') {
      return originalObj[key](originalArgument) === originalReturned
        && ((x) => x === mockedArgument && mockedReturned);
    }
    return t.fail(`Unknown property access: ${key}`);
  };
  mockFunction(shade, 'fun1', mockFun);
  mockFunction(shade, 'fun2', mockFun);
  mockConstructor(shade, 'Con', mockCon);
  mockPropertyGetter(shade, 'obj', mockObjGetter);
  t.equal(shade.fun1(mockedArgument), mockedReturned);
  t.equal(shade.fun2(mockedArgument), mockedReturned);
  t.equal(new shade.Con(mockedArgument).value, mockedReturned);
  t.equal(shade.obj.child, mockedReturned);
  t.equal(shade.obj.fun(mockedArgument), mockedReturned);
  resetAllMocks(shade);
  t.equal(shade.fun1(originalArgument), originalReturned);
  t.equal(shade.fun2(originalArgument), originalReturned);
  t.equal(new shade.Con(originalArgument).value, originalReturned);
  t.equal(shade.obj.child, originalReturned);
  t.equal(shade.obj.fun(originalArgument), originalReturned);
  t.end();
});
