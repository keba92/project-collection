import React from 'react';
import LoginButton from './LoginButton';
import LogoutButton from './LogoutButton';
import User from './User';

const Profile = () => {
  return (
     <div className = "log-block">
        <LoginButton />
        <LogoutButton />
        <User />
      </div>
    )
}

export default Profile
