import { useEffect, useState } from 'react';
import Modal from '../Modal/Modal';
import { getName, getVersion } from '@tauri-apps/api/app';

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
        <div className="text-2xl select-none">Info</div>
        <hr />
        <div className="text-xl">App name: {appName}</div>
        <div className="text-xl">App version: {appVersion}</div>
      </div>
    </Modal>
  );
};

export default InfoModal;
