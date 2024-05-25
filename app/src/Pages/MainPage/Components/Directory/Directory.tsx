import { useState } from 'react';
import DirectoryData from '../../Types/DirectoryData';
import FileData from '../../Types/FileData';

const WIDTH_GAP: string = '50px';

type Props = {
  dirData: DirectoryData;
};

const Directory = ({ dirData }: Props) => {
  const [isOpen, setOpen] = useState<boolean>(false);

  return (
    <div className="flex flex-col items-end w-full">
      <div
        onClick={() => setOpen((curr) => !curr)}
        className="select-none cursor-pointer w-full text-2xl"
      >
        {dirData.name}
      </div>
      {isOpen && (
        <div style={{ width: `calc(100% - ${WIDTH_GAP})` }}>
          {dirData.subdirs.map((subdir: DirectoryData) => (
            <Directory dirData={subdir} key={subdir.name} />
          ))}
          {dirData.files.map((file: FileData) => (
            <div className="select-none w-full text-2xl" key={file.name}>
              {file.name}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Directory;
