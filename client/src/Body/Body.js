import React from 'react';
import UserPage from './UserPage/containers/UserPage';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Home from './HomePage/containers/Home';
import PrivateRoute from './privateRoute';
import ItemInfo from './ItemPage/containers/ItemInfo';
import CreateItem from './UserPage/containers/CreateItem';
import EditItem from './ItemPage/containers/EditItem';
import AdminPage from '../Admin/containers/AdminPage';
import EditCollection from './UserPage/containers/EditCollection';

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