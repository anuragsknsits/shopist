import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Home, User, Info, Menu, X } from 'lucide-react'; // Import icons

const Sidebar = () => {
  const [isExpanded, setIsExpanded] = useState(true);

  return (
    <div className={`h-screen bg-gray-900 text-white flex flex-col transition-all duration-300 ${isExpanded ? "w-64" : "w-16"}`}>
      {/* Toggle Button */}
      <button 
        onClick={() => setIsExpanded(!isExpanded)} 
        className="p-3 focus:outline-none hover:bg-gray-700 flex justify-end"
      >
        {isExpanded ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Sidebar Links */}
      <nav className="flex flex-col space-y-4 p-3">
        <SidebarItem to="/" icon={<Home size={24} />} label="Home" isExpanded={isExpanded} />
        <SidebarItem to="/profile" icon={<User size={24} />} label="Profile" isExpanded={isExpanded} />
        <SidebarItem to="/aboutus" icon={<Info size={24} />} label="About Us" isExpanded={isExpanded} />
      </nav>
    </div>
  );
};

const SidebarItem = ({ to, icon, label, isExpanded }) => (
  <Link 
    to={to} 
    className="flex items-center space-x-2 p-2 rounded-md hover:bg-gray-700"
  >
    {icon}
    {isExpanded && <span className="text-lg">{label}</span>}
  </Link>
);

export default Sidebar;
