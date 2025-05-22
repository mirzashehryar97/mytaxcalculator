import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <header className="bg-white backdrop-blur-sm shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center h-16 justify-between md:justify-center relative">
          {/* Logo */}
          <div className="flex items-center md:absolute md:left-0">
            <Link to="/" className="flex items-center">
              <img src="/main-logo.png" alt="My Tax Calculator Logo" className="h-8 w-8 text-emerald-600" />
              <div className="ml-2">
                <span className="text-xl font-bold text-gray-900">My Tax Calculator</span>
                <span className="hidden md:inline-block ml-1 text-sm text-emerald-600 font-medium">Pakistan</span>
              </div>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-10">
            <Link 
              to="/" 
              className={`inline-flex items-center px-3 py-2 text-sm font-medium border-b-2 ${
                isActive('/') 
                  ? 'border-emerald-500 text-gray-900'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Home
            </Link>
            <Link 
              to="/about" 
              className={`inline-flex items-center px-3 py-2 text-sm font-medium border-b-2 ${
                isActive('/about') 
                  ? 'border-emerald-500 text-gray-900'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              About Us
            </Link>
            <Link 
              to="/tax-guides" 
              className={`inline-flex items-center px-3 py-2 text-sm font-medium border-b-2 ${
                isActive('/tax-guides') 
                  ? 'border-emerald-500 text-gray-900'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Tax Guides
            </Link>
          </nav>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-600 hover:text-emerald-600 hover:bg-gray-100 transition-colors"
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="pt-2 pb-3 space-y-1 bg-white backdrop-blur-sm shadow-lg">
            <Link
              to="/"
              className={`block pl-3 pr-4 py-2 border-l-4 text-base font-medium ${
                isActive('/')
                  ? 'border-emerald-500 text-emerald-700 bg-emerald-50'
                  : 'border-transparent text-gray-500 hover:bg-gray-50 hover:text-gray-700'
              }`}
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              to="/about"
              className={`block pl-3 pr-4 py-2 border-l-4 text-base font-medium ${
                isActive('/about')
                  ? 'border-emerald-500 text-emerald-700 bg-emerald-50'
                  : 'border-transparent text-gray-500 hover:bg-gray-50 hover:text-gray-700'
              }`}
              onClick={() => setIsMenuOpen(false)}
            >
              About Us
            </Link>
            <Link
              to="/tax-guides"
              className={`block pl-3 pr-4 py-2 border-l-4 text-base font-medium ${
                isActive('/tax-guides')
                  ? 'border-emerald-500 text-emerald-700 bg-emerald-50'
                  : 'border-transparent text-gray-500 hover:bg-gray-50 hover:text-gray-700'
              }`}
              onClick={() => setIsMenuOpen(false)}
            >
              Tax Guides
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header; 