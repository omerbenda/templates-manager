import { useEffect, useState } from 'react';
import Directory from './Components/Directory/Directory';
import Sidebar from './Components/Sidebar/Sidebar';
import DirectoryData from './Types/DirectoryData';
import Template from './Types/Template';
import {
  BaseDirectory,
  copyFile,
  createDir,
  exists,
  FileEntry,
  readDir,
} from '@tauri-apps/api/fs';
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
    if (!exists('', { dir: BaseDirectory.AppData })) {
      const dirs: FileEntry[] = await readDir('', {
        dir: BaseDirectory.AppData,
      });
      setTemplates(
        dirs.map<Template>((dir) => ({ path: dir.path, name: dir.name || '' }))
      );
    }
  };

  const createTemplate = async (name: string, path: string) => {
    const dirs = await readDir(path, { recursive: true });

    if (!(await exists('', { dir: BaseDirectory.AppData }))) {
      await createDir('', { dir: BaseDirectory.AppData, recursive: true });
    }

    await createDir(name, { dir: BaseDirectory.AppData });

    setNewTemplateModalOpen(false);
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
        onCreateTemplate={createTemplate}
      />
    </div>
  );
};

export default MainPage;
