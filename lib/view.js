import { wire } from '../node_modules/hyperhtml/esm';

export default (defaultProps, renderFunction) => {
  const renderImpl = renderFunction(wire({}));
  let props = defaultProps;
  return {
    render: () => renderImpl(props),
    update: (updaterFunction) => {
      props = updaterFunction(props);
      renderImpl(props);
    },
  };
};
