import { Link, NavLink, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext.jsx';
import { useTheme } from '../context/ThemeContext.jsx';

export default function Layout({ children }) {
  const { user, logout, isAdmin } = useAuth();
  const { theme, toggle } = useTheme();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const linkClass = ({ isActive }) =>
    [
      'px-3 py-2 rounded-lg text-sm font-medium transition-colors',
      isActive
        ? 'bg-brand-600 text-white shadow-soft dark:shadow-soft-dark'
        : 'text-slate-600 dark:text-slate-300 hover:bg-slate-200/80 dark:hover:bg-slate-800',
    ].join(' ');

  return (
    <div className="min-h-screen flex flex-col">
      <motion.header
        initial={{ y: -8, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.35 }}
        className="sticky top-0 z-20 border-b border-slate-200/80 dark:border-slate-800 bg-white/80 dark:bg-slate-950/80 backdrop-blur-md"
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 flex items-center justify-between h-16">
          <Link to="/" className="font-display font-semibold text-lg tracking-tight text-slate-900 dark:text-white">
            Connect<span className="text-brand-600">Stack</span>
          </Link>
          <nav className="hidden sm:flex items-center gap-1">
            {user && (
              <>
                <NavLink to="/dashboard" className={linkClass}>
                  Dashboard
                </NavLink>
                {isAdmin && (
                  <NavLink to="/admin" className={linkClass}>
                    Admin
                  </NavLink>
                )}
              </>
            )}
          </nav>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={toggle}
              className="p-2 rounded-lg border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              aria-label="Toggle dark mode"
            >
              {theme === 'dark' ? '☀️' : '🌙'}
            </button>
            {user ? (
              <button
                type="button"
                onClick={handleLogout}
                className="text-sm font-medium px-3 py-2 rounded-lg bg-slate-900 text-white dark:bg-white dark:text-slate-900 hover:opacity-90 transition-opacity"
              >
                Log out
              </button>
            ) : (
              <div className="flex gap-2">
                <Link
                  to="/login"
                  className="text-sm font-medium px-3 py-2 rounded-lg text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800"
                >
                  Log in
                </Link>
                <Link
                  to="/signup"
                  className="text-sm font-medium px-3 py-2 rounded-lg bg-brand-600 text-white hover:bg-brand-700"
                >
                  Sign up
                </Link>
              </div>
            )}
          </div>
        </div>
        {/* Mobile nav */}
        {user && (
          <div className="sm:hidden flex gap-2 px-4 pb-3">
            <NavLink to="/dashboard" className={linkClass}>
              Dashboard
            </NavLink>
            {isAdmin && (
              <NavLink to="/admin" className={linkClass}>
                Admin
              </NavLink>
            )}
          </div>
        )}
      </motion.header>
      <main className="flex-1">{children}</main>
      <footer className="border-t border-slate-200 dark:border-slate-800 py-6 text-center text-sm text-slate-500 dark:text-slate-400">
        MERN portfolio lab — Connect_Stack
      </footer>
    </div>
  );
}
