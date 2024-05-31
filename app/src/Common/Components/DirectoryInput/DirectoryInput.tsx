import { open } from '@tauri-apps/api/dialog';

type Props = {
  value: string;
  placeholder?: string;
  onPathChange: (path: string) => void;
};

const DirectoryInput = ({ value, placeholder, onPathChange }: Props) => {
  const chooseFolder = async () => {
    const selected = await open({ directory: true, multiple: false });

    if (selected) {
      onPathChange(selected.toString());
    }
  };

  return (
    <div className="flex flex-wrap w-full">
      <input
        type="text"
        onChange={(e) => onPathChange(e.target.value)}
        value={value}
        placeholder={placeholder}
        className="grow shadow rounded-r-none text-gray-700 font-medium p-1"
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
