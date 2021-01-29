import React, { memo } from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import { useAuth0 } from '@auth0/auth0-react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { CSVLink } from 'react-csv';
import Search from '../containers/Search';
import AdminProfileButton from './AdminProfileButton';
import UserProfileButton from './UserProfileButton';

function NavMenu(props) {
  const { page, id, headersCSV } = props;
  const { isAuthenticated } = useAuth0();
  const { t, i18n } = useTranslation();
  return (
    isAuthenticated && (
      <Navbar className='navMenu' collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="mr-auto">
            {page == 'home' && (
              <>
                <AdminProfileButton />
                <UserProfileButton />
              </>
            )}
            {(page == 'admin' || page == 'item' || page == 'collect' || page == 'createItem') && (
              <Link className="back" to="/">
                {t('backMainL')}
              </Link>
            )}
            {page == 'editItem' && (
              <Link className="back" to={`/item/${id}`}>
                {t('backItemL')}
              </Link>
            )}
            {page == 'editCollect' && (
              <Link className="back" to={`/user/${id}`}>
                {t('backCollectL')}
              </Link>
            )}
            {page == 'collect' && (
              <>
                <a className="back nav" href="#createCollect">
                  {t('createL')}
                </a>
                <a className="back nav" href="#myCollect">
                  {t('myCollectL')}
                </a>
              </>
            )}
            {page == 'createItem' && id == localStorage.getItem('userId') && (
              <Link className="back" to={`/user/${id}`}>
                {t('backCollectL')}
              </Link>
            )}
            {page == 'createItem' && (
              <>
                <a className="back nav" href="#createItems">
                  {t('createL')}
                </a>
                <a className="back nav" href="#myItems">
                  {t('myItemsL')}
                </a>
              </>
            )}
            {page == 'createItem' && headersCSV && (
              <CSVLink className="back" data={headersCSV} filename="collection.csv" separator={';'}>
                Download
              </CSVLink>
            )}
          </Nav>
        </Navbar.Collapse>
        <Search />
      </Navbar>
    )
  );
}

export default memo(NavMenu);
