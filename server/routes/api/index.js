const router = require('express').Router();

router.use('/users', require('./user-routes'));
router.use('/chat', require('./langchain-routes'));

module.exports = router;
