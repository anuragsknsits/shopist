import { Container, Navbar } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import NavigationMenu from './NavigationMenu';
import AuthLinks from './AuthLinks';
import { useSelector } from 'react-redux';
import { selectIsAuthenticated } from '../components/selectors/authSelectors';
import '../styles/Header.css';

const Header = () => {
  // Get the authentication status from the Redux store
  const isAuthenticated = useSelector(selectIsAuthenticated);

  return (
    <Navbar expand="lg" className="header">
      <Container>
        <Navbar.Brand as={Link} to="/">
          VKAD Associates
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" aria-label="Toggle navigation" />
        <Navbar.Collapse id="basic-navbar-nav">
          {/* Pass authentication status to child components */}
          <NavigationMenu isAuthenticated={isAuthenticated} />
          <AuthLinks isAuthenticated={isAuthenticated} />
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
