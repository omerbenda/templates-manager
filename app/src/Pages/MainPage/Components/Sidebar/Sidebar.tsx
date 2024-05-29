import { IoIosAddCircleOutline } from 'react-icons/io';
import Template from '../../Types/Template';
import SidebarButton from './SidebarButton';

type Props = {
  templates: Template[];
};

const Sidebar = ({ templates }: Props) => {
  return (
    <div className="border-r-2 border-neutral-600 w-full h-full overflow-hidden">
      <div className="flex flex-col h-full overflow-y-auto no-scrollbar">
        <SidebarButton onClick={console.log}>
          <IoIosAddCircleOutline fontSize={32} />
        </SidebarButton>
        {templates.map((template) => (
          <SidebarButton key={template.name}>{template.name}</SidebarButton>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
