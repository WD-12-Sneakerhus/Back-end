import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const ProductList = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/api/products")
      .then(res => setProducts(res.data))
      .catch(err => console.error("Error fetching products:", err));
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa sản phẩm này không?")) {
      await axios.delete(`http://localhost:5000/api/products/${id}`);
      setProducts(products.filter(product => product._id !== id));
    }
  };

  return (
    <div>
      <h2>Danh sách sản phẩm</h2>
      <Link to="/admin/products/add">Thêm sản phẩm</Link>
      <table border="1">
        <thead>
          <tr>
            <th>Tiêu đề</th>
            <th>Giá</th>
            <th>Giá khuyến mãi</th>
            <th>Số lượng</th>
            <th>Hành động</th>
          </tr>
        </thead>
        <tbody>
          {products.map(product => (
            <tr key={product._id}>
              <td>{product.title}</td>
              <td>{product.price} VND</td>
              <td>{product.price_sale || "Không có"}</td>
              <td>{product.quantity}</td>
              <td>
                <Link to={`/admin/products/edit/${product._id}`}>Sửa</Link>
                <button onClick={() => handleDelete(product._id)}>Xóa</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductList;
