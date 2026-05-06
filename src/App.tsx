import Header from "./components/Header"
import FolderAndGalleryWrapper from "./components/FolderAndGalleryWrapper"

export function App() {
  return (
    <>
      <div className='grid grid-rows-[auto_1fr] h-screen w-screen'>
        <Header />
        <FolderAndGalleryWrapper />
      </div>
    </>
  )
}

export default App
