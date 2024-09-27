const express = require("express");
const {
  addToCart,
  removeFromCart,
  getCart,
  clearCart,
} = require("../controllers/cartController");
const { protect } = require("../middleware/authMiddleware");
const router = express.Router();

// Add an item to the cart
router.post("/add", protect, addToCart);

// Remove an item from the cart
router.delete("/remove/:itemId", protect, removeFromCart);

// Get user's cart
router.get("/", protect, getCart);

// Clear the cart
router.delete("/clear", protect, clearCart);

module.exports = router;
