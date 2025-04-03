import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../../services/axiosInstance";

const Register = () => {
  const [formData, setFormData] = useState({
    fullname: "",
    username: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");

    if (formData.password !== formData.confirmPassword) {
      setError("❌ Mật khẩu xác nhận không khớp!");
      return;
    }

    setLoading(true);

    try {
      const res = await axiosInstance.post("/users/register", formData);
      console.log(res.data);
      alert("✅ Đăng ký thành công!");
      navigate("/login");
    } catch (err) {
      setError(err.response?.data?.message || "❌ Đăng ký thất bại!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form
        className="p-6 bg-white rounded-md shadow-md w-96"
        onSubmit={handleRegister}
      >
        <h2 className="text-2xl font-bold text-center">Đăng Ký</h2>
        {error && <p className="p-2 mt-2 text-red-500 bg-red-100 border border-red-400">{error}</p>}

        <div className="mt-4">
          <label className="block text-gray-700">Họ và Tên</label>
          <input
            type="text"
            name="fullname"
            className="w-full p-2 mt-1 border rounded"
            value={formData.fullname}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mt-4">
          <label className="block text-gray-700">Tên đăng nhập</label>
          <input
            type="text"
            name="username"
            className="w-full p-2 mt-1 border rounded"
            value={formData.username}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mt-4">
          <label className="block text-gray-700">Email</label>
          <input
            type="email"
            name="email"
            className="w-full p-2 mt-1 border rounded"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mt-4">
          <label className="block text-gray-700">Số điện thoại</label>
          <input
            type="tel"
            name="phone"
            className="w-full p-2 mt-1 border rounded"
            value={formData.phone}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mt-4">
          <label className="block text-gray-700">Mật khẩu</label>
          <input
            type="password"
            name="password"
            className="w-full p-2 mt-1 border rounded"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mt-4">
          <label className="block text-gray-700">Xác nhận mật khẩu</label>
          <input
            type="password"
            name="confirmPassword"
            className="w-full p-2 mt-1 border rounded"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
          />
        </div>

        <button
          type="submit"
          className="w-full p-2 mt-4 text-white bg-green-500 rounded hover:bg-green-600"
          disabled={loading}
        >
          {loading ? "Đang đăng ký..." : "Đăng ký"}
        </button>
      </form>
    </div>
  );
};

export default Register;
