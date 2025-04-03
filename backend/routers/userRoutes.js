const express = require("express");
const router = express.Router();
const {
  registerUser,
  loginUser,
  getUsers,
  getUserById,
  deleteUser,
  toggleBlockUser,
} = require("../controllers/userController");

// Routes
router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/", getUsers);
router.get("/:id", getUserById);
router.delete("/:id", deleteUser);
router.put("/:id/block", toggleBlockUser);
module.exports = router;
