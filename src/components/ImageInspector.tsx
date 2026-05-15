import { useAppStore } from "../store";
import { X } from "lucide-react";
import { Button } from "./ui/button";

const ImageInspector = () => {

    const { selectedImage, setSelectedImage } = useAppStore();

    const closeImage = () => {
        setSelectedImage(null);
    };
    return (
        <>
            {selectedImage && (
                <div className="p-6 row-start-2 absolute z-10 grid grid-cols-[1fr_1fr] gap-2 w-full h-full bg-accent rounded-b-md">
                    {/* Left half */}
                    <div className="p-6 border-2 border-black rounded-sm flex items-center justify-center overflow-hidden touch-pan-y">
                        <img
                            src={selectedImage.url}
                            alt={selectedImage.name}
                            className="max-h-[70vh] max-w-full object-contain touch-pinch-zoom"
                        />
                    </div>

                    {/* Right half */}
                    <div className="border-2 border-black rounded-sm flex items-center justify-center">
                        metadata
                    </div>

                    {/* Close button */}
                    <div className="absolute top-2 right-2">
                        <Button
                            onClick={closeImage}
                            className="rounded-sm w-8 h-8 cursor-pointer hover:scale-110"
                        >
                            <X className="size-6" />
                        </Button>
                    </div>
                </div>
            )}
        </>
    )
}

export default ImageInspector