import {
  BaseDirectory,
  createDir,
  exists,
  readTextFile,
  writeFile,
} from '@tauri-apps/api/fs';
import Config from '../Types/Config';

const configAppdataPath = 'config.json';
const defaultConfig: Config = { darkMode: true };

export const createConfigPathIfNotExists = async () => {
  if (!(await exists('', { dir: BaseDirectory.AppData }))) {
    await createDir('', { dir: BaseDirectory.AppData, recursive: true });
  }
};

export const saveConfig = async (configData: Config) => {
  await createConfigPathIfNotExists();
  await writeFile(configAppdataPath, JSON.stringify(configData), {
    dir: BaseDirectory.AppData,
  });
};

export const getConfigFile = async (): Promise<Config> => {
  await createConfigPathIfNotExists();

  return (await JSON.parse(
    await readTextFile(configAppdataPath, { dir: BaseDirectory.AppData })
  )) as Config;
};

export const getConfigFileOrCreate = async (): Promise<Config> => {
  if (!(await exists(configAppdataPath, { dir: BaseDirectory.AppData }))) {
    saveConfig(defaultConfig);
  }

  return getConfigFile();
};

export const updateConfig = async (newValues: Partial<Config>) => {
  await saveConfig({ ...config, ...newValues });

  config = await getConfigFileOrCreate();
};

export let config: Config = await getConfigFileOrCreate();
