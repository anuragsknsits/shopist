import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { Home } from './pages/Home';
import { SignUp } from './components/auth/SignUp';
import AboutUs from './pages/About';
import { Navbar } from './components/Navbar'
import Profile from './pages/Profile';
import { Login } from './components/auth/Login';
import { AuthProvider } from './pages/auth';


function App() {
  return (
    <AuthProvider>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />}></Route>
        <Route path='about' element={<AboutUs />}></Route>
        <Route path='signup' element={<SignUp />}></Route>
        <Route path='login' element={<Login />}></Route>
        <Route path='profile' element={<Profile />}></Route>
      </Routes>
    </AuthProvider>

  );
}

export default App;
