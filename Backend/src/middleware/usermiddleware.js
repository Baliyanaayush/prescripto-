const jwt = require("jsonwebtoken");
const UserModel = require("../models/usermodel");

const userMiddleWare = async (req, res, next) => {
  try {
    const token = req.cookies.token;

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Please login",
      });
    }

    const payload = jwt.verify(token, process.env.SECRET_KEY);

    const user = await UserModel.findById(payload._id);

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "User not found",
      });
    }

    req.user = user;

    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = userMiddleWare;