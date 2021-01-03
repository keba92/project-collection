import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { Link } from 'react-router-dom';

const UserProfileButton = () => {
  const { isAuthenticated } = useAuth0();

  return (
    isAuthenticated && (
      <Link to='/user'>
        Кабинет профиля
      </Link>
    )
  )
}

export default UserProfileButton