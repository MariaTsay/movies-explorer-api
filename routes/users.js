const router = require('express').Router();

const {
  getCurrentUser, updateUser,
} = require('../controllers/users');

const {
  getCurrentUserValidator, updatedUserValidator,
} = require('../middlewares/validation');

router.get('/me', getCurrentUserValidator, getCurrentUser);
router.patch('/me', updatedUserValidator, updateUser);

module.exports = router;
