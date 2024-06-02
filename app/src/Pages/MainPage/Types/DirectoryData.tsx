import FileData from './FileData';

type DirectoryData = {
  name: string;
  subdirs: DirectoryData[];
  files: FileData[];
};

export default DirectoryData;
