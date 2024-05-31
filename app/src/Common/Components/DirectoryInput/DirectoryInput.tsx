import { open } from '@tauri-apps/api/dialog';
import TextInput from '../TextInput/TextInput';

type Props = {
  value: string;
  placeholder?: string;
  isValid?: boolean;
  onPathChange: (path: string) => void;
};

const DirectoryInput = ({
  value,
  placeholder,
  isValid,
  onPathChange,
}: Props) => {
  const chooseFolder = async () => {
    const selected = await open({ directory: true, multiple: false });

    if (selected) {
      onPathChange(selected.toString());
    }
  };

  return (
    <div className="flex flex-wrap w-full">
      <TextInput
        isValid={isValid}
        inputProps={{
          value: value,
          placeholder: placeholder,
          onChange: (e) => onPathChange(e.target.value),
        }}
        className="rounded-r-none"
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
