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
import { copyFromPath, parseEntryToDir } from './FsUtilities';
import DirectoryData from '../../Pages/MainPage/Types/DirectoryData';
import FileData from '../../Pages/MainPage/Types/FileData';

export const templatesAppdataPath = 'templates';

// #region Exists

export const checkTemplatesDirectoryExists = async (): Promise<boolean> => {
  return await exists(templatesAppdataPath, { dir: BaseDirectory.AppData });
};

export const checkTemplateExists = async (
  templateName: string
): Promise<Boolean> => {
  return exists(await path.join(templatesAppdataPath, templateName), {
    dir: BaseDirectory.AppData,
  });
};

// #endregion

// #region Create

export const createTemplatesDirectory = async () => {
  await createDir(templatesAppdataPath, {
    dir: BaseDirectory.AppData,
    recursive: true,
  });
};

export const createTemplate = async (
  name: string,
  originPath: string,
  ignoredFilesRegex?: RegExp
) => {
  if (!(await checkTemplatesDirectoryExists())) {
    await createTemplatesDirectory();
  }

  const relativeWritePath = await path.join(templatesAppdataPath, name);

  await createDir(relativeWritePath, { dir: BaseDirectory.AppData });
  await copyFromPath(
    originPath,
    await path.join(await path.appDataDir(), relativeWritePath),
    ignoredFilesRegex
  );
};

// #endregion

// #region Read

export const readTemplates = async (): Promise<FileEntry[]> => {
  if (!(await checkTemplatesDirectoryExists())) {
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

export const getDirFromTemplate = async (
  template: Template
): Promise<DirectoryData> => {
  const contents: FileEntry[] = await readTemplateDir(template);

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

export const applyTemplate = async (tempate: Template, dir: string) => {
  const destinationFolder = await path.join(dir, tempate.name);
  await createDir(destinationFolder, { recursive: true });
  await copyFromPath(tempate.path, destinationFolder);
};

// #endregion

// #region Delete

export const deleteTemplate = async (template: Template) => {
  await removeDir(await path.join(templatesAppdataPath, template.name), {
    dir: BaseDirectory.AppData,
    recursive: true,
  });
};

// #endregion
