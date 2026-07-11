const Leave = require("../models/Leave");
 

// =============================
// Create Leave
// POST /api/leaves
// =============================
const createLeave = async (req, res) => {
  try {
    const {
      studentName,
      rollNo,
      department,
      semester,
      leaveType,
      reason,
      fromDate,
      toDate,
    } = req.body;

    const leave = await Leave.create({
      student: req.student._id, // Logged-in Student ID

      studentName,
      rollNo,
      department,
      semester,
      leaveType,
      reason,
      fromDate,
      toDate,
    });

    res.status(201).json({
      success: true,
      message: "Leave submitted successfully",
      leave,
    });
  } catch (error) {
    console.error("Create Leave Error:", error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// =============================
// Get All Leaves (Admin)
// GET /api/leaves
// =============================
const getAllLeaves = async (req, res) => {
  try {
    const leaves = await Leave.find()
      .populate("student", "name email rollNo")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: leaves.length,
      leaves,
    });
  } catch (error) {
    console.error("Get All Leaves Error:", error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// =============================
// Get Logged-in Student Leaves
// GET /api/leaves/my-leaves
// =============================
const getMyLeaves = async (req, res) => {
  try {
    const leaves = await Leave.find({
      student: req.student._id,
    }).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: leaves.length,
      leaves,
    });
  } catch (error) {
    console.error("Get My Leaves Error:", error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// =============================
// Get Leave By ID
// GET /api/leaves/:id
// =============================
const getLeaveById = async (req, res) => {
  try {
    const leave = await Leave.findById(req.params.id);

    if (!leave) {
      return res.status(404).json({
        success: false,
        message: "Leave not found",
      });
    }

    res.status(200).json({
      success: true,
      leave,
    });
  } catch (error) {
    console.error("Get Leave By ID Error:", error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ==========================
// Approve Leave
// PATCH /api/leaves/:id/approve
// ==========================
const approveLeave = async (req, res) => {
  try {
    const leave = await Leave.findByIdAndUpdate(
      req.params.id,
      {
        status: "Approved",
      },
      {
        new: true,
      }
    );

    if (!leave) {
      return res.status(404).json({
        success: false,
        message: "Leave not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Leave approved successfully",
      leave,
    });
  } catch (error) {
    console.error("Approve Leave Error:", error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ==========================
// Reject Leave
// PATCH /api/leaves/:id/reject
// ==========================
const rejectLeave = async (req, res) => {
  try {
    const leave = await Leave.findByIdAndUpdate(
      req.params.id,
      {
        status: "Rejected",
      },
      {
        new: true,
      }
    );

    if (!leave) {
      return res.status(404).json({
        success: false,
        message: "Leave not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Leave rejected successfully",
      leave,
    });
  } catch (error) {
    console.error("Reject Leave Error:", error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ==========================
// Update Leave
// PATCH /api/leaves/:id
// ==========================
const updateLeave = async (req, res) => {
  try {
    const leave = await Leave.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!leave) {
      return res.status(404).json({
        success: false,
        message: "Leave not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Leave updated successfully",
      leave,
    });
  } catch (error) {
    console.error("Update Leave Error:", error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ==========================
// Delete Leave
// DELETE /api/leaves/:id
// ==========================
const deleteLeave = async (req, res) => {
  try {
    const leave = await Leave.findByIdAndDelete(req.params.id);

    if (!leave) {
      return res.status(404).json({
        success: false,
        message: "Leave not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Leave deleted successfully",
    });
  } catch (error) {
    console.error("Delete Leave Error:", error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  createLeave,
  getAllLeaves,
  getMyLeaves,
  getLeaveById,
  approveLeave,
  rejectLeave,
  updateLeave,
  deleteLeave,
};
