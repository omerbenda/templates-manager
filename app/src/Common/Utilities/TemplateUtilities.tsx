import { path } from '@tauri-apps/api';
import {
  createDir,
  BaseDirectory,
  exists,
  FileEntry,
  readDir,
  removeDir,
} from '@tauri-apps/api/fs';
import Template from '../../Pages/MainPage/Types/Template';
import { copyFromPath } from './FsUtilities';

export const templatesAppdataPath = 'templates';

export const createTemplatesDirectory = async () => {
  await createDir(templatesAppdataPath, {
    dir: BaseDirectory.AppData,
    recursive: true,
  });
};

export const doesTemplatesDirectoryExists = async () => {
  return await exists(templatesAppdataPath, { dir: BaseDirectory.AppData });
};

export const readTemplates = async (): Promise<FileEntry[]> => {
  if (!(await doesTemplatesDirectoryExists())) {
    await createTemplatesDirectory();

    return [];
  }

  return readDir(templatesAppdataPath, {
    dir: BaseDirectory.AppData,
  });
};

export const readTemplateDir = async (
  template: Template
): Promise<FileEntry[]> => {
  return readDir(await path.join(templatesAppdataPath, template.name), {
    dir: BaseDirectory.AppData,
    recursive: true,
  });
};

export const createTemplate = async (name: string, originPath: string) => {
  if (!(await doesTemplatesDirectoryExists())) {
    await createTemplatesDirectory();
  }

  const relativeWritePath = await path.join(templatesAppdataPath, name);

  await createDir(relativeWritePath, { dir: BaseDirectory.AppData });
  await copyFromPath(
    originPath,
    await path.join(await path.appDataDir(), relativeWritePath)
  );
};

export const deleteTemplate = async (template: Template) => {
  await removeDir(template.name, {
    dir: BaseDirectory.AppData,
    recursive: true,
  });
};
