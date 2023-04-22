const jwt = require('jsonwebtoken');
const Unauthtorized = require('../errors/Unauthtorized');

const { JWT_SECRET = 'some-secret-key' } = process.env;

// eslint-disable-next-line consistent-return
module.exports = (req, res, next) => {
  let payload;

  try {
    const { authorization } = req.headers;

    if (!authorization || !authorization.startsWith('Bearer ')) {
      throw new Unauthtorized('Необходима авторизация');
    }
    const token = authorization.replace('Bearer ', '');

    payload = jwt.verify(token, JWT_SECRET);
  } catch (err) {
    return next(new Unauthtorized('Необходима авторизация'));
  }

  req.user = payload;
  next();
};
