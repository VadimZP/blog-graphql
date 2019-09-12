import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';

import Post from 'components/Post';

@inject('postsStore')
@observer
class HomePage extends Component {
  async componentDidMount() {
    const { postsStore } = this.props;
    await postsStore.fetchPosts('5d77f6d72603a81dffcac840')
  }
  render() {
    const { postsStore } = this.props;
    console.log("TCL: HomePage -> componentDidMount -> posts", postsStore.getPosts)
    return (
      <>
        <h1>Home page</h1>
        <ul className="posts-list">
          {postsStore.getPosts.map(item => {
            return <Post key={item._id} text={item.text} />
          })}
        </ul>
      </>
    );
  }
}

export default HomePage;
