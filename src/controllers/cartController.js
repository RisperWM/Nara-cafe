const Cart = require("../models/cartModel");
const MenuItem = require("../models/menuItemModel");

// @desc    Add item to cart
// @route   POST /api/cart/add
// @access  Private (only authenticated users can add items to the cart)
const addToCart = async (req, res) => {
  const { menuItemId, quantity } = req.body;
  try {
    let cart = await Cart.findOne({ user: req.user._id });

    // If cart doesn't exist, create one
    if (!cart) {
      cart = new Cart({
        user: req.user._id,
        items: [],
      });
    }

    // Check if item is already in cart
    const itemIndex = cart.items.findIndex(
      (item) => item.menuItem.toString() === menuItemId
    );

    if (itemIndex !== -1) {
      // Item exists, update quantity
      cart.items[itemIndex].quantity += quantity;
    } else {
      // Item doesn't exist, add new item
      const menuItem = await MenuItem.findById(menuItemId);
      cart.items.push({ menuItem: menuItemId, quantity });
    }

    await cart.save();
    res.json(cart);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error adding item to cart", error: error.message });
  }
};

// @desc    Remove item from cart
// @route   DELETE /api/cart/remove/:itemId
// @access  Private (only authenticated users can remove items from the cart)
const removeFromCart = async (req, res) => {
  try {
    let cart = await Cart.findOne({ user: req.user._id });
    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    // Remove item from cart
    cart.items = cart.items.filter(
      (item) => item.menuItem.toString() !== req.params.itemId
    );

    await cart.save();
    res.json(cart);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error removing item from cart", error: error.message });
  }
};

// @desc    Get cart for user
// @route   GET /api/cart
// @access  Private (only authenticated users can view their cart)
const getCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user._id }).populate(
      "items.menuItem"
    );
    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }
    res.json(cart);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching cart", error: error.message });
  }
};

// @desc    Clear the cart
// @route   DELETE /api/cart/clear
// @access  Private (only authenticated users can clear their cart)
const clearCart = async (req, res) => {
  try {
    let cart = await Cart.findOne({ user: req.user._id });
    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    cart.items = [];
    await cart.save();
    res.json({ message: "Cart cleared" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error clearing cart", error: error.message });
  }
};

module.exports = {
  addToCart,
  removeFromCart,
  getCart,
  clearCart,
};
