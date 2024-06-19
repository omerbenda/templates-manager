import { useState } from 'react';
import DirectoryData from '../../Types/DirectoryData';
import FileData from '../../Types/FileData';
import { IoIosArrowForward, IoIosDocument } from 'react-icons/io';

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
        <div className="flex items-center gap-1 text-nowrap">
          <div
            className={`flex flex-col transform duration-300 ${
              isOpen ? 'rotate-90' : 'rotate-0'
            }`}
          >
            <IoIosArrowForward />
          </div>
          {dirData.name}
        </div>
      </div>
      {isOpen && (
        <div style={{ width: `calc(100% - ${WIDTH_GAP})` }}>
          {dirData.subdirs.map((subdir: DirectoryData) => (
            <Directory dirData={subdir} key={subdir.name} />
          ))}
          {dirData.files.map((file: FileData) => (
            <div
              className="flex items-center select-none w-full text-2xl text-nowrap gap-1"
              key={file.name}
            >
              <IoIosDocument className="w-10 min-w-10" /> {file.name}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Directory;
