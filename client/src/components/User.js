import React from 'react';
import { useAuth0 } from "@auth0/auth0-react";

const User = () => {
  const { user, isAuthenticated } = useAuth0();

  const saveLocalStorage = () => {
    localStorage.setItem('auth', 'true');
  }

  return (
    isAuthenticated && ( 
     <>
        <img src={user.picture} alt={user.name} />
        {saveLocalStorage}
     </>
    )
  )
}

export default User