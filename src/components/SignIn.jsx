import React, { Component } from 'react';
import { Form, Button } from 'react-bootstrap';
import { Formik, Field } from 'formik';
import axios from 'axios';
import * as Yup from 'yup';
import { observer, inject } from 'mobx-react';

const SignInSchema = Yup.object().shape({
  email: Yup.string()
    .email('Invalid email')
    .required('Required'),
  password: Yup.string()
    .min(6, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
});

const CustomInput = ({
  field, // { name, value, onChange, onBlur }
  form: { touched, errors }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
  ...props
}) => (
  <>
   <Form.Control
    {...field}
    {...props}
  />
    {touched[field.name] &&
      errors[field.name] && <div className="error">{errors[field.name]}</div>}
  </>
 
);

@inject('profileStore')
@observer
class SignInForm extends Component {
  componentDidMount() {
    console.log(this.props.profileStore.getEmail)
  }

  handleSubmit = async (values) => {
    const { profileStore } = this.props;

    const loggedInUser = await profileStore.login(values.email)
    console.log('loggedInUser:', loggedInUser)

  }

  render() {
    return (
      <Formik
        initialValues={{
            email: '',
            password: ''
        }}
        validationSchema={SignInSchema}
        onSubmit={this.handleSubmit}
        render={(props) => (
        <Form onSubmit={props.handleSubmit}>
          <Form.Group>
            <Form.Label>Email</Form.Label>
            <Field name="email" type={'email'} component={CustomInput}/>
          </Form.Group>
          <Form.Group>
            <Form.Label>Password</Form.Label>
            <Field name="password" type={'password'} component={CustomInput}/>
          </Form.Group>
          <Button type="submit" block>Submit `${this.props.profileStore.getEmail}`</Button>
        </Form>
        )}
      />
    );
  }
}

export default SignInForm;