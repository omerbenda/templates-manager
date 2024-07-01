const ConfirmCancelButton = ({
  className,
  ...buttonProps
}: React.DetailedHTMLProps<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>) => {
  return (
    <button
      className={`rounded shadow-black shadow-2xl p-3 ${className || ''}`}
      {...buttonProps}
    />
  );
};

export const ConfirmButton = ({
  className,
  ...buttonProps
}: React.DetailedHTMLProps<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>) => {
  return (
    <ConfirmCancelButton
      className={`duration-300 bg-green-600 hover:bg-green-700 active:bg-green-800 ${className}`}
      {...buttonProps}
    >
      Confirm
    </ConfirmCancelButton>
  );
};

export const CancelButton = ({
  className,
  ...buttonProps
}: React.DetailedHTMLProps<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>) => {
  return (
    <ConfirmCancelButton
      className={`duration-300 bg-red-500 hover:bg-red-600 active:bg-red-700 ${className}`}
      {...buttonProps}
    >
      Cancel
    </ConfirmCancelButton>
  );
};
