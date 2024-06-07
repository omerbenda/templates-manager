import { useEffect, useState } from 'react';

type Props = {
  menuButton: React.ReactNode;
} & React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
>;

const DropdownMenu = ({ menuButton, children, className, ...props }: Props) => {
  const [open, setOpen] = useState<boolean>(false);

  const openBtnHandler = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    setOpen((curr) => !curr);
    e.stopPropagation();
  };

  useEffect(() => {
    const clickListener = () => {
      setOpen(false);
    };

    window.addEventListener('click', clickListener);

    return () => window.removeEventListener('click', clickListener);
  }, []);

  return (
    <div className={`relative ${className || ''}`} {...props}>
      <div onClick={openBtnHandler}>{menuButton}</div>
      {open && (
        <div className="absolute w-full" onClick={(e) => e.stopPropagation()}>
          {children}
        </div>
      )}
    </div>
  );
};

export default DropdownMenu;
