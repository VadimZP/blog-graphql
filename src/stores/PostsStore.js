import { observable, computed, action, toJS } from 'mobx';
import axios from 'axios';

class PostsStore {
    @observable posts = []

    @action
    async fetchPosts (userId) {
      console.log(userId)
      let result;
      try {
        const body = {
          query: `
            query Posts($userId: String!) {
              posts(userId: $userId) {
                _id
                text
              }
            }
          `,
          variables: {
            userId: userId
          }
        };
        const { data: { data: { posts } } } = await axios.post('http://localhost:8000/graphql', body);
        this.posts = posts;
        result = posts;
        console.log("TCL: PostsStore -> fetchPosts -> data", posts)
      } catch (e) {
        throw new Error('Something went wrong in fetchPosts action');
      }
      return result;
    }

    @computed get getPosts() {
        return toJS(this.posts);
    }
}

export default new PostsStore();