const router = require('express').Router();

const {
  getCurrentUser, updateUser,
} = require('../controllers/users');

const {
  updatedUserValidator,
} = require('../middlewares/validation');

router.get('/me', getCurrentUser);
router.patch('/me', updatedUserValidator, updateUser);

module.exports = router;
