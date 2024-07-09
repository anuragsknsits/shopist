import { Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logout } from '../redux/actions/loginAction';

const AuthLinks = ({ isAuthenticated }) => {
    const dispatch = useDispatch();

    const handleLogout = () => {
        dispatch(logout());
    };

    return (
        <Nav className="ms-auto">
            {!isAuthenticated ? (
                <>
                    <Nav.Link as={Link} to="/">
                        Notification
                    </Nav.Link>
                    <Nav.Link as={Link} to="/login">Login</Nav.Link>
                    <Nav.Link as={Link} to="/signup">Register</Nav.Link>
                </>
            ) : (
                <Nav.Link onClick={handleLogout}>Logout</Nav.Link>
            )}


        </Nav>
    );
};
export default AuthLinks;