const router = require('express').Router();
const auth = require('../middlewares/auth');
const NotFound = require('../errors/NotFound');
const ERROR_404_MESSAGE = require('../utils/constants');

const userRouter = require('./users');
const movieRouter = require('./movies');
const authRouter = require('./auth');

const pageNotFound = (req, res, next) => {
  next(new NotFound(ERROR_404_MESSAGE));
};

router.use('/', authRouter);

router.use(auth);

router.use('/users', userRouter);
router.use('/movies', movieRouter);
router.use('*', pageNotFound);

module.exports = router;
