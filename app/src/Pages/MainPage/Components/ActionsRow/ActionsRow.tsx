import { IoIosMoon, IoIosSunny } from 'react-icons/io';
import DropdownMenu from '../../../../Common/Components/DropdownMenu/DropdownMenu';
import ActionButton from './ActionButton';

type Props = {
  onTemplateApply: () => void;
  onTemplateDelete: () => void;
  onDarkMode: () => void;
  disableTemplateButtons: boolean;
  isDarkMode: boolean;
};

const ActionsRow = ({
  onTemplateApply,
  onTemplateDelete,
  onDarkMode,
  disableTemplateButtons,
  isDarkMode,
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
        <DropdownMenu menuButton={<ActionButton>Settings</ActionButton>}>
          <div className="flex flex-col">
            <ActionButton onClick={onDarkMode} className="flex justify-center">
              {isDarkMode ? <IoIosMoon /> : <IoIosSunny />}
            </ActionButton>
          </div>
        </DropdownMenu>
      </div>
    </div>
  );
};

export default ActionsRow;
