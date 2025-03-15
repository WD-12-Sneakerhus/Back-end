const Cart = require("../models/Cart");
const Product = require("../models/Product");
const Order = require("../models/Order");

// 🛒 Thêm sản phẩm vào giỏ hàng
const addToCart = async (req, res) => {
  try {
    const { user, product, quantity } = req.body;

    // Kiểm tra sản phẩm có tồn tại không
    const existingProduct = await Product.findById(product);
    if (!existingProduct) {
      return res
        .status(200)
        .json({ success: false, message: "Sản phẩm không tồn tại!" });
    }

    // Kiểm tra số lượng hợp lệ
    if (quantity <= 0) {
      return res
        .status(200)
        .json({ success: false, message: "Số lượng sản phẩm phải lớn hơn 0!" });
    }

    // Kiểm tra kho hàng
    if (quantity > existingProduct.stock) {
      return res
        .status(200)
        .json({ success: false, message: "Sản phẩm không đủ hàng!" });
    }

    let cart = await Cart.findOne({ user });
    if (!cart) {
      cart = new Cart({ user, items: [] });
    }

    const existingItem = cart.items.find(
      (item) => item.product.toString() === product
    );
    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      cart.items.push({ product, quantity });
    }

    await cart.save();
    res.status(200).json({
      success: true,
      message: "Sản phẩm đã được thêm vào giỏ hàng!",
      cart,
    });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Lỗi khi thêm vào giỏ hàng!", error });
  }
};

// 🛠 Chỉnh sửa số lượng sản phẩm trong giỏ hàng
const updateCart = async (req, res) => {
  try {
    const { user, product, quantity } = req.body;

    let cart = await Cart.findOne({ user });
    if (!cart) {
      return res
        .status(200)
        .json({ success: false, message: "Giỏ hàng trống!" });
    }

    const itemIndex = cart.items.findIndex(
      (item) => item.product.toString() === product
    );
    if (itemIndex === -1) {
      return res
        .status(200)
        .json({ success: false, message: "Sản phẩm không có trong giỏ hàng!" });
    }

    if (quantity <= 0) {
      // Nếu số lượng <= 0, tự động xóa sản phẩm khỏi giỏ hàng
      cart.items.splice(itemIndex, 1);
    } else {
      cart.items[itemIndex].quantity = quantity;
    }

    await cart.save();
    res.status(200).json({
      success: true,
      message: "Giỏ hàng đã được cập nhật!",
      cart,
    });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Lỗi khi cập nhật giỏ hàng!", error });
  }
};

// ❌ Xóa sản phẩm khỏi giỏ hàng
const removeFromCart = async (req, res) => {
  try {
    const { user, product } = req.body;

    let cart = await Cart.findOne({ user });
    if (!cart) {
      return res
        .status(200)
        .json({ success: false, message: "Giỏ hàng trống!" });
    }

    cart.items = cart.items.filter(
      (item) => item.product.toString() !== product
    );

    await cart.save();
    res.status(200).json({
      success: true,
      message: "Sản phẩm đã được xóa khỏi giỏ hàng!",
      cart,
    });
  } catch (error) {
    res
      .status(500)
      .json({
        success: false,
        message: "Lỗi khi xóa sản phẩm khỏi giỏ hàng!",
        error,
      });
  }
};

// 🗑 Xóa toàn bộ giỏ hàng
const clearCart = async (req, res) => {
  try {
    const { user } = req.body;

    let cart = await Cart.findOne({ user });
    if (!cart) {
      return res
        .status(200)
        .json({ success: false, message: "Giỏ hàng đã trống!" });
    }

    cart.items = []; // Xóa tất cả sản phẩm trong giỏ hàng
    await cart.save();

    res.status(200).json({
      success: true,
      message: "Giỏ hàng đã được làm trống!",
      cart,
    });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Lỗi khi xóa giỏ hàng!", error });
  }
};

// 🛍️ Tạo đơn hàng từ giỏ hàng
const createOrder = async (req, res) => {
  try {
    const { shippingAddress, paymentMethod } = req.body;

    // Kiểm tra giỏ hàng
    const cart = await Cart.findOne({ user: req.user._id }).populate(
      "items.product"
    );
    if (!cart || cart.items.length === 0) {
      return res
        .status(200)
        .json({ success: false, message: "Giỏ hàng của bạn đang trống!" });
    }

    // Kiểm tra địa chỉ giao hàng
    if (!shippingAddress || shippingAddress.length < 10) {
      return res
        .status(200)
        .json({ success: false, message: "Địa chỉ giao hàng không hợp lệ!" });
    }

    // Kiểm tra phương thức thanh toán
    if (!["cod", "online"].includes(paymentMethod)) {
      return res
        .status(200)
        .json({
          success: false,
          message: "Phương thức thanh toán không hợp lệ!",
        });
    }

    // Tính tổng tiền
    const totalPrice = cart.items.reduce(
      (acc, item) => acc + item.product.price * item.quantity,
      0
    );

    // Tạo đơn hàng mới
    const order = new Order({
      user: req.user._id,
      orderItems: cart.items,
      totalPrice,
      shippingAddress,
      paymentMethod,
      status: "pending",
    });

    await order.save();

    // Xóa giỏ hàng sau khi đặt hàng
    await Cart.findOneAndDelete({ user: req.user._id });

    res.status(200).json({
      success: true,
      message: "Đơn hàng đã được tạo thành công!",
      order,
    });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Lỗi khi tạo đơn hàng!", error });
  }
};

module.exports = {
  addToCart,
  updateCart,
  removeFromCart,
  clearCart,
  createOrder,
};
