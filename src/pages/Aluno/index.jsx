/* eslint-disable consistent-return */
import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { get } from 'lodash';
import { isEmail, isInt, isFloat } from 'validator';
import PropTypes from 'prop-types';
import { FaUserCircle, FaEdit } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { Toast } from '../../preventToast';
import { Container } from '../../styles/GlobalStyles';
import { Form, Title, ProfilePicture } from './styled';
import Loading from '../../components/Loading';
import axios from '../../services/axios';
import history from '../../services/history';
import * as actions from '../../store/modules/auth/actions';

export default function Aluno({ match }) {
  const id = get(match, 'params.id', '');

  const [nome, setNome] = useState('');
  const [sobrenome, setSobrenome] = useState('');
  const [email, setEmail] = useState('');
  const [idade, setIdade] = useState('');
  const [peso, setPeso] = useState('');
  const [altura, setAltura] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [foto, setFoto] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!id) return;

    async function getData() {
      try {
        setIsLoading(true);
        const { data } = await axios.get(`/alunos/${id}`);
        const Foto = get(data, 'Fotos[0].url', '');
        setFoto(Foto);

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

  const handleSubmit = async (e) => {
    e.preventDefault();

    let formErrors = false;

    if (nome.length < 3 || nome.length > 255) {
      formErrors = true;
      Toast('Nome inválido', { type: 'error' });
    }

    if (sobrenome.length < 2 || sobrenome.length > 255) {
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

    if (formErrors) return;

    try {
      setIsLoading(true);
      if (id) {
        await axios.put(`/alunos/${id}`, {
          nome,
          sobrenome,
          email,
          idade,
          peso,
          altura,
        });
        Toast('Aluno(a) editado(a)', { type: 'success' });
      } else {
        const { data } = await axios.post(`/alunos/`, {
          nome,
          sobrenome,
          email,
          idade,
          peso,
          altura,
        });
        Toast('Aluno(a) criado(a) editado', { type: 'success' });
        history.push(`/aluno/${data.id}/edit`);
      }
      setIsLoading(false);
    } catch (error) {
      const status = get(error, 'response.status', 0);
      const data = get(error, 'response.data', {});
      const errors = get(error, 'response.data.errors', []);

      if (errors.length > 0) {
        errors.map((error) => Toast(error, { type: 'error' }));
      } else {
        Toast('Erro desconhecido', { type: 'error' });
      }

      if (status === 401) dispatch(actions.loginFailure());
    }
  };

  return (
    <Container>
      <Loading isLoading={isLoading} />
      <Title>{id ? 'Editar aluno' : 'Novo aluno'}</Title>

      {id && (
        <ProfilePicture>
          {foto ? (
            <img src={foto} alt={`Foto de ${nome}`} />
          ) : (
            <FaUserCircle size={180} />
          )}
          <Link to={`/fotos/${id}`}>
            <FaEdit title="Editar foto" size={24} />
          </Link>
        </ProfilePicture>
      )}

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
