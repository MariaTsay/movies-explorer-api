require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const { errors } = require('celebrate');
const helmet = require('helmet');

const router = require('./routes');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const cors = require('./middlewares/cors');
const serverError = require('./middlewares/serverError');
const limiter = require('./middlewares/rateLimit');

const { PORT = 3000, DB_URL = 'mongodb://127.0.0.1:27017/bitfilmsdb' } = process.env;
mongoose
  .connect(DB_URL)
  .then(() => {
    console.log('connect');
  })
  .catch((err) => {
    console.log(`error during connection ${err}`);
  });

const app = express();

app.use(helmet());
app.use(limiter); // подключаем rate-limiter
app.use(express.json());

app.use(requestLogger); // подключаем логгер запросов
app.use(cors);

app.use('/', router);

app.use(errorLogger); // подключаем логгер ошибок

app.use(errors());

app.use(serverError);

app.listen(PORT, () => {
  // Если всё работает, консоль покажет, какой порт приложение слушает
  console.log(`App listening on port ${PORT}`);
});
