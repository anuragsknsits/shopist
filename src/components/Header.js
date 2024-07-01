import React, { useState } from 'react';
import { Navbar, Button } from 'react-bootstrap';
import Sidebar from './Sidebar'
import '../styles/Sidebar.css';

const Header = () => {
  const [showSidebar, setShowSidebar] = useState(false);

  const toggleSidebar = () => {
    console.log(showSidebar)
    setShowSidebar(!showSidebar);
  };

  return (
    <>
      <Navbar bg="light" expand="lg">
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Button variant="outline-primary" className="toggle-btn" onClick={toggleSidebar}>
            <span></span>
            <span></span>
            <span></span>
          </Button>
        </Navbar.Collapse>
      </Navbar>
      <Sidebar show={showSidebar} onHide={() => setShowSidebar(false)} />
    </>
  );
};

export default Header;
