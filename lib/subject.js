export default (initialValue) => {
  let value = initialValue;
  const subscribers = {};
  let counter = 0;
  return {
    next: (nextValue) => {
      value = nextValue;
      Object.values(subscribers).forEach((subscriber) => subscriber(value));
    },
    subscribe: (subscriber) => {
      subscriber(value);
      const key = counter;
      subscribers[key] = subscriber;
      counter = key + 1;
      return key;
    },
    unsubscribe: (key) => delete subscribers[key],
  };
};
