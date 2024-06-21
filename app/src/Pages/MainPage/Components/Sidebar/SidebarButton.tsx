const SidebarButton = ({
  className,
  ...buttonProps
}: React.DetailedHTMLProps<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>) => {
  return (
    <button
      className={`
        flex flex-col
        justify-center items-center
        min-h-16
        w-full
        cursor-pointer select-none
        duration-300
        border-b-2 border-gray-500 dark:border-neutral-900
        bg-gray-200 hover:bg-gray-300 active:bg-gray-400
        dark:bg-slate-700 dark:hover:bg-slate-800 dark:active:bg-slate-900
        ${className || ''}
      `}
      {...buttonProps}
    />
  );
};

export default SidebarButton;
