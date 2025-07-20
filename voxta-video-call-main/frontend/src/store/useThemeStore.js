import { create } from "zustand";

export const useThemeStore = create((set) => ({
  theme: localStorage.getItem("voxta-theme") || "forest",
  setTheme: (theme) => {
    localStorage.setItem("voxta-theme", theme);
    set({ theme });
  },
}));