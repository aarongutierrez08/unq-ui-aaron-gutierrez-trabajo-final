import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom" 
import { ToastContainer, Slide } from "react-toastify" 
import 'react-toastify/dist/ReactToastify.css' 
import PlayPage from "./pages/PlayPage"
import GamePage from "./pages/GamePage"
import FinishPage from "./pages/FinishPage"
import WelcomePage from "./pages/WelcomePage"

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/welcome" element={<WelcomePage />} />
        <Route path="/play" element={<PlayPage />} />
        <Route path="/game" element={<GamePage />} />
        <Route path="/finish" element={<FinishPage />} />
        <Route path="*" element={<Navigate to="/welcome" replace />} />
      </Routes>
      <ToastContainer position="top-right" transition={Slide} />
    </BrowserRouter>
  ) 
} 

export default App 
