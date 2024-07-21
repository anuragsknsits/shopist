// src/components/AuthLinks.js
import { Nav, Navbar } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logoutRequest } from '../redux/actions/loginAction';

const AuthLinks = ({ username, isAuthenticated, onLogout }) => {
    const dispatch = useDispatch();

    const handleLogout = () => {
        dispatch(logoutRequest());
        onLogout();
    };

    return (
        <Nav className="ms-auto">
            {!isAuthenticated ? (
                <>
                    <Nav.Link className="nav-link-custom" as={Link} to="/login">Login</Nav.Link>
                    <Nav.Link className="nav-link-custom" as={Link} to="/signup">Register</Nav.Link>
                </>
            ) : (
                <>
                    <Nav.Link as={Link} to="/">Notification</Nav.Link>
                    <Navbar.Collapse className="justify-content-end">
                        <Navbar.Text>
                            Signed in as: <a href="profile">{username}</a>
                        </Navbar.Text>
                    </Navbar.Collapse>
                    <Nav.Link onClick={handleLogout}>Logout</Nav.Link>
                </>

            )}
        </Nav>
    );
};

export default AuthLinks;
