const express = require('express');
const app = express();
const httpServer = require('http').createServer(app);
const { ApolloServer } = require('apollo-server-express');
const path = require('path');
const { authMiddleware, generateResetToken } = require('./utils/auth');
const cors = require('cors');
const sendemail = require('./mailer/index')
const bodyParser = require('body-parser');
const { User } = require('./models');
// eslint-disable-next-line no-unused-vars


const { typeDefs, resolvers } = require('./schemas');
const db = require('./config/connection');

const PORT = process.env.PORT || 3001;

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: authMiddleware
});

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());
app.use(bodyParser.json());

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')));
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/build/index.html'));
  });
}

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/build/index.html'));
});

app.post('/api/reset-token', async (req, res) => {
  const { email } = req.body;

  try {
    // Find the user by email
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Generate the reset token
    const resetToken = generateResetToken(user._id);

    // Store the reset token in the database for the user
    user.resetToken = resetToken;
    await user.save();

    // Construct the password reset link
    // Update for Prod
    const resetLink = `http://localhost:3000/reset-password?token=${resetToken}`;

    // Send the password reset email
    sendemail(email, resetLink)

    // Return the reset token to the front-end
    res.json({ message: 'Password reset email sent' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Create a new instance of an Apollo server with the GraphQL schema
// eslint-disable-next-line no-unused-vars
const startApolloServer = async (typeDefs, resolvers) => {
  await server.start();
  server.applyMiddleware({ app });

  db.once('open', () => {
    httpServer.listen(PORT, () => {
      console.log(`API server running on port ${PORT}!`);
      console.log(`Use GraphQL at http://localhost:${PORT}${server.graphqlPath}`);
    });
  });
};


// Call the async function to start the server
startApolloServer(typeDefs, resolvers);
