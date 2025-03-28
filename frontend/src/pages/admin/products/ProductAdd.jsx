// src/pages/admin/products/ProductAdd.jsx
import { useState, useEffect } from "react";
import axios from "axios";

const ProductAdd = () => {
  const [product, setProduct] = useState({
    name: "",
    brand: "",
    category: "",
    variants: [{ size: "", color: "", stock: 0, price: "" }], // Thêm price vào biến thể
    images: [],
    description: "",
  });
  const [brands, setBrands] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/api/brands").then((res) => setBrands(res.data));
    axios.get("http://localhost:5000/api/categories").then((res) => setCategories(res.data));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  const handleVariantChange = (index, e) => {
    const { name, value } = e.target;
    const newVariants = [...product.variants];
    newVariants[index][name] = value;
    setProduct({ ...product, variants: newVariants });
  };

  const addVariant = () => {
    setProduct({
      ...product,
      variants: [...product.variants, { size: "", color: "", stock: 0, price: "" }],
    });
  };

  const removeVariant = (index) => {
    const newVariants = product.variants.filter((_, i) => i !== index);
    setProduct({ ...product, variants: newVariants });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/products", product);
      alert("Sản phẩm đã được thêm thành công!");
    } catch (error) {
      console.error("Lỗi khi thêm sản phẩm", error);
    }
  };

  return (
    <div className="p-4">
      <h2 className="mb-4 text-xl font-bold">Thêm sản phẩm</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="name"
          placeholder="Tên sản phẩm"
          value={product.name}
          onChange={handleChange}
          className="input"
        />
        <select name="brand" value={product.brand} onChange={handleChange} className="input">
          <option value="">Chọn thương hiệu</option>
          {brands.map((b) => (
            <option key={b._id} value={b._id}>
              {b.name}
            </option>
          ))}
        </select>
        <select name="category" value={product.category} onChange={handleChange} className="input">
          <option value="">Chọn danh mục</option>
          {categories.map((c) => (
            <option key={c._id} value={c._id}>
              {c.name}
            </option>
          ))}
        </select>

        <textarea
          name="description"
          placeholder="Mô tả"
          value={product.description}
          onChange={handleChange}
          className="input"
        />

        <div>
          <h3>Biến thể sản phẩm</h3>
          {product.variants.map((variant, index) => (
            <div key={index} className="flex gap-2">
              <input
                type="text"
                name="size"
                placeholder="Size"
                value={variant.size}
                onChange={(e) => handleVariantChange(index, e)}
                className="input"
              />
              <input
                type="text"
                name="color"
                placeholder="Màu sắc"
                value={variant.color}
                onChange={(e) => handleVariantChange(index, e)}
                className="input"
              />
              <input
                type="number"
                name="stock"
                placeholder="Số lượng"
                value={variant.stock}
                onChange={(e) => handleVariantChange(index, e)}
                className="input"
              />
              <input
                type="number"
                name="price"
                placeholder="Giá"
                value={variant.price}
                onChange={(e) => handleVariantChange(index, e)}
                className="input"
              />
              <button type="button" onClick={() => removeVariant(index)}>
                Xóa
              </button>
            </div>
          ))}
          <button type="button" onClick={addVariant}>
            Thêm biến thể
          </button>
        </div>

        <button type="submit" className="btn">
          Thêm sản phẩm
        </button>
      </form>
    </div>
  );
};

export default ProductAdd;
