import { wire } from 'hyperhtml/esm';

export default (defaultProps, renderFunction) => {
  const renderImpl = renderFunction(wire({}));
  let props = defaultProps;
  return {
    render: () => renderImpl(props),
    update: (updaterFunction) => {
      props = { ...props, ...updaterFunction(props) };
      renderImpl(props);
    },
  };
};
