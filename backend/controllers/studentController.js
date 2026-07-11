const Student = require("../models/Student");
const bcrypt = require("bcryptjs");
const generateToken = require("../utils/generateToken");

// =========================
// Register Student
// =========================
const registerStudent = async (req, res) => {
  try {
    const {
      name,
      email,
      password,
      rollNo,
      department,
      semester,
    } = req.body;

    // Check existing student
    const studentExists = await Student.findOne({ email });

    if (studentExists) {
      return res.status(400).json({
        success: false,
        message: "Student already exists",
      });
    }

    // Encrypt Password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create Student
    const student = await Student.create({
      name,
      email,
      password: hashedPassword,
      rollNo,
      department,
      semester,
    });

    res.status(201).json({
      success: true,
      message: "Student registered successfully",
      token: generateToken(student._id),
      student,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};

// =========================
// Login Student
// =========================
const loginStudent = async (req, res) => {

  try {

    const { email, password } = req.body;

    const student = await Student.findOne({ email });

    if (!student) {
      return res.status(401).json({
        success: false,
        message: "Invalid Email or Password",
      });
    }

    const isMatch = await bcrypt.compare(password, student.password);

    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid Email or Password",
      });
    }

    res.status(200).json({
      success: true,
      message: "Login Successful",
      token: generateToken(student._id),
      student,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }

};

module.exports = {
  registerStudent,
  loginStudent,
};