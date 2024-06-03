type Props = {
  className?: string;
} & React.DetailedHTMLProps<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>;

const ActionButton = ({ className, ...buttonProps }: Props) => {
  return (
    <button
      className={`
      bg-slate-100 hover:bg-slate-200 active:bg-slate-300
        duration-300 rounded-2xl select-none
        p-3
        ${className || ''}
      `}
      {...buttonProps}
    />
  );
};

export default ActionButton;
