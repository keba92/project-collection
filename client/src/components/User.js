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
        <img className='user-img' src={user.picture} alt={user.name} />
        <span className='user-name'>{user.name}</span>
        {saveLocalStorage}
     </>
    )
  )
}

export default User