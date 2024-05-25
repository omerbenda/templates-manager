const TEMPLATES = [
  {
    name: 'template1',
    path: 'test',
  },
  {
    name: 'template2',
    path: 'test',
  },
  {
    name: 'template3',
    path: 'test',
  },
  {
    name: 'template4',
    path: 'test',
  },
];

const Sidebar = () => {
  return (
    <div className="border-r-2 border-neutral-600 w-full h-full overflow-hidden">
      <div className="flex flex-col h-full overflow-y-auto no-scrollbar">
        {TEMPLATES.map((template) => (
          <div
            className="flex flex-col justify-center items-center min-h-16 bg-gray-300 border-b-2 border-gray-400"
            key={template.name}
          >
            {template.name}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
