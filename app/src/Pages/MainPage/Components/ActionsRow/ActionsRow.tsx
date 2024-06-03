import ActionButton from './ActionButton';

const ActionsRow = () => {
  return (
    <div className="w-full h-full">
      <div className="flex justify-evenly items-center w-full h-full">
        <ActionButton>Delete</ActionButton>
        <ActionButton>Apply</ActionButton>
      </div>
    </div>
  );
};

export default ActionsRow;
