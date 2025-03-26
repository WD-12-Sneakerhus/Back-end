// src/pages/admin/products/ProductEdit.jsx

import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axiosInstance from "../../../services/axiosInstance";

const ProductEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axiosInstance
      .get(`/products/${id}`)
      .then((res) => {
        setProduct(res.data);
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
      return { ...prev, variants: updatedVariants };
    });
  };

  const addVariant = () => {
    setProduct((prev) => ({
      ...prev,
      variants: [...(prev.variants || []), { size: "", color: "", stock: 0 }],
    }));
  };

  const removeVariant = (index) => {
    setProduct((prev) => ({
      ...prev,
      variants: prev.variants.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axiosInstance.put(`/products/${id}`, product);
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
    <div>
      <h2>Edit Product</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          value={product?.name || ""}
          onChange={handleChange}
        />
        <input
          type="number"
          name="price"
          value={product?.price || ""}
          onChange={handleChange}
        />
        <textarea
          name="description"
          value={product?.description || ""}
          onChange={handleChange}
        />

        <h3>Variants</h3>
        {product?.variants?.map((variant, index) => (
          <div key={index}>
            <input
              type="text"
              value={variant.size}
              onChange={(e) => handleVariantChange(index, "size", e.target.value)}
            />
            <input
              type="text"
              value={variant.color}
              onChange={(e) => handleVariantChange(index, "color", e.target.value)}
            />
            <input
              type="number"
              value={variant.stock}
              onChange={(e) => handleVariantChange(index, "stock", e.target.value)}
            />
            <button type="button" onClick={() => removeVariant(index)}>Remove</button>
          </div>
        ))}
        <button type="button" onClick={addVariant}>Add Variant</button>
        <button type="submit">Save</button>
      </form>
    </div>
  );
};

export default ProductEdit;
