import React from 'react';
import PropTypes from 'proptypes';
import { Form } from 'react-bootstrap';

const CustomInput = ({
  field,
  form: { touched, errors },
  ...props
}) => (
    <>
      <Form.Control
        {...field}
        {...props}
      />
      {touched[field.name]
        && errors[field.name] && <div className="error">{errors[field.name]}</div>}
    </>

  );


CustomInput.propTypes = {
  field: PropTypes.shape({
    name: PropTypes.string.isRequired,
  }).isRequired,
  form: PropTypes.shape({
    touched: PropTypes.bool.isRequired,
    errors: PropTypes.shape().isRequired,
  }).isRequired,
};

export default CustomInput;