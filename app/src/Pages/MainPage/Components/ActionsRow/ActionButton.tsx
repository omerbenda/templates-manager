import CustomButtonProps from '../../../../Common/Types/CustomButtonProps';

const ActionButton = ({ className, ...buttonProps }: CustomButtonProps) => {
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
