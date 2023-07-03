
const questionModel = require('../models/question')
const answerModel = require('../models/answer')
const userModel = require("../models/user")
const uniqid = require("uniqid")


module.exports.ADD_ANSWER = async (req, res) => {

 
  
    try {
        const answer = new answerModel({
            id: uniqid(),
            date_created: new Date(),
            content: req.body.content,
            author: {
                name: req.body.name,
                id: req.body.id,
            },
            question_id: req.params.id,
            upvoted_by:[],
            downvoted_by:[],

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

module.exports.DOWNVOTE_ANSWER = async (req, res) => {

    try {

        const answer = await answerModel.findOne({ id: req.params.id });

        const isDownvoted =  answer.downvoted_by.includes(req.body.id)

        if(isDownvoted) {

            await answerModel.updateOne(
                { id: req.params.id },
                { $pull: { downvoted_by: req.body.id } }
              )
              .exec();

        } else {

            await answerModel.updateOne(
                { id: req.params.id },
                { $push: { downvoted_by: req.body.id } }
              )
              .exec();

              await answerModel.updateOne(
                { id: req.params.id },
                { $pull: { upvoted_by: req.body.id } }
              )
              .exec();

            

        }
            
 

        res.status(200).json({ response: !isDownvoted });

    } catch (error) {
        res.status(400).json({ error: error });

    }

}

module.exports.UPVOTE_ANSWER = async (req, res) => {

    try {

        
        const answer = await answerModel.findOne({ id: req.params.id });

        const isUpvoted =  answer.upvoted_by.includes(req.body.id)

        if(isUpvoted) {

            await answerModel.updateOne(
                { id: req.params.id },
                { $pull: { upvoted_by: req.body.id } }
              )
              .exec();

        } else {

            await answerModel.updateOne(
                { id: req.params.id },
                { $push: { upvoted_by: req.body.id } }
              )
              .exec();


              await answerModel.updateOne(
                { id: req.params.id },
                { $pull: { downvoted_by: req.body.id } }
              )
              .exec();

        }
            
 

        res.status(200).json({ response: !isUpvoted });

    } catch (error) {
        res.status(400).json({ error: error });

    }

}
