import { Link } from 'react-router-dom';
import '../styles/Header.css';

const NavigationMenu = ({ isAuthenticated }) => (
  <nav className="flex space-x-4">
    <Link to="/" className="text-lg font-medium text-gray-700 hover:text-blue-600">
      Home
    </Link>
    <Link to="/aboutus" className="text-lg font-medium text-gray-700 hover:text-blue-600">
      About Us
    </Link>

    {isAuthenticated && (
      <>
        {/* Dropdown Menu */}
        <div className="relative">
          <button className="text-lg font-medium text-gray-700 hover:text-blue-600">
            Products
          </button>
          <div className="absolute hidden mt-2 space-y-2 bg-white shadow-lg rounded-md w-48 right-0 z-50 group-hover:block">
            <Link to="/" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
              Action
            </Link>
            <Link to="/" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
              Another action
            </Link>
            <Link to="/" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
              Something
            </Link>
            <div className="border-t border-gray-200"></div>
            <Link to="/" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
              Separated link
            </Link>
          </div>
        </div>

        {/* Dashboard and Profile Links */}
        <Link to="/dashboard" className="text-lg font-medium text-gray-700 hover:text-blue-600">
          Dashboard
        </Link>
        <Link to="/profile" className="text-lg font-medium text-gray-700 hover:text-blue-600">
          Profile
        </Link>
      </>
    )}
  </nav>
);

export default NavigationMenu;
