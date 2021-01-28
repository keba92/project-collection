import React, { memo } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { useTranslation } from 'react-i18next';
import { Button } from 'react-bootstrap';

const LoginButton = () => {
  const { loginWithRedirect, isAuthenticated } = useAuth0();
  const { t, i18n } = useTranslation();

  return (
    !isAuthenticated && (
      <Button variant="outline-primary" onClick={() => loginWithRedirect()}>
        {t('logInB')}
      </Button>
    )
  );
};

export default memo(LoginButton);
