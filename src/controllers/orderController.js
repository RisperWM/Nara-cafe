const Order = require("../models/orderModel");

// @desc    Create a new order
// @route   POST /api/orders
// @access  Private (only authenticated users can create orders)
const createOrder = async (req, res) => {
  const { items } = req.body;

  try {
    const totalAmount = items.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0
    );

    const order = await Order.create({
      user: req.user._id,
      items,
      totalAmount,
    });

    res.status(201).json(order);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error creating order", error: error.message });
  }
};

// @desc    Get orders for a user
// @route   GET /api/orders
// @access  Private (only authenticated users can view their orders)
const getUserOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id }).populate(
      "items.menuItemId"
    );
    res.json(orders);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching orders", error: error.message });
  }
};

// @desc    Update order status
// @route   PUT /api/orders/status/:id
// @access  Private (only authenticated users can update their orders)
const updateOrderStatus = async (req, res) => {
  const { status } = req.body;
  const { id } = req.params; // Extract the ID from the route parameters

  try {
    const order = await Order.findByIdAndUpdate(
      id, // Use the ID from the route parameters
      { status },
      { new: true }
    );

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }
    res.json(order);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error updating order", error: error.message });
  }
};

// @desc    Delete an order
// @route   DELETE /api/orders/:id
// @access  Private (only authenticated users can delete their orders)
const deleteOrder = async (req, res) => {
  const { id } = req.params; // Extract the ID from the route parameters

  try {
    const order = await Order.findByIdAndDelete(id); // Use the ID from the route parameters
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }
    res.json({ message: "Order deleted" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error deleting order", error: error.message });
  }
};

module.exports = {
  createOrder,
  getUserOrders,
  updateOrderStatus,
  deleteOrder,
};
