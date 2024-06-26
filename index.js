const express = require('express');
const cors = require('cors');
const https = require('https');
const fs = require('fs');
const helmet = require('helmet');
const path = require('path');

const app = express();
//app.use(helmet());
const allowedOrigins = ['https://example1.com', 'https://local.example2.com:3000', 'https://local.example1.com:3000', 'https://localhost:3000', 'local.example1.com:3000'];
// Configure CORS options
const corsOptions = {
  /* origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  }, */
  origin: true,
  allowedHeaders: ['Content-Type', 'Authorization', 'crossDomain', 'cookies', 'Set-Cookie'],
  /* allowPreFlight: true,
  allowPrivateOrigins: true,
  allowPrivateNetworks: true, */
  credentials: true,
  exposedHeaders: ['Content-Type', 'Authorization', 'crossDomain', 'cookies', 'Set-Cookie'],
  methods: 'GET, POST, PUT, DELETE, OPTIONS',
  maxAge: 3600000,
};

app.use(cors(corsOptions));
/* app.use(cors(corsOptions), (req, res, next) => {
  res.setHeader('Access-Control-Allow-Credentials', true);
  //res.append('Access-Control-Allow-Origin', 'https://local.example1.com:3000');
  res.setHeader('Access-Control-Allow-Origin', 'https://local.example1.com:3000');
  next();
}); */

app.use(express.static(path.join(__dirname, 'public')));
app.options('*', cors()) // include before other routes
app.get('/test', (req, res) => {
  res.cookie('cookieNone', 'SameSiteNone', { httpOnly: false, domain: 'local.example1.com', sameSite: 'none', secure: true, maxAge: 3600000,});
  res.cookie('cookieLax', 'SameSiteLax', { httpOnly: false, domain: 'example1.com', sameSite: 'lax', secure: true});
  res.cookie('cookieDefault', 'SameSiteDefault', { httpOnly: true, domain: 'example1.com'});
  res.sendFile(path.join(__dirname, 'public', 'test.html'));
  console.log(`response sent: ${res}`);
});

app.get('/sameSite', (req, res) => {
  console.log(req);
  console.log(`response sent for callTest: ${res}`);
  res.json({ message: 'SameSite test successful!' });
});

app.get('/set-example-cookie', (req, res) => {
  res.cookie('IDB2B-INTERNAL', 'Testcookieon2' , { httpOnly: true, domain: 'example2.com', sameSite: 'none', secure: true, maxAge: 3600000,});
  res.json({ message: 'CORS test successful!' });
});

app.post('/crossSite', (req, res) => {
  res.json({ message: 'CORS test successful!' });
});

// Start the server
const PORT = 3000;
const httpsOptions = {
  key: fs.readFileSync('server.key'),
  cert: fs.readFileSync('server.cert')
};
https.createServer(httpsOptions, app).listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});