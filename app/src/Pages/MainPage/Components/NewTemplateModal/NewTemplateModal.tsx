import { IoIosClose } from 'react-icons/io';
import Modal from '../../../../Common/Components/Modal/Modal';
import DirectoryInput from '../../../../Common/Components/DirectoryInput/DirectoryInput';
import { useEffect, useState } from 'react';
import { BaseDirectory, exists } from '@tauri-apps/api/fs';
import TextInput from '../../../../Common/Components/TextInput/TextInput';

type Props = {
  open: boolean;
  closeHandler: () => void;
  onCreateTemplate: (name: string, path: string) => void;
};

const NewTemplateModal = ({ open, closeHandler, onCreateTemplate }: Props) => {
  const [path, setPath] = useState<string>('');
  const [isPathValid, setPathValid] = useState<boolean>(false);
  const [name, setName] = useState<string>('');
  const [isNameValid, setNameValid] = useState<boolean>(false);

  const validateInput = async () => {
    const pathExists = await exists(path);
    const nameExists = await exists(name, { dir: BaseDirectory.AppData });

    setPathValid(pathExists);
    setNameValid(!nameExists);
  };

  useEffect(() => {
    validateInput();
  }, [path, name]);

  const isInputValid = [isPathValid, isNameValid].every(Boolean);

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
          <div className="flex flex-col grow w-3/4 gap-2">
            <div className="flex flex-wrap w-full">
              <TextInput
                isValid={isNameValid}
                inputProps={{
                  value: name,
                  placeholder: 'Template Name',
                  onChange: (e) => setName(e.target.value),
                }}
              />
            </div>
            <DirectoryInput
              value={path}
              onPathChange={setPath}
              placeholder="Path to New Template"
              isValid={isPathValid}
            />
          </div>
          <button
            onClick={() => onCreateTemplate(name, path)}
            disabled={!isInputValid}
            className={`
              rounded p-3 select-none
              duration-100
              ${
                isInputValid
                  ? 'bg-purple-500 hover:bg-purple-600 active:bg-purple-700 cursor-pointer text-white'
                  : 'bg-gray-300 text-gray-400 cursor-not-allowed'
              }
            `}
          >
            Add Modal
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default NewTemplateModal;
