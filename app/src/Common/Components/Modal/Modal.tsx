import React, { MouseEvent, useRef } from 'react';

type Props = {
  open: boolean;
  closeHandler: () => void;
  children?: React.ReactNode;
};

const Modal = ({ open, closeHandler, children }: Props) => {
  const mouseDownTargetRef = useRef<EventTarget>();

  const handleClick = (e: MouseEvent<HTMLDivElement>) => {
    if (
      e.currentTarget === e.target &&
      e.currentTarget === mouseDownTargetRef.current
    ) {
      closeHandler();
    }

    e.stopPropagation();
  };

  const onMouseDown = (e: MouseEvent<HTMLDivElement>) => {
    mouseDownTargetRef.current = e.target;
  };

  return (
    <div
      onClick={handleClick}
      onMouseDown={onMouseDown}
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
