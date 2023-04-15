/* eslint-disable consistent-return */
import React, { useState, useEffect } from 'react';
import { get } from 'lodash';
import { isEmail, isInt, isFloat } from 'validator';
import PropTypes, { func, number } from 'prop-types';
import { Toast } from '../../preventToast';
import { Container } from '../../styles/GlobalStyles';
import { Form } from './styled';
import Loading from '../../components/Loading';
import axios from '../../services/axios';
import history from '../../services/history';

export default function Aluno({ match }) {
  const id = get(match, 'params.id', 0);

  const [nome, setNome] = useState('');
  const [sobrenome, setSobrenome] = useState('');
  const [email, setEmail] = useState('');
  const [idade, setIdade] = useState('');
  const [peso, setPeso] = useState('');
  const [altura, setAltura] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!id) return;

    async function getData() {
      try {
        setIsLoading(true);
        const { data } = await axios.get(`/alunos/${id}`);
        const Foto = get(data, 'Fotos[0].url', '');

        setNome(data.nome);
        setSobrenome(data.sobrenome);
        setEmail(data.email);
        setIdade(data.idade);
        setPeso(data.peso);
        setAltura(data.altura);
        setIsLoading(false);
      } catch (err) {
        setIsLoading(false);
        const status = get(err, 'response.status', 0);

        if (status === 401) {
          return Toast('Aluno não existe', { type: 'error' });
        }
        history.push('/');
      }
    }
    getData();
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();

    let formErrors = false;

    if (!nome || nome !== 'string' || nome.length < 3 || nome.length > 255) {
      formErrors = true;
      Toast('Nome inválido', { type: 'error' });
    }

    if (
      !sobrenome ||
      sobrenome !== 'string' ||
      sobrenome.length < 2 ||
      sobrenome.length > 255
    ) {
      formErrors = true;
      Toast('Sobrenome inválido', { type: 'error' });
    }

    if (!isEmail(email)) {
      formErrors = true;
      Toast('Email inválido', { type: 'error' });
    }
    if (!idade || !isInt(String(idade))) {
      formErrors = true;
      Toast('Idade inválida', { type: 'error' });
    }

    if (!peso || !isFloat(String(peso))) {
      formErrors = true;
      Toast('Peso inválido', { type: 'error' });
    }

    if (!altura || !isFloat(String(altura))) {
      formErrors = true;
      Toast('Altura inválida', { type: 'error' });
    }

    // eslint-disable-next-line no-useless-return
    if (formErrors) return;
  };

  return (
    <Container>
      <Loading isLoading={isLoading} />
      <h1>{id ? 'Editar aluno' : 'Novo aluno'}</h1>
      <Form onSubmit={handleSubmit}>
        Nome
        <input
          value={nome}
          type="text"
          onChange={(e) => setNome(e.target.value)}
        />
        Sobrenome
        <input
          value={sobrenome}
          type="text"
          onChange={(e) => setSobrenome(e.target.value)}
        />
        Email
        <input
          value={email}
          type="text"
          onChange={(e) => setEmail(e.target.value)}
        />
        Idade
        <input
          value={idade}
          type="text"
          onChange={(e) => setIdade(e.target.value)}
        />
        Peso
        <input
          value={peso}
          type="text"
          onChange={(e) => setPeso(e.target.value)}
        />
        Altura
        <input
          value={altura}
          type="text"
          onChange={(e) => setAltura(e.target.value)}
        />
        <button type="submit">{id ? 'Editar' : 'Cadastrar'}</button>
      </Form>
    </Container>
  );
}

Aluno.propTypes = {
  match: PropTypes.shape({}).isRequired,
};
