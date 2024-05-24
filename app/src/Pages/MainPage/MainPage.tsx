type FileData = {
  name: string;
};

type DirectoryData = {
  name: string;
  subdirs: DirectoryData[];
  files: FileData[];
};

const DIR_GAP = 100;
const DIR_DATA: DirectoryData = {
  name: 'Dir1',
  subdirs: [
    {
      name: 'Dir2',
      subdirs: [],
      files: [
        {
          name: 'File3',
        },
        {
          name: 'File4',
        },
      ],
    },
  ],
  files: [
    {
      name: 'File1',
    },
    {
      name: 'File2',
    },
  ],
};

const Directory = ({ dirData }) => {
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

const MainPage = () => {
  return (
    <div className="w-full">
      <Directory dirData={DIR_DATA} />
    </div>
  );
};

export default MainPage;
