const router = require('express').Router();
const { CRASH_SERVER } = require('../utils/constants');

const {
  login, createUser,
} = require('../controllers/users');

const {
  loginValidator, createUserValidator,
} = require('../middlewares/validation');

router.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error(CRASH_SERVER);
  }, 0);
});

router.post('/signin', loginValidator, login);

router.post('/signup', createUserValidator, createUser);

module.exports = router;
