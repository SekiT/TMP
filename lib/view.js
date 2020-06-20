import dependencies from 'dependencies';

const { render, html } = dependencies.uhtml;
const { DocumentFragment } = dependencies.globals;

export const view = (defaultProps, renderFunction) => {
  const fragment = DocumentFragment();
  const renderImpl = (props) => render(fragment, renderFunction(html)(props));
  let props = defaultProps;
  return {
    render: () => renderImpl(props),
    update: (updaterFunction) => {
      props = { ...props, ...updaterFunction(props) };
      renderImpl(props);
    },
  };
};
