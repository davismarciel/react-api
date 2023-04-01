import styled from 'styled-components';

export const AlunoContainer = styled.div`
  margin-top: 20px;

  div {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 5px 0;
  }
  div + div {
    border-top: 1px dotted #b33232;
  }

  Link {
    display: flex;
    justify-items: center;
  }
`;

export const ProfilePicture = styled.div`
  img {
    width: 50px;
    height: 50px;
    border-radius: 50%;
  }
`;
