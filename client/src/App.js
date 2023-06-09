//!libraries

import './css/index.css';
import { Route, Routes } from "react-router-dom";
import Home from './components/pages/Home/Home';
import Register from './components/pages/Register/Register';
import HomeLoging from './components/pages/HomeLoging/HomeLoging';
import Box from './components/pages/Box/Box';
import Cards from './components/pages/Cards/Cards';
import Trainer from './components/pages/Trainer/Trainer';

//!components



function App() {
  
  return (
    <div className="App">
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/:gametag" element={<Home />} />
        <Route exact path="/:gametag/home" element={<HomeLoging/>} />
        <Route exact path="/register/trainer" element={<Register/>} />
        <Route exact path="/:gametag/box" element={<Box/>} />
        <Route exact path="/:gametag/cards" element={<Cards/>} />
        <Route exact path="/:gametag/travel" element={<Cards/>} />
        <Route exact path="/:gametag/trainer" element={<Trainer/>} />
      </Routes>


    </div>
  );
}

export default App;
