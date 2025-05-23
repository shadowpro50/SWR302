import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
// Icons needed for nav, profile dropdown, mobile menu toggle, and footer
import { Droplet, Calendar, Home, User, MapPin, BookOpen, Menu, X, ChevronDown, LogOut } from 'lucide-react'; 
import { useAppContext } from '../context/AppContext';

interface MemberLayoutProps { // Renamed from LayoutProps
  children: React.ReactNode;
}

const MemberLayout: React.FC<MemberLayoutProps> = ({ children }) => { // Renamed from Layout
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false); // For profile dropdown
  const location = useLocation();
  const { isLoggedIn, currentUser, logout } = useAppContext();
  
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };
  
  const toggleProfileDropdown = () => { 
    setIsProfileDropdownOpen(!isProfileDropdownOpen);
  };
  
  const closeAllMenus = () => { 
    setIsMobileMenuOpen(false);
    setIsProfileDropdownOpen(false); 
  };

  const navLinks = [
    { name: 'Home', path: '/', icon: <Home className="w-5 h-5" /> },
    { name: 'Donate', path: '/appointments', icon: <Calendar className="w-5 h-5" /> },
    { name: 'Donation Centers', path: '/centers', icon: <MapPin className="w-5 h-5" /> },
    { name: 'Learn', path: '/resources', icon: <BookOpen className="w-5 h-5" /> },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-3 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            {/* Logo */}
            <Link to="/" className="flex items-center" onClick={closeAllMenus}>
              <Droplet className="h-8 w-8 text-red-500" />
              <span className="ml-2 text-xl font-bold text-gray-900">LifeDrop</span>
            </Link>
            
            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8"> 
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`flex items-center text-sm font-medium transition-colors duration-200 hover:text-red-600 ${
                    location.pathname === link.path ? 'text-red-600' : 'text-gray-600'
                  }`}
                  onClick={closeAllMenus} 
                >
                  {link.icon}
                  <span className="ml-1">{link.name}</span>
                </Link>
              ))}
            </nav>
            
            {/* User Profile / Auth Buttons */}
            <div className="flex items-center">
              {isLoggedIn ? (
                <div className="relative">
                  <button
                    className="flex items-center text-sm font-medium text-gray-700 hover:text-red-600"
                    onClick={toggleProfileDropdown}
                  >
                    <User className="h-5 w-5 mr-1" />
                    <span className="hidden sm:inline">{currentUser?.name}</span>
                    <ChevronDown className="h-4 w-4 ml-1" />
                  </button>
                  
                  {isProfileDropdownOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg py-1 z-10">
                      <Link
                        to="/profile"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        onClick={closeAllMenus}
                      >
                        Your Profile
                      </Link>
                      <button
                        className="flex w-full items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        onClick={() => {
                          logout();
                          closeAllMenus();
                        }}
                      >
                        <LogOut className="h-4 w-4 mr-2" />
                        Sign out
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  to="/register"
                  className="inline-flex items-center justify-center rounded-md bg-red-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-red-700 transition-colors duration-200"
                  onClick={closeAllMenus}
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
                    onClick={closeAllMenus} 
                  >
                    {link.icon}
                    <span className="ml-2">{link.name}</span>
                  </Link>
                ))}
                {/* Adding profile link and signout to mobile menu if logged in */}
                {isLoggedIn && (
                  <>
                    <Link
                      to="/profile"
                      className="flex items-center text-base font-medium text-gray-600 hover:text-red-600"
                      onClick={closeAllMenus}
                    >
                      <User className="w-5 h-5 mr-2" />
                      Your Profile
                    </Link>
                    <button
                      className="flex items-center text-base font-medium text-gray-600 hover:text-red-600 w-full"
                      onClick={() => {
                        logout();
                        closeAllMenus();
                      }}
                    >
                      <LogOut className="w-5 h-5 mr-2" />
                      Sign out
                    </button>
                  </>
                )}
                {/* If not logged in, show Become a Donor in mobile menu */}
                {!isLoggedIn && (
                    <Link
                        to="/register"
                        className="flex items-center text-base font-medium text-gray-600 hover:text-red-600"
                        onClick={closeAllMenus}
                    >
                        <User className="w-5 h-5 mr-2" /> {/* Or a different icon like UserPlus */}
                        Become a Donor
                    </Link>
                )}
              </div>
            </nav>
          )}
        </div>
      </header>
      
      {/* Main Content */}
      <main className="flex-grow">
        {children}
      </main>
      
      {/* Footer (simplified version) */}
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