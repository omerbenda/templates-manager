import { create } from 'zustand';
import { config } from '../Common/Utilities/ConfigUtilities';

interface GeneralState {
  isDarkMode: boolean;
  setDarkMode: (value: boolean) => void;
}

const useGeneralStore = create<GeneralState>((set) => ({
  isDarkMode: Boolean(config.darkMode),
  setDarkMode: (value: boolean) => set((_state) => ({ isDarkMode: value })),
}));

export default useGeneralStore;
