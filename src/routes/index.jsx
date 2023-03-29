import React from 'react';
import { Switch } from 'react-router-dom';

import MyRoute from './MyRoute';

import Aluno from '../pages/Aluno';
import Alunos from '../pages/Alunos';
import Login from '../pages/Login';
import Fotos from '../pages/Fotos';
import Register from '../pages/Register';
import PageError from '../pages/404';

export default function Routes() {
  return (
    <Switch>
      <MyRoute exact path="/" component={Alunos} isCLosed={false} />
      <MyRoute exact path="/aluno/:id/edit" component={Aluno} isCLosed />
      <MyRoute exact path="/aluno/" component={Aluno} isCLosed />
      <MyRoute exact path="/fotos/:id" component={Fotos} isCLosed />
      <MyRoute exact path="/login/" component={Login} isCLosed={false} />
      <MyRoute exact path="/register/" component={Register} isCLosed={false} />
      <MyRoute path="*" component={PageError} />
    </Switch>
  );
}
