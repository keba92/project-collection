import React, { memo, useCallback } from 'react';
import { useAuth0 } from '@auth0/auth0-react';

const User = () => {
  const { user, isAuthenticated } = useAuth0();

  const saveLocalStorage = useCallback(() => {
    localStorage.setItem('auth', 'true');
    if (isAuthenticated) localStorage.setItem('userId', user.sub);
  }, [isAuthenticated, user]);

  return (
    isAuthenticated && (
      <>
        <img className="user-img" src={user.picture} alt={user.name} />
        {saveLocalStorage()}
      </>
    )
  );
};

export default memo(User);
