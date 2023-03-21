import React from 'react';
import { Title, Paragraph } from './styled';
import { Container } from '../../styles/GlobalStyles';

export default function PageError() {
  return (
    <Container>
      <Title>404</Title>
      <Paragraph>Page not found</Paragraph>
    </Container>
  );
}
