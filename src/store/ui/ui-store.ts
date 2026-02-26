import { create } from "zustand";

interface UIStoreState {
  isSidemenuOpen: boolean;
  openSidemenu: () => void;
  closeSidemenu: () => void;
}

export const useUIStore = create<UIStoreState>()((set) => ({
  isSidemenuOpen: false,
  openSidemenu: () => set({ isSidemenuOpen: true }),
  closeSidemenu: () => set({ isSidemenuOpen: false }),
}));
