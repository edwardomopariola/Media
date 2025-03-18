import classNames from 'classnames';

// The Panel component is a reusable component that renders a panel with a border, rounded corners, padding, and a shadow.
// The Panel component takes a className prop that allows you to add custom classes to the panel.
function Panel({ children, className, ...rest }) {
  const finalClassNames = classNames(
    'border rounded p-3 shadow bg-white w-full',
    className
  );

  return (
    <div {...rest} className={finalClassNames}>
      {children}
    </div>
  );
}

export default Panel;
