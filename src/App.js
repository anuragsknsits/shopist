import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { Home } from './pages/Home';
import AboutUs from './pages/About';
import {Navbar} from './components/Navbar'

function App() {
  return (
    <>
      <Navbar/>
      <Routes>
        <Route path='/' element = {<Home/>}></Route>
        <Route path='about' element = {<AboutUs/>}></Route>
      </Routes>
    </>
    
  );
}

export default App;
