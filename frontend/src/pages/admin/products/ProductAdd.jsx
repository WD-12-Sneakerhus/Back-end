import { useState, useEffect } from "react";
import axios from "axios";

const ProductAdd = () => {
  const [product, setProduct] = useState({
    name: "",
    brand: "",
    category: "",
    gender: "",
    variants: [{ size: "", color: "", stock: 0, price: "" }],
    images: [],
    description: "",
    basePrice: 0,
  });

  const [brands, setBrands] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedImages, setSelectedImages] = useState([]);

  useEffect(() => {
    const fetchBrandsAndCategories = async () => {
      try {
        const brandResponse = await axios.get("http://localhost:5000/api/brands");
        setBrands(brandResponse.data);
        const categoryResponse = await axios.get("http://localhost:5000/api/categories");
        setCategories(categoryResponse.data);
      } catch (error) {
        console.error("Lỗi khi lấy thương hiệu hoặc danh mục", error);
      }
    };
    fetchBrandsAndCategories();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  const handleVariantChange = (index, e) => {
    const { name, value } = e.target;
    const newVariants = [...product.variants];
    newVariants[index][name] = value;
    const newBasePrice = Math.min(...newVariants.map((v) => Number(v.price) || Infinity));
    setProduct({ ...product, variants: newVariants, basePrice: newBasePrice });
  };

  const addVariant = () => {
    setProduct({
      ...product,
      variants: [...product.variants, { size: "", color: "", stock: 0, price: "" }],
    });
  };

  const removeVariant = (index) => {
    const newVariants = product.variants.filter((_, i) => i !== index);
    const newBasePrice = newVariants.length > 0 ? Math.min(...newVariants.map((v) => Number(v.price) || Infinity)) : 0;
    setProduct({ ...product, variants: newVariants, basePrice: newBasePrice });
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setSelectedImages([...selectedImages, ...files]);
  };

  const uploadImagesToCloudinary = async () => {
    const uploadedImages = [];
    const cloudinaryUrl = "https://api.cloudinary.com/v1_1/dvwvnhgg9/image/upload";
    const uploadPreset = "product_upload";

    for (let image of selectedImages) {
      const formData = new FormData();
      formData.append("file", image);
      formData.append("upload_preset", uploadPreset);

      try {
        const res = await axios.post(cloudinaryUrl, formData);
        uploadedImages.push(res.data.secure_url);
      } catch (error) {
        console.error("Lỗi khi upload ảnh lên Cloudinary", error);
        alert("Có lỗi xảy ra khi upload hình ảnh. Vui lòng thử lại.");
      }
    }
    return uploadedImages;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const uploadedImages = await uploadImagesToCloudinary();
      const newProduct = { ...product, images: uploadedImages };
      await axios.post("http://localhost:5000/api/products", newProduct);
      alert("Sản phẩm đã được thêm thành công!");
      // Reset form after successful submission
      setProduct({
        name: "",
        brand: "",
        category: "",
        gender: "",
        variants: [{ size: "", color: "", stock: 0, price: "" }],
        images: [],
        description: "",
        basePrice: 0,
      });
      setSelectedImages([]);
    } catch (error) {
      console.error("Lỗi khi thêm sản phẩm", error);
      alert("Có lỗi xảy ra khi thêm sản phẩm. Vui lòng thử lại.");
    }
  };

  return (
    <div className="p-4">
      <h2 className="mb-4 text-xl font-bold">Thêm sản phẩm</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input type="text" name="name" placeholder="Tên sản phẩm" value={product.name} onChange={handleChange} className="input" />

        <select name="brand" value={product.brand} onChange={handleChange} className="input">
          <option value="">Chọn thương hiệu</option>
          {brands.map((b) => (
            <option key={b._id} value={b._id}>{b.name}</option>
          ))}
        </select>

        <select name="category" value={product.category} onChange={handleChange} className="input">
          <option value="">Chọn danh mục</option>
          {categories.map((c) => (
            <option key={c._id} value={c._id}>{c.name}</option>
          ))}
        </select>

        <select name="gender" value={product.gender} onChange={handleChange} className="input">
          <option value="">Chọn giới tính</option>
          <option value="male">Nam</option>
          <option value="female">Nữ</option>
          <option value="unisex">Unisex</option>
        </select>

        <textarea name="description" placeholder="Mô tả" value={product.description} onChange={handleChange} className="input" />

        <div>
          <h3>Biến thể sản phẩm</h3>
          {product.variants.map((variant, index) => (
            <div key={index} className="flex gap-2">
              <input type="text" name="size" placeholder="Size" value={variant.size} onChange={(e) => handleVariantChange(index, e)} className="input" />
              <input type="text" name="color" placeholder="Màu sắc" value={variant.color} onChange={(e) => handleVariantChange(index, e)} className="input" />
              <input type="number" name="stock" placeholder="Số lượng" value={variant.stock} onChange={(e) => handleVariantChange(index, e)} className="input" />
              <input type="number" name="price" placeholder="Giá" value={variant.price} onChange={(e) => handleVariantChange(index, e)} className="input" />
              <button type="button" onClick={() => removeVariant(index)} className="btn btn-danger">Xóa</button>
            </div>
          ))}
          <button type="button" onClick={addVariant} className="btn btn-secondary">Thêm biến thể</button>
        </div>

        <div>
          <h3>Hình ảnh sản phẩm</h3>
          <input type="file" multiple onChange={handleImageChange} className="input" />
          <div className="flex gap-2 mt-2">
            {selectedImages.map((image, index) => (
              <img key={index} src={URL.createObjectURL(image)} alt="preview" className="object-cover w-20 h-20 rounded" />
            ))}
          </div>
        </div>

        <button type="submit" className="btn btn-primary">Thêm sản phẩm</button>
      </form>
    </div>
  );
};

export default ProductAdd;