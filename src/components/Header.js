// src/components/Header.js
import { Container, Navbar } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import NavigationMenu from './NavigationMenu';
import AuthLinks from './AuthLinks';
import { useSelector } from 'react-redux';
import { selectIsAuthenticated, userName } from '../components/selectors/authSelectors';
import logo from '../img/VKADLogo.jpg';

const Header = ({ onLogout }) => {
  // Get the authentication status from the Redux store
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const username = useSelector(userName);

  return (
    <div>
      <Navbar expand="lg">
        <Container>
          <Navbar.Toggle aria-controls="basic-navbar-nav" aria-label="Toogle Me" />
          <Navbar.Brand as={Link}>
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
    </div>
  );
};

export default Header;
