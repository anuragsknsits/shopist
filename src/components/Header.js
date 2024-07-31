// src/components/Header.js
import { Container, Navbar, Nav, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import NavigationMenu from './NavigationMenu';
import AuthLinks from './AuthLinks';
import { useSelector } from 'react-redux';
import { selectIsAuthenticated, userName } from '../components/selectors/authSelectors';
import logo from '../img/VKADLogo.jpg';
import '../styles/Layout.css';

const Header = ({ onLogout, children }) => {
  // Get the authentication status from the Redux store
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const username = useSelector(userName);

  return (
    <div>
      <Navbar expand="lg">
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
          <Navbar.Collapse id="basic-navbar-nav">
            {/* Pass authentication status and onLogout function to child components */}
            <NavigationMenu isAuthenticated={isAuthenticated} />
            <AuthLinks username={username} isAuthenticated={isAuthenticated} onLogout={onLogout} />
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Container fluid>
        <Row>
          <Col xs={2} className="sidebar bg-light">
            <Nav className="flex-column">
              <Nav.Link className="nav-link-custom" as={Link} to="/aboutus">AboutUs</Nav.Link>
              <Nav.Link className="nav-link-custom" as={Link} to="/dashboard">Dashboard</Nav.Link>
              <Nav.Link className="nav-link-custom" as={Link} to="/profile">Profile</Nav.Link>
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

export default Header;
