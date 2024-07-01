import React from 'react';
import { Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import '../styles/Sidebar.css';

const Sidebar = ({ show }) => {
  return (
    <div className={`sidebar ${show ? 'show' : ''}`}>
      <h2>Sidebar</h2>
      <Nav className="flex-column">

        <Nav.Item>
          <Nav.Link as={Link} to="/" className="nav-link">Home</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link as={Link} to="/aboutus" className="nav-link">Aboutus</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link as={Link} to="/signup" className="nav-link">SignUp</Nav.Link>
        </Nav.Item>
      </Nav>
    </div>
  );
};

export default Sidebar;
