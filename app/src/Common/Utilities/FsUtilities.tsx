import { path } from '@tauri-apps/api';
import { FileEntry, readDir, createDir, copyFile } from '@tauri-apps/api/fs';

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
