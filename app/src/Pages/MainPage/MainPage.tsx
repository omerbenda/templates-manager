import { useEffect, useState } from 'react';
import Directory from './Components/Directory/Directory';
import Sidebar from './Components/Sidebar/Sidebar';
import DirectoryData from './Types/DirectoryData';
import Template from './Types/Template';
import { BaseDirectory, FileEntry, readDir } from '@tauri-apps/api/fs';
import { open } from '@tauri-apps/api/dialog';

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
  const [templates, setTemplates] = useState<Template[]>([]);

  const fetchTemplates = async () => {
    const dirs: FileEntry[] = await readDir('', { dir: BaseDirectory.AppData });
    setTemplates(
      dirs.map<Template>((dir) => ({ path: dir.path, name: dir.name || '' }))
    );
  };

  const newTemplateHandler = async () => {
    const selected = await open({ directory: true });

    console.log(selected);
  };

  useEffect(() => {
    fetchTemplates();
  }, []);

  return (
    <div className="flex w-full h-full gap-1">
      <div className="w-44 h-full">
        <Sidebar templates={templates} onNewTemplate={newTemplateHandler} />
      </div>
      <div className="flex-grow">
        <Directory dirData={DIR_DATA} />
      </div>
    </div>
  );
};

export default MainPage;
