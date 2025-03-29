import { Link } from "react-router-dom";
import { FaFacebook, FaInstagram, FaYoutube } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="py-8 mt-12 text-white bg-gray-900">
      <div className="container grid grid-cols-1 gap-8 px-6 mx-auto md:grid-cols-3">

        {/* Cột 1: Thông tin liên hệ */}
        <div>
          <h2 className="mb-3 text-lg font-bold">Về chúng tôi</h2>
          <p className="text-gray-400">
            Chuyên cung cấp các mẫu giày chính hãng từ các thương hiệu nổi tiếng.
          </p>
          <p className="mt-2 text-gray-400">Email: support@shop.com</p>
          <p className="text-gray-400">Hotline: 0988 888 888</p>
        </div>

        {/* Cột 2: Danh mục sản phẩm */}
        <div>
          <h2 className="mb-3 text-lg font-bold">Danh mục sản phẩm</h2>
          <ul className="space-y-2">
            <li><Link to="/products/nike" className="hover:text-blue-400">Nike</Link></li>
            <li><Link to="/products/adidas" className="hover:text-blue-400">Adidas</Link></li>
            <li><Link to="/products/puma" className="hover:text-blue-400">Puma</Link></li>
            <li><Link to="/products/converse" className="hover:text-blue-400">Converse</Link></li>
          </ul>
        </div>

        {/* Cột 3: Mạng xã hội */}
        <div>
          <h2 className="mb-3 text-lg font-bold">Kết nối với chúng tôi</h2>
          <div className="flex space-x-4">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400">
              <FaFacebook size={24} />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-pink-400">
              <FaInstagram size={24} />
            </a>
            <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="hover:text-red-400">
              <FaYoutube size={24} />
            </a>
          </div>
        </div>

      </div>

      {/* Bản quyền */}
      <div className="mt-6 text-sm text-center text-gray-500">
        © 2025  Sneaker Hubs- All rights reserved - bytrancong18.
      </div>
    </footer>
  );
};

export default Footer;
