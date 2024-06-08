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
    <div className="w-full h-full overflow-hidden">
      <div className="flex flex-col h-full overflow-y-auto no-scrollbar">
        <SidebarButton onClick={onNewTemplate}>
          <IoIosAddCircleOutline className="text-4xl" />
        </SidebarButton>
        {templates.map((template: Template) => (
          <SidebarButton
            onClick={() => onTemplateSelected(template)}
            className={`${
              selectedTemplate?.name === template.name &&
              'bg-neutral-400 dark:bg-indigo-800'
            }`}
            key={template.name}
          >
            {template.name}
          </SidebarButton>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
