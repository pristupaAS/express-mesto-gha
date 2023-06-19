const router = require('express').Router();
const {
  createUser,
  findUsers,
  findUserId,
  updateUserProfile,
  updateUserAvatar,
} = require('../controllers/users');

router.post('/', createUser);
router.get('/', findUsers);
router.get('/:userId', findUserId);
router.patch('/me', updateUserProfile);
router.patch('/me/avatar', updateUserAvatar);

module.exports = router;
