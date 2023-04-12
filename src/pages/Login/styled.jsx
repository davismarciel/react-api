// eslint-disable-next-line import/no-extraneous-dependencies
import styled from 'styled-components';
import * as colors from '../../config/colors';

export const Title = styled.h1`
  color: #b73a3a
`;

export const Form = styled.form`

  display: flex;
  flex-direction: column;
  margin-top: 20px;

  label {
    display: flex;
    flex-direction: column;
    margin-bottom: 20px;
  }

  input {
    height: 40px;
    font-size: 18px;
    border: 1px solid #ddd;
    padding: 0 10px;
    border-radius: 5px;
    
    &:focus {
      border: 1px solid ${colors.primaryColor};
    }
  }
`;
