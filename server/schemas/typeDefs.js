const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    _id: ID
    firstName: String
    lastName: String
    email: String
    password: String
    resetToken: String
  }

  type Auth {
    token: ID!
    user: User
  }

  type Query {
    users: [User]!
    singleUser(userId: ID!): User
    me: User
    getUserByEmail(email: String!): User
  }

  type Mutation {
    addUser(
      firstName: String!
      lastName: String!
      email: String!
      password: String!
    ): Auth
    login(email: String!, password: String!): Auth
    updateUser: User
    generateResetToken(email: String!): User
    changePassword( resetToken: String!, newPassword: String!): User
  }
`;

module.exports = typeDefs;
