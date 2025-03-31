import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState(""); // Thêm state lưu số điện thoại
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // Xóa lỗi trước đó

    if (password !== confirmPassword) {
      setError("❌ Mật khẩu nhập lại không khớp!");
      return;
    }

    setLoading(true);

    try {
      const res = await axios.post("/api/users/register", {
        name,
        email,
        phone, // Gửi số điện thoại lên backend
        password,
      });

      if (res.data.token) {
        localStorage.setItem("token", res.data.token); // Lưu token vào localStorage
        alert("✅ Đăng ký thành công!");
        navigate("/"); // Chuyển hướng về trang chủ
      } else {
        setError("Đăng ký thất bại. Vui lòng thử lại!");
      }
    } catch (err) {
      if (err.response && err.response.status === 409) {
        setError("❌ Email này đã được sử dụng! Hãy thử email khác.");
      } else {
        setError("❌ Đã xảy ra lỗi. Vui lòng thử lại!");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form
        className="p-6 bg-white rounded-md shadow-md w-96"
        onSubmit={handleSubmit}
      >
        <h2 className="text-2xl font-bold text-center">Đăng Ký</h2>

        {error && <p className="p-2 mt-2 text-red-500 bg-red-100 border border-red-400">{error}</p>}

        <div className="mt-4">
          <label className="block text-gray-700">Họ và Tên</label>
          <input
            type="text"
            className="w-full p-2 mt-1 border rounded"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        <div className="mt-4">
          <label className="block text-gray-700">Email</label>
          <input
            type="email"
            className="w-full p-2 mt-1 border rounded"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="mt-4">
          <label className="block text-gray-700">Số điện thoại</label>
          <input
            type="tel"
            className="w-full p-2 mt-1 border rounded"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
          />
        </div>

        <div className="mt-4">
          <label className="block text-gray-700">Mật khẩu</label>
          <input
            type="password"
            className="w-full p-2 mt-1 border rounded"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <div className="mt-4">
          <label className="block text-gray-700">Nhập lại mật khẩu</label>
          <input
            type="password"
            className="w-full p-2 mt-1 border rounded"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
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
