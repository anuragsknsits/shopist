import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer>
      <div>
        <p>© 2024 Your App Name</p>
        <nav>
          <ul>
            <li><Link to="/">Home</Link></li>
            {/* <li><Link to="/about">About</Link></li>
            <li><Link to="/contact">Contact</Link></li> */}
            {/* Add more footer links */}
          </ul>
        </nav>
      </div>
    </footer>
  );
};

export default Footer;
