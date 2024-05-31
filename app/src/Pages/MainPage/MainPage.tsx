import { useEffect, useState } from 'react';
import Sidebar from './Components/Sidebar/Sidebar';
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
import { path } from '@tauri-apps/api';
import TemplateViewer from './Components/TemplateViewer/TemplateViewer';

const MainPage = () => {
  const [templates, setTemplates] = useState<Template[]>([]);
  const [newTemplateModalOpen, setNewTemplateModalOpen] =
    useState<boolean>(false);
  const [currTemplate, setCurrTemplate] = useState<Template>();

  const fetchTemplates = async () => {
    if (await exists('', { dir: BaseDirectory.AppData })) {
      const dirs: FileEntry[] = await readDir('', {
        dir: BaseDirectory.AppData,
      });
      setTemplates(
        dirs.map<Template>((dir) => ({ path: dir.path, name: dir.name || '' }))
      );
    }
  };

  const createTemplate = async (name: string, originPath: string) => {
    if (!(await exists('', { dir: BaseDirectory.AppData }))) {
      await createDir('', { dir: BaseDirectory.AppData, recursive: true });
    }

    await createDir(name, { dir: BaseDirectory.AppData });
    await copyFromPath(
      originPath,
      await path.join(await path.appDataDir(), name)
    );

    fetchTemplates();
    setNewTemplateModalOpen(false);
  };

  const copyFromPath = async (origin: string, destination: string) => {
    const contents: FileEntry[] = await readDir(origin);

    contents.forEach(async (entry: FileEntry) => {
      if (entry.name) {
        const newPath = await path.join(destination, entry.name);

        if (entry.children) {
          await createDir(newPath);
          await copyFromPath(entry.path, newPath);
        } else {
          await copyFile(entry.path, newPath);
        }
      }
    });
  };

  useEffect(() => {
    fetchTemplates();
  }, []);

  return (
    <div className="flex w-full h-full gap-1">
      <div className="w-44 h-full">
        <Sidebar
          templates={templates}
          onTemplateSelected={setCurrTemplate}
          onNewTemplate={() => setNewTemplateModalOpen(true)}
        />
      </div>
      <div className="flex-grow">
        <TemplateViewer template={currTemplate} />
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
