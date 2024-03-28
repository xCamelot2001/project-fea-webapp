import React from 'react';
import { Link } from 'react-router-dom';
import '/Users/camelot/project-fea-3/client/src/assests/styles/App.css';

const Header = () => {
  return (
    <nav>
      <h3> ExprEssence </h3>
      <Link to="/">Home</Link>
      <Link to="/about">About</Link>
      <Link to="/contact">Contact</Link>
    </nav>
  );
};

export default Header;
