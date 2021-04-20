const app = require('./app');
require('dotenv').config();

process.on('uncaughtException', (err) => {
  // can foward error to some central log like sentry
  console.log('UNCAUGHT EXCEPTION! 💥 Shutting down...');
  console.log(err);
});

const port = process.env.PORT || 3000;
const server = app.listen(port, () => {
  console.log(`App running on port ${port} ...`);
});

process.on('unhandledRejection', (err) => {
  // can foward error to some central log like sentry
  console.log('UNHANDLED REJECTION! 💥 Shutting down...');
  console.log(err);
});

process.on('SIGTERM', () => {
  console.log('👋 SIGTERM RECEIVED. Shutting down gracefully');
  server.close(() => {
    console.log('💥 Process terminated!');
  });
});
