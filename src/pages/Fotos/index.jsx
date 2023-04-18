import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { get } from 'lodash';
import { useDispatch } from 'react-redux';
import * as actions from '../../store/modules/auth/actions';
import { Container } from '../../styles/GlobalStyles';
import Loading from '../../components/Loading';
import { Title, Form } from './styled';

import axios from '../../services/axios';
import history from '../../services/history';
import { Toast } from '../../preventToast';

export default function Fotos({ match }) {
  const dispatch = useDispatch();
  const id = get(match, 'params.id', '');

  const [isLoading, setIsLoading] = useState(false);
  const [foto, setFoto] = useState('');

  useEffect(() => {
    const getData = async () => {
      try {
        setIsLoading(true);
        const { data } = await axios.get(`/alunos/${id}`);
        setFoto(get(data, 'Fotos.[0].url', ''));
        setIsLoading(false);
      } catch {
        setIsLoading(false);
        Toast('Erro ao obter imagem', { type: 'error' });
        history.push('/');
      }
    };
    getData();
  }, [id]);

  const handleChange = async (e) => {
    const file = e.target.files[0];
    const fotoUrl = URL.createObjectURL(file);

    setFoto(fotoUrl);

    const formData = new FormData();

    formData.append('aluno_id', id);
    formData.append('photo', file);

    try {
      setIsLoading(true);
      await axios.post('/photos/', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      Toast('Foto enviada com sucesso', { type: 'success' });
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      const status = get(error, 'response.status', 0);

      if (status === 401) {
        Toast('Faça login novamente', { type: 'info' });
        dispatch(actions.loginFailure());
      }
    }
  };

  return (
    <Container>
      <Loading isLoading={isLoading} />
      <Title>Foto</Title>

      <Form>
        <label htmlFor="foto">
          {foto ? <img src={foto} alt="Foto" /> : 'Selecionar foto'}
          <input type="file" id="foto" onChange={handleChange} />
        </label>
      </Form>
    </Container>
  );
}

Fotos.propTypes = {
  match: PropTypes.shape({}).isRequired,
};
