import { IoIosAddCircleOutline } from 'react-icons/io';
import Template from '../../Types/Template';
import SidebarButton from './SidebarButton';

type Props = {
  templates: Template[];
  onTemplateSelected: (template: Template) => void;
  onNewTemplate: () => void;
};

const Sidebar = ({ templates, onTemplateSelected, onNewTemplate }: Props) => {
  return (
    <div className="border-r-2 border-neutral-600 w-full h-full overflow-hidden">
      <div className="flex flex-col h-full overflow-y-auto no-scrollbar">
        <SidebarButton buttonProps={{ onClick: onNewTemplate }}>
          <IoIosAddCircleOutline className="text-4xl" />
        </SidebarButton>
        {templates.map((template: Template) => (
          <SidebarButton
            buttonProps={{ onClick: () => onTemplateSelected(template) }}
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
