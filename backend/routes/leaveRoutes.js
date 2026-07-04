const express = require("express");
const router = express.Router();

const {
  createLeave,
  getAllLeaves,
  getLeaveById,
  approveLeave,
  rejectLeave,
  updateLeave,
  deleteLeave,
} = require("../controllers/leaveControllers");

// Create Leave
router.post("/", createLeave);

// Get All Leaves
router.get("/", getAllLeaves);

// Get Leave By ID
router.get("/:id", getLeaveById);

// Approve Leave
router.patch("/:id/approve", approveLeave);

// Reject Leave
router.patch("/:id/reject", rejectLeave);

// Update Leave
router.patch("/:id", updateLeave);

// Delete Leave
router.delete("/:id", deleteLeave);

module.exports = router;