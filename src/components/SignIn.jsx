import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import { Formik, Field } from 'formik';
import * as Yup from 'yup';
import { observer, inject } from 'mobx-react';

import CustomInput from 'components/shared/CustomInput';

const SignInSchema = Yup.object().shape({
  email: Yup.string()
    .email('Invalid email')
    .required('Required'),
  password: Yup.string()
    .min(6, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
});

@inject('profileStore')
@observer
class SignInForm extends Component {
  handleSubmit = async (values) => {
    const { profileStore, history } = this.props;

    const loggedInUser = await profileStore.login(values.email)
    if(loggedInUser) {
      localStorage.setItem('email', loggedInUser);
      history.push('/home');
    }
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
          <Button type="submit" block>Submit {this.props.profileStore.getEmail}</Button>
        </Form>
        )}
      />
    );
  }
}

export default withRouter(SignInForm);