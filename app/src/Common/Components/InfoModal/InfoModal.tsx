import { useEffect, useState } from 'react';
import Modal from '../Modal/Modal';
import { getName, getVersion } from '@tauri-apps/api/app';
import { IoIosClose } from 'react-icons/io';

type Props = {
  open: boolean;
  closeHandler: () => void;
};

const InfoModal = ({ open, closeHandler }: Props) => {
  const [appName, setAppName] = useState<string>();
  const [appVersion, setAppVersion] = useState<string>();

  const fetchInfo = async () => {
    setAppName(await getName());
    setAppVersion(await getVersion());
  };

  useEffect(() => {
    fetchInfo();
  }, []);

  return (
    <Modal open={open} closeHandler={closeHandler}>
      <div
        className="
          relative left-1/2 top-1/2
          -translate-x-1/2 -translate-y-1/2
          flex flex-col
          rounded border-black border-2
          bg-white dark:bg-neutral-800
          w-3/4 h-1/4
          text-center gap-3
        "
      >
        <div className="grid grid-cols-3 items-center w-full">
          <div />
          <div className="text-2xl select-none">Info</div>
          <div className="flex justify-end">
            <IoIosClose
              onClick={closeHandler}
              className="text-3xl cursor-pointer"
            />
          </div>
        </div>
        <div className="flex justify-center w-full">
          <hr className="w-11/12 border-gray-600" />
        </div>
        <div className="text-xl">App name: {appName}</div>
        <div className="text-xl">App version: {appVersion}</div>
      </div>
    </Modal>
  );
};

export default InfoModal;
