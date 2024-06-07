import ActionButton from './ActionButton';

type Props = {
  onTemplateApply: () => void;
  onTemplateDelete: () => void;
  onDarkMode: () => void;
  disableTemplateButtons: boolean;
};

const ActionsRow = ({
  onTemplateApply,
  onTemplateDelete,
  onDarkMode,
  disableTemplateButtons,
}: Props) => {
  return (
    <div className="w-full h-full">
      <div className="flex justify-end items-center w-full h-full">
        <ActionButton
          disabled={disableTemplateButtons}
          onClick={onTemplateDelete}
        >
          Delete
        </ActionButton>
        <ActionButton
          disabled={disableTemplateButtons}
          onClick={onTemplateApply}
        >
          Apply
        </ActionButton>
        <ActionButton onClick={onDarkMode}>Dark Mode</ActionButton>
      </div>
    </div>
  );
};

export default ActionsRow;
