const shadeToHandlers = new Map();

export const shadow = (originalObject) => {
  const handlers = {};
  const shade = Object.entries(originalObject).reduce((acc, [key, value]) => {
    const handler = {};
    handlers[key] = handler;
    return { ...acc, [key]: new Proxy(value, handler) };
  }, {});
  shadeToHandlers.set(shade, handlers);
  return shade;
};

const trapNames = ['get', 'set', 'apply', 'construct'];

export const resetMock = (shade, key) => {
  const handler = shadeToHandlers.get(shade)[key];
  trapNames.forEach((trapName) => {
    // The ESLint rule 'no-param-reassign' doesn't complain this!
    Reflect.deleteProperty(handler, trapName);
  });
};

export const resetAllMocks = (shade) => {
  const handlers = shadeToHandlers.get(shade);
  Object.keys(handlers).forEach((key) => resetMock(shade, key));
};

export const mockFunction = (shade, functionName, mock) => {
  shadeToHandlers.get(shade)[functionName].apply = (target, thisArg, args) => (
    Reflect.apply(mock(target), thisArg, args)
  );
};

export const mockFunctionSequence = (shade, functionName, mocks) => {
  let count = 0;
  shadeToHandlers.get(shade)[functionName].apply = (target, thisArg, args) => {
    count += 1;
    if (mocks.length < count) {
      throw new Error(`RangeError: Function is called more times than expected: ${mocks.length}`);
    }
    return Reflect.apply(mocks[count - 1](target), thisArg, args);
  };
};

export const mockConstructor = (shade, constructorName, mock) => {
  shadeToHandlers.get(shade)[constructorName].construct = (target, args) => (
    Reflect.construct(mock(target), args)
  );
};
