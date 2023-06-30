const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  const token = req.headers.authorization;

  jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
    if (err) {
      console.log(token)
      return res.status(401).json({ response: "Auth middleware failed" });
    } else {
      req.body.id = decoded.id;
      return next();
    }
  });
};
  