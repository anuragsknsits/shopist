// src/components/AuthLinks.js
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
        <nav className="ml-auto flex items-center space-x-4">
            {!isAuthenticated ? (
                <>
                    <Link to="/login" className="text-gray-700 hover:text-blue-500">Login</Link>
                    <Link to="/signup" className="text-gray-700 hover:text-blue-500">Register</Link>
                </>
            ) : (
                <>
                    <Link to="/" className="text-gray-700 hover:text-blue-500">Notification</Link>
                    <div className="ml-auto flex items-center space-x-2">
                        <span className="text-sm text-gray-500">
                            Signed in as: <a href="profile" className="text-blue-500">{username}</a>
                        </span>
                    </div>
                    <button onClick={handleLogout} className="text-gray-700 hover:text-red-500">Logout</button>
                </>
            )}
        </nav>
    );
};

export default AuthLinks;
