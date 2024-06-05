const ActionButton = ({
  className,
  ...buttonProps
}: React.DetailedHTMLProps<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>) => {
  return (
    <button
      className={`
        bg-gray-100 hover:bg-gray-200 active:bg-gray-300
        dark:bg-gray-700 dark:hover:bg-gray-800 dark:active:bg-gray-900
        border-2 border-gray-400 dark:border-gray-950
        duration-300 rounded-2xl select-none
        p-3
        ${className || ''}
      `}
      {...buttonProps}
    />
  );
};

export default ActionButton;
