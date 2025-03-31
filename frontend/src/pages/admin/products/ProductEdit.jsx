// src/pages/admin/products/ProductEdit.jsx
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axiosInstance from "../../../services/axiosInstance";

const ProductEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState({ basePrice: 0, gender: "", images: [] });
  const [selectedImages, setSelectedImages] = useState([]); // Ảnh mới chọn từ máy
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

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setSelectedImages([...selectedImages, ...files]);
  };

  const removeSelectedImage = (index) => {
    setSelectedImages((prev) => prev.filter((_, i) => i !== index));
  };

  const uploadImages = async () => {
    if (selectedImages.length === 0) return product.images;

    const formData = new FormData();
    selectedImages.forEach((image) => {
      formData.append("images", image);
    });

    try {
      const res = await axiosInstance.post("/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      return [...product.images, ...res.data.imageUrls];
    } catch (error) {
      console.error("Lỗi khi upload ảnh", error);
      return product.images;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const updatedImages = await uploadImages();
      await axiosInstance.put(`/products/${id}`, {
        ...product,
        images: updatedImages,
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
        <h3>Hình ảnh sản phẩm</h3>
        <input type="file" multiple onChange={handleImageChange} className="input" />
        <div className="flex gap-2 mt-2">
          {product.images.map((image, index) => (
            <div key={index} className="relative">
              <img src={image} alt="product" className="object-cover w-20 h-20 rounded" />
            </div>
          ))}
        </div>

        <h3>Ảnh mới chọn</h3>
        <div className="flex gap-2 mt-2">
          {selectedImages.map((file, index) => (
            <div key={index} className="relative">
              <img src={URL.createObjectURL(file)} alt="preview" className="object-cover w-20 h-20 rounded" />
              <button
                type="button"
                onClick={() => removeSelectedImage(index)}
                className="absolute top-0 right-0 px-2 py-1 text-xs text-white bg-red-500 rounded-full"
              >
                X
              </button>
            </div>
          ))}
        </div>

        <button type="submit" className="btn btn-primary">
          Lưu thay đổi
        </button>
      </form>
    </div>
  );
};

export default ProductEdit;
