import { IoIosAddCircleOutline } from 'react-icons/io';
import Template from '../../Types/Template';
import SidebarButton from './SidebarButton';

type Props = {
  templates: Template[];
  selectedTemplate?: Template;
  onTemplateSelected: (template: Template) => void;
  onNewTemplate: () => void;
};

const Sidebar = ({
  templates,
  selectedTemplate,
  onTemplateSelected,
  onNewTemplate,
}: Props) => {
  return (
    <div className="flex flex-col w-full h-full overflow-hidden">
      <SidebarButton onClick={onNewTemplate}>
        <IoIosAddCircleOutline className="text-4xl" />
      </SidebarButton>
      <div className="flex flex-col overflow-x-hidden overflow-y-auto no-scrollbar">
        {templates.map((template: Template) => (
          <SidebarButton
            onClick={() => onTemplateSelected(template)}
            className={`${
              selectedTemplate?.name === template.name &&
              'text-lg font-bold underline underline-offset-2'
            }`}
            key={template.name}
          >
            <div className="w-full overflow-hidden text-ellipsis">
              {template.name}
            </div>
          </SidebarButton>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
