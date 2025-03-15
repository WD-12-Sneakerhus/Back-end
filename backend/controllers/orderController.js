const Order = require("../models/Order");
const Product = require("../models/Product");
const Cart = require("../models/Cart");

// 🛍️ Tạo đơn hàng
const createOrder = async (req, res) => {
  try {
    const { user } = req.body;

    // Kiểm tra giỏ hàng
    const cart = await Cart.findOne({ user }).populate("items.product");
    if (!cart || cart.items.length === 0) {
      return res
        .status(200)
        .json({ success: false, message: "Giỏ hàng của bạn đang trống!" });
    }

    // Kiểm tra từng sản phẩm trong giỏ hàng
    for (let item of cart.items) {
      const product = await Product.findById(item.product._id);
      if (!product) {
        return res.status(200).json({
          success: false,
          message: `Sản phẩm "${item.product.name}" không còn tồn tại!`,
        });
      }
    }

    // Tính tổng tiền đơn hàng
    const totalPrice = cart.items.reduce(
      (sum, item) => sum + item.product.price * item.quantity,
      0
    );

    // Tạo đơn hàng mới
    const newOrder = new Order({
      user,
      orderItems: cart.items,
      totalPrice,
      status: "pending",
    });

    await newOrder.save();

    // Xóa giỏ hàng sau khi tạo đơn hàng
    await Cart.findOneAndDelete({ user });

    res
      .status(200)
      .json({
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
const getUserOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.params.userId }).populate(
      "orderItems.product"
    );
    res.json({ success: true, orders });
  } catch (error) {
    res
      .status(500)
      .json({
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
    res
      .status(500)
      .json({
        success: false,
        message: "Lỗi khi lấy chi tiết đơn hàng!",
        error,
      });
  }
};

// ⚙️ Cập nhật trạng thái đơn hàng (chỉ admin)
const updateOrder = async (req, res) => {
  try {
    if (req.user.role !== "admin") {
      return res
        .status(200)
        .json({
          success: false,
          message: "Bạn không có quyền cập nhật đơn hàng!",
        });
    }

    const updatedOrder = await Order.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!updatedOrder) {
      return res
        .status(200)
        .json({ success: false, message: "Không tìm thấy đơn hàng!" });
    }

    res.json({
      success: true,
      message: "Cập nhật đơn hàng thành công!",
      order: updatedOrder,
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

module.exports = {
  createOrder,
  getUserOrders,
  getOrderById,
  updateOrder,
  deleteOrder,
};
