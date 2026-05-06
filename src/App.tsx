import Header from "./components/Header"
import PathLoader from "./components/PathLoader"

export function App() {
  return (
    <>
      <div className='grid grid-rows-[auto_1fr] h-screen w-screen'>
        <Header />
        <PathLoader />
      </div>
    </>
  )
}

export default App
