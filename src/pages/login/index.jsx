import React from 'react';
import { useDispatch } from 'react-redux';
import { Container } from '../../styles/GlobalStyles';
import { Title, Paragraph } from './styled';

import * as exampleActions from '../../store/modules/example/actions';

export default function Login() {
  const dispatch = useDispatch();

  function handleClick(e) {
    e.preventDefault();

    dispatch(exampleActions.clicaBotaoRequest());
  }

  return (
    <Container>
      <Title isRed>
        Login
        <small>Oie</small>
      </Title>
      <Paragraph>Lorem ipsum dolor sit amet.</Paragraph>
      <a href="#">Clique aqui</a>
      <button type="button" onClick={handleClick}>
        Send
      </button>
    </Container>
  );
}
