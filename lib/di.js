const containerToHandlers = new Map();

export const buildDiContainer = (dependencies) => {
  const handlers = {};
  const container = Object.entries(dependencies).reduce(
    (dependenciesAcc, [packageName, packageInstances]) => {
      const packageHandlers = {};
      const proxies = Object.entries(packageInstances).reduce((proxiesAcc, [key, value]) => {
        const handler = {};
        packageHandlers[key] = handler;
        return { ...proxiesAcc, [key]: new Proxy(value, handler) };
      }, {});
      handlers[packageName] = packageHandlers;
      return { ...dependenciesAcc, [packageName]: proxies };
    },
    {},
  );
  containerToHandlers.set(container, handlers);
  return container;
};

const trapNames = ['get', 'set', 'apply', 'construct'];

export const resetMock = (container, packageName, key) => {
  const handlers = containerToHandlers.get(container);
  const handler = handlers[packageName][key];
  trapNames.forEach((trapName) => {
    // The ESLint rule 'no-param-reassign' doesn't complain this!
    Reflect.deleteProperty(handler, trapName);
  });
};

export const resetAllMocks = (container) => {
  const handlers = containerToHandlers.get(container);
  Object.entries(handlers).forEach(([packageName, packageHandlers]) => {
    Object.keys(packageHandlers).forEach((key) => {
      resetMock(container, packageName, key);
    });
  });
};

export const mockFunction = (container, packageName, functionName, mock) => {
  const handlers = containerToHandlers.get(container);
  handlers[packageName][functionName].apply = (target, thisArg, args) => (
    Reflect.apply(mock(target), thisArg, args)
  );
};

export const mockFunctionSequence = (container, packageName, functionName, mocks) => {
  const handlers = containerToHandlers.get(container);
  let count = 0;
  handlers[packageName][functionName].apply = (target, thisArg, args) => {
    count += 1;
    if (count > mocks.length) {
      throw new Error(`RangeError: Function is called more times than expected: ${mocks.length}`);
    }
    return Reflect.apply(mocks[count - 1](target), thisArg, args);
  };
};
