import { BrowserRouter, Route, Routes } from "react-router-dom"
import Navbar from "./components/Navbar"
import StoryList from "./pages/StoryList"
import StoryDetails from "./pages/StoryDetails"
import NotFound from "./components/NotFound"

const App = () => {
  return (
    <>  
    <BrowserRouter>
      <Navbar/>
      <Routes>
        <Route path="/"element={<StoryList />}/>
        <Route path="/:id" element={<StoryDetails/>}/>
        <Route path="/*" element={<NotFound/>}/>
      </Routes>
    </BrowserRouter>     
    </>
  )
}

export default App
