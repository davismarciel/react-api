import React, { useEffect, useState } from 'react';
import { get } from 'lodash';
import { Link } from 'react-router-dom';
import { FaUserCircle, FaEdit, FaWindowClose } from 'react-icons/fa';

import { Container } from '../../styles/GlobalStyles';
import axios from '../../services/axios';
import { AlunoContainer, ProfilePicture } from './styled';

export default function Alunos() {
  const [aluno, setAluno] = useState([]);

  useEffect(() => {
    async function getData() {
      const response = await axios.get('/aluno');
      setAluno(response.data);
    }
    getData();
  }, []);
  return (
    <Container>
      <h1>Aluno</h1>
      <AlunoContainer>
        {aluno.map((aluno) => (
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

            <Link to={`/aluno'${aluno.id}/edit`}>
              <FaEdit size={16} />
            </Link>

            <Link to={`/aluno'${aluno.id}/delete`}>
              <FaWindowClose size={16} />
            </Link>
          </div>
        ))}
      </AlunoContainer>
    </Container>
  );
}
