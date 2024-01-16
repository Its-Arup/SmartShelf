const jwt = require("jsonwebtoken");
const { BlackkListModel } = require("../Model/blacklist.model");

const KEY = process.env.KEY;

const auth = (req, res, next) => {

  const token = req.headers.authorization?.split(" ")[1];

  try {
    if (token) {
      const blacklistedToken = BlackkListModel.find({ token });
      if (blacklistedToken.length > 0) {
        res.status(400).json({ msg: "Session Expired" });
      } else {
        jwt.verify(token, KEY, (err, decoded) => {
          if (decoded) {
            const { userName, userId } = decoded;
            req.body.userName = userName;
            req.body.userId = userId;
            
            next();
          } else {
            res.status(400).send({ meg: "Not Authorized" });
          }
        });
      }
    } else {
      res.status(400).send({ msg: "Authorization Failed, Please login" });
    }
  } catch (err) {
    res.status(400).send({ msg: err.message });
  }
};

module.exports = auth;
