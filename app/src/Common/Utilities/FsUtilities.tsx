import { path } from '@tauri-apps/api';
import { FileEntry, readDir, createDir, copyFile } from '@tauri-apps/api/fs';
import DirectoryData from '../../Pages/MainPage/Types/DirectoryData';

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

export const parseEntryToDir = (entry: FileEntry): DirectoryData => {
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
