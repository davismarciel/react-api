import React from 'react';
import { Switch } from 'react-router-dom';
// import { toast } from 'react-toastify';

import MyRoute from './MyRoute';
import Login from '../pages/Login';
import PageError from '../pages/404';

export default function Routes() {
  return (
    <Switch>
      <MyRoute exact path="/" component={Login} />
      <MyRoute path="*" component={PageError} />
    </Switch>
  );
}
