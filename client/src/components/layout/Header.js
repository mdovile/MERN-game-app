import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { FaGamepad } from 'react-icons/fa';
import { GrLogout } from 'react-icons/gr';
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

      {isAuthenticated || token ? (
        <Link
          to="/myGames"
          style={{
            position: 'absolute',
            right: 20,
            top: 8,
            textDecoration: 'none',
            textAlign: 'right',
          }}
        >
          My Games <FaGamepad />
        </Link>
      ) : (
        <Link
          style={{
            position: 'absolute',
            left: 12,
            top: 6,
            textDecoration: 'none',
            textAlign: 'right',
          }}
          to="/login"
        >
          Login
        </Link>
      )}
      {isAuthenticated || token ? (
        <Button
          style={{
            position: 'absolute',
            left: 12,
            top: 0,
            textDecoration: 'none',
            textAlign: 'right',
          }}
          onClick={() => {
            logout();
            history.push('/');
          }}
        >
          {' '}
          <GrLogout size={22} />{' '}
        </Button>
      ) : (
        <Link
          style={{
            position: 'absolute',
            left: 65,
            top: 6,
            textDecoration: 'none',
            textAlign: 'right',
          }}
          to="/register"
        >
          Sign up
        </Link>
      )}
    </Navbar>
  );
};

export default Header;
