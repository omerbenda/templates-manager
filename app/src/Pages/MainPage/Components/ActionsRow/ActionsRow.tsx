import { IoIosMoon, IoIosSunny } from 'react-icons/io';
import DropdownMenu from '../../../../Common/Components/DropdownMenu/DropdownMenu';
import ActionButton from './ActionButton';

type Props = {
  onTemplateApply: () => void;
  onTemplateDelete: () => void;
  onDarkMode: () => void;
  onOpenInfo: () => void;
  onDeleteAll: () => void;
  disableTemplateButtons: boolean;
  isDarkMode: boolean;
};

const ActionsRow = ({
  onTemplateApply,
  onTemplateDelete,
  onDarkMode,
  onOpenInfo,
  onDeleteAll,
  disableTemplateButtons,
  isDarkMode,
}: Props) => {
  return (
    <div className="w-full h-full">
      <div className="flex items-center w-full h-full">
        <ActionButton
          disabled={disableTemplateButtons}
          onClick={onTemplateApply}
        >
          Apply
        </ActionButton>
        <ActionButton
          disabled={disableTemplateButtons}
          onClick={onTemplateDelete}
        >
          Delete
        </ActionButton>
        <div className="flex-grow" />
        <DropdownMenu
          menuButton={<ActionButton className="px-5">Settings</ActionButton>}
        >
          <div className="flex flex-col">
            <ActionButton onClick={onDarkMode} className="flex justify-center">
              {isDarkMode ? <IoIosMoon /> : <IoIosSunny />}
            </ActionButton>
            <ActionButton
              onClick={onOpenInfo}
              className="text-nowrap text-md text-center"
            >
              Info
            </ActionButton>
            <ActionButton
              onClick={onDeleteAll}
              className="text-nowrap text-md text-center"
            >
              Delete All
            </ActionButton>
          </div>
        </DropdownMenu>
      </div>
    </div>
  );
};

export default ActionsRow;
