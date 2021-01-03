import React from 'react';
import { Link } from 'react-router-dom';
import CreateCollection from './CreateCollection';

function UserPage() {
  return (
    (localStorage.getItem('auth')=='true') && (
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