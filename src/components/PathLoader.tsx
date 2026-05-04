import { useState, useEffect } from "react";
import { useMutation } from "@tanstack/react-query";
import { Button } from "./ui/button";

const PathLoader = () => {

    const [path, setPath] = useState("");
    const [subfolders, setSubfolders] = useState<string[]>([]);
    const [images, setImages] = useState<string[]>([]);

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
            if (data.subfolders) setSubfolders(data.subfolders);
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

    // Load saved path from localStorage on mount
    useEffect(() => {
        const savedPath = localStorage.getItem("localPath");
        if (savedPath) {
            setPath(savedPath);
            // auto-load if path exists
            mutate(savedPath);
        }
    }, []);

    const handleLoad = () => {
        if (!path) return;
        localStorage.setItem("localPath", path);
        mutate(path);
    };

    const handleFolderClick = (folder: string) => {
        const fullPath = `${path}\\${folder}`;
        loadImagesMutation.mutate(fullPath);
    };

    return (
        <div className="min-h-0">
            <div className="grid grid-cols-[auto_1fr] gap-2 px-2 pb-2 h-full w-full">
                <div className="col-start-1 max-w-fit">
                    <div
                        className="row-start-2 row-span-1
                               p-2 grid grid-rows-[auto_1fr]
                               h-full border-2 rounded-md ">
                        <div className="row-start-1 mb-2 flex gap-2 items-center">
                            <input
                                type="text"
                                value={path}
                                onChange={(e) => setPath(e.target.value)}
                                placeholder="Enter local folder path"
                                className="border px-2 py-1 rounded"
                            />
                            <Button
                                onClick={handleLoad}
                                className="px-3 py-1 rounded"
                            >
                                Load
                            </Button>
                        </div>
                        <div className="row-start-2">
                            {subfolders.map((folder, idx) => (
                                <li key={idx}
                                    className="bg-card hover:bg-card/60 list-none border-2 my-1 p-2 rounded"
                                    onClick={() => handleFolderClick(folder)}
                                >
                                    {folder}
                                </li>
                            ))}
                        </div>
                    </div>
                </div>
                <div className="col-start-2 border-2 rounded-md overflow-y-auto">
                    <div className="h-full overflow-y-auto p-2">
                        <div className="columns-2 sm:columns-3 lg:columns-4 gap-4">
                            {images.map(img => (
                                <div
                                    key={img.name}
                                    className="mb-4 p-2 w-full rounded-lg hover:bg-black dark:hover:bg-white flex flex-col justify-center items-center text-center break-inside-avoid"
                                >
                                    <img
                                        src={img.url}
                                        alt={img.name}
                                        className="p-2 hover:opacity-90 transition object-cover object-center"
                                    />
                                    <p className="bg-card px-2 rounded ">{img.name}</p>
                                </div>
                            ))}
                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default PathLoader