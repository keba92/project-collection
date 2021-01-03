import React from 'react';
import UserPage from './UserPage';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Home from './Home';
import PrivateRoute from './privateRoute';

function Body() {
  return (
    <div>
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Home} />
          <PrivateRoute exact path="/user" component={UserPage} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default Body;