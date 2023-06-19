const router = require('express').Router();
const {
  createCard,
  findCards,
  deleteCardId,
  likeCard,
  dislikeCard,
} = require('../controllers/cards');

router.post('/', createCard);
router.get('/', findCards);
router.delete('/:cardId', deleteCardId);
router.put('/:cardId/likes', likeCard);
router.delete('/:cardId/likes', dislikeCard);
module.exports = router;
