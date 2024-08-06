const router = require('express').Router();
const {chat} = require('../../controllers/langchain-controller');

router.route('/').post(chat);

module.exports = router;