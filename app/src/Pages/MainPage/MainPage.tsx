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
import { updateConfig } from '../../Common/Utilities/ConfigUtilities';
import InfoModal from '../../Common/Components/InfoModal/InfoModal';
import DeleteTemplateModal from './Components/ConfirmModals/DeleteTemplateModal';
import DeleteAllTemplatesModal from './Components/ConfirmModals/DeleteAllTemplatesModal';

const MainPage = () => {
  const [templates, setTemplates] = useState<Template[]>([]);
  const [newTemplateModalOpen, setNewTemplateModalOpen] =
    useState<boolean>(false);
  const [infoModalOpen, setInfoModalOpen] = useState<boolean>(false);
  const [currTemplate, setCurrTemplate] = useState<Template>();
  const [templateToDelete, setTemplateToDelete] = useState<Template>();
  const [isDeleteAllModalOpen, setDeleteAllModalOpen] =
    useState<boolean>(false);
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

  const createNewTemplate = async (
    name: string,
    originPath: string,
    ignoredPathsRegex?: RegExp
  ) => {
    await createTemplate(name, originPath, ignoredPathsRegex);
    setNewTemplateModalOpen(false);
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
      setTemplateToDelete(currTemplate);
    }
  };

  const onTemplateDeleteResponse = (confirmed: boolean) => {
    if (confirmed) {
      deleteTemplateToDelete();
    } else {
      setTemplateToDelete(undefined);
    }
  };

  const deleteTemplateToDelete = async () => {
    if (templateToDelete) {
      await deleteTemplate(templateToDelete);
      await fetchTemplates();
      setCurrTemplate(undefined);
      setTemplateToDelete(undefined);
    }
  };

  const onDeleteAllRequest = () => {
    setDeleteAllModalOpen(true);
  };

  const onDeleteAllResponse = (confirmed: boolean) => {
    if (confirmed) {
      deleteAllTemplates();
    }

    setDeleteAllModalOpen(false);
  };

  const deleteAllTemplates = async () => {
    await Promise.all(templates.map<Promise<void>>(deleteTemplate));

    await fetchTemplates();
    setCurrTemplate(undefined);
    setTemplateToDelete(undefined);
  };

  const changeDarkMode = () => {
    const newValue = !isDarkMode;

    setDarkMode(newValue);
    updateConfig({ darkMode: newValue });
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
      this should show along version 0.4.0
      <div className="border-r-2 border-neutral-900 min-w-20 w-44 h-full overflow-hidden resize-x">
        <Sidebar
          templates={templates}
          selectedTemplate={currTemplate}
          onTemplateSelected={setCurrTemplate}
          onNewTemplate={() => setNewTemplateModalOpen(true)}
        />
      </div>
      <div className="flex flex-col flex-grow h-full">
        <div className="border-b-2 border-neutral-900">
          <ActionsRow
            onTemplateApply={onApplyAction}
            onTemplateDelete={deleteCurrTemplate}
            onDarkMode={changeDarkMode}
            onOpenInfo={() => setInfoModalOpen(true)}
            onDeleteAll={onDeleteAllRequest}
            canDeleteAll={templates.length > 0}
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
              font-bold text-center
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
      <InfoModal
        open={infoModalOpen}
        closeHandler={() => setInfoModalOpen(false)}
      />
      <DeleteTemplateModal
        open={Boolean(templateToDelete)}
        closeHandler={() => {
          setTemplateToDelete(undefined);
        }}
        onResponse={onTemplateDeleteResponse}
      />
      <DeleteAllTemplatesModal
        open={isDeleteAllModalOpen}
        closeHandler={() => {
          setDeleteAllModalOpen(false);
        }}
        onResponse={onDeleteAllResponse}
        templatesCount={templates.length}
      />
    </div>
  );
};

export default MainPage;
