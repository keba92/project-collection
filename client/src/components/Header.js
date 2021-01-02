import React from 'react';
import Profile from './Profile';
import Search from './Search';

function Header() {

  return (
    <div className="header">
      <Search />
      <Profile />
    </div>
  );
}

export default Header;