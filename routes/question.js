const express = require('express')
const router = express.Router();
const authMiddleware = require("../middleware/auth");

const {ASK_QUESTION,DELETE_QUESTION,GET_ALL_QUESTIONS,GET_QUESTION_WITH_ANSWERS,UPDATE_QUESTION,GET_QUESTION_WITH_ANSWERS_LOGEDIN} = require("../controllers/question")

router.post('/askQuestion', authMiddleware, ASK_QUESTION)
router.delete('/removeQuestion/:id', authMiddleware, DELETE_QUESTION)
router.get('/allQuestions',  GET_ALL_QUESTIONS)
router.get('/question/:id/answers', GET_QUESTION_WITH_ANSWERS)
router.get('/question/:id/answers/v', authMiddleware, GET_QUESTION_WITH_ANSWERS_LOGEDIN)
router.put('/updateQuestion', authMiddleware, UPDATE_QUESTION)

module.exports = router;