const router = require('express').Router();
const usersRouter = require('./users');
const articlesRouter = require('./articles');
const auth = require('../middlewares/auth');

const {
  login,
  createUser,
} = require('../controllers/users');

const {
  validateSignup,
  validateSignin,
} = require('../middlewares/validation');

const NotFoundError = require('../errors/not-found-err');

router.post('/signup', validateSignup, createUser);
router.post('/signin', validateSignin, login);
router.use(auth);
router.use('/users', usersRouter);
router.use('/articles', articlesRouter);
router.use('*', (req, res, next) => {
  next(new NotFoundError('Запрашиваемый ресурс не найден'));
});

module.exports = router;
