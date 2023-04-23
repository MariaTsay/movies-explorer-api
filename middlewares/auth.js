const jwt = require('jsonwebtoken');
const Unauthtorized = require('../errors/Unauthtorized');
const { ERROR_401_MESSAGE } = require('../utils/constants');

const { JWT_SECRET = 'some-secret-key' } = process.env;

module.exports = (req, res, next) => {
  try {
    const { authorization } = req.headers;

    if (!authorization || !authorization.startsWith('Bearer ')) {
      throw new Unauthtorized(ERROR_401_MESSAGE);
    }
    const token = authorization.replace('Bearer ', '');

    req.user = jwt.verify(token, JWT_SECRET);
    next();
  } catch (err) {
    next(new Unauthtorized(ERROR_401_MESSAGE));
  }
};
