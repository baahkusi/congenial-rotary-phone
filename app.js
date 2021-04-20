const express = require('express');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const routes = require('./routes');

// Start express app
const app = express();

// 1) GLOBAL MIDDLEWARES

// Set security HTTP headers
app.use(helmet());

app.use(morgan('dev'));

app.use(bodyParser.json());

// Limit requests from same API
const limiter = rateLimit({
  max: 100,
  windowMs: 60 * 60 * 1000,
  message: 'Too many requests from this IP, please try again in an hour!',
});
app.use(limiter);

// 3) ROUTES
app.use('/api/v1', routes);
app.use('/api/v1/health', (req, res) => {
  res.status(200).send("I'm alive ...");
});

app.all('*', (req, res) => {
  res.status(404).send(`Can't find ${req.originalUrl} on this server!`);
});

module.exports = app;
