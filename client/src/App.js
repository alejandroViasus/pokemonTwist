//!libraries

import './css/index.css';
import { Route, Routes } from "react-router-dom";
import Home from './components/pages/Home/Home';
import Register from './components/pages/Register/Register';
import HomeLoging from './components/pages/HomeLoging/HomeLoging';

//!components



function App() {
  
  return (
    <div className="App">
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/register/trainer" element={<Register/>} />
        <Route exact path="/:gametag/home" element={<HomeLoging/>} />
      </Routes>


    </div>
  );
}

export default App;
