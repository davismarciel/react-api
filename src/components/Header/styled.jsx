import styled from 'styled-components';
import { primaryColor } from '../../config/colors';

export const Nav = styled.nav`
  background: ${primaryColor};
  padding: 20px;
  display: flex;
  align-items: center;
  justify-content: center;

  a {
    color: #fff;
    margin: 0 10px 0 0;
    font-weight: bold;
  }
`;

export const Online = styled.div`
  width: 24px;
  height: 24px;
  border-radius: 50%;
  margin-left: 10px;
  animation: pulse 2s infinite;
  background-color: ${(props) => (props.online ? '#00FF00' : '#FF0000')};

  @keyframes pulse {
    0% {
      transform: scale(0.9);
    }
    50% {
      transform: scale(1);
    }
    100% {
      transform: scale(0.9);
    }
  }
`;
