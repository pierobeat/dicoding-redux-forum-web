import React from 'react';
import PropTypes from 'prop-types';

function FieldError({ message }) {
  if (!message) return null;

  return <p style={{ color: 'red' }}>{message}</p>;
}

FieldError.propTypes = {
  message: PropTypes.string,
};

export default FieldError;
