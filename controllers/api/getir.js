const validator = require('validator');

const client = require('../db');

const validate = ({
  startDate, endDate, minCount, maxCount,
}) => {
  let code = 0;
  let msg = '';

  if (!validator.isDate(startDate)) {
    code = 1;
    msg = 'Invalid Input for startDate';
  }

  if (!validator.isDate(endDate)) {
    code = 1;
    msg = 'Invalid Input for endDate';
  }

  if (!validator.isInt(`${minCount}`)) {
    code = 1;
    msg = 'Invalid Input for minCount';
  }

  if (!validator.isInt(`${maxCount}`)) {
    code = 1;
    msg = 'Invalid Input for maxCount';
  }

  return { code, msg };
};

module.exports = async (req, res) => {
  try {
    const {
      startDate, endDate, minCount, maxCount,
    } = req.body;

    // validate input
    const validateInput = validate({
      startDate, endDate, minCount, maxCount,
    });
    if (validateInput.code !== 0) {
      return res.status(400).json(validateInput);
    }

    // we only need a single mongodb connection
    if (!client.isConnected()) await client.connect();
    const records = await client.db('getir-case-study')
      .collection('records')
      .aggregate([
        {
          $match: {
            createdAt: {
              $gte: new Date(startDate),
              $lte: new Date(endDate),
            },
          },
        }, {
          $project: {
            key: 1,
            createdAt: 1,
            _id: 0,
            totalCount: {
              $sum: '$counts',
            },
          },
        }, {
          $match: {
            totalCount: {
              $gt: minCount,
              $lt: maxCount,
            },
          },
        },
      ])
      .toArray();

    return res.status(200).json({
      code: 0,
      msg: 'Sucess',
      records,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      code: 1,
      msg: err.message,
    });
  }
};
