import React from 'react';
import UserPage from './UserPage';
import { BrowserRouter, Route } from 'react-router-dom';

function Body() {

  return (
    <div>
      <BrowserRouter>
        <Route exact path="/" component={UserPage} />
      </BrowserRouter>
    </div>
  );
}

export default Body;