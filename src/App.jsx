import React from 'react';
import {
  BrowserRouter as Router, Route, Redirect,
} from 'react-router-dom';
import HomePage from 'pages/HomePage';
import AuthPage from 'pages/AuthPage';
import SignInPage from 'pages/SignInPage';
import SignUpPage from 'pages/SignUpPage';

import './App.css';


function App() {
  return (
    <Router>
      <Redirect from="/" to="/auth" exact />
      <Route path="/auth" component={AuthPage} />
      <Route path="/signin" component={SignInPage} />
      <Route path="/signup" component={SignUpPage} />
    </Router>
  );
}

export default App;
