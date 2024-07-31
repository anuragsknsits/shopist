// src/components/Layout.js
import React from 'react';
import { Container, Row, Col, Navbar, Nav } from 'react-bootstrap';
import '../styles/Layout.css';

const Layout = ({ children }) => {
  return (
    <div>
      <Navbar bg="" variant="dark" expand="lg" className="header">
        <Navbar.Brand href="/home">MyApp</Navbar.Brand>
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto">
            <Nav.Link href="/home">Home</Nav.Link>
            <Nav.Link href="/link">Link</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      <Container fluid>
        <Row>
          <Col xs={2} className="sidebar bg-light">
            <Nav className="flex-column">
              <Nav.Link href="/dashboard">Dashboard</Nav.Link>
              <Nav.Link href="/profile">Profile</Nav.Link>
              <Nav.Link href="/settings">Settings</Nav.Link>
            </Nav>
          </Col>
          <Col xs={10} className="content">
            {children}
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Layout;
