const Order = require("../models/orderModel");
const MenuItem = require("../models/menuItemModel");

const Order = require("../models/orderModel");
const Cart = require("../models/cartModel");
const MenuItem = require("../models/menuItemModel");

// @desc    Checkout and create an order for all items in the user's cart
// @route   POST /api/checkout
// @access  Private (only authenticated users can checkout all items)
const checkout = async (req, res) => {
  try {
    // Retrieve user's cart
    const cart = await Cart.findOne({ user: req.user._id }).populate(
      "items.menuItemId"
    );

    if (!cart || cart.items.length === 0) {
      return res.status(400).json({ message: "Cart is empty" });
    }

    // Calculate total amount
    const totalAmount = cart.items.reduce(
      (acc, item) => acc + item.menuItemId.price * item.quantity,
      0
    );

    // Create a new order for all items in the cart
    const order = await Order.create({
      user: req.user._id,
      items: cart.items.map((item) => ({
        menuItemId: item.menuItemId._id,
        quantity: item.quantity,
      })),
      totalAmount,
    });

    // Clear user's cart after successful checkout
    await Cart.updateOne({ user: req.user._id }, { $set: { items: [] } });

    res.status(201).json(order);
  } catch (error) {
    res.status(500).json({ message: "Checkout failed", error: error.message });
  }
};



// @desc    Checkout and create an order for a single item
// @route   POST /api/checkout/single
// @access  Private (only authenticated users can checkout a single item)
const checkoutSingleItem = async (req, res) => {
  const { menuItemId, quantity } = req.body;

  try {
    // Find the menu item by ID
    const menuItem = await MenuItem.findById(menuItemId);
    if (!menuItem) {
      return res.status(404).json({ message: "Menu item not found" });
    }

    // Calculate total amount for the selected item
    const totalAmount = menuItem.price * quantity;

    // Create a new order for the single item
    const order = await Order.create({
      user: req.user._id,
      items: [
        {
          menuItemId: menuItem._id,
          quantity,
        },
      ],
      totalAmount,
    });

    res.status(201).json(order);
  } catch (error) {
    res.status(500).json({ message: "Checkout failed", error: error.message });
  }
};

module.exports = { checkout, checkoutSingleItem, checkoutSelectedItems };


// @desc    Checkout and create an order for selected items
// @route   POST /api/checkout/selected
// @access  Private (only authenticated users can checkout selected items)
const checkoutSelectedItems = async (req, res) => {
  const { selectedItems } = req.body;

  try {
    if (!selectedItems || selectedItems.length === 0) {
      return res
        .status(400)
        .json({ message: "No items selected for checkout" });
    }

    let totalAmount = 0;

    // Iterate over each selected item to calculate the total amount
    for (const item of selectedItems) {
      const menuItem = await MenuItem.findById(item.menuItemId);
      if (!menuItem) {
        return res
          .status(404)
          .json({ message: `Menu item with ID ${item.menuItemId} not found` });
      }
      totalAmount += menuItem.price * item.quantity;
    }

    // Create a new order for the selected items
    const order = await Order.create({
      user: req.user._id,
      items: selectedItems.map((item) => ({
        menuItemId: item.menuItemId,
        quantity: item.quantity,
      })),
      totalAmount,
    });

    res.status(201).json(order);
  } catch (error) {
    res.status(500).json({ message: "Checkout failed", error: error.message });
  }
};

module.exports = { checkout, checkoutSingleItem, checkoutSelectedItems };
