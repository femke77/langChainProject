const router = require('express').Router();
const {chatWithPromptTemplate, chatWithChatPromptTemplate} = require('../../controllers/langchain-controller');

// /api/chat
router.route('/').post(chatWithPromptTemplate);
router.route('/prompt').post(chatWithChatPromptTemplate);

module.exports = router;