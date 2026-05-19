import { useEffect } from "react";
import { useMutation } from "@tanstack/react-query";
import { useAppStore } from "../store";
import FolderPanel from "./FolderPanel";
import Header from "./Header";

const TitleAndFolderWrapper = () => {

    const { setPath, setTree, getImages } = useAppStore();

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

    // Load saved path from localStorage on mount
    useEffect(() => {
        const savedPath = localStorage.getItem("localPath");
        if (savedPath) {
            setPath(savedPath);
            // auto-load if path exists
            mutate(savedPath);
            // also load images for the root folder
            getImages(savedPath);
        }
    }, [mutate, getImages]);

    return (
        <div className="min-h-0">
            <div className="grid grid-rows-[auto_1fr] h-full w-full">
                <Header />
                <FolderPanel mutate={mutate} />
            </div>
        </div>
    )
}

export default TitleAndFolderWrapper