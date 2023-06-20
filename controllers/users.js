const User = require('../models/user');
const { processingError, check } = require('../utils/errors/errors');

module.exports.createUser = (req, res) => {
  const { name, about, avatar } = req.body;

  User.create({ name, about, avatar })
    .then((user) => res.status(201).send(user))
    .catch((err) => processingError(err, res));
};

module.exports.findUsers = (req, res) => {
  User.find({})
    .then((user) => res.send(user))
    .catch((err) => processingError(err, res));
};

module.exports.findUserId = (req, res) => {
  User.findById(req.params.userId)
    .orFail()
    .then((user) => check(user, res))
    .catch((err) => processingError(err, res));
};

module.exports.updateUserProfile = (req, res) => {
  const { name, about } = req.body;
  User.findByIdAndUpdate(req.user._id, { name, about }, { new: true, runValidators: true })
    .orFail()
    .then((user) => res.send({ data: user }))
    .catch((err) => processingError(err, res));
};

module.exports.updateUserAvatar = (req, res) => {
  const { avatar } = req.body;
  User.findByIdAndUpdate(req.user._id, { avatar }, { new: true, runValidators: true })
    .orFail()
    .then((user) => res.send({ data: user }))
    .catch((err) => processingError(err, res));
};
