import { Nav, NavDropdown } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import '../styles/Header.css';

const NavigationMenu = ({ isAuthenticated }) => (

    <Nav className="me-auto">
        <Nav.Link as={Link} to="/">Home</Nav.Link>
        <Nav.Link as={Link} to="/aboutus">About Us</Nav.Link>

        {isAuthenticated && (
            <>
                <NavDropdown title="Products" id="basic-nav-dropdown">
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
                <Nav.Link as={Link} to="/dashboard">Dashboard</Nav.Link>
                <Nav.Link as={Link} to="/profile">Profile</Nav.Link>
            </>
        )}
    </Nav>
);
export default NavigationMenu;