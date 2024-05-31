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
        className="grow"
      />
      <div
        onClick={chooseFolder}
        className="select-none rounded border-gray-400 border-2 p-1 cursor-pointer"
      >
        Choose Folder
      </div>
    </div>
  );
};

export default DirectoryInput;
