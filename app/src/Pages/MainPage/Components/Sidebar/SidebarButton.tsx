type Props = {
  className?: string;
} & React.DetailedHTMLProps<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>;

const SidebarButton = ({ className, ...buttonProps }: Props) => {
  return (
    <button
      className={`
        flex flex-col
        justify-center items-center
        min-h-16
        cursor-pointer select-none
        duration-300
        border-b-2 border-gray-500
        bg-gray-200 hover:bg-gray-300 active:bg-gray-400
        ${className || ''}
      `}
      {...buttonProps}
    />
  );
};

export default SidebarButton;
