const router = require('express').Router();

const {
  login, createUser,
} = require('../controllers/users');

const {
  loginValidator, createUserValidator,
} = require('../middlewares/validation');

router.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

router.post('/signin', loginValidator, login);

router.post('/signup', createUserValidator, createUser);

module.exports = router;
