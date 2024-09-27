const MenuItem = require("../models/menuItemModel");

// @desc create a new menu item
// @routes POST /api/menu
// @access Admin
const createMenuItem = async (req, res) => {
  const {
    name,
    description,
    price,
    category,
    imageUrl,
    isAvailable,
    ratings,
    numberOfReviews,
    discount,
    offer,
  } = req.body;

  try {
    const menuItem = await MenuItem.create({
      name,
      description,
      price,
      category,
      imageUrl,
      isAvailable,
      ratings,
      numberOfReviews,
      discount,
      offer,
    });
    res.status(201).json(menuItem);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc Get all menu items
// @Get /api/menu
// @access Public
const getMenuItems = async (req, res) => {
  try {
    const menuItems = await MenuItem.find();
    res.status(200).json(menuItems);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get a menu item by ID
// @route   GET /api/menu/:id
// @access  Public
const getMenuItemById = async (req, res) => {
  const { id } = req.params;

  try {
    const menuItem = await MenuItem.findById(id);

    if (!menuItem) {
      return res.status(404).json({ message: "Menu item not found" });
    }

    res.status(200).json(menuItem);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update a menu item
// @route   PUT /api/menu/:id
// @access  Admin
const updateMenuItem = async (req, res) => {
  const { id } = req.params;

  try {
    const menuItem = await MenuItem.findByIdAndUpdate(id, req.body, { new: true });

    if (!menuItem) {
      return res.status(404).json({ message: "Menu item not found" });
    }

    res.status(200).json(menuItem);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Delete a menu item
// @route   DELETE /api/menu/:id
// @access  Admin
const deleteMenuItem = async (req, res) => {
  const { id } = req.params;

  try {
    const menuItem = await MenuItem.findByIdAndDelete(id);

    if (!menuItem) {
      return res.status(404).json({ message: "Menu item not found" });
    }

    res.status(204).json();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createMenuItem,
  getMenuItems,
  getMenuItemById,
  updateMenuItem,
  deleteMenuItem,
};