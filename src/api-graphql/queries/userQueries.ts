export const GET_USERS = `
  query getUsers {
    users {
      id
      name
      email
    }
  }
`;

export const GET_USER = `
  query getUser($id: ID!) {
    user(id: $id) {
      id
      name
      email
    }
  }
`;
