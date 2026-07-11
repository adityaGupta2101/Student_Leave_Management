const express = require("express");
const router = express.Router();

const {
  createLeave,
  getAllLeaves,
  getMyLeaves,
  getLeaveById,
  approveLeave,
  rejectLeave,
  updateLeave,
  deleteLeave,
} = require("../controllers/leaveControllers");

const { protect } = require("../middleware/authMiddleware");

// Student Routes
router.post("/", protect, createLeave);

// ⭐ THIS MUST COME BEFORE "/:id"
router.get("/my-leaves", protect, getMyLeaves);

// Admin Routes
router.get("/", getAllLeaves);

// ⭐ THIS MUST COME AFTER "/my-leaves"
router.get("/:id", getLeaveById);

router.patch("/:id/approve", approveLeave);

router.patch("/:id/reject", rejectLeave);

router.patch("/:id", updateLeave);

router.delete("/:id", deleteLeave);

module.exports = router;