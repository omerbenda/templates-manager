import CustomButtonProps from '../../../../Common/Types/CustomButtonProps';

const ActionButton = ({ className, ...buttonProps }: CustomButtonProps) => {
  return (
    <button
      className={`
        bg-gray-100 hover:bg-gray-200 active:bg-gray-300
        border-2 border-gray-400
        duration-300 rounded-2xl select-none
        p-3
        ${className || ''}
      `}
      {...buttonProps}
    />
  );
};

export default ActionButton;
