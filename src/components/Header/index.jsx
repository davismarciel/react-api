import React from 'react';
import { FaHome, FaSignInAlt, FaUserAlt, FaPowerOff } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import history from '../../services/history';
import * as actions from '../../store/modules/auth/actions';

import { Nav, Online } from './styled';
import { Toast } from '../../preventToast';

export default function Header() {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const dispath = useDispatch();
  const handleLogout = (e) => {
    e.preventDefault();
    dispath(actions.loginFailure());
    Toast('Logout completado com sucesso', { type: 'info' });
    history.push('/login');
  };

  return (
    <Nav>
      <Link to="/">
        <FaHome size={24} />
      </Link>
      <Link to="/register">
        <FaUserAlt size={24} />
      </Link>
      {isLoggedIn ? (
        <Link onClick={handleLogout} to="/logout">
          <FaPowerOff size={24} />
        </Link>
      ) : (
        <Link to="/login">
          <FaSignInAlt size={24} />
        </Link>
      )}

      {isLoggedIn && <Online />}
    </Nav>
  );
}
