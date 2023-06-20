const ERROR_BAD_REQUEST = 400;
const ERROR_NOT_FOUND = 404;
const ERROR_DEFAULT = 500;
const OK = 200;
const mongoose = require('mongoose');

const notURL = (req, res) => res.status(ERROR_NOT_FOUND).send({
  message: 'Неверный путь',
});

const check = (req, res) => {
  if (!req) {
    return res.status(ERROR_NOT_FOUND).send({
      message: 'По указанному _id нет',
    });
  }
  return res.status(OK).send(req);
};

const processingError = (err, res) => {
  if (err instanceof mongoose.Error.ValidationError || mongoose.Error.CastError) {
    return res.status(ERROR_BAD_REQUEST).send({
      message: 'Переданы неверные данные',
    });
  }
  if (err instanceof mongoose.Error.DocumentNotFoundError) {
    return res.status(ERROR_NOT_FOUND).send({
      message: 'По указанному _id нет данных',
    });
  }
  return res.status(ERROR_DEFAULT).send({
    message: 'Ошибка по умолчанию',
  });
};

module.exports = {
  processingError,
  check,
  notURL,
};
