// store.ts
import { create } from "zustand";

interface FolderNode {
    name: string;
    path: string;
    children: FolderNode[];
}

interface AppState {
    path: string;
    tree: FolderNode | null;
    images: { name: string, url: string }[];
    currentFolder: string;
    setPath: (path: string) => void;
    setTree: (tree: FolderNode | null) => void;
    setImages: (images: { name: string, url: string }[]) => void;
    setCurrentFolder: (folder: string) => void;
}

export const useAppStore = create<AppState>((set) => ({
    path: "",
    tree: null,
    images: [],
    currentFolder: "",
    setPath: (path) => set({ path }),
    setTree: (tree) => set({ tree }),
    setImages: (images) => set({ images }),
    setCurrentFolder: (folder) => set({ currentFolder: folder }),
}));
