const express = require("express");
const { protect, authorize } = require("../middleware/authMiddleware");
const {
  createMenuItem,
  getMenuItems,
  getMenuItemById,
  updateMenuItem,
  deleteMenuItem,
} = require("../controllers/menuController");

const router = express.Router();

// Public routes
// Get all menu items
router.get("/", getMenuItems); 
// Get a menu item by ID
router.get("/:id", getMenuItemById); 

// Admin routes
 // Create a new menu item
router.post("/", protect, authorize("admin"), createMenuItem);
// Update a menu item
router.put("/:id", protect, authorize("admin"), updateMenuItem);
// Delete a menu item 
router.delete("/:id", protect, authorize("admin"), deleteMenuItem); 

module.exports = router;
