const { JWT_SECRET = 'some-secret-key' } = process.env;
const { MONGO_DB_PATH = 'mongodb://localhost:27017/articlesdb' } = process.env;

const rateLimit = require('express-rate-limit');

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
});

module.exports = {
  JWT_SECRET,
  MONGO_DB_PATH,
  limiter,
};
