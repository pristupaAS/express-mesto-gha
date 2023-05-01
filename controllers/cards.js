const Card = require('../models/card');
const { processingError } = require('../utils/errors/errors');

module.exports.createCard = (req, res) => {
  const { _id } = req.user;
  const { name, link } = req.body;

  Card.create({ name, link, owner: _id })
    .then((card) => res.send(card))
    .catch((err) => processingError(err, res));
};

module.exports.findCard = (req, res) => {
  Card.find({})
    .then((card) => res.send(card))
    .catch((err) => processingError(err, res));
};

module.exports.deleteCardId = (req, res) => {
  Card.findByIdAndRemove(req.params.cardId)
    .then((card) => res.send(card))
    .catch((err) => processingError(err, res));
};

module.exports.likeCard = (req, res) => Card.findByIdAndUpdate(
  req.params.cardId,
  { $addToSet: { likes: req.user._id } },
  { new: true },
)
  .then((card) => res.send(card))
  .catch((err) => processingError(err, res));

module.exports.dislikeCard = (req, res) => Card.findByIdAndUpdate(
  req.params.cardId,
  { $pull: { likes: req.user._id } },
)
  .then((card) => res.send(card))
  .catch((err) => processingError(err, res));
