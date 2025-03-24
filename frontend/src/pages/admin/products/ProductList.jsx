// src/pages/admin/products/ProductList.jsx

import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "../../../services/axiosInstance"; // Sử dụng axiosInstance
import { FaEdit, FaTrash, FaPlus } from "react-icons/fa";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get("/products");
      console.log("Dữ liệu API:", response.data);
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
        await axios.delete(`/products/${id}`);
        setProducts(products.filter((product) => product._id !== id));
      } catch (error) {
        console.error("Lỗi khi xóa sản phẩm:", error);
      }
    }
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold">Danh sách sản phẩm</h2>
        <Link to="/admin/products/add" className="flex items-center px-4 py-2 text-white bg-blue-500 rounded-md">
          <FaPlus className="mr-2" /> Thêm sản phẩm
        </Link>
      </div>

      {loading ? (
        <p className="text-center text-gray-500">Đang tải dữ liệu...</p>
      ) : error ? (
        <p className="text-center text-red-500">{error}</p>
      ) : products.length === 0 ? (
        <p className="text-center text-gray-500">Không có sản phẩm nào</p>
      ) : (
        <table className="min-w-full bg-white border rounded-lg">
          <thead>
            <tr className="bg-gray-100 border-b">
              <th className="p-2 text-left">Tên</th>
              <th className="p-2 text-left">Thương hiệu</th>
              <th className="p-2 text-left">Giá</th>
              <th className="p-2 text-left">Hành động</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product._id} className="border-b hover:bg-gray-50">
                <td className="p-2">{product.name || "Không có tên"}</td>
                <td className="p-2">{product.brand?.name || "Không có thương hiệu"}</td>
                <td className="p-2">{product.price ? `${product.price} VND` : "Chưa cập nhật"}</td>
                <td className="flex items-center p-2 space-x-2">
                  <Link to={`/admin/products/edit/${product._id}`} className="flex items-center text-blue-500">
                    <FaEdit className="mr-1" /> Sửa
                  </Link>
                  <button onClick={() => handleDelete(product._id)} className="flex items-center text-red-500">
                    <FaTrash className="mr-1" /> Xóa
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ProductList;
