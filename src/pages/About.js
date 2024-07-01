import React from 'react';

const AboutUs = () => {
  return (
   
    <div>
      <h2>About Us</h2>
      <p>
        Welcome to our website!
      </p>
    </div>
  );
};

export default AboutUs;


// import React from 'react';
//     import { Nav } from 'react-bootstrap';
//     import { Link } from 'react-router-dom';
//     import '../styles/Sidebar.css';
    
//     const Sidebar = ({ show, onHide }) => {
//       return (
//         <div className={`sidebar ${show ? 'show' : ''}`}>
//           <h2>Sidebar</h2>
//           <Nav className="flex-column">
//             <Nav.Item>
//               <Nav.Link as={Link} to="/" className="nav-link">Home</Nav.Link>
//             </Nav.Item>
//             <Nav.Item>
//               <Nav.Link as={Link} to="/about" className="nav-link">About</Nav.Link>
//             </Nav.Item>
//             <Nav.Item>
//               <Nav.Link as={Link} to="/profile" className="nav-link">Profile</Nav.Link>
//             </Nav.Item>
//           </Nav>
//           <button className="close-btn" onClick={onHide}>
//             &times;
//           </button>
//         </div>
//       );
//     };
    
//     export default Sidebar;
