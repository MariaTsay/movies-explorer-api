const { ERROR_500_MESSAGE } = require('../utils/constants');

const serverError = (err, req, res, next) => {
  // если у ошибки нет статуса, выставляем 500
  const { statusCode = 500, message } = err;
  console.log(err);
  res
    .status(statusCode)
    .send({
      // проверяем статус и выставляем сообщение в зависимости от него
      message: statusCode === 500
        ? ERROR_500_MESSAGE
        : message,
    });
  next();
};

module.exports = serverError;
