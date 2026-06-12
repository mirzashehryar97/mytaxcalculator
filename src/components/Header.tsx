import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

const navLinks = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About Us' },
  { to: '/tax-guides', label: 'Tax Guides' },
];

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="bg-white shadow-sm border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center h-16 justify-between min-[950px]:justify-center relative">
          {/* Logo */}
          <div className="flex items-center min-[950px]:absolute min-[950px]:left-0">
            <Link to="/" className="flex items-center group">
              <img
                src="/main-logo.png"
                alt="My Tax Calculator Logo"
                className="h-9 w-9 transition-transform duration-200 group-hover:scale-105"
              />
              <div className="ml-2.5 leading-none">
                <span className="text-xl font-bold text-gray-900 tracking-tight">My Tax Calculator</span>
                <span className="hidden md:inline-block ml-1.5 text-sm text-emerald-600 font-semibold">Pakistan</span>
              </div>
            </Link>
          </div>

          {/* Desktop Navigation - centered, shown at 950px+ */}
          <nav className="hidden min-[950px]:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={`px-4 py-2 rounded-full text-sm font-semibold transition-all duration-200 ${
                  isActive(link.to)
                    ? 'bg-emerald-50 text-emerald-700'
                    : 'text-gray-600 hover:text-emerald-700 hover:bg-gray-50'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Mobile menu button */}
          <div className="min-[950px]:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle navigation menu"
              className="inline-flex items-center justify-center p-2 rounded-xl text-gray-600 hover:text-emerald-600 hover:bg-gray-100 transition-colors"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="min-[950px]:hidden border-t border-gray-100 animate-fade-in">
          <div className="px-3 py-3 space-y-1 bg-white">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                onClick={() => setIsMenuOpen(false)}
                className={`block px-4 py-3 rounded-xl text-base font-semibold transition-colors ${
                  isActive(link.to)
                    ? 'bg-emerald-50 text-emerald-700'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
