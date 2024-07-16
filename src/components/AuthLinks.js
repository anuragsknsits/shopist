import { Nav } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logoutRequest } from '../redux/actions/loginAction';

const AuthLinks = ({ isAuthenticated }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogout = () => {
        dispatch(logoutRequest(navigate));
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