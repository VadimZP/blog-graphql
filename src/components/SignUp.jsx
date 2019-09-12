import React, { Component } from 'react';
import { Form, Button } from 'react-bootstrap';
import { Formik, Field } from 'formik';
import axios from 'axios';
import * as Yup from 'yup';

import CustomInput from 'components/shared/CustomInput';

const SignInSchema = Yup.object().shape({
  email: Yup.string()
    .email('Invalid email')
    .required('Required'),
  username: Yup.string()
    .min(2, 'Too Short!')
    .max(15, 'Too Long!')
    .matches(/^[a-zA-Z0-9_.-]*$/, { message: 'Username contains forbidden symbols' })
    .required('Required'),
  password: Yup.string()
    .min(6, 'Too Short!')
    .max(50, 'Too Long!')
    .matches(/^[a-zA-Z0-9_.-]*$/, { message: 'Password contains forbidden symbols' })
    .required('Required'),
  passwordConfirm: Yup.string()
     .oneOf([Yup.ref('password'), null], "Passwords must match")
     .required('Password confirm is required')
});



export default class SignInForm extends Component {
  handleSubmit = (values) => {
    const body = {
      query: `
        mutation {
          createUser(userInput: {email: "${values.email}", username: "${values.username}" password: "${values.password}"}) {
            email
          }
        }
      `,
    };
    axios.post('http://localhost:8000/graphql', body);
  }

  render() {
    return (
      <Formik
        initialValues={{
          email: '',
          username: '',
          password: '',
          passwordConfirm: '',
        }}
        validationSchema={SignInSchema}
        onSubmit={this.handleSubmit}
        render={(props) => (
          <Form onSubmit={props.handleSubmit}>
            <Form.Group>
              <Form.Label>Email</Form.Label>
              <Field name="email" type="email" component={CustomInput} />
            </Form.Group>
            <Form.Group>
              <Form.Label>Username</Form.Label>
              <Field name="username" type="text" component={CustomInput} />
            </Form.Group>
            <Form.Group>
              <Form.Label>Password</Form.Label>
              <Field name="password" type="password" component={CustomInput} />
            </Form.Group>
            <Form.Group>
              <Form.Label>Confirm Password</Form.Label>
              <Field name="passwordConfirm" type="password" component={CustomInput} />
            </Form.Group>
            <Button type="submit" block>Submit</Button>
          </Form>
        )}
      />
    );
  }
}
