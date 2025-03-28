import { useNavigate } from "react-router-dom";

const LogoutButton = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("adminToken"); // Xóa token
    navigate("/admin/login"); // Chuyển về trang đăng nhập
  };

  return (
    <button
      className="px-4 py-2 mt-auto text-white bg-red-500 rounded hover:bg-red-700"
      onClick={handleLogout}
    >
      Đăng xuất
    </button>
  );
};

export default LogoutButton;
