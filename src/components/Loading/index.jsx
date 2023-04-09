import React from 'react';
import PropTypes from 'prop-types';
import { Container } from './styled';

export default function Loading({ isLoading }) {
  if (!isLoading) return React.Fragment;
  return (
    <Container>
      <div />
      <span className="loading" />
    </Container>
  );
}

Loading.defaultProps = {
  isLoading: false,
};

Loading.propTypes = {
  isLoading: PropTypes.bool,
};
