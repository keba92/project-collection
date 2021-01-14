import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { Button } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';


const LogoutButton = () => {
  const { logout, isAuthenticated, user } = useAuth0();
  const { t, i18n } = useTranslation();

  const out = () => {
    logout();
    localStorage.clear();
  }

  return (
    isAuthenticated && (
      <Button onClick={() => {
        out();
      }}>
        {t('logOutB')}
      </Button>
    )
  )
}

export default LogoutButton
