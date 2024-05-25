import Template from '../../Types/Template';

type Props = {
  template: Template;
};

const TemplateButton = ({ template }: Props) => {
  return (
    <div
      className="
        flex flex-col
        justify-center items-center
        min-h-16
        cursor-pointer select-none
        duration-300
        border-b-2 border-gray-400
        bg-gray-200 hover:bg-gray-300
      "
    >
      {template.name}
    </div>
  );
};

export default TemplateButton;
