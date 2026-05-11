import CurrentPathInfo from "./CurrentPathInfo";
import ImageGridWrapper from "./ImageGridWrapper";

const GalleryContainer = () => {

    return (
        <div className="col-start-2 grid grid-rows-[auto_1fr] gap-y-1 overflow-y-auto">
            <CurrentPathInfo />
            <ImageGridWrapper />
        </div>
    )
}

export default GalleryContainer