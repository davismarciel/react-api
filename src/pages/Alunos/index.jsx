import React, { useEffect, useState } from 'react';
import { get } from 'lodash';
import { Link } from 'react-router-dom';
import {
  FaUserCircle,
  FaEdit,
  FaWindowClose,
  FaExclamation,
} from 'react-icons/fa';

import { Container } from '../../styles/GlobalStyles';
import axios from '../../services/axios';
import { AlunoContainer, ProfilePicture } from './styled';
import { Toast } from '../../preventToast';
import Loading from '../../components/Loading';

export default function Alunos() {
  const [alunos, setAluno] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function getData() {
      setIsLoading(true);
      const response = await axios.get('/alunos');
      setAluno(response.data);
      setIsLoading(false);
    }
    getData();
  }, []);

  const handleDeleteAsk = (e) => {
    e.preventDefault();
    const exclamation = e.currentTarget.nextSibling;
    exclamation.setAttribute('display', 'block');
    e.currentTarget.remove();
  };

  const handleDelete = async (e, id, index) => {
    e.persist();
    try {
      setIsLoading(true);
      await axios.delete(`/alunos/${id}`);
      const novosAlunos = [...alunos];
      novosAlunos.splice(index, 1);
      setAluno(novosAlunos);
      setIsLoading(false);
    } catch (err) {
      const status = get(err, 'response.status', 0);
      if (status === 401) {
        Toast('Você precisa fazer login', { type: 'error' });
      } else {
        Toast('Ocorreu um erro ao excluir um aluno', { type: 'error' });
      }
      setIsLoading(false);
    }
  };

  return (
    <Container>
      <Loading isLoading={isLoading} />
      <h1>Alunos</h1>
      <AlunoContainer>
        {alunos.map((aluno) => (
          <div key={String(aluno.id)}>
            <ProfilePicture>
              {get(aluno, 'Fotos[0].url', false) ? (
                <img src={aluno.Fotos[0].url} alt="" />
              ) : (
                <FaUserCircle size={55} />
              )}
            </ProfilePicture>

            <span>{aluno.nome}</span>
            <span>{aluno.email}</span>

            <Link to={`/aluno/${aluno.id}/edit`} title="Editar">
              <FaEdit size={23} />
            </Link>

            <Link
              onClick={handleDeleteAsk}
              to={`/aluno/${aluno.id}/delete`}
              title="Excluir"
            >
              <FaWindowClose size={23} />
            </Link>
            <FaExclamation
              onClick={(e) => handleDelete(e, aluno.id)}
              size={23}
              display="none"
              cursor="pointer"
            />
          </div>
        ))}
      </AlunoContainer>
    </Container>
  );
}
