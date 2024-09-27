const express = require("express");
const {
  createOrder,
  getUserOrders,
  updateOrderStatus,
  deleteOrder,
} = require("../controllers/orderController");
const { protect } = require("../middleware/authMiddleware");
const router = express.Router();

// @desc    Create a new order
// @route   POST /api/orders
// @access  Private (only authenticated users can create orders)
router.post("/", protect, createOrder);

// @desc    Get user's orders
// @route   GET /api/orders
// @access  Private (only authenticated users can view their orders)
router.get("/", protect, getUserOrders);

// @desc    Update order status
// @route   PUT /api/orders/status/:id
// @access  Private (only authenticated users can update their orders)
router.put("/status/:id", protect, updateOrderStatus);

// @desc    Delete an order (optional)
// @route   DELETE /api/orders/:id
// @access  Private (only authenticated users can delete their orders)
router.delete("/:id", protect, deleteOrder);

module.exports = router;
