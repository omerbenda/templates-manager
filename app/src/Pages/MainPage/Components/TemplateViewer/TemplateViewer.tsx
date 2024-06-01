import { useEffect, useState } from 'react';
import Template from '../../Types/Template';
import Directory from '../Directory/Directory';
import DirectoryData from '../../Types/DirectoryData';
import { BaseDirectory, FileEntry, readDir } from '@tauri-apps/api/fs';
import FileData from '../../Types/FileData';

const parseEntryToDir = (entry: FileEntry): DirectoryData => {
  if (!entry.name) {
    throw Error('Invalid entry name');
  } else if (!entry.children) {
    throw Error('Entry is not a directory');
  }

  return {
    name: entry.name,
    subdirs: entry.children
      .filter((childEntry: FileEntry) => childEntry.children)
      .map(parseEntryToDir),
    files: entry.children
      .filter((childEntry: FileEntry) => !childEntry.children)
      .map((entry: FileEntry) => ({ name: entry.name || '' })),
  };
};

const getDirFromTemplate = async (
  template: Template
): Promise<DirectoryData> => {
  const contents: FileEntry[] = await readDir(template.name, {
    dir: BaseDirectory.AppData,
    recursive: true,
  });

  return {
    name: template.name,
    subdirs: contents
      .filter((entry: FileEntry) => entry.children)
      .map<DirectoryData>(parseEntryToDir),
    files: contents
      .filter((entry: FileEntry) => !entry.children)
      .map<FileData>((entry: FileEntry) => ({ name: entry.name || '' })),
  };
};

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
