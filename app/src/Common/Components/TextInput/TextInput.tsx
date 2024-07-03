type Props = {
  isInvalid?: boolean;
} & React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>;

const TextInput = ({ isInvalid, className, ...inputProps }: Props) => {
  return (
    <input
      type="text"
      className={`
        shadow rounded p-1
        text-gray-700 dark:text-neutral-400 font-medium
        focus:outline-none border-2
        dark:bg-gray-900
        w-full h-full
        ${
          isInvalid
            ? 'border-red-600 focus:border-red-800'
            : 'border-black focus:border-black'
        }
        ${className || ''}
      `}
      {...inputProps}
    />
  );
};

export default TextInput;
