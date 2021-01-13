import React, { useState, useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const AdminProfileButton = () => {
  const { user, isAuthenticated } = useAuth0();
  const { t, i18n } = useTranslation();
  const admin = JSON.parse(localStorage.getItem('arrAdmins'))

  return (
    (isAuthenticated && admin.length !=0 && admin.includes(user.sub)) && (
      <Link className='back' to={`/admin/${user.sub}`}>
        {t('adminPageL')}
      </Link>
    )
  )
}

export default AdminProfileButton