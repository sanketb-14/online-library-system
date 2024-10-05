import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaBook, FaHome, FaSearch, FaPlus } from 'react-icons/fa';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <motion.header 
      className="bg-base-100 "
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="mx-auto px-4 py-3">
        <div className="flex justify-between  items-center">
          <Link to="/" className="flex items-center space-x-2">
            <motion.div
              whileHover={{ rotate: 360  }}
              transition={{ duration: 0.5 }}
            >
              <FaBook className="text-2xl sm:text-3xl text-primary" />
            </motion.div>
            <motion.h1 
              className="text-2xl font-bold font-serif text-secondary" 
              initial={{ x: -20 }}
              animate={{ x: 0 }}
              transition={{ type: "spring", stiffness: 100 }}
            >
              Online Library
            </motion.h1>
          </Link>
          
          <nav className="hidden md:flex  space-x-4">
            <NavLink className='btn btn-sm sm:btn-md glass' to="/" icon={<FaHome />}>Home</NavLink>
            <NavLink className='btn btn-sm sm:btn-md glass' to="/books" icon={<FaSearch />}>Browse Books</NavLink>
            <NavLink className='btn btn-sm sm:btn-md glass' to="/add-book" icon={<FaPlus />}>Add Book</NavLink>
          </nav>

          <motion.button 
            className="md:hidden"
            whileTap={{ scale: 0.95 }}
            onClick={toggleMenu}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </motion.button>
        </div>

        {isMenuOpen && (
          <motion.nav 
            className="md:hidden mt-3"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex flex-col space-y-2">
              <NavLink to="/" onClick={toggleMenu} icon={<FaHome />}>Home</NavLink>
              <NavLink to="/books" onClick={toggleMenu} icon={<FaSearch />}>Browse Books</NavLink>
              <NavLink to="/add-book" onClick={toggleMenu} icon={<FaPlus />}>Add Book</NavLink>
            </div>
          </motion.nav>
        )}
      </div>
    </motion.header>
  );
};

const NavLink = ({ to, children, onClick, icon }) => {
  const location = useLocation();
  const isActive = location.pathname === to;

  return (
    <motion.div
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
    >
      <Link 
        to={to} 
        className={`flex items-center space-x-2 rounded-md transition duration-200 ${
          isActive 
            ? 'bg-gradient-to-r from-primary to-secondary text-primary-content'
            : 'hover:bg-primary hover:text-primary-content'
        } ${
          onClick ? 'btn btn-sm btn-primary w-full justify-start' : 'btn btn-sm sm:btn-md glass'
        }`}
        onClick={onClick}
      >
        {icon}
        <span>{children}</span>
      </Link>
    </motion.div>
  );
};

export default Header;