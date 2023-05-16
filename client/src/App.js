//!libraries

import './css/index.css';
import { Route, Routes } from "react-router-dom";
import Home from './components/pages/Home/Home';

//!components



function App() {
  
  return (
    <div className="App">
      <Routes>
        <Route exact path="/" element={<Home />} />
      </Routes>


    </div>
  );
}

export default App;
