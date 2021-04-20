require('dotenv').config();
const { MongoClient } = require('mongodb');

const conn = process.env.NODE_ENV === 'testing' ? process.env.CONN_URL_TEST : process.env.CONN_URL;

module.exports = new MongoClient(conn, { useUnifiedTopology: true });
