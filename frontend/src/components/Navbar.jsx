import { Link, NavLink } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import Logo from './Logo';

function ThemeToggle() {
  const { isDark, toggleTheme } = useTheme();
  return (
    <button
      type="button"
      onClick={toggleTheme}
      className="btn-ghost rounded-full p-2"
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      {isDark ? (
        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
      ) : (
        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
        </svg>
      )}
    </button>
  );
}

export default function Navbar() {
  const { user, isAuthenticated, isAdmin, logout } = useAuth();

  const linkClass = ({ isActive }) =>
    `text-sm font-medium transition-colors ${
      isActive ? 'text-meridian-600 dark:text-meridian-400' : 'text-secondary hover:text-primary'
    }`;

  return (
    <header className="sticky top-0 z-50 border-b border-default bg-elevated/90 backdrop-blur-md">
      <div className="border-b border-default bg-meridian-950 px-4 py-1.5 text-center text-xs text-meridian-100 dark:bg-ink-950">
        Free shipping on orders over $35 · Meridian Rewards members earn double points this week
      </div>
      <nav className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">
        <Logo />

        <div className="hidden items-center gap-8 md:flex">
          <NavLink to="/" className={linkClass} end>
            Shop
          </NavLink>
          <a href="/#collections" className="text-sm font-medium text-secondary transition hover:text-primary">
            Collections
          </a>
          <a href="/#why-meridian" className="text-sm font-medium text-secondary transition hover:text-primary">
            Why Meridian
          </a>
          {isAuthenticated && (
            <NavLink to="/cart" className={linkClass}>
              My Cart
            </NavLink>
          )}
          {isAdmin && (
            <NavLink to="/admin" className={linkClass}>
              Inventory
            </NavLink>
          )}
        </div>

        <div className="flex items-center gap-1 sm:gap-2">
          <ThemeToggle />
          {isAuthenticated ? (
            <>
              <span className="hidden max-w-[120px] truncate text-sm text-secondary lg:inline">
                {user.fullName}
              </span>
              <button type="button" onClick={logout} className="btn-secondary text-sm">
                Sign out
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="btn-ghost hidden sm:inline-flex">
                Sign in
              </Link>
              <Link to="/register" className="btn-primary text-sm">
                Join free
              </Link>
            </>
          )}
        </div>
      </nav>
    </header>
  );
}
