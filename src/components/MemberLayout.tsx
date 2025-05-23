import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Droplet, Calendar, Home, User, MapPin, BookOpen, Menu, X } from 'lucide-react';
import { useAppContext } from '../context/AppContext';

interface MemberLayoutProps {
  children: React.ReactNode;
}

const MemberLayout: React.FC<MemberLayoutProps> = ({ children }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const { isLoggedIn, currentUser, logout } = useAppContext();
  
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };
  
  const closeMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const navLinks = [
    { name: 'Home', path: '/', icon: <Home className="w-5 h-5" /> },
    { name: 'Schedule Donation', path: '/appointments', icon: <Calendar className="w-5 h-5" /> },
    { name: 'Find Centers', path: '/centers', icon: <MapPin className="w-5 h-5" /> },
    { name: 'Learn', path: '/resources', icon: <BookOpen className="w-5 h-5" /> },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-3">
          <div className="flex justify-between items-center">
            {/* Logo */}
            <Link to="/" className="flex items-center" onClick={closeMenu}>
              <Droplet className="h-8 w-8 text-red-500" />
              <span className="ml-2 text-xl font-bold text-gray-900">LifeDrop</span>
            </Link>
            
            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-6">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`flex items-center text-sm font-medium transition-colors duration-200 hover:text-red-600 ${
                    location.pathname === link.path ? 'text-red-600' : 'text-gray-600'
                  }`}
                >
                  {link.icon}
                  <span className="ml-1">{link.name}</span>
                </Link>
              ))}
            </nav>
            
            {/* User Profile / Auth Buttons */}
            <div className="flex items-center">
              {isLoggedIn ? (
                <div className="flex items-center">
                  <Link
                    to="/profile"
                    className="flex items-center text-sm font-medium text-gray-700 hover:text-red-600"
                  >
                    <User className="h-5 w-5 mr-1" />
                    <span className="hidden sm:inline">{currentUser?.name}</span>
                  </Link>
                  <button
                    onClick={logout}
                    className="ml-4 text-sm font-medium text-gray-700 hover:text-red-600"
                  >
                    Sign out
                  </button>
                </div>
              ) : (
                <Link
                  to="/register"
                  className="inline-flex items-center justify-center rounded-md bg-red-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-red-700 transition-colors duration-200"
                >
                  Become a Donor
                </Link>
              )}
              
              {/* Mobile menu button */}
              <button
                className="ml-4 md:hidden inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-red-600 hover:bg-gray-100 focus:outline-none"
                onClick={toggleMobileMenu}
              >
                {isMobileMenuOpen ? (
                  <X className="block h-6 w-6" aria-hidden="true" />
                ) : (
                  <Menu className="block h-6 w-6" aria-hidden="true" />
                )}
              </button>
            </div>
          </div>
          
          {/* Mobile Navigation */}
          {isMobileMenuOpen && (
            <nav className="md:hidden mt-4 pb-2 border-t border-gray-200 pt-4">
              <div className="flex flex-col space-y-4">
                {navLinks.map((link) => (
                  <Link
                    key={link.path}
                    to={link.path}
                    className={`flex items-center text-base font-medium ${
                      location.pathname === link.path ? 'text-red-600' : 'text-gray-600'
                    }`}
                    onClick={closeMenu}
                  >
                    {link.icon}
                    <span className="ml-2">{link.name}</span>
                  </Link>
                ))}
              </div>
            </nav>
          )}
        </div>
      </header>
      
      {/* Main Content */}
      <main className="flex-grow">
        {children}
      </main>
      
      {/* Footer */}
      <footer className="bg-white border-t border-gray-200">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center mb-4 md:mb-0">
              <Droplet className="h-6 w-6 text-red-500" />
              <span className="ml-2 text-lg font-semibold">LifeDrop</span>
            </div>
            
            <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-600">
              <Link to="/resources" className="hover:text-red-600">About Us</Link>
              <Link to="/resources" className="hover:text-red-600">Contact</Link>
              <Link to="/resources" className="hover:text-red-600">Privacy Policy</Link>
              <Link to="/resources" className="hover:text-red-600">Terms of Service</Link>
            </div>
            
            <div className="mt-4 md:mt-0 text-sm text-gray-500">
              © 2025 LifeDrop. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default MemberLayout;