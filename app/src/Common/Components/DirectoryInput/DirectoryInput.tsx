import { open } from '@tauri-apps/api/dialog';
import { useRef } from 'react';

type Props = {
  value: string;
  onPathChange: (path: string) => void;
};

const DirectoryInput = ({ value, onPathChange }: Props) => {
  const pathInput = useRef<HTMLInputElement>(null);

  const chooseFolder = async () => {
    const selected = await open({ directory: true, multiple: false });

    if (selected) {
      onPathChange(selected.toString());
    }
  };

  return (
    <div className="flex flex-wrap w-full">
      <input
        ref={pathInput}
        type="text"
        onChange={(e) => onPathChange(e.target.value)}
        value={value}
        className="grow shadow rounded-r-none text-gray-700 font-medium"
      />
      <div
        onClick={chooseFolder}
        className="
          shadow select-none cursor-pointer duration-100
          bg-gray-100 hover:bg-gray-200 active:bg-gray-300
          rounded rounded-l-none
          p-1
        "
      >
        Choose Folder
      </div>
    </div>
  );
};

export default DirectoryInput;
