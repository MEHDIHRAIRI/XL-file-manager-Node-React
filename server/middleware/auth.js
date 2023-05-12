const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decodedToken = jwt.verify(token, "fgzegzkbvsé(_èé('é");
    const userId = decodedToken._id;
    if (userId) {
      req.userId = userId;
      next();
    } else {
      throw "Invalid user ID";
    }
  } catch {
    res.status(401).json({
      error: new Error("Invalid request!"),
    });
  }
};
