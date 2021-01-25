import React, { memo } from 'react';
import { Link } from 'react-router-dom';
import CreateCollection from './CreateCollection';
import { useAuth0 } from "@auth0/auth0-react";
import Search from '../../HomePage/containers/Search';
import { useTranslation } from 'react-i18next';

function UserPage(props) {
  const { isAuthenticated } = useAuth0();
  const { t, i18n } = useTranslation();
  return (
    isAuthenticated && (
      <div className='user-page'>
        <div className='button-main'>
          <div className='navigation flex-button'>
              <Link className='back' to='/'>{t('backMainL')}</Link>
              <a className='back nav' href="#createCollect">Создать</a>
              <a className='back nav' href="#myCollect">Мои коллекции</a>
          </div>
          <Search/>
        </div>          
          <div className='body-user'>
              <CreateCollection idLink={props.location.pathname.slice(6)} />
          </div>
      </div>
    )
  )
}

export default memo(UserPage);