const router = require('express').Router();
const {
  createUser,
  findUser,
  findUserId,
  updateUserProfile,
  updateUserAvatar,
} = require('../controllers/users');

router.post('/', createUser);
router.get('/', findUser);
router.get('/:userId', findUserId);
router.patch('/me', updateUserProfile);
router.patch('/me/avatar', updateUserAvatar);

module.exports = router;
