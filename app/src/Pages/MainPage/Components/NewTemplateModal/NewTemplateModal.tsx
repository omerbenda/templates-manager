import { IoIosClose } from 'react-icons/io';
import Modal from '../../../../Common/Components/Modal/Modal';

type Props = {
  open: boolean;
  closeHandler: () => void;
};

const NewTemplateModal = ({ open, closeHandler }: Props) => {
  return (
    <Modal open={open} closeHandler={closeHandler}>
      <div
        className="
            relative left-1/2 top-1/2
            -translate-x-1/2 -translate-y-1/2
            rounded border-black border-2
            bg-white
            w-1/2 h-1/2
          "
      >
        <div className="flex flex-col items-center w-full h-full p-1">
          <div className="flex justify-end w-full h-0">
            <IoIosClose
              onClick={closeHandler}
              className="text-3xl cursor-pointer"
            />
          </div>
          <div className="grow">content</div>
          <div
            onClick={closeHandler}
            className="
              rounded p-3 select-none
              cursor-pointer duration-100
              bg-purple-500 hover:bg-purple-600 active:bg-purple-700
            "
          >
            Add Modal
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default NewTemplateModal;
