import { create } from 'zustand';

interface GeneralState {
  isDarkMode: boolean;
  setDarkMode: (value: boolean) => void;
}

const useGeneralStore = create<GeneralState>((set) => ({
  isDarkMode: true,
  setDarkMode: (value: boolean) => set((_state) => ({ isDarkMode: value })),
}));

export default useGeneralStore;
