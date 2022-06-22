const signupSchema = require("../schema/signup");

const login = async (req, res) => {
  try {
    const userExixts = await signupSchema.findOne({
      email: req.body.email,
    });

    const user = {
      email: req.body.email,
      password: req.body.password,
    };
    const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET);

    function authenticateToken(req, res, next) {
      const authHeader = req.headers["authorization"];
      const token = authHeader && authHeader.split(" ")[1];
      if (token == null) return res.sendStatus(401);

      jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if (err) return res.sendStatus(403);
        req.user = user;
        next();
      });
    }

    if (userExixts) {
      if (userExixts.password === req.body.password) {
        res.status(200).json({
          message: "login success",
          user: userExixts,
          accessToken,
        });
      } else {
        res.status(400).json({
          message: "wrong password",
        });
      }
    } else {
      res.status(404).json({
        message: "user not found",
      });
    }
  } catch {}
};

module.exports = [login];
