const { AuthenticationError } = require('apollo-server-express');
const { User } = require('../models');
const { signToken, verifyResetToken } = require('../utils/auth');
const { generateResetToken } = require('../utils/auth');

const resolvers = {
  Query: {
    users: async () => {
      return User.find();
    },

    singleUser: async (parent, { userId }) => {
      return User.findOne({ _id: userId });
    },

    // By adding context to our query, we can retrieve the logged in user without specifically searching for them
    me: async (parent, args, context) => {
      if (context.user) {
        return User.findOne({ _id: context.user._id });
      }
      throw new AuthenticationError('You need to be logged in!');
    },

    getUserByEmail: async (parent, { email }) => {
      return User.findOne({ email });
    },
  },

  Mutation: {
    addUser: async (
      parent,
      {
        firstName,
        lastName,
        email,
        password
      }
    ) => {
      const user = await User.create({
        firstName,
        lastName,
        email,
        password
      });
      const token = signToken(user);
      return { token, user };
    },
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new AuthenticationError('No profile with this email found!');
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError('Incorrect password!');
      }

      const token = signToken(user);
      return { token, user };
    },

    updateUser: async (parent, args, context) => {
      if (context.user) {
        return User.findOneAndUpdate({ _id: context.user._id });
      }
      throw new AuthenticationError('You need to be logged in!');
    },

    generateResetToken: async (parent, { email }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new Error('User not found!');
      }

      // Generate the reset token
      const resetToken = generateResetToken(user._id);

      // Store the reset token in the database for the user
      user.resetToken = resetToken;
      await user.save();

      return user;
    },

    changePassword: async (parent, { resetToken, newPassword }) => {
      // Verify the reset token
      const userId = verifyResetToken(resetToken);

      if (!userId) {
        throw new AuthenticationError('Invalid reset token!');
      }

      // Find the user by the verified user ID
      const user = await User.findById(userId);

      if (!user) {
        throw new Error('User not found!');
      }

      // Update the user's password
      user.password = newPassword;
      user.resetToken = null;
      await user.save();

      return user;
    },
  },
};

module.exports = resolvers;
