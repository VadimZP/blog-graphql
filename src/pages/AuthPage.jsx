import React, { Component } from 'react';
import { BrowserRouter as Router, withRouter } from 'react-router-dom';

class Auth extends Component {
  componentDidMount() {
    const userEmail = localStorage.getItem('email');
    if (userEmail === null) {
      this.props.history.push('/signin');
      return;
    }
    this.props.history.push('/');
  }

  render() {
    return null;
  }
}

export default withRouter(Auth);
