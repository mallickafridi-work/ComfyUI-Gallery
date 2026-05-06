const GalleryContainer = ({ images }) => {

    return (
        <div className="bg-accent col-start-2 rounded-md overflow-y-auto">
            <div className="h-full overflow-y-auto p-2">
                <div className="columns-2 sm:columns-4 lg:columns-5 gap-2">
                    {images.map((img) => (
                        <div
                            key={img.name}
                            className="mb-4 p-2 rounded-xs hover:bg-blue-200 dark:hover:text-black flex flex-col justify-center items-center text-center break-inside-avoid"
                        >
                            <img
                                src={img.url}
                                alt={img.name}
                                className="hover:opacity-90 transition object-cover object-center"
                            />
                            <p className="mt-2 px-2">{img.name}</p>
                        </div>
                    ))}
                </div>

            </div>
        </div>
    )
}

export default GalleryContainer