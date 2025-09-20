// Navbar.js
import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import './Navbar.css';

function Navbar({ isLoggedIn, setIsLoggedIn }) {
  const navigate = useNavigate();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    setIsMobileMenuOpen(false);
    navigate('/home');
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <Link to="/home">DSA Tracker</Link>
      </div>
      
      {/* Mobile Menu Toggle */}
      <button 
        className={`nav-toggle ${isMobileMenuOpen ? 'active' : ''}`}
        onClick={toggleMobileMenu}
        aria-label="Toggle navigation menu"
      >
        <span></span>
        <span></span>
        <span></span>
      </button>

      <div className={`nav-links ${isMobileMenuOpen ? 'active' : ''}`}>
        <Link 
          to="/home" 
          className={`nav-button ${isActive('/home') ? 'active' : ''}`}
          onClick={closeMobileMenu}
        >
<<<<<<< HEAD
          Home
=======
          🏠 Home
>>>>>>> 376bd36c7d51a3edb60d03323b2d24290b236428
        </Link>
        
        {isLoggedIn ? (
          <>
            <Link 
              to="/profile" 
              className={`nav-button ${isActive('/profile') ? 'active' : ''}`}
              onClick={closeMobileMenu}
            >
<<<<<<< HEAD
              Profile
=======
              👤 Profile
>>>>>>> 376bd36c7d51a3edb60d03323b2d24290b236428
            </Link>
            <button 
              onClick={handleLogout} 
              className="nav-button"
            >
<<<<<<< HEAD
              Logout
=======
              🚪 Logout
>>>>>>> 376bd36c7d51a3edb60d03323b2d24290b236428
            </button>
          </>
        ) : (
          <>
            <Link 
              to="/signup" 
              className={`nav-button ${isActive('/signup') ? 'active' : ''}`}
              onClick={closeMobileMenu}
            >
<<<<<<< HEAD
              Signup
=======
              📝 Signup
>>>>>>> 376bd36c7d51a3edb60d03323b2d24290b236428
            </Link>
            <Link 
              to="/login" 
              className={`nav-button ${isActive('/login') ? 'active' : ''}`}
              onClick={closeMobileMenu}
            >
<<<<<<< HEAD
              Login
=======
              🔐 Login
>>>>>>> 376bd36c7d51a3edb60d03323b2d24290b236428
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
