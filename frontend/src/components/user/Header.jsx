import { useState } from "react";
import { Link } from "react-router-dom";
import { FaShoppingCart, FaSearch, FaBars } from "react-icons/fa";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);

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

        {/* Thanh tìm kiếm và giỏ hàng */}
        <div className="flex items-center space-x-4">
          <FaSearch className="text-gray-700 cursor-pointer hover:text-blue-500" />
          <FaShoppingCart className="text-gray-700 cursor-pointer hover:text-blue-500" />

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
