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
    images: { name: string, url: string }[];
    currentFolder: string;
    setPath: (path: string) => void;
    setTree: (tree: FolderNode | null) => void;
    setImages: (images: { name: string, url: string }[]) => void;
    setCurrentFolder: (folder: string) => void;
    getImages: (folderPath: string) => void;
    selectedImage: ImageItem | null
    setSelectedImage: (selectedImage: ImageItem | null) => void
}

export const useAppStore = create<AppState>((set) => ({
    path: "",
    setPath: (path) => set({ path }),

    tree: null,
    setTree: (tree) => set({ tree }),

    images: [],
    setImages: (images) => set({ images }),

    currentFolder: "",
    setCurrentFolder: (folder) => set({ currentFolder: folder }),

    selectedImage: null,
    setSelectedImage: (selectedImage) => set({ selectedImage }),

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
