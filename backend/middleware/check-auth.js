// we check with token if authorized,
// we add middleware to backend endpoints
const jwt = require("jsonwebtoken");

// typical middleware in node / express
module.exports = (req, res, next) => {
  // const token = req.query.auth from link
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decodedToken = jwt.verify(token, process.env.JWT_KEY);
    req.userData = { email: decodedToken.email, userId: decodedToken.userId };
    next();
  } catch (error) {
    res.status(401).json({ message: "You are not authenticated!" });
  }
  // "Bearer fdgfsdffgdfsdfsdadgsdf"  -< we split this from headers.authorization

};
