import { Container, Navbar } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import NavigationMenu from './NavigationMenu';
import AuthLinks from './AuthLinks'
import { useSelector } from 'react-redux';
import { selectIsAuthenticated } from '../components/selectors/authSelectors';
import '../styles/Header.css';

const Header = () => {

  const isAuthenticated = useSelector(selectIsAuthenticated);
  return (
    <Navbar expand="lg" className="header">
      <Container>
        <Navbar.Brand as={Link} to="/">VKAD Associates</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <NavigationMenu isAuthenticated={isAuthenticated} />
          <AuthLinks isAuthenticated={isAuthenticated} />
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );

};

export default Header;