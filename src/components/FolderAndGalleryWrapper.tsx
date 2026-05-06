import { useState, useEffect } from "react";
import { useMutation } from "@tanstack/react-query";
import GalleryContainer from "./GalleryContainer";
import FolderPanel from "./FolderPanel";

interface FolderNode {
    name: string;
    path: string;
    children: FolderNode[];
}

const FolderAndGalleryWrapper = () => {

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
            if (data.tree) setTree(data.tree); // 👈 only store the folder tree object
        },
    });

    return (
        <div className="min-h-0">
            <div className="grid grid-cols-[auto_1fr] gap-2 px-2 pb-2 h-full w-full">
                <FolderPanel
                    path={path} setPath={setPath} tree={tree} mutate={mutate}
                    currentFolder={currentFolder} setCurrentFolder={setCurrentFolder}
                    setImages={setImages} />
                <GalleryContainer images={images} />
            </div>
        </div>  
    )
}

export default FolderAndGalleryWrapper