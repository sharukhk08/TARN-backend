const addquizscoreSchema = require("../schema/addquizscore");

const mongoose = require("mongoose");

module.exports = (req, res) => {
  const { score, userId, created_at, updated_at } = req.body;
  const quizobj = {
    score: score,
    created_at: created_at,
    updatedAt: updated_at,
    userId: userId,
    _id: new mongoose.Types.ObjectId(),
  };

  const addquizscoreModel = new addquizscoreSchema(quizobj);
  addquizscoreModel
    .save()
    .then((todo) => {
      return res.status(200).json({
        status: "success",
        data: quizobj,
      });
    })
    .catch((err) => {
      res.send(err);
    });
};
