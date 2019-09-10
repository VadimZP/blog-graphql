import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';

import Post from 'components/Post';

@inject('profileStore, postsStore')
@observer
class HomePage extends Component {
  componentDidMount() {
    const { postsStore } = this.props;

    
  }
  render() {
    return (
      <>
        <h1>Home page</h1>
        <ul className="posts-list">
          <Post />
        </ul>
      </>
    );
  }
}

export default HomePage;
