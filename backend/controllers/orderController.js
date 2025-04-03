const Order = require("../models/Order");
const Product = require("../models/Product");
const Cart = require("../models/Cart");

// 🛍️ Tạo đơn hàng
const createOrder = async (req, res) => {
  try {
    const { user, orderItems, totalPrice } = req.body;

    const newOrder = new Order({
      user,
      orderItems,
      totalPrice,
      status: "pending", // Mặc định là Chờ giao hàng
    });

    await newOrder.save();

    res.status(200).json({
      success: true,
      message: "Đơn hàng đã được tạo thành công!",
      order: newOrder,
    });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Lỗi khi tạo đơn hàng!", error });
  }
};

// 📦 Lấy danh sách đơn hàng của người dùng
// 📦 Lấy danh sách đơn hàng của người dùng (Lọc theo trạng thái nếu có)
const getUserOrders = async (req, res) => {
  try {
    const { status } = req.query;
    let filter = { user: req.params.userId };

    if (status) {
      filter.status = status; // Lọc theo trạng thái nếu có
    }

    const orders = await Order.find(filter).populate("orderItems.product");

    res.json({ success: true, orders });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Lỗi khi lấy danh sách đơn hàng!",
      error,
    });
  }
};

// 🔍 Lấy chi tiết đơn hàng theo ID
const getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id).populate(
      "orderItems.product"
    );
    if (!order)
      return res
        .status(200)
        .json({ success: false, message: "Không tìm thấy đơn hàng!" });

    res.json({ success: true, order });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Lỗi khi lấy chi tiết đơn hàng!",
      error,
    });
  }
};
const updateOrder = async (req, res) => {
  try {
    const { status } = req.body;
    const order = await Order.findById(req.params.id);

    if (!order) {
      return res
        .status(404)
        .json({ success: false, message: "Không tìm thấy đơn hàng!" });
    }

    // Cập nhật trạng thái đơn hàng
    order.status = status;
    await order.save();

    res.json({
      success: true,
      message: "Cập nhật trạng thái đơn hàng thành công!",
      order,
    });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Lỗi khi cập nhật đơn hàng!", error });
  }
};

// 🗑️ Xóa đơn hàng (chỉ admin)
const deleteOrder = async (req, res) => {
  try {
    if (req.user.role !== "admin") {
      return res
        .status(200)
        .json({ success: false, message: "Bạn không có quyền xóa đơn hàng!" });
    }

    const deletedOrder = await Order.findByIdAndDelete(req.params.id);
    if (!deletedOrder)
      return res
        .status(200)
        .json({ success: false, message: "Không tìm thấy đơn hàng!" });

    res.json({ success: true, message: "Đơn hàng đã được xóa thành công!" });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Lỗi khi xóa đơn hàng!", error });
  }
};
// 📋 Lấy tất cả đơn hàng (Chỉ admin)
const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate("user", "name email")
      .populate("orderItems.product");
    res.json({ success: true, orders });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Lỗi khi lấy danh sách đơn hàng!",
      error,
    });
  }
};

module.exports = {
  getAllOrders,
  createOrder,
  getUserOrders,
  getOrderById,
  updateOrder,
  deleteOrder,
};
