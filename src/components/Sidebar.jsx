import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Home, User, Info, Menu, X, BarChart3, FileText, DollarSign, Folder, Calendar } from 'lucide-react'; // Import icons

const Sidebar = () => {
  const [isExpanded, setIsExpanded] = useState(true);

  const menuItems = [
    { name: "Dashboard", to: "/dashboard", icon: <BarChart3 size={24} /> },
    { name: "Clients", to: "/clients", icon: <User size={24} /> },
    { name: "Compliance", to: "/compliance", icon: <FileText size={24} /> },
    { name: "Invoices", to: "/invoices", icon: <DollarSign size={24} /> },
    { name: "Documents", to: "/documents", icon: <Folder size={24} /> },
    { name: "Calendar", to: "/calendar", icon: <Calendar size={24} /> },
    { name: "Home", to: "/", icon: <Home size={24} /> },
    { name: "Profile", to: "/profile", icon: <User size={24} /> },
    { name: "About Us", to: "/aboutus", icon: <Info size={24} /> }
  ];

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
        {menuItems.map((item, idx) => (
          <SidebarItem key={idx} to={item.to} icon={item.icon} label={item.name} isExpanded={isExpanded} />
        ))}
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