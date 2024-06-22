import React, { MouseEvent } from 'react';

type Props = {
  open: boolean;
  closeHandler: () => void;
  children?: React.ReactNode;
};

const Modal = ({ open, closeHandler, children }: Props) => {
  const handleClick = (e: MouseEvent<HTMLDivElement>) => {
    if (e.currentTarget === e.target) {
      closeHandler();
    }

    e.stopPropagation();
  };

  return (
    <div
      onClick={handleClick}
      className={`
        absolute w-full h-full
        bg-black bg-opacity-25
        duration-100 ease-in
        ${open ? 'visible opacity-100' : 'invisible opacity-0'}
      `}
    >
      {children}
    </div>
  );
};

export default Modal;
