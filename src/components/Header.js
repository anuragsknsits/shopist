// src/components/Header.js
import React from 'react';
import { Container, Navbar } from 'react-bootstrap';
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
    <Navbar expand="lg" className="header" variant="light">
      <Container>
        <Navbar.Brand as={Link} to='/'>
          <img
            src={logo}
            width="30"
            height="30"
            className="d-inline-block align-top"
            alt="VKAD Associates logo"
          />
          {' VKAD Associates'}
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <NavigationMenu isAuthenticated={isAuthenticated} />
          <AuthLinks username={username} isAuthenticated={isAuthenticated} onLogout={onLogout} />
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
