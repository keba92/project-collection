import React, { memo } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const UserProfileButton = () => {
  const { user, isAuthenticated } = useAuth0();
  const { t, i18n } = useTranslation();

  return (
    isAuthenticated && (
      <Link className="back" to={`/user/${user.sub}`}>
        {t('userPageL')}
      </Link>
    )
  );
};

export default memo(UserProfileButton);
