import DirectoryData from '../../Types/DirectoryData';
import FileData from '../../Types/FileData';

const DIR_GAP = 100;

type Props = {
  dirData: DirectoryData;
};

const Directory = ({ dirData }: Props) => {
  return (
    <div className="flex flex-col items-end w-full">
      <div className="w-full text-2xl">{dirData.name}</div>
      <div style={{ width: `calc(100% - ${DIR_GAP}px)` }}>
        {dirData.subdirs.map((subdir: DirectoryData) => (
          <Directory dirData={subdir} />
        ))}
        {dirData.files.map((file: FileData) => (
          <div className="w-full text-2xl">{file.name}</div>
        ))}
      </div>
    </div>
  );
};

export default Directory;
