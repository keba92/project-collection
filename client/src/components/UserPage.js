import React from 'react';
import { Link } from 'react-router-dom';
import CreateCollection from './CreateCollection';
import { useAuth0 } from "@auth0/auth0-react";

function UserPage() {
  const { isAuthenticated } = useAuth0();
  return (
    isAuthenticated && (
      <div className='user-page'>
          <div className='navigation'>
              <Link to='/'>Перейти на главную страницу</Link>
          </div>
          <div className='body-user'>
              <CreateCollection/>
          </div>
      </div>
    )
  )
}

export default UserPage;