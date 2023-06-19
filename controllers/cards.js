const Card = require('../models/card');
const { processingError, check } = require('../utils/errors/errors');

module.exports.createCard = (req, res) => {
  const { _id } = req.user;
  const { name, link } = req.body;

  Card.create({ name, link, owner: _id })

    .then((card) => res.status(201).send(card))
    .catch((err) => processingError(err, res));
};

module.exports.findCards = (req, res) => {
  Card.find({})
    .populate('likes')
    .then((card) => res.send(card))
    .catch((err) => processingError(err, res));
};

module.exports.deleteCardId = (req, res) => {
  Card.findByIdAndRemove(req.params.cardId)
    .orFail()
    .then((card) => check(card, res))
    .catch((err) => processingError(err, res));
};

module.exports.likeCard = (req, res) => Card.findByIdAndUpdate(
  req.params.cardId,
  { $addToSet: { likes: req.user._id } },
  { new: true },
)
  .orFail()
  .then((card) => check(card, res))
  .catch((err) => processingError(err, res));

module.exports.dislikeCard = (req, res) => Card.findByIdAndUpdate(
  req.params.cardId,
  { $pull: { likes: req.user._id } },
)
  .orFail()
  .then((card) => check(card, res))
  .catch((err) => processingError(err, res));
