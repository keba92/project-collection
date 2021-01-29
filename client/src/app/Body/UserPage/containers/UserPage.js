import React, { memo } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { useTranslation } from 'react-i18next';
import CreateCollection from './CreateCollection';
import NavMenu from '../../HomePage/components/NavMenu';

function UserPage(props) {
  const { isAuthenticated } = useAuth0();
  const { t, i18n } = useTranslation();
  return (
    isAuthenticated && (
      <div className="user-page">
        <NavMenu page="collect" />
        <div className="body-user">
          <CreateCollection idLink={props.location.pathname.slice(6)} />
        </div>
      </div>
    )
  );
}

export default memo(UserPage);
