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
const stripe = require('stripe')('sk_test_51NEywCL7TQcQn1HDMfX82zDNhMK6FHN7A2D5lxhflU1aqjNkRKk3yNGUK7p0IVWlztwhJDAOqKs4xA5A3Ok1UuQD00CLLN01dA');

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

app.post('/api/create-checkout-session', async (req, res) => {
  try {
    const { productId, quantity } = req.body;

    // Products stored on server
    const products = {
      0: {
        name: 'Private',
        price: 4000,
      },
      1: {
        name: 'Group',
        price: 2500,
      },
      2: {
        name: 'Recruiting',
        price: 9900,
      },
    };

    // Retrieve the selected product based on productId
    const product = products[productId];

    if (!product) {
      return res.status(400).json({ error: 'Invalid product selected' });
    }

    // Create the Stripe Checkout session using the product information
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: product.name,
            },
            unit_amount: product.price, // Price is already in cents
          },
          quantity: parseInt(quantity),
        },
      ],
      mode: 'payment',
      success_url: 'http://localhost:3000/success', // Redirect URL on successful payment
      cancel_url: 'http://localhost:3000/MyAccount', // Redirect URL on canceled payment
    });

    res.json({ sessionId: session.id });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while creating the Checkout session' });
  }
});


app.get('/api/checkout-session/:sessionId', async (req, res) => {
  try {
    const { sessionId } = req.params;

    // Retrieve the checkout session data from Stripe
    const session = await stripe.checkout.sessions.retrieve(sessionId);

    // Return the checkout session URL to the front-end
    res.json({ url: session.url });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while retrieving the Checkout session' });
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
