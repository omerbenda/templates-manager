type Props = {
  isValid?: boolean;
  className?: string;
  inputProps: React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  >;
};

const TextInput = ({ isValid, className, inputProps }: Props) => {
  return (
    <input
      type="text"
      className={`
        grow shadow rounded p-1
        text-gray-700 font-medium
        focus:outline-none border-2
        ${
          isValid !== false
            ? 'border-black focus:border-black'
            : 'border-red-600 focus:border-red-800'
        }
        ${className || ''}
      `}
      {...inputProps}
    />
  );
};

export default TextInput;
