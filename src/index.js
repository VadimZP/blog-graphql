import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'mobx-react';

import './index.css';

import ProfileStore from './stores/ProfileStore';
import PostsStore from './stores/PostsStore';
import UsersStore from './stores/UsersStore';
import App from './App';

ReactDOM.render(
  <Provider
    profileStore={ProfileStore}
    postsStore={PostsStore}
    usersStore={UsersStore}
  >
    <App />
  </Provider>,
  document.getElementById('root'),
);
