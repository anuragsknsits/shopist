// src/components/Sidebar.js
import React from 'react';
import { Offcanvas, Nav } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import NavigationMenu from './NavigationMenu';
import AuthLinks from './AuthLinks';
import { selectIsAuthenticated, userName } from '../components/selectors/authSelectors';
import '../styles/Sidebar.css';

const Sidebar = ({ show, handleClose }) => {
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const username = useSelector(userName);

  return (
    <Offcanvas show={show} onHide={handleClose} className="sidebar" backdrop={false}>
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>Menu</Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>
        <Nav className="flex-column">
          <NavigationMenu isAuthenticated={isAuthenticated} />
          <AuthLinks username={username} isAuthenticated={isAuthenticated} onLogout={handleClose} />
        </Nav>
      </Offcanvas.Body>
    </Offcanvas>
  );
};

export default Sidebar;
