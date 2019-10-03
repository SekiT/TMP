import { bind } from '../node_modules/hyperhtml/esm';

export default (defaultProps, renderFunction) => {
  const renderImpl = renderFunction(bind(document.createElement('div')));
  let props = defaultProps;
  return {
    render: () => renderImpl(props),
    update: (updaterFunction) => {
      props = updaterFunction(props);
      renderImpl(props);
    },
  };
};
