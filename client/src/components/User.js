import React from 'react';
import { useAuth0 } from "@auth0/auth0-react";

const User = () => {
  const { user, isAuthenticated } = useAuth0();

  return (
    isAuthenticated && ( 
     <>
        <img src={user.picture} alt={user.name} />
        <span>{user.name}</span>
    </>
    )
  )
}

export default User