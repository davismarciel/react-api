// eslint-disable-next-line import/no-extraneous-dependencies
import styled from 'styled-components';
import * as color from '../../config/colors';

export const Form = styled.form`
  margin-top: 20px;
  display: flex;
  flex-direction: column;

  input {
    display: flex;
    height: 40px;
    margin-bottom: 20px;
    border: 1px solid #ddd;
    border-radius: 4px;
    padding: 0 10px;
  }
`;

export const ProfilePicture = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 0 25px;
  position: relative;

  img {
    width: 180px;
    height: 180px;
    border-radius: 50%;
    border: 4px solid ${color.primaryColor};
  }

  a {
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    bottom: 0;
    border-radius: 50%;
  }
`;

export const Title = styled.h1`
  padding: 0 0 10px;
  text-align: center;
`;
