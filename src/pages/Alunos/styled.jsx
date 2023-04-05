import styled from 'styled-components';

export const AlunoContainer = styled.div`
  margin-top: 20px;
  div {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 5px 0;
  }
  div + div {
    border-top: 1px solid #eee;
  }

  span {
    margin: auto;
  }

  a {
    display: flex;
    justify-items: center;
    align-items: center;
    padding: 20px;
  }
`;

export const ProfilePicture = styled.div`
  img {
    width: 50px;
    height: 50px;
    border-radius: 50%;
  }

`;
