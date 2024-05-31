import { useEffect, useState } from 'react';
import Directory from './Components/Directory/Directory';
import Sidebar from './Components/Sidebar/Sidebar';
import DirectoryData from './Types/DirectoryData';
import Template from './Types/Template';
import { BaseDirectory, FileEntry, readDir } from '@tauri-apps/api/fs';
import NewTemplateModal from './Components/NewTemplateModal/NewTemplateModal';

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
  const [newTemplateModalOpen, setNewTemplateModalOpen] =
    useState<boolean>(true);

  const fetchTemplates = async () => {
    const dirs: FileEntry[] = await readDir('', { dir: BaseDirectory.AppData });
    setTemplates(
      dirs.map<Template>((dir) => ({ path: dir.path, name: dir.name || '' }))
    );
  };

  useEffect(() => {
    fetchTemplates();
  }, []);

  return (
    <div className="flex w-full h-full gap-1">
      <div className="w-44 h-full">
        <Sidebar
          templates={templates}
          onNewTemplate={() => setNewTemplateModalOpen(true)}
        />
      </div>
      <div className="flex-grow">
        <Directory dirData={DIR_DATA} />
      </div>
      <NewTemplateModal
        open={newTemplateModalOpen}
        closeHandler={() => setNewTemplateModalOpen(false)}
      />
    </div>
  );
};

export default MainPage;
