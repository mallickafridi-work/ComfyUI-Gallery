import { useAppStore } from "../store";
import ImageInspector from "./ImageInspector";

const ImageGridWrapper = () => {

    const { images, setSelectedImage } = useAppStore();

    const openImage = (img: { name: string, url: string }) => {
        setSelectedImage(img);
    };


    return (
        <>
            <ImageInspector />
            <div className="row-start-2  z-0 h-full bg-accent rounded-b-md overflow-y-auto">
                <div className="h-full overflow-y-auto p-2">
                    <div className="columns-2 sm:columns-4 lg:columns-5 gap-2">
                        {images.map((img) => (
                            <div
                                key={img.name}
                                className="mb-4 p-2 rounded-xs hover:bg-gray-400 dark:hover:bg-blue-200 dark:hover:text-black
                                           flex flex-col justify-center items-center text-center break-inside-avoid"
                            >
                                <img
                                    src={img.url}
                                    alt={img.name}
                                    className="hover:opacity-90 transition object-cover object-center"
                                    onClick={() => openImage(img)}
                                />
                                <p className="mt-2 px-2">{img.name}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    )
}

export default ImageGridWrapper