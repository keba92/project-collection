import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { useTranslation } from 'react-i18next';

const LoginButton = () => {
  const { loginWithRedirect, isAuthenticated } = useAuth0();
  const { t, i18n } = useTranslation();

  return (
    !isAuthenticated && (
      <button onClick={() => loginWithRedirect()}>
        {t('logInB')}
      </button>
    )
  )
}

export default LoginButton
