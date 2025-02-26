const Order = require("../models/Order");

// Tạo đơn hàng mới
const createOrder = async (req, res) => {
  try {
    const { user, orderItems, totalPrice } = req.body;
    const newOrder = new Order({ user, orderItems, totalPrice });

    await newOrder.save();
    res
      .status(201)
      .json({ message: "Order created successfully", order: newOrder });
  } catch (error) {
    res.status(500).json({ message: "Error creating order", error });
  }
};

// Lấy danh sách đơn hàng của người dùng
const getUserOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.params.userId }).populate(
      "orderItems.product"
    );
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: "Error fetching orders", error });
  }
};

// Lấy chi tiết đơn hàng theo ID
const getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id).populate(
      "orderItems.product"
    );
    if (!order) return res.status(404).json({ message: "Order not found" });

    res.json(order);
  } catch (error) {
    res.status(500).json({ message: "Error fetching order", error });
  }
};

// Cập nhật trạng thái đơn hàng
const updateOrder = async (req, res) => {
  try {
    const updatedOrder = await Order.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedOrder)
      return res.status(404).json({ message: "Order not found" });

    res.json(updatedOrder);
  } catch (error) {
    res.status(500).json({ message: "Error updating order", error });
  }
};

// Xóa đơn hàng
const deleteOrder = async (req, res) => {
  try {
    const deletedOrder = await Order.findByIdAndDelete(req.params.id);
    if (!deletedOrder)
      return res.status(404).json({ message: "Order not found" });

    res.json({ message: "Order deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting order", error });
  }
};

module.exports = {
  createOrder,
  getUserOrders,
  getOrderById,
  updateOrder,
  deleteOrder,
};
