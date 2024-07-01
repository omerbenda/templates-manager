import Modal from '../Modal/Modal';
import { CancelButton, ConfirmButton } from './ConfirmModalButtons';

type Props = {
  open: boolean;
  closeHandler: () => void;
  onResponse: (confirmed: boolean) => void;
  children?: React.ReactElement | string;
};

const ConfirmModal = ({ open, closeHandler, onResponse, children }: Props) => {
  return (
    <Modal open={open} closeHandler={closeHandler}>
      <div
        className="
          relative left-1/2 top-1/2
          -translate-x-1/2 -translate-y-1/2
          flex flex-col
          rounded border-black border-2
          bg-white dark:bg-neutral-800
          w-96 h-36
          text-center gap-3
        "
      >
        <div className="flex flex-col h-full p-2">
          <div className="grow">{children}</div>
          <div className="flex justify-evenly">
            <CancelButton onClick={() => onResponse(false)} />
            <ConfirmButton onClick={() => onResponse(true)} />
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default ConfirmModal;
