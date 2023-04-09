import React, { useState } from 'react';

import { toast } from 'react-toastify';
import { isEmail } from 'validator';
import { get } from 'lodash';

import { Container } from '../../styles/GlobalStyles';
import { Form } from './styled';

import axios from '../../services/axios';
import history from '../../services/history';

import Loading from '../../components/Loading';

export default function Register() {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    let formError = false;

    if (nome.length < 3 || nome.length > 20) {
      formError = true;
      toast.error('Nome deve ter entre 3 e 20 caracteres');
    }
    if (!isEmail(email)) {
      formError = true;
      toast.error('Email inválido');
    }
    if (password.length < 3 || password.length > 30) {
      formError = true;
      toast.error('Senha deve ter entre 3 e 30 caracteres');
    }

    if (formError) return;

    setIsLoading(true);
    try {
      await axios.post('/users/', {
        nome,
        password,
        email,
      });
      setIsLoading(false);
      toast.success('Conta criada com sucesso!');
      history.push('/login');
    } catch (e) {
      const errors = get(e, 'response.data.errors', []);
      errors.map((error) => toast.error(error));
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Container>
      <Loading isLoading={isLoading} />
      <h1>Crie sua conta</h1>
      <Form onSubmit={handleSubmit}>
        <label htmlFor="nome">
          Nome
          <input
            type="text"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
          />
        </label>
        <label htmlFor="email">
          Email
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>
        <label htmlFor="password">
          Senha
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <button type="submit">Criar conta</button>
      </Form>
    </Container>
  );
}
