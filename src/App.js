import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom" 
import { ToastContainer, Slide } from "react-toastify" 
import 'react-toastify/dist/ReactToastify.css' 
import PlayPage from "./pages/PlayPage"
import GamePage from "./pages/GamePage"

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/play" element={<PlayPage />} />
        <Route path="/game" element={<GamePage />} />
        <Route path="*" element={<Navigate to="/play" replace />} />
      </Routes>
      <ToastContainer position="top-right" transition={Slide} />
    </BrowserRouter>
  ) 
} 

export default App 
