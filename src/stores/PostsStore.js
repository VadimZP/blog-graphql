import { observable, computed, action } from 'mobx';

export default class PostsStore {
    @observable posts = []

    @action
    async fetchPosts = () => {
        
    }
}