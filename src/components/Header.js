// src/components/Header.js
import { Container, Navbar } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import NavigationMenu from './NavigationMenu';
import AuthLinks from './AuthLinks';
import { useSelector } from 'react-redux';
import { selectIsAuthenticated } from '../components/selectors/authSelectors';
import '../styles/Header.css';

const Header = ({ onLogout }) => {
  // Get the authentication status from the Redux store
  const isAuthenticated = useSelector(selectIsAuthenticated);

  return (
    <div>
      <Navbar expand="lg">
        <Container>
          <Navbar.Toggle aria-controls="basic-navbar-nav" aria-label="Toogle Me" />
          <Navbar.Brand as={Link} to="/">
            VKAD Associates
          </Navbar.Brand>
          <Navbar.Collapse id="basic-navbar-nav">
            {/* Pass authentication status and onLogout function to child components */}
            <NavigationMenu isAuthenticated={isAuthenticated} />
            <AuthLinks isAuthenticated={isAuthenticated} onLogout={onLogout} />
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
};

export default Header;
