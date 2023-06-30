
const questionModel = require('../models/question')
const userModel = require("../models/user")
const uniqid = require("uniqid")


module.exports.ASK_QUESTION = async (req, res) => {

    console.log("Ask question request recieved.")


    try {
        const question = new questionModel({
            id: uniqid(),
            date_created: new Date(),
            title:req.body.title,
            content: req.body.content,
            author: req.body.author,
            answers: [],

        })
        
        const savedQuestion = await question.save();

        const userID = req.body.id; // get from auth

        userModel
        .updateOne(
          { id: userID },
          { $push: { asked: savedQuestion.id } }
        )
        .exec();



        res.status(200).json({ response: savedQuestion });
    } catch(error) {
        console.log("failed to save a new question")
        res.status(400).json({ error: error });
    }

}

module.exports.UPDATE_QUESTION = async (req, res) => {

    try {

            
        await questionModel.updateOne(
            {title: req.body.title,},
            {content: req.body.content},
        )

        res.status(200).json({ response: "Question was updated" });

    } catch (error) {
        res.status(400).json({ error: error });

    }

}

module.exports.GET_ALL_QUESTIONS = async (req, res) => {

    console.log(" GET_ALL_QUESTIONS request recieved")

    try {
        const questions = await questionModel.find()
        res.status(200).json({ questions });

    } catch (error) {
        res.status(400).json({ error });
    }

    

}

module.exports.GET_QUESTION_WITH_ANSWERS = async (req, res) => {


    try {
        const questionsWithAnswers = await questionModel
          .aggregate([
            {
              $lookup: {
                from: "answers",
                localField: "answers",
                foreignField: "id",
                as: "question_answers",
              },
            }, 
            { $match: { id: req.params.id }}
          ])
          .exec();
    
        res.status(200).json({ questionsWithAnswers });
      } catch {
        res.status(400).json({ response: "Something went wrong while getting a question with an answwer! :(" });
      }



}

module.exports.DELETE_QUESTION = async (req, res) => {

    const userID = req.body.id; // get from auth

    try {
        await questionModel.deleteOne({ id: req.params.id})

        userModel
        .updateOne(
          { id: userID },
          { $pull: { asked: req.params.id } }
        )
        .exec();


        res.status(200).json({ response: "Question was deleted" });

    } catch (error) {
        res.status(400).json({ error: error });
    }


}


