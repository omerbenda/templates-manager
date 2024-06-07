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
        disabled:bg-gray-50 disabled:hover-bg-gray-50 disabled:active:bg-gray-50
        disabled:dark:bg-gray-800 disabled:dark:hover:bg-gray-800 disabled:dark:active:bg-gray-800
        disabled:text-neutral-300 disabled:dark:text-neutral-600
        disabled:cursor-not-allowed
        duration-300 select-none
        px-3 py-2
        ${className || ''}
      `}
      {...buttonProps}
    />
  );
};

export default ActionButton;
