import GraphqlApi from './GraphqlApi';
import { GET_USERS, GET_USER } from './queries/userQueries.ts';

class UsersApi extends GraphqlApi {
  async getUsers() {
    return await this.post(GET_USERS);
  }

  async getUser(id: string) {
    return await this.post(GET_USER, { id });
  }
}

export default UsersApi;
