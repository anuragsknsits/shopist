import React from 'react';
import { Container, NavDropdown, Nav, Navbar } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import '../styles/Header.css';

const Header = () => {

  return (
    <Navbar expand="lg" className='header'>
      <Container>
        <Navbar.Brand as={Link} to="/">VKAD Associates</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/">Home</Nav.Link>
            <Nav.Link as={Link} to="/aboutus">About Us</Nav.Link>
            <NavDropdown title="Dropdown" id="basic-nav-dropdown">
              <NavDropdown.Item as={Link} to="/">Action</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/">
                Another action
              </NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/">Something</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item as={Link} to="/">
                Separated link
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
          <Nav className="ms-auto">
            <Nav.Link as={Link} to="/">
              Notification</Nav.Link>
            <Nav.Link as={Link} to="/login">Login</Nav.Link>
            <Nav.Link as={Link} to="/signup" >Register</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>

  );
};

export default Header;
