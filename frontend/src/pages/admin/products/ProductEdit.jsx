import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const ProductEdit = () => {
  const { id } = useParams();
  const [product, setProduct] = useState({
    title: "",
    description: "",
    primary_image_url: "",
    content: "",
    price: 0,
    price_sale: 0,
    quantity: 1,
    cate_id: "",
    brand_id: ""
  });

  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);

  const navigate = useNavigate();

  // Lấy danh mục & thương hiệu từ API
  useEffect(() => {
    axios.get("http://localhost:5000/api/categories")
      .then(res => setCategories(res.data))
      .catch(err => console.error("Lỗi tải danh mục:", err));

    axios.get("http://localhost:5000/api/brands")
      .then(res => setBrands(res.data))
      .catch(err => console.error("Lỗi tải thương hiệu:", err));
  }, []);

  // Lấy dữ liệu sản phẩm
  useEffect(() => {
    axios.get(`http://localhost:5000/api/products/${id}`)
      .then(res => setProduct(res.data))
      .catch(err => console.error("Lỗi tải sản phẩm:", err));
  }, [id]);

  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.put(`http://localhost:5000/api/products/${id}`, product);
    navigate("/admin/products");
  };

  return (
    <div>
      <h2>Chỉnh sửa sản phẩm</h2>
      <form onSubmit={handleSubmit}>
        <input name="title" value={product.title} placeholder="Tiêu đề" onChange={handleChange} required />
        <input name="description" value={product.description} placeholder="Mô tả" onChange={handleChange} />
        <input name="primary_image_url" value={product.primary_image_url} placeholder="URL Ảnh" onChange={handleChange} />
        <textarea name="content" value={product.content} placeholder="Nội dung" onChange={handleChange}></textarea>
        <input name="price" type="number" value={product.price} placeholder="Giá" onChange={handleChange} required />
        <input name="price_sale" type="number" value={product.price_sale} placeholder="Giá khuyến mãi" onChange={handleChange} />
        <input name="quantity" type="number" value={product.quantity} placeholder="Số lượng" onChange={handleChange} required />

        {/* Dropdown chọn danh mục */}
        <select name="cate_id" value={product.cate_id} onChange={handleChange} required>
          <option value="">Chọn danh mục</option>
          {categories.map(cate => (
            <option key={cate._id} value={cate._id}>{cate.name}</option>
          ))}
        </select>

        {/* Dropdown chọn thương hiệu */}
        <select name="brand_id" value={product.brand_id} onChange={handleChange} required>
          <option value="">Chọn thương hiệu</option>
          {brands.map(brand => (
            <option key={brand._id} value={brand._id}>{brand.name}</option>
          ))}
        </select>

        <button type="submit">Cập nhật</button>
      </form>
    </div>
  );
};

export default ProductEdit;
