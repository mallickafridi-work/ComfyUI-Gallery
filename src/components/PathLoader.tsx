import { useState, useEffect } from "react";
import { useMutation } from "@tanstack/react-query";
import { Button } from "./ui/button";
import FolderTree from "./FolderTree";
import GalleryContainer from "./GalleryContainer";

interface FolderNode {
    name: string;
    path: string;
    children: FolderNode[];
}

const PathLoader = () => {

    const [path, setPath] = useState("");
    const [tree, setTree] = useState<FolderNode | null>(null);
    const [images, setImages] = useState<string[]>([]);
    const [currentFolder, setCurrentFolder] = useState("");

    // Load saved path from localStorage on mount
    useEffect(() => {
        const savedPath = localStorage.getItem("localPath");
        if (savedPath) {
            setPath(savedPath);
            // auto-load if path exists
            mutate(savedPath);
        }
    }, []);

    useEffect(() => {
        if (tree) {
            console.log("Tree object in state:", tree);
        }
    }, [tree]);

    // Mutation to send path to backend
    const { mutate } = useMutation({
        mutationFn: async (localPath: string) => {
            const res = await fetch("/api/load-path", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ path: localPath }),
            });
            return res.json();
        },
        onSuccess: (data) => {
            console.log("Backend response:", data);
            if (data.tree) setTree(data.tree); // 👈 only store the folder tree object
        },
    });

    const loadImagesMutation = useMutation({
        mutationFn: async (folderPath: string) => {
            const res = await fetch("/api/load-images", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ path: folderPath }),
            });
            return res.json();
        },
        onSuccess: (data) => {
            if (data.images) setImages(data.images);
        },
    });

    const handleLoad = () => {
        if (!path) return;
        localStorage.setItem("localPath", path);
        mutate(path);
    };

    const handleFolderClick = (folderPath: string) => {
        setCurrentFolder(folderPath);
        loadImagesMutation.mutate(folderPath);
    };

    return (
        <div className="min-h-0">
            <div className="grid grid-cols-[auto_1fr] gap-2 px-2 pb-2 h-full w-full">
                <div className="col-start-1 max-w-fit">
                    <div
                        className="bg-chart-4 row-start-2 row-span-1
                               p-2 grid grid-rows-[auto_1fr]
                               h-full border-2 rounded-md ">
                        <div className="row-start-1 mb-2 flex gap-2 items-center">
                            <input
                                type="text"
                                value={path}
                                onChange={(e) => setPath(e.target.value)}
                                placeholder="Enter local folder path"
                                className="bg-background dark:bg-black dark:text-white max-w-50 border px-2 py-1 rounded"
                            />
                            <Button
                                onClick={handleLoad}
                                className="px-3 py-1 rounded"
                            >
                                Load
                            </Button>
                        </div>
                        <div className="row-start-2">
                            {tree && (
                                <FolderTree
                                    node={tree}
                                    onClick={handleFolderClick}
                                    currentFolder={currentFolder}
                                />
                            )}
                        </div>
                    </div>
                </div>
                <GalleryContainer images={images} />
            </div>
        </div>
    )
}

export default PathLoader