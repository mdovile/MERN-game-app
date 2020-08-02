import React from 'react';
import { Link } from 'react-router-dom';
import { FaGamepad } from 'react-icons/fa';
import { Navbar } from 'reactstrap';

const Header = () => {
  return (
    <Navbar style={{ textAlign: 'center', display: 'block', backgroundColor: '#3e3f40' }}>
      <span style={{ textAlign: 'center', fontWeight: 'bold' }}>
        <Link to="/" style={{ textDecoration: 'none' }}>
          FIND GAMES
        </Link>
      </span>
      <Link
        to="/myGames"
        style={{
          position: 'absolute',
          right: 20,
          textDecoration: 'none',
          textAlign: 'right',
        }}
      >
        My Games <FaGamepad />
      </Link>
      <Link to="/login">Login</Link>
      <Link to="/register">Sign up</Link>
    </Navbar>
  );
};

export default Header;
