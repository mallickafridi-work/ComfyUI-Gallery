// store.ts
import { create } from "zustand";

interface FolderNode {
    name: string;
    path: string;
    children: FolderNode[];
    onClick: () => void
}

interface ImageItem {
    name: string;
    url: string;
}

interface AppState {
    path: string;
    tree: FolderNode | null;
    currentFolder: string;
    setPath: (path: string) => void;
    setTree: (tree: FolderNode | null) => void;
    setCurrentFolder: (folder: string) => void;

    images: { name: string, url: string }[];
    selectedImage: ImageItem | null;
    selectedIndex: number | null;
    setSelectedImage: (selectedImage: ImageItem | null, index?: number | null) => void

    getImages: (folderPath: string) => void;
}

export const useAppStore = create<AppState>((set) => ({
    path: "",
    setPath: (path) => set({ path }),

    tree: null,
    setTree: (tree) => set({ tree }),

    images: [],
    selectedImage: null,
    selectedIndex: null,

    setSelectedImage: (selectedImage, index = null) =>
        set({ selectedImage, selectedIndex: index }),

    currentFolder: "",
    setCurrentFolder: (folder) => set({ currentFolder: folder }),

    // unified folder click handler
    getImages: (folderPath) => {
        set({ currentFolder: folderPath, selectedImage: null });
        // trigger mutation here
        fetch("/api/load-images", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ path: folderPath }),
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.images) set({ images: data.images });
            });
    },
}));