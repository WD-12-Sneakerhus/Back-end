// src/pages/admin/products/ProductList.jsx
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axiosInstance from "../../../services/axiosInstance";
import { FaEdit, FaTrash, FaPlus } from "react-icons/fa";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axiosInstance.get("/products");
      setProducts(response.data);
    } catch (error) {
      console.error("Lỗi lấy danh sách sản phẩm:", error);
      setError("Không thể tải danh sách sản phẩm");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa sản phẩm này?")) {
      try {
        await axiosInstance.delete(`/products/${id}`);
        setProducts(products.filter((product) => product._id !== id));
      } catch (error) {
        console.error("Lỗi khi xóa sản phẩm:", error);
      }
    }
  };

  const formatPrice = (price) => {
    return price ? `${price.toLocaleString()} VND` : "Chưa cập nhật";
  };

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const displayedProducts = filteredProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold">Danh sách sản phẩm</h2>
        <Link to="/admin/products/add" className="flex items-center px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600">
          <FaPlus className="mr-2" /> Thêm sản phẩm
        </Link>
      </div>

      {/* Tìm kiếm sản phẩm */}
      <input
        type="text"
        placeholder="Tìm kiếm sản phẩm..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full p-2 mb-4 border border-gray-300 rounded-md"
      />

      {loading ? (
        <p className="text-center text-gray-500">Đang tải dữ liệu...</p>
      ) : error ? (
        <p className="text-center text-red-500">{error}</p>
      ) : filteredProducts.length === 0 ? (
        <p className="text-center text-gray-500">Không có sản phẩm nào</p>
      ) : (
        <>
          <table className="min-w-full bg-white border rounded-lg">
            <thead>
              <tr className="bg-gray-100 border-b">
                <th className="p-2 text-left">STT</th>
                <th className="p-2 text-left">Tên</th>
                <th className="p-2 text-left">Thương hiệu</th>
                <th className="p-2 text-left">Giá</th>
                <th className="p-2 text-left">Hành động</th>
              </tr>
            </thead>
            <tbody>
              {displayedProducts.map((product, index) => (
                <tr key={product._id} className="border-b hover:bg-gray-50">
                  <td className="p-2">{(currentPage - 1) * itemsPerPage + index + 1}</td>
                  <td className="p-2">{product.name || "Không có tên"}</td>
                  <td className="p-2">{product.brand?.name || "Không có thương hiệu"}</td>
                  <td className="p-2">{formatPrice(product.price)}</td>
                  <td className="flex items-center p-2 space-x-2">
                    <Link to={`/admin/products/edit/${product._id}`} className="flex items-center text-blue-500 hover:text-blue-700">
                      <FaEdit className="mr-1" /> Sửa
                    </Link>
                    <button onClick={() => handleDelete(product._id)} className="flex items-center text-red-500 hover:text-red-700">
                      <FaTrash className="mr-1" /> Xóa
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Phân trang */}
          <div className="flex justify-center mt-4 space-x-2">
            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i}
                onClick={() => setCurrentPage(i + 1)}
                className={`px-3 py-1 border rounded-md ${currentPage === i + 1 ? "bg-blue-500 text-white" : "bg-gray-200"
                  }`}
              >
                {i + 1}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default ProductList;
