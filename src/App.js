import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Profile from './pages/Profile';
import Dashboard from './pages/Dashboard';
import Client from './pages/Client';
import ChangePassword from './components/auth/ChangePassword';
import AboutUs from './pages/About';
import Contact from './pages/Contact';
import SignUp from './components/auth/SignUp';
import Login from './components/auth/Login';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import PrivateRoute from './components/PrivateRoute';
import { useDispatch, useSelector } from 'react-redux';
import { logoutRequest } from './redux/actions/loginAction';
import './App.css';  // Ensure styles are included

function App() {
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector(state => state.auth);

  const handleLogout = () => {
    dispatch(logoutRequest());
  };

  return (
    <Router>
      <div className="flex">
        {/* Sidebar, only for authenticated users */}
        {isAuthenticated && <Sidebar />}

        {/* Main Content */}
        <div className="flex-1 p-5">
          <Header isAuthenticated={isAuthenticated} onLogout={handleLogout} />

          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/aboutus" element={<AboutUs />} />
            <Route path="/signup" element={<SignUp />} />  {/* Dynamic route for SignUp */}
            <Route path="/login" element={<Login />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/profile" element={<PrivateRoute isAuthenticated={isAuthenticated}><Profile /></PrivateRoute>} />
            <Route path="/change-password" element={<PrivateRoute isAuthenticated={isAuthenticated}><ChangePassword/></PrivateRoute>} />
            <Route path="/dashboard" element={<PrivateRoute isAuthenticated={isAuthenticated}><Dashboard/></PrivateRoute>} />
            <Route path="/clients" element={<PrivateRoute isAuthenticated={isAuthenticated}><Client/></PrivateRoute>} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
