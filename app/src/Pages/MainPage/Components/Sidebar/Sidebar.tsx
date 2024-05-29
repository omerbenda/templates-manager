import Template from '../../Types/Template';
import TemplateButton from './TemplateButton';

type Props = {
  templates: Template[];
};

const Sidebar = ({ templates }: Props) => {
  return (
    <div className="border-r-2 border-neutral-600 w-full h-full overflow-hidden">
      <div className="flex flex-col h-full overflow-y-auto no-scrollbar">
        {templates.map((template) => (
          <TemplateButton template={template} key={template.name} />
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
