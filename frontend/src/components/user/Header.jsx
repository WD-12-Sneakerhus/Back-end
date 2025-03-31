import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaShoppingCart, FaSearch, FaBars, FaUser } from "react-icons/fa";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      setUser(storedUser);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    setUser(null);
    navigate("/login");
  };

  return (
    <header className="fixed top-0 left-0 z-50 w-full bg-white shadow-md">
      <div className="container flex items-center justify-between p-4 mx-auto">
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold">
          <img src="/logo.png" alt="Logo" className="h-10" />
        </Link>

        {/* Menu điều hướng */}
        <nav className="hidden space-x-6 md:flex">
          <Link to="/" className="hover:text-blue-500">Trang chủ</Link>
          <Link to="/products" className="hover:text-blue-500">Sản phẩm</Link>
          <Link to="/about" className="hover:text-blue-500">Về chúng tôi</Link>
          <Link to="/contact" className="hover:text-blue-500">Liên hệ</Link>
        </nav>

        {/* Thanh tìm kiếm, giỏ hàng & user */}
        <div className="flex items-center space-x-4">
          <FaSearch className="text-gray-700 cursor-pointer hover:text-blue-500" />
          <Link to="/cart">
            <FaShoppingCart className="text-gray-700 cursor-pointer hover:text-blue-500" />
          </Link>

          {/* Hiển thị đăng nhập / đăng ký nếu chưa đăng nhập */}
          {!user ? (
            <div className="space-x-4">
              <Link to="/login" className="text-blue-500 hover:underline">Đăng nhập</Link>
              <Link to="/register" className="px-3 py-1 text-white bg-blue-500 rounded hover:bg-blue-600">Đăng ký</Link>
            </div>
          ) : (
            // Nếu đã đăng nhập, hiển thị icon user + dropdown
            <div className="relative">
              <button
                className="flex items-center space-x-2"
                onClick={() => setDropdownOpen(!dropdownOpen)}
              >
                <FaUser className="text-gray-700" />
                <span>{user.name}</span>
              </button>

              {/* Dropdown menu */}
              {dropdownOpen && (
                <div className="absolute right-0 w-40 p-2 mt-2 bg-white border rounded shadow-md">
                  <Link to="/orders" className="block px-4 py-2 hover:bg-gray-100">Đơn hàng</Link>
                  <button
                    onClick={handleLogout}
                    className="block w-full px-4 py-2 text-left hover:bg-gray-100"
                  >
                    Đăng xuất
                  </button>
                </div>
              )}
            </div>
          )}

          {/* Menu di động */}
          <button className="md:hidden" onClick={() => setMenuOpen(!menuOpen)}>
            <FaBars className="text-gray-700" />
          </button>
        </div>
      </div>

      {/* Menu mobile */}
      {menuOpen && (
        <div className="absolute left-0 w-full bg-white shadow-md md:hidden top-16">
          <nav className="flex flex-col p-4 space-y-3">
            <Link to="/" className="hover:text-blue-500">Trang chủ</Link>
            <Link to="/products" className="hover:text-blue-500">Sản phẩm</Link>
            <Link to="/about" className="hover:text-blue-500">Về chúng tôi</Link>
            <Link to="/contact" className="hover:text-blue-500">Liên hệ</Link>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
