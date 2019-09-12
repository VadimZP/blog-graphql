import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';


@inject('postsStore')
@observer
class Wall extends Component {
  componentDidMount() {
    // const { postsStore: {posts}} = this.props;
    // console.log(posts)
  }

  render() {
    // console.log(posts)
    return (
    <p>Wall</p>
    );
  }
}

export default Wall;