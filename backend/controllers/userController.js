const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const registerUser = async (req, res) => {
  try {
    const { fullname, username, email, phone, password } = req.body;

    // Kiểm tra xem email, username hoặc phone đã tồn tại chưa
    const existingUser = await User.findOne({ email });
    const existingUsername = await User.findOne({ username });
    const existingPhone = await User.findOne({ phone });

    if (existingUser) {
      return res.status(400).json({ message: "Email đã được sử dụng!" });
    }
    if (existingUsername) {
      return res.status(400).json({ message: "Tên đăng nhập đã tồn tại!" });
    }
    if (existingPhone) {
      return res
        .status(400)
        .json({ message: "Số điện thoại đã được sử dụng!" });
    }

    // Hash mật khẩu
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Tạo user mới
    const newUser = new User({
      fullname,
      username,
      email,
      phone, // Lưu số điện thoại
      password: hashedPassword,
    });

    await newUser.save();

    // Tạo token đăng nhập
    const token = jwt.sign(
      { _id: newUser._id, isAdmin: newUser.role === "admin" },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.status(201).json({
      message: "Đăng ký thành công!",
      token,
      user: {
        _id: newUser._id,
        fullname: newUser.fullname,
        username: newUser.username,
        email: newUser.email,
        phone: newUser.phone, // Trả về số điện thoại
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Lỗi khi tạo tài khoản!", error });
  }
};

// Đăng nhập user
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res
        .status(400)
        .json({ message: "Email hoặc mật khẩu không đúng!" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res
        .status(400)
        .json({ message: "Email hoặc mật khẩu không đúng!" });
    }

    // Tạo token
    const token = jwt.sign(
      { _id: user._id, isAdmin: user.role === "admin" },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.json({
      message: "Đăng nhập thành công!",
      token,
      user: {
        _id: user._id,
        fullname: user.fullname,
        username: user.username,
        email: user.email,
        phone: user.phone, // Trả về số điện thoại
        role: user.role,
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Lỗi khi đăng nhập!", error });
  }
};

// Lấy danh sách user
const getUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password");
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: "Error fetching users", error });
  }
};

// Lấy thông tin user theo ID
const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select("-password");
    if (!user) return res.status(404).json({ message: "User not found" });

    res.json(user);
  } catch (error) {
    res.status(500).json({ message: "Error fetching user", error });
  }
};
const deleteUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "Người dùng không tồn tại" });
    }

    await User.findByIdAndDelete(req.params.id); // Xóa người dùng
    res.json({ message: "Tài khoản đã được xóa thành công!" });
  } catch (error) {
    res.status(500).json({ message: "Lỗi khi xóa người dùng", error });
  }
};
// Hàm chặn / bỏ chặn người dùng
const toggleBlockUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "Người dùng không tồn tại" });
    }

    user.isBlocked = !user.isBlocked; // Đảo trạng thái chặn
    await user.save();

    res.json({
      message: `Tài khoản đã được ${user.isBlocked ? "chặn" : "bỏ chặn"}`,
    });
  } catch (error) {
    res.status(500).json({ message: "Lỗi server khi cập nhật trạng thái" });
  }
};

module.exports = {
  registerUser,
  loginUser,
  getUsers,
  getUserById,
  deleteUser,
  toggleBlockUser,
};
