import CurrentPathInfo from "./CurrentPathInfo";
import ImageGridWrapper from "./ImageGridWrapper";

const NavbarAndGalleryWrapper = () => {

    return (
        <div className="relative ml-2 col-start-2 grid grid-rows-[auto_1fr] gap-y-2">
            <CurrentPathInfo />
            <div className="">
                <ImageGridWrapper />
            </div>
        </div>
    )
}

export default NavbarAndGalleryWrapper