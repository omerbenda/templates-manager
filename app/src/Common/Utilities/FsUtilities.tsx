import { path } from '@tauri-apps/api';
import {
  FileEntry,
  readDir,
  createDir,
  copyFile,
  removeDir,
  BaseDirectory,
  exists,
} from '@tauri-apps/api/fs';
import Template from '../../Pages/MainPage/Types/Template';

export const templatesAppdataPath = '';

export const readTemplates = async (): Promise<FileEntry[]> => {
  if (!(await exists(templatesAppdataPath, { dir: BaseDirectory.AppData }))) {
    //create

    return [];
  }

  return readDir(templatesAppdataPath, {
    dir: BaseDirectory.AppData,
  });
};

export const createTemplate = async (name: string, originPath: string) => {
  if (!(await exists(templatesAppdataPath, { dir: BaseDirectory.AppData }))) {
    // create
  }

  await createDir(name, { dir: BaseDirectory.AppData });
  await copyFromPath(
    originPath,
    await path.join(await path.appDataDir(), name)
  );
};

export const copyFromPath = async (origin: string, destination: string) => {
  const contents: FileEntry[] = await readDir(origin);

  contents.forEach(async (entry: FileEntry) => {
    if (entry.name) {
      const newPath = await path.join(destination, entry.name);

      if (entry.children) {
        await createDir(newPath);
        await copyFromPath(entry.path, newPath);
      } else {
        await copyFile(entry.path, newPath);
      }
    }
  });
};

export const deleteTemplate = async (template: Template) => {
  await removeDir(template.name, {
    dir: BaseDirectory.AppData,
    recursive: true,
  });
};
