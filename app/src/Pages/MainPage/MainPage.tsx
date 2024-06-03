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
  removeDir,
} from '@tauri-apps/api/fs';
import NewTemplateModal from './Components/NewTemplateModal/NewTemplateModal';
import { path } from '@tauri-apps/api';
import TemplateViewer from './Components/TemplateViewer/TemplateViewer';
import ActionsRow from './Components/ActionsRow/ActionsRow';

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

  const deleteTemplate = async () => {
    if (currTemplate) {
      await removeDir(currTemplate.name, {
        dir: BaseDirectory.AppData,
        recursive: true,
      });
      await fetchTemplates();
      setCurrTemplate(undefined);
    }
  };

  useEffect(() => {
    fetchTemplates();
  }, []);

  return (
    <div className="flex overflow-hidden w-full h-full">
      <div className="border-r-2 border-neutral-600 w-44 min-w-44 h-full">
        <Sidebar
          templates={templates}
          onTemplateSelected={setCurrTemplate}
          onNewTemplate={() => setNewTemplateModalOpen(true)}
        />
      </div>
      <div className="flex flex-col flex-grow h-full">
        {currTemplate ? (
          <>
            <div className="h-4/5">
              <TemplateViewer template={currTemplate} />
            </div>
            <div className="border-t-2 border-neutral-600 h-1/5">
              <ActionsRow onTemplateDelete={deleteTemplate} />
            </div>
          </>
        ) : (
          <div
            className="
              flex justify-center items-center
              text-gray-400 font-bold
              select-none 
              w-full h-full
            "
          >
            Please select or create a template
          </div>
        )}
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
