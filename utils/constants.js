const ERROR_400_MESSAGE = 'Переданы некорректные данные';
const ERROR_401_MESSAGE = 'Необходима авторизация';
const ERROR_403_MESSAGE_MOVIE = 'Вы можете удалять только свои фильмы';
const ERROR_404_MESSAGE = 'Страница не найдена';
const ERROR_404_MESSAGE_MOVIE = 'Фильм с указанным  _id не найден';
const ERROR_404_MESSAGE_USER = 'Пользователь с указанным _id не найден';
const ERROR_409_MESSAGE_USER = 'Такой пользователь уже есть';
const ERROR_500_MESSAGE = 'На сервере произошла ошибка';

module.exports = {
  ERROR_400_MESSAGE,
  ERROR_401_MESSAGE,
  ERROR_403_MESSAGE_MOVIE,
  ERROR_404_MESSAGE,
  ERROR_404_MESSAGE_MOVIE,
  ERROR_404_MESSAGE_USER,
  ERROR_409_MESSAGE_USER,
  ERROR_500_MESSAGE,
};
