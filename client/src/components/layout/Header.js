import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { FaGamepad } from 'react-icons/fa';
import { Navbar, Button } from 'reactstrap';
import { GlobalContext } from '../../context/GlobalState.js';
import { useHistory } from 'react-router-dom';

const Header = () => {
  const { isAuthenticated, token, logout } = useContext(GlobalContext);

  let history = useHistory();

  return (
    <Navbar style={{ textAlign: 'center', display: 'block', backgroundColor: '#3e3f40' }}>
      <span style={{ textAlign: 'center', fontWeight: 'bold' }}>
        <Link to="/" style={{ textDecoration: 'none' }}>
          FIND GAMES
        </Link>
      </span>

      {isAuthenticated ? (
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
      ) : (
        <Link to="/login">Login</Link>
      )}
      {isAuthenticated ? (
        <Button
          onClick={() => {
            logout();
            history.push('/');
          }}
        >
          {' '}
          Log Out{' '}
        </Button>
      ) : (
        <Link to="/register">Sign up</Link>
      )}
    </Navbar>
  );
};

export default Header;
