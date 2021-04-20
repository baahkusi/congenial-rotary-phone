const supertest = require('supertest');
const { expect } = require('chai');
const app = require('../app');

// eslint-disable-next-line no-undef
describe('Test POST Endpoint', () => {
  // eslint-disable-next-line no-undef
  it('Should return 200 response and non-empty records', async () => {
    const resp = await supertest(app)
      .post('/api/v1/getir')
      .send({
        startDate: '2010-01-01',
        endDate: '2018-01-01',
        minCount: 100,
        maxCount: 300,
      });

    expect(resp.status, 'Request Status').to.equal(200);
    expect(resp.body.code, 'Response Code').to.equal(0);
    // eslint-disable-next-line no-unused-expressions
    expect(resp.body.records, 'Records').to.not.be.empty;
    console.log(resp.body);
  });
});
