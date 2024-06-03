type Props = {
  className?: string;
  buttonProps?: React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  >;
  children?: React.ReactNode;
};

const ActionButton = ({ className, buttonProps, children }: Props) => {
  return (
    <button
      className={`
      bg-slate-100 hover:bg-slate-200 active:bg-slate-300
        duration-300 rounded-2xl select-none
        p-3
        ${className || ''}
      `}
      {...buttonProps}
    >
      {children}
    </button>
  );
};

export default ActionButton;
