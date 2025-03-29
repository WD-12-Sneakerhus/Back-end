// src/pages/admin/products/ProductEdit.jsx
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axiosInstance from "../../../services/axiosInstance";

const ProductEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState({ basePrice: 0, gender: "" });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axiosInstance
      .get(`/products/${id}`)
      .then((res) => {
        const productData = res.data;
        const basePrice = productData.variants?.length
          ? Math.min(...productData.variants.map((v) => Number(v.price) || Infinity))
          : 0;
        setProduct({ ...productData, basePrice });
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error loading product:", err);
        setError(err.response?.data?.message || "Failed to load product");
        setLoading(false);
      });
  }, [id]);

  const handleChange = (e) => {
    setProduct((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleVariantChange = (index, field, value) => {
    setProduct((prev) => {
      const updatedVariants = [...(prev.variants || [])];
      updatedVariants[index] = { ...updatedVariants[index], [field]: value };

      const newBasePrice = Math.min(...updatedVariants.map((v) => Number(v.price) || Infinity));

      return { ...prev, variants: updatedVariants, basePrice: newBasePrice };
    });
  };

  const addVariant = () => {
    setProduct((prev) => {
      const newVariants = [...(prev.variants || []), { size: "", color: "", stock: 0, price: "" }];
      const newBasePrice = Math.min(...newVariants.map((v) => Number(v.price) || Infinity));

      return { ...prev, variants: newVariants, basePrice: newBasePrice };
    });
  };

  const removeVariant = (index) => {
    setProduct((prev) => {
      const newVariants = prev.variants.filter((_, i) => i !== index);
      const newBasePrice = newVariants.length > 0 ? Math.min(...newVariants.map((v) => Number(v.price) || Infinity)) : 0;

      return { ...prev, variants: newVariants, basePrice: newBasePrice };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axiosInstance.put(`/products/${id}`, {
        ...product,
        basePrice: product.basePrice,
      });

      alert("Cập nhật sản phẩm thành công!");
      navigate("/admin/products");
    } catch (err) {
      console.error("Error updating product:", err);
      setError(err.response?.data?.message || "Failed to update product");
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <div className="p-4">
      <h2 className="mb-4 text-xl font-bold">Chỉnh sửa sản phẩm</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="name"
          placeholder="Tên sản phẩm"
          value={product?.name || ""}
          onChange={handleChange}
          className="input"
        />
        <textarea
          name="description"
          placeholder="Mô tả"
          value={product?.description || ""}
          onChange={handleChange}
          className="input"
        />

        {/* Chọn giới tính */}
        <select
          name="gender"
          value={product.gender || ""}
          onChange={handleChange}
          className="input"
        >
          <option value="">Chọn giới tính</option>
          <option value="male">male</option>
          <option value="female">female</option>
          <option value="unisex">unisex</option>
        </select>

        <input
          type="number"
          name="basePrice"
          placeholder="Giá cơ bản (tự động cập nhật)"
          value={product?.basePrice || 0}
          disabled
          className="input"
        />

        <h3>Biến thể sản phẩm</h3>
        {product?.variants?.map((variant, index) => (
          <div key={index} className="flex gap-2">
            <input
              type="text"
              name="size"
              placeholder="Size"
              value={variant.size}
              onChange={(e) => handleVariantChange(index, "size", e.target.value)}
              className="input"
            />
            <input
              type="text"
              name="color"
              placeholder="Màu sắc"
              value={variant.color}
              onChange={(e) => handleVariantChange(index, "color", e.target.value)}
              className="input"
            />
            <input
              type="number"
              name="stock"
              placeholder="Số lượng"
              value={variant.stock}
              onChange={(e) => handleVariantChange(index, "stock", e.target.value)}
              className="input"
            />
            <input
              type="number"
              name="price"
              placeholder="Giá"
              value={variant.price}
              onChange={(e) => handleVariantChange(index, "price", e.target.value)}
              className="input"
            />
            <button type="button" onClick={() => removeVariant(index)} className="btn btn-danger">
              Xóa
            </button>
          </div>
        ))}
        <button type="button" onClick={addVariant} className="btn btn-secondary">
          Thêm biến thể
        </button>

        <button type="submit" className="btn btn-primary">
          Lưu thay đổi
        </button>
      </form>
    </div>
  );
};

export default ProductEdit;
