const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../config');
const User = require('../models/user');
const NotFoundError = require('../errors/not-found-err');
const Conflict = require('../errors/conflict-err');
const AuthError = require('../errors/auth-err');

module.exports.getUser = (req, res, next) => {
  User.findById(req.user._id)
    .orFail(() => {
      throw new NotFoundError('Нет пользователя с таким id');
    })
    .then((user) => res.send({ data: user }))
    .catch(next);
};

module.exports.createUser = (req, res, next) => {
  bcrypt.hash(req.body.password, 10)
    .then((hash) => User.create({
      email: req.body.email,
      password: hash,
      name: req.body.name ? req.body.name : 'Имя',
    }))
    .then((user) => {
      res.send({ data: { name: user.name, email: user.email } });
    })
    .catch((err) => {
      if (err.name === 'MongoError' && err.code === 11000) {
        next(new Conflict('На сервере произошла ошибка'));
      } else {
        next(err);
      }
    });
};

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;
  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign(
        { _id: user._id },
        JWT_SECRET,
        { expiresIn: '7d' },
      );

      /** вернём токен */
      res.send({ token });
    })
    .catch(() => {
      next(new AuthError('Неправильные почта или пароль'));
    });
};
