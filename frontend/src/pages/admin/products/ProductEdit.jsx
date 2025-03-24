// src/pages/admin/products/ProductEdit.jsx

import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const ProductEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get(`/products/${id}`)
      .then((res) => {
        setProduct(res.data);
        setLoading(false);
      })
      .catch((err) => {
        setError("Failed to load product");
        setLoading(false);
      });
  }, [id]);

  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const handleVariantChange = (index, field, value) => {
    const updatedVariants = [...product.variants];
    updatedVariants[index][field] = value;
    setProduct({ ...product, variants: updatedVariants });
  };

  const addVariant = () => {
    setProduct({
      ...product,
      variants: [...product.variants, { size: "", color: "", stock: 0 }],
    });
  };

  const removeVariant = (index) => {
    const updatedVariants = product.variants.filter((_, i) => i !== index);
    setProduct({ ...product, variants: updatedVariants });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .put(`/products/${id}`, product)
      .then(() => navigate("/admin/products"))
      .catch(() => alert("Update failed"));
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h2>Edit Product</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="name" value={product.name} onChange={handleChange} />
        <input type="number" name="price" value={product.price} onChange={handleChange} />
        <textarea name="description" value={product.description} onChange={handleChange} />

        <h3>Variants</h3>
        {product.variants.map((variant, index) => (
          <div key={index}>
            <input type="text" value={variant.size} onChange={(e) => handleVariantChange(index, "size", e.target.value)} />
            <input type="text" value={variant.color} onChange={(e) => handleVariantChange(index, "color", e.target.value)} />
            <input type="number" value={variant.stock} onChange={(e) => handleVariantChange(index, "stock", e.target.value)} />
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
