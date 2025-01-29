import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import NavigationMenu from './NavigationMenu';
import AuthLinks from './AuthLinks';
import { selectIsAuthenticated, userName } from '../components/selectors/authSelectors';
import logo from '../img/VKADLogo.jpg';
import '../styles/Layout.css';

const Header = ({ onLogout }) => {
  // Get the authentication status from the Redux store
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const username = useSelector(userName);

  return (
    <header className="bg-white shadow-md">
      <div className="max-w-screen-xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-2">
          <img
            src={logo}
            alt="VKAD Associates logo"
            className="w-8 h-8"
          />
          <span className="text-xl font-semibold text-gray-700">VKAD Associates</span>
        </Link>

        {/* Navigation & Auth Links */}
        <div className="flex items-center space-x-6">
          <NavigationMenu isAuthenticated={isAuthenticated} />
          <AuthLinks username={username} isAuthenticated={isAuthenticated} onLogout={onLogout} />
        </div>
      </div>
    </header>
  );
};

export default Header;
