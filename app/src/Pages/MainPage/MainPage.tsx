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
import { open } from '@tauri-apps/api/dialog';
import useGeneralStore from '../../Stores/GeneralStore';

const MainPage = () => {
  const [templates, setTemplates] = useState<Template[]>([]);
  const [newTemplateModalOpen, setNewTemplateModalOpen] =
    useState<boolean>(false);
  const [currTemplate, setCurrTemplate] = useState<Template>();
  const isDarkMode = useGeneralStore((state) => state.isDarkMode);
  const setDarkMode = useGeneralStore((state) => state.setDarkMode);

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

  const onApplyAction = async () => {
    if (currTemplate) {
      const destination = (await open({ directory: true, multiple: false })) as
        | string
        | undefined;

      if (destination) {
        const destinationFolder = await path.join(
          destination,
          currTemplate.name
        );
        await createDir(destinationFolder);
        await copyFromPath(currTemplate.path, destinationFolder);
      }
    }
  };

  const deleteTemplate = async (template: Template) => {
    await removeDir(template.name, {
      dir: BaseDirectory.AppData,
      recursive: true,
    });
  };

  const deleteCurrTemplate = async () => {
    if (currTemplate) {
      await deleteTemplate(currTemplate);
      await fetchTemplates();
      setCurrTemplate(undefined);
    }
  };

  const deleteAllTemplates = async () => {
    await Promise.all(templates.map<Promise<void>>(deleteTemplate));

    await fetchTemplates();
    setCurrTemplate(undefined);
  };

  useEffect(() => {
    fetchTemplates();
  }, []);

  return (
    <div
      className={`
        flex overflow-hidden
        dark:bg-gray-950 dark:text-neutral-300
        w-full h-full
        ${isDarkMode && 'dark'}
      `}
    >
      <div className="border-r-2 border-neutral-900 w-44 min-w-44 h-full">
        <Sidebar
          templates={templates}
          onTemplateSelected={setCurrTemplate}
          onNewTemplate={() => setNewTemplateModalOpen(true)}
        />
      </div>
      <div className="flex flex-col flex-grow h-full">
        <div className="border-b-2 border-neutral-900">
          <ActionsRow
            onTemplateApply={onApplyAction}
            onTemplateDelete={deleteCurrTemplate}
            onDarkMode={() => setDarkMode(!isDarkMode)}
            onDeleteAll={deleteAllTemplates}
            disableTemplateButtons={!currTemplate}
            isDarkMode={isDarkMode}
          />
        </div>
        {currTemplate ? (
          <TemplateViewer template={currTemplate} />
        ) : (
          <div
            className="
              flex justify-center items-center
              font-bold
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
