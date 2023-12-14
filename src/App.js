import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Game from './pages/Game';
import Home from './pages/Home';

const App = () => {

  return (
        <BrowserRouter>
            <Routes>
              <Route path="/" element={<Home />} /> 
              <Route path="/home" element={<Home />} /> 
              <Route path="/game" element={<Game />} />
              /* <Route path="/*" element={<Home />} />
            </Routes>
        </BrowserRouter>
  )
}


export default App;
