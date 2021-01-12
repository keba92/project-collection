import React from 'react';
import { Link } from 'react-router-dom';
import CreateCollection from './CreateCollection';
import { useAuth0 } from "@auth0/auth0-react";
import Search from './Search';

function UserPage(props) {
  const { isAuthenticated } = useAuth0();
  return (
    isAuthenticated && (
      <div className='user-page'>
        <Search/>
          <div className='navigation'>
              <Link className='back' to='/'>Перейти на главную страницу</Link>
          </div>
          <div className='body-user'>
              <CreateCollection idLink={props.location.pathname.slice(6)} />
          </div>
      </div>
    )
  )
}

export default UserPage;