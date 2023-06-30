
const questionModel = require('../models/question')
const answerModel = require('../models/answer')
const userModel = require("../models/user")
const uniqid = require("uniqid")


module.exports.ADD_ANSWER = async (req, res) => {

    console.log("Question add request recieved.")


    try {
        const answer = new answerModel({
            id: uniqid(),
            date_created: new Date(),
            content: req.body.content,
            author: req.body.author,
            question_id: req.body.question_id
        })
        
        const savedAnswer = await answer.save();

        const userID = req.body.id;
        const questionID = req.params.id;
        const answerID = savedAnswer.id; 


        questionModel
        .updateOne(
          { id: questionID },
          { $push: { answers: answerID } }
        )
        .exec();

        
        userModel
        .updateOne(
          { id: userID },
          { $push: { answered: answerID } }
        )
        .exec();

        res.status(200).json({ response: savedAnswer });
    } catch(error) {
        res.status(400).json({ error: error });
    }

}

module.exports.UPDATE_ANSWER = async (req, res) => {

    try {

            
        await answerModel.updateOne(
            {content: req.body.content},

        )

        res.status(200).json({ response: "Answer was updated" });

    } catch (error) {
        res.status(400).json({ error: error });

    }

}

module.exports.REMOVE_ANSWER = async (req, res) => {


    try {
        await answerModel.deleteOne({ id: req.params.id})

              // save answer to question   

              questionModel
              .updateOne(
                { id: questionID },
                { $pull: { answers: answerID } }
              )
              .exec();
      
                
               // save answer to user 
              userModel
              .updateOne(
                { id: userID },
                { $pull: { answered: answerID } }).exec()
  


        res.status(200).json({ response: "Answer was deleted" });

    } catch (error) {
        res.status(400).json({ error: error });
    }


}

