require('dotenv').config();
const express = require('express');
const basicAuth = require('express-basic-auth');

const app = express();
const port = process.env.PORT || 3000;


// Basic Auth middleware configuration
const auth = basicAuth({
    users: { [process.env.USERNAME]: process.env.PASSWORD },
    challenge: true,
    realm: 'Secret Area',
    unauthorizedResponse: 'Invalid credentials',
    onFailure: (req, res, next, err) => {
        console.log('Auth failed:', err);
        console.log('Request headers:', req.headers);
        res.status(401).send('Invalid credentials');
    }
});

// Public route
app.get('/', (req, res) => {
    res.send(`
      <!DOCTYPE html>
      <html>
      <head>
          <title>Public Route</title>
      </head>
      <body>
          <h1>Hello, user!! This is a public route.</h1>
          <p>You can see the secret message by clicking the button below.</p>
          <button onclick="window.location.href='/secret'">Go to Secret</button>
      </body>
      </html>
    `);
});


// Protected route with Basic Auth
app.get('/secret', auth, (req, res) => {
    console.log('Auth successful, sending secret message');
    console.log('Authenticated user:', req.auth);
    res.send(process.env.SECRET_MESSAGE);
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error('Error:', err);
    if (err.name === 'UnauthorizedError') {
        res.status(401).send('Invalid credentials');
    } else {
        res.status(500).send('Something went wrong!');
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
     
}); 