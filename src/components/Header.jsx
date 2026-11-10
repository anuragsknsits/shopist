import { useEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Button from './ui/Button';

export default function Header({ isAuthenticated, onLogout, loggingOut }) {
  const [open, setOpen] = useState(false);
  const user = useSelector(state => state.auth.user);
  const container = useRef(null);
  const trigger = useRef(null);
  const { pathname } = useLocation();
  useEffect(() => { setOpen(false); }, [pathname]);
  useEffect(() => {
    if (!open) return;
    const dismiss = event => { if (!container.current?.contains(event.target)) setOpen(false); };
    const escape = event => { if (event.key === 'Escape') { setOpen(false); trigger.current?.focus(); } };
    document.addEventListener('pointerdown', dismiss);
    document.addEventListener('keydown', escape);
    return () => { document.removeEventListener('pointerdown', dismiss); document.removeEventListener('keydown', escape); };
  }, [open]);
  return <header className="border-b bg-white">
    <div className="mx-auto flex max-w-screen-2xl flex-wrap items-center justify-between gap-3 p-4">
      <Link to="/" className="text-xl font-semibold">VKAD Associates</Link>
      {isAuthenticated ? <div ref={container} className="relative min-w-0 max-w-full" onBlur={event => { if (!event.currentTarget.contains(event.relatedTarget)) setOpen(false); }}>
        <button ref={trigger} type="button" aria-expanded={open} aria-controls="account-links" onClick={() => setOpen(!open)} className="ui-button max-w-full">
          <span className="truncate">Hi {user?.username || user?.email}</span><span aria-hidden="true" className="ml-2">▾</span>
        </button>
        {open && <nav id="account-links" aria-label="Account" className="absolute right-0 z-50 mt-2 w-64 max-w-[calc(100vw-2rem)] rounded-lg border bg-white p-2 shadow-lg">
          <Link className="block rounded p-3 hover:bg-gray-100" to="/profile">Profile</Link>
          <Link className="block rounded p-3 hover:bg-gray-100" to="/change-password">Change Password</Link>
          <Button className="w-full" onClick={onLogout} busy={loggingOut}>{loggingOut ? 'Logging out...' : 'Logout'}</Button>
        </nav>}
      </div> : <nav aria-label="Account" className="flex flex-wrap gap-4"><Link className="p-2" to="/login">Login</Link><Link className="p-2" to="/signup">Sign Up</Link></nav>}
    </div>
  </header>;
}
