import { IoIosClose } from 'react-icons/io';
import Modal from '../../../../Common/Components/Modal/Modal';
import DirectoryInput from '../../../../Common/Components/DirectoryInput/DirectoryInput';
import { useEffect, useState } from 'react';
import { exists } from '@tauri-apps/api/fs';
import TextInput from '../../../../Common/Components/TextInput/TextInput';
import { checkTemplateExists } from '../../../../Common/Utilities/TemplateUtilities';

type Props = {
  open: boolean;
  closeHandler: () => void;
  onCreateTemplate: (
    name: string,
    path: string,
    ignoredFilesRegex?: RegExp
  ) => void;
};

const NewTemplateModal = ({ open, closeHandler, onCreateTemplate }: Props) => {
  const [path, setPath] = useState<string>('');
  const [isPathValid, setPathValid] = useState<boolean>(false);
  const [name, setName] = useState<string>('');
  const [isNameValid, setNameValid] = useState<boolean>(false);
  const [ignoredPaths, setIgnoredPaths] = useState<string>('');
  const [isIgnoredPathsValid, setIgnoredPathsValid] = useState<boolean>(true);

  const validateInput = async () => {
    const pathExists = await exists(path);
    const nameExists = await checkTemplateExists(name);

    setPathValid(pathExists);
    setNameValid(!nameExists);
  };

  useEffect(() => {
    validateInput();
  }, [path, name]);

  useEffect(() => {
    try {
      new RegExp(ignoredPaths);
      setIgnoredPathsValid(true);
    } catch (e) {
      setIgnoredPathsValid(false);
    }
  }, [ignoredPaths]);

  useEffect(() => {
    if (open) {
      setPath('');
      setName('');
      setIgnoredPaths('');
    }
  }, [open]);

  const isInputValid = isPathValid && isNameValid && isIgnoredPathsValid;

  return (
    <Modal open={open} closeHandler={closeHandler}>
      <div
        className="
            relative left-1/2 top-1/2
            -translate-x-1/2 -translate-y-1/2
            rounded border-black border-2
            bg-white dark:bg-neutral-800
            w-3/4
          "
      >
        <div className="flex flex-col items-center w-full h-full p-1 gap-2">
          <div className="grid grid-cols-3 items-center w-full">
            <div />
            <div className="text-center text-xl font-bold select-none">
              New Template
            </div>
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
                isInvalid={!isNameValid}
                value={name}
                placeholder="Template Name"
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <DirectoryInput
              value={path}
              onPathChange={setPath}
              placeholder="Path to New Template"
              isInvalid={!isPathValid}
            />
            <TextInput
              value={ignoredPaths}
              placeholder="Ignored Paths (Regex)"
              onChange={(e) => setIgnoredPaths(e.target.value)}
              isInvalid={!isIgnoredPathsValid}
            />
          </div>
          <button
            onClick={() =>
              onCreateTemplate(
                name,
                path,
                ignoredPaths ? new RegExp(ignoredPaths) : undefined
              )
            }
            disabled={!isInputValid}
            className={`
              rounded p-3 select-none
              duration-100
              ${
                isInputValid
                  ? `
                    bg-blue-500 hover:bg-blue-600 active:bg-blue-700
                    dark:bg-purple-600 dark:hover:bg-purple-700 dark:active:bg-purple-800
                    cursor-pointer text-white
                  `
                  : 'bg-gray-300 text-gray-400 cursor-not-allowed'
              }
            `}
          >
            Add Template
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default NewTemplateModal;
