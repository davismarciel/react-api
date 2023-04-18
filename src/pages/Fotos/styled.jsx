// eslint-disable-next-line import/no-extraneous-dependencies
import styled from 'styled-components';
import * as color from '../../config/colors';

export const Title = styled.h1`
  text-align: center;
`;

export const Form = styled.form`
  label {
    width: 180px;
    height: 180px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: #eee;
    border: 5px dotted ${color.primaryColor};
    margin: 30px auto;
    cursor: pointer;
    border-radius: 50%;

    img {
      width: 180px;
      height: 180px;
      border: 5px dotted ${color.primaryColor};
      border-radius: 50%;
    }
  }
  input {
    display: none;
  }
`;
