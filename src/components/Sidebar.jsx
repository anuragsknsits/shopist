import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Home, User, Info, Menu, BarChart3 } from 'lucide-react';

const items = [
  { label: 'Dashboard', to: '/dashboard', icon: BarChart3 },
  { label: 'Clients', to: '/clients', icon: User, role: 'CLIENT' },
  { label: 'Home', to: '/', icon: Home },
  { label: 'Profile', to: '/profile', icon: User },
  { label: 'About Us', to: '/aboutus', icon: Info },
];
export default function Sidebar() {
  const [open, setOpen] = useState(false);
  const role = useSelector(state => state.auth.user?.role);
  return <aside className="w-full shrink-0 bg-gray-900 text-white md:sticky md:top-0 md:h-dvh md:w-56 md:overflow-y-auto">
    <button type="button" onClick={() => setOpen(!open)} aria-expanded={open} aria-controls="primary-navigation" className="flex min-h-11 items-center gap-2 p-3 md:hidden"><Menu aria-hidden="true" size={20} /> Navigation</button>
    <nav id="primary-navigation" aria-label="Primary" className={`${open ? 'flex' : 'hidden'} flex-col gap-2 p-3 md:flex`}>
      {items.filter(item => !item.role || item.role === role).map(({label, to, icon: Icon}) => <NavLink key={to} to={to} end onClick={() => setOpen(false)} className={({isActive}) => `flex min-h-11 items-center gap-3 rounded-lg p-3 ${isActive ? 'bg-blue-700' : 'hover:bg-gray-800'}`}><Icon aria-hidden="true" size={20} /><span>{label}</span></NavLink>)}
    </nav>
  </aside>;
}
