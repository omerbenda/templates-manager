import { open } from '@tauri-apps/api/dialog';
import TextInput from '../TextInput/TextInput';

type Props = {
  value: string;
  placeholder?: string;
  isInvalid?: boolean;
  onPathChange: (path: string) => void;
};

const DirectoryInput = ({
  value,
  placeholder,
  isInvalid,
  onPathChange,
}: Props) => {
  const chooseFolder = async () => {
    const selected = (await open({ directory: true, multiple: false })) as
      | string
      | undefined;

    if (selected) {
      onPathChange(selected);
    }
  };

  return (
    <div className="flex flex-wrap w-full">
      <div className="grow">
        <TextInput
          isInvalid={isInvalid}
          value={value}
          placeholder={placeholder}
          onChange={(e) => onPathChange(e.target.value)}
          className="rounded-r-none"
        />
      </div>
      <div
        onClick={chooseFolder}
        className="
          select-none cursor-pointer duration-100
          bg-gray-100 hover:bg-gray-200 active:bg-gray-300
          dark:bg-gray-700 dark:hover:bg-gray-800 dark:active:bg-gray-900
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
