import React, { useState, useEffect } from 'react';
import { Container, Navbar, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import NavigationMenu from './NavigationMenu';
import AuthLinks from './AuthLinks';
import { selectIsAuthenticated, userName } from '../components/selectors/authSelectors';
import logo from '../img/VKADLogo.jpg';
import Sidebar from './Sidebar';
import '../styles/Layout.css';

const Header = ({ onLogout }) => {
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const username = useSelector(userName);
  const [showSidebar, setShowSidebar] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const handleShowSidebar = () => setShowSidebar(true);
  const handleCloseSidebar = () => setShowSidebar(false);

  const updateWindowDimensions = () => {
    setIsMobile(window.innerWidth <= 992);
  };

  useEffect(() => {
    updateWindowDimensions();
    window.addEventListener('resize', updateWindowDimensions);
    return () => window.removeEventListener('resize', updateWindowDimensions);
  }, []);

  return (
    <>
      <Navbar expand="lg" className="header" variant="light">
        <Container className="d-flex justify-content-between">
          {isMobile && (
            <Button variant="primary" onClick={handleShowSidebar} className="navbar-toggler">
              ☰
            </Button>
          )}
          <Navbar.Brand as={Link} to='/' className="mx-auto">
            <img
              src={logo}
              width="30"
              height="30"
              className="d-inline-block align-top"
              alt="VKAD Associates logo"
            />
            {' VKAD Associates'}
          </Navbar.Brand>
          {!isMobile && (
            <Navbar.Collapse id="basic-navbar-nav">
              <NavigationMenu isAuthenticated={isAuthenticated} />
              <AuthLinks username={username} isAuthenticated={isAuthenticated} onLogout={onLogout} />
            </Navbar.Collapse>
          )}
        </Container>
      </Navbar>
      {isMobile && <Sidebar show={showSidebar} handleClose={handleCloseSidebar} />}
    </>
  );
};

export default Header;
