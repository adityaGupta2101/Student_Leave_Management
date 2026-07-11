const jwt = require("jsonwebtoken");
const Student = require("../models/Student");

const protect = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      // Get Token
      token = req.headers.authorization.split(" ")[1];

      // Verify Token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Get Logged-in Student
      req.student = await Student.findById(decoded.id).select("-password");

      next();
    } catch (error) {
      return res.status(401).json({
        success: false,
        message: "Not Authorized, Invalid Token",
      });
    }
  }

  if (!token) {
    return res.status(401).json({
      success: false,
      message: "No Token Provided",
    });
  }
};

module.exports = { protect };  