const express = require('express')
const router = express.Router();
const authMiddleware = require("../middleware/auth");

const {ADD_ANSWER,REMOVE_ANSWER,UPDATE_ANSWER,DOWNVOTE_ANSWER,UPVOTE_ANSWER} = require("../controllers/answer")

router.post('/question/:id/answer', authMiddleware, ADD_ANSWER)
router.delete('/removeAnswer', authMiddleware, REMOVE_ANSWER)
router.put('/updateAnswer', authMiddleware, UPDATE_ANSWER)
router.put('/answer/:id/downvote', authMiddleware, DOWNVOTE_ANSWER)
router.put('/answer/:id/upvote', authMiddleware, UPVOTE_ANSWER)

module.exports = router;