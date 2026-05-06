import { Button } from "./ui/button";
import FolderTree from "./FolderTree";
import { useMutation } from "@tanstack/react-query";

const FolderPanel = ({ path, setPath, tree, mutate, currentFolder, setCurrentFolder, setImages }) => {

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

    const stripQuotes = (str: string) => str.replace(/^"(.*)"$/, "$1");

    return (
        <div className="col-start-1 max-w-fit">
            <div
                className="bg-accent row-start-2 row-span-1
                               p-2 grid grid-rows-[auto_1fr]
                               h-full rounded-md ">
                <div className="row-start-1 mb-2 flex gap-2 items-center">
                    <input
                        type="text"
                        value={path}
                        onChange={(e) => {
                            setPath(stripQuotes(e.target.value))
                        }}
                        placeholder="Enter local folder path"
                        className="bg-background max-w-50 border border-ring px-2 py-1 rounded"
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
    )
}

export default FolderPanel