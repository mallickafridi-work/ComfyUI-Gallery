import TitleAndFolderWrapper from "./components/TitleAndFolderWrapper"
import NavbarAndGalleryWrapper from "./components/NavbarAndGalleryWrapper"

export function App() {
  return (
    <>
      <div className='grid p-2 grid-cols-[auto_1fr] h-screen w-screen'>
        <TitleAndFolderWrapper />
        <NavbarAndGalleryWrapper />
      </div>
    </>
  )
}

export default App
