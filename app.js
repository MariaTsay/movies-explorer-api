require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const { errors } = require('celebrate');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');

const router = require('./routes');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const cors = require('./middlewares/cors');
const serverError = require('./middlewares/serverError');

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

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});

// подключаем rate-limiter
app.use(limiter);
app.use(helmet());
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
