import { IoIosAddCircleOutline } from 'react-icons/io';
import Template from '../../Types/Template';
import SidebarButton from './SidebarButton';
import TextInput from '../../../../Common/Components/TextInput/TextInput';
import { useState } from 'react';

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
  const [templateFilter, setTemplateFilter] = useState<string>('');

  return (
    <div className="flex flex-col w-full h-full overflow-hidden">
      <SidebarButton onClick={onNewTemplate}>
        <IoIosAddCircleOutline className="text-4xl" />
      </SidebarButton>
      <div className="h-8 border-b-2 border-b-black">
        <TextInput
          value={templateFilter}
          onChange={(e) => setTemplateFilter(e.target.value)}
          placeholder="Search"
          className="border-none rounded-none h-full"
        />
      </div>
      <div className="flex flex-col overflow-x-hidden overflow-y-auto no-scrollbar">
        {templates
          .filter((template: Template) =>
            template.name.toLowerCase().includes(templateFilter.toLowerCase())
          )
          .map((template: Template) => (
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
