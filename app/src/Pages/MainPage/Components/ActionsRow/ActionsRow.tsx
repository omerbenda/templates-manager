import ActionButton from './ActionButton';

type Props = {
  onTemplateApply: () => void;
  onTemplateDelete: () => void;
  onDarkMode: () => void;
};

const ActionsRow = ({
  onTemplateApply,
  onTemplateDelete,
  onDarkMode,
}: Props) => {
  return (
    <div className="w-full h-full">
      <div className="flex justify-evenly items-center w-full h-full">
        <ActionButton onClick={onTemplateDelete}>Delete</ActionButton>
        <ActionButton onClick={onTemplateApply}>Apply</ActionButton>
        <ActionButton onClick={onDarkMode}>Dark Mode</ActionButton>
      </div>
    </div>
  );
};

export default ActionsRow;
