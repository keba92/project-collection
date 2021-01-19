import React from 'react';
import UserPage from './UserPage';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Home from './Home';
import PrivateRoute from './privateRoute';
import ItemInfo from './ItemInfo';
import CreateItem from './CreateItem';
import EditItem from './EditItem';
import AdminPage from './AdminPage';
import EditCollection from './EditCollection';

function Body() {

  return (
    <div className='body-page'>
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/item/:id" component={ItemInfo} />
          <PrivateRoute exact path="/user/:id" component={UserPage} />
          <PrivateRoute exact path="/collection/:id" component={CreateItem} />
          <PrivateRoute exact path="/editItem/:id" component={EditItem} />
          <PrivateRoute exact path="/admin/:id" component={AdminPage} />
          <PrivateRoute exact path="/editCollection/:id" component={EditCollection} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default Body;