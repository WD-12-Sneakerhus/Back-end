import { useEffect } from "react";
import { Outlet, Link, useNavigate } from "react-router-dom";
import Logo from "../components/Logo";
import Footer from "../components/Footer";
import LogoutButton from "../components/LogoutButton";

function AdminLayout() {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("adminToken");
    if (!token) {
      navigate("/admin/login"); // Nếu chưa đăng nhập → về trang login
    }
  }, [navigate]);

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <aside className="flex flex-col w-1/5 h-full p-4 text-white bg-gray-800">
        {/* Logo */}
        <div className="mb-6">
          <Logo />
        </div>

        {/* Navigation */}
        <nav className="flex-1">
          <Link to="/admin/products" className="block px-4 py-2 rounded hover:bg-gray-600">
            Quản lý sản phẩm
          </Link>
          <Link to="/admin/orders" className="block px-4 py-2 rounded hover:bg-gray-600">
            Quản lý đơn hàng
          </Link>
          <Link to="/admin/users" className="block px-4 py-2 rounded hover:bg-gray-600">
            Quản lý người dùng
          </Link>
        </nav>

        {/* Nút Logout */}
        <LogoutButton />
      </aside>

      {/* Main Content */}
      <div className="flex flex-col flex-1">
        {/* Header */}
        <header className="flex items-center justify-between p-4 bg-white shadow-md">
          <h2 className="text-lg font-semibold">Admin Dashboard</h2>
        </header>

        {/* Nội dung trang */}
        <main className="flex-1 p-6 bg-gray-100">
          <Outlet />
        </main>

        {/* Footer */}
        <Footer />
      </div>
    </div>
  );
}

export default AdminLayout;
