import ActionButton from './ActionButton';

type Props = {
  onTemplateDelete: () => void;
};

const ActionsRow = ({ onTemplateDelete }: Props) => {
  return (
    <div className="w-full h-full">
      <div className="flex justify-evenly items-center w-full h-full">
        <ActionButton onClick={onTemplateDelete}>Delete</ActionButton>
        <ActionButton>Apply</ActionButton>
      </div>
    </div>
  );
};

export default ActionsRow;
