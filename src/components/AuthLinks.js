import { Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';

 const AuthLinks = () => (
    <Nav className="ms-auto">
        <Nav.Link as={Link} to="/">
            Notification
        </Nav.Link>
        <Nav.Link as={Link} to="/login">Login</Nav.Link>
        <Nav.Link as={Link} to="/signup">Register</Nav.Link>
    </Nav>
);
export default AuthLinks;