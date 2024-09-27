const express = require("express");
const {
  checkout,
  checkoutSingleItem,
  checkoutSelectedItems,
} = require("../controllers/checkoutController");
const { protect } = require("../middleware/authMiddleware");
const router = express.Router();

// Checkout process for all items in cart
router.post("/", protect, checkout);

// Checkout process for a single item
router.post("/single", protect, checkoutSingleItem);

// Checkout process for selected items
router.post("/selected", protect, checkoutSelectedItems);

module.exports = router;
