import React, { MouseEvent } from 'react';

type Props = {
  open: boolean;
  closeHandler: () => void;
  children: React.ReactNode;
};

const Modal = ({ open, closeHandler, children }: Props) => {
  const handleClick = (e: MouseEvent<HTMLDivElement>) => {
    if (e.currentTarget === e.target) {
      closeHandler();
    }
  };

  return (
    <div
      onClick={handleClick}
      className={`absolute w-full h-full duration-100 ${
        open ? 'visible opacity-100' : 'invisible opacity-0'
      }`}
    >
      {children}
    </div>
  );
};

export default Modal;
