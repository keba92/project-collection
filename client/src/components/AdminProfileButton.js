import React, { useState, useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { Link } from 'react-router-dom';

const AdminProfileButton = () => {
  const { user, isAuthenticated } = useAuth0();
  const admin = JSON.parse(localStorage.getItem('arrAdmins'))

  return (
    (isAuthenticated && admin.length !=0 && admin.includes(user.sub)) && (
      <Link className='back' to={`/admin/${user.sub}`}>
        Кабинет Admin
      </Link>
    )
  )
}

export default AdminProfileButton