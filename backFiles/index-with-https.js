const express = require('express');
const cors = require('cors');
const https = require('https');
const fs = require('fs');
const helmet = require('helmet');
const path = require('path');

const app = express();
//app.use(helmet());
const allowedOrigins = ['https://example1.com', 'https://local.example1.com:3000', 'https://localhost:3000'];

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
  exposedHeaders: ['Access-Control-Allow-Origin'] 
};

app.use(cors(corsOptions));

app.use(express.static(path.join(__dirname, 'public')));

app.get('/test', (req, res) => {
  res.cookie('myCookie', 'cookieValue', { httpOnly: true, domain: 'example1.com', sameSite: 'none', secure: true});
  res.sendFile(path.join(__dirname, 'public', 'test.html'));
});

app.get('/callTest', (req, res) => {
  console.log(req);
  res.json({ message: 'CORS test successful!' });
});

// Start the server
const PORT = process.env.PORT || 3000;
const httpsOptions = {
  key: fs.readFileSync('server.key'),
  cert: fs.readFileSync('server.cert')
};
https.createServer(httpsOptions, app).listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
