import { observable, action, computed } from 'mobx';
import axios from 'axios';

class ProfileStore {
  @observable email = ''

  @observable username = ''

  @action
  async login(email) {
    let result;
    try {
      const body = {
        query: `
          mutation {
            login(loggingInput: {email: "${email}"}) {
              email
            }
          }
        `,
      };
      const { data: { data: { login }} } = await axios.post('http://localhost:8000/graphql', body);
      this.email = login.email;
      result = login.email;
    } catch (e) {
      throw new Error('Something went wrong in login action');
    }
    return result;
  }

  @computed 
  get getEmail() {
    return this.email;
  }
}

export default new ProfileStore();
