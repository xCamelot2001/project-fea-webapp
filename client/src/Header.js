import React from 'react';
import { Link } from 'react-router-dom';
import './App.css';

const Header = () => {
  return (
    <nav className='Header'>
      <Link to="/">Home</Link>
      <Link to="/about">About</Link>
      <Link to="/contact">Contact</Link>
    </nav>
  );
};

export default Header;
