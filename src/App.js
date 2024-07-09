import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom" 
import { ToastContainer, Slide } from "react-toastify" 
import 'react-toastify/dist/ReactToastify.css' 
import PlayPage from "./pages/play/PlayPage"
import GamePage from "./pages/game/GamePage"
import FinishPage from "./pages/finish/FinishPage"
import WelcomePage from "./pages/welcome/WelcomePage"

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
