const router = require('express').Router();
const { getUser } = require('../controllers/users');
// const { validateObjectId } = require('../middlewares/validation')// ;

router.get('/me', getUser);

module.exports = router;
