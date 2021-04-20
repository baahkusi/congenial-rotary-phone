const client = require('../controllers/db');
const entries = require('./fixtures/getir.json');

// eslint-disable-next-line no-undef
before(async () => {
  console.time('Testing ...');
  await client.connect();
  const records = client.db('getir-case-study').collection('records');
  await records.insertMany(entries.records.map((r) => {
    const date = new Date(r.createdAt);
    return {
      counts: r.counts,
      key: r.key,
      value: r.value,
      createdAt: date,
    };
  }));
});

// eslint-disable-next-line no-undef
after(async () => {
  const records = client.db('getir-case-study').collection('records');
  await records.deleteMany({});
  client.close();
  console.timeEnd('Testing ...');
});
