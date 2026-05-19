import { useAppStore } from "../store";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { Button } from "./ui/button";

const ImageInspector = () => {

    const { selectedImage, setSelectedImage } = useAppStore();

    const closeWindow = () => {
        setSelectedImage(null);
    };
    return (
        <>
            {selectedImage && (
                <div className="row-start-2 absolute z-10 grid grid-cols-[60%_1fr] w-full h-full bg-accent rounded-b-md">
                    {/* Left half */}
                    <div className="relative py-8 flex flex-col items-center justify-center">
                        <p className="absolute top-1">{selectedImage.name}</p>
                        <div className="relative px-10 flex flex-col items-center justify-center content-center w-full h-full border-black p-2 group">
                            <img
                                src={selectedImage.url}
                                alt={selectedImage.name}
                                className="max-h-[70vh] max-w-full object-contain"
                            />
                            {/* Left button */}
                            <Button
                                className="absolute left-1 w-8 h-10 rounded-full opacity-0 transition-opacity duration-400 delay-500 group-hover:opacity-100"
                            >
                                <ChevronLeft className="size-6" />
                            </Button>

                            {/* Right button */}
                            <Button
                                className="absolute right-1 w-8 h-10 rounded-full opacity-0 transition-opacity duration-400 delay-500 group-hover:opacity-100"
                            >
                                <ChevronRight className="size-6" />
                            </Button>
                        </div>
                    </div>


                    {/* Right half */}
                    <div className="py-2 pr-2 content-center">
                        <div className="border border-black h-full flex items-center justify-center">
                            metadata
                        </div>
                    </div>

                    {/* Close button */}
                    <div className="absolute top-3 right-3">
                        <Button
                            onClick={closeWindow}
                            className="bg-red-600 rounded-sm w-7 h-7 cursor-pointer hover:scale-110"
                        >
                            <X className="size-5" />
                        </Button>
                    </div>
                </div>
            )}
        </>
    )
}

export default ImageInspector