import { IoIosClose } from 'react-icons/io';
import Modal from '../../../../Common/Components/Modal/Modal';
import DirectoryInput from '../../../../Common/Components/DirectoryInput/DirectoryInput';
import { useEffect, useState } from 'react';

type Props = {
  open: boolean;
  closeHandler: () => void;
};

const NewTemplateModal = ({ open, closeHandler }: Props) => {
  const [path, setPath] = useState<string>('');

  useEffect(() => {
    console.log(path);
  }, [path]);

  return (
    <Modal open={open} closeHandler={closeHandler}>
      <div
        className="
            relative left-1/2 top-1/2
            -translate-x-1/2 -translate-y-1/2
            rounded border-black border-2
            bg-white
            w-3/4
          "
      >
        <div className="flex flex-col items-center w-full h-full p-1 gap-2">
          <div className="grid grid-cols-3 items-center w-full">
            <div />
            <div className="text-center text-xl font-bold">New Template</div>
            <div className="flex justify-end">
              <IoIosClose
                onClick={closeHandler}
                className="text-3xl cursor-pointer"
              />
            </div>
          </div>
          <div className="grow w-3/4">
            <DirectoryInput value={path} onPathChange={setPath} />
          </div>
          <div
            onClick={closeHandler}
            className="
              rounded p-3 select-none text-white
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
