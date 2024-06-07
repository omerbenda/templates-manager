import { useEffect, useState } from 'react';
import Template from '../../Types/Template';
import Directory from '../Directory/Directory';
import DirectoryData from '../../Types/DirectoryData';
import { getDirFromTemplate } from '../../../../Common/Utilities/TemplateUtilities';

type Props = {
  template?: Template;
};

const TemplateViewer = ({ template }: Props) => {
  const [dirData, setDirData] = useState<DirectoryData>();

  const updateDirData = async () => {
    if (template) {
      setDirData(await getDirFromTemplate(template));
    }
  };

  useEffect(() => {
    updateDirData();
  }, [template]);

  return (
    <div className="overflow-hidden w-full h-full">
      <div className="overflow-auto w-full h-full pb-2">
        {dirData && <Directory dirData={dirData} />}
      </div>
    </div>
  );
};

export default TemplateViewer;
