import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { Link } from 'react-router-dom';

const UserProfileButton = () => {
  const { user, isAuthenticated } = useAuth0();

  return (
    isAuthenticated && (
      <Link to={`/user/${user.sub}`}>
        Кабинет профиля
      </Link>
    )
  )
}

export default UserProfileButton