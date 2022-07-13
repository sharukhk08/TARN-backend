const addquizscoreSchema = require("../schema/addquizscore");

const getscorelist = async (req, res) => {
  try {
    const scorelist = await addquizscoreSchema.find({});
    // get user id from token and compare with todolist user id  and send only todolist of that user'
    const userId = req.decoded._id;
    if (scorelist.length > 0) {
      const scorelistOfUser = scorelist.filter(
        (score) => score.userId && score.userId.toString() === userId.toString()
      );
      return res.status(200).json({
        status: "success",
        scorelist: scorelistOfUser.reverse(),
      });
    } else {
      return res.status(200).json({
        status: "success",
        scorelist: scorelist,
      });
    }
  } catch (err) {
    console.log(err, "err");
    return res.status(404).json({
      status: "error",
      message: err,
    });
  }
};

module.exports = [getscorelist];
