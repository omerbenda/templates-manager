import Directory from './Components/Directory/Directory';
import Sidebar from './Components/Sidebar/Sidebar';
import DirectoryData from './Types/DirectoryData';

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
    {
      name: 'Dir3',
      subdirs: [],
      files: [
        {
          name: 'File5',
        },
        {
          name: 'File6',
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

const MainPage = () => {
  return (
    <div className="flex w-full h-full gap-1">
      <div className="w-44 h-full">
        <Sidebar />
      </div>
      <div className="flex-grow">
        <Directory dirData={DIR_DATA} />
      </div>
    </div>
  );
};

export default MainPage;
