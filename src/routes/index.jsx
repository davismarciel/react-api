import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Login from '../pages/Login';
import PageError from '../pages/404';

export default function Routes() {
  return (
    <Switch>
      <Route exact path="/" component={Login} />
      <Route path="*" component={PageError} />
    </Switch>
  );
}
