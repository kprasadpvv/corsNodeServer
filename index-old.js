const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();

// Define allowed origins
const allowedOrigins = ['http://example1.com', 'http://local.example1.com:3000', 'http://localhost:3000', 'http://local.example2.com:3000'];

// Configure CORS options
const corsOptions = {
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
};

app.use(cors(corsOptions));
app.use(express.static(path.join(__dirname, 'public')));
app.get('/test', (req, res) => {
  res.cookie('myCookie', 'cookieValue', { httpOnly: true, domain: 'example1.com'});
  res.sendFile(path.join(__dirname, 'public', 'test.html'));
});

app.get('/callTest', (req, res) => {
  console.log(req);
  res.json({ message: 'CORS test successful!' });
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
