import { useEffect, useState } from 'react';
import Sidebar from './Components/Sidebar/Sidebar';
import Template from './Types/Template';
import NewTemplateModal from './Components/NewTemplateModal/NewTemplateModal';
import TemplateViewer from './Components/TemplateViewer/TemplateViewer';
import ActionsRow from './Components/ActionsRow/ActionsRow';
import { open } from '@tauri-apps/api/dialog';
import useGeneralStore from '../../Stores/GeneralStore';
import {
  readTemplates,
  createTemplate,
  deleteTemplate,
  applyTemplate,
} from '../../Common/Utilities/TemplateUtilities';

const MainPage = () => {
  const [templates, setTemplates] = useState<Template[]>([]);
  const [newTemplateModalOpen, setNewTemplateModalOpen] =
    useState<boolean>(false);
  const [currTemplate, setCurrTemplate] = useState<Template>();
  const isDarkMode = useGeneralStore((state) => state.isDarkMode);
  const setDarkMode = useGeneralStore((state) => state.setDarkMode);

  const fetchTemplates = async () => {
    const dirs = await readTemplates();

    setTemplates(
      dirs.map<Template>((dir) => ({
        path: dir.path,
        name: dir.name || '',
      }))
    );
  };

  const createNewTemplate = async (name: string, originPath: string) => {
    setNewTemplateModalOpen(false);
    await createTemplate(name, originPath);
    fetchTemplates();
  };

  const onApplyAction = async () => {
    if (currTemplate) {
      const destination = (await open({ directory: true, multiple: false })) as
        | string
        | undefined;

      if (destination) {
        applyTemplate(currTemplate, destination);
      }
    }
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
        onCreateTemplate={createNewTemplate}
      />
    </div>
  );
};

export default MainPage;
