import { Button } from "./ui/button";
import FolderTree from "./FolderTree";
import { useAppStore } from "../store";

const FolderPanel = ({ mutate }: any) => {

    const { path, setPath, tree, getImages } = useAppStore();

    const handleLoad = () => {
        if (!path) return;
        localStorage.setItem("localPath", path);
        mutate(path);

        // also load images for the root folder
        getImages(path);
    };

    const stripQuotes = (str: string) => str.replace(/^"(.*)"$/, "$1");

    return (
        <>
            <div className="row-start-2 max-w-fit">
                <div
                    className="bg-accent row-start-2 row-span-1
                            h-full p-2 rounded-b-md grid grid-rows-[auto_1fr]">
                    <div className="row-start-1 mb-2 flex gap-2 items-center">
                        <input
                            type="text"
                            value={path}
                            onChange={(e) => {
                                setPath(stripQuotes(e.target.value))
                            }}
                            placeholder="Enter local folder path"
                            className="bg-input max-w-50 border border-ring px-2 py-1 rounded"
                        />
                        <Button className="px-3 py-1 rounded" onClick={handleLoad}> Load </Button>
                    </div>
                    <div className="row-start-2">
                        {tree && (
                            <FolderTree />
                        )}
                    </div>
                </div>
            </div>
        </>
    )
}

export default FolderPanel