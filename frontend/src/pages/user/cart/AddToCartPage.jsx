import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axiosInstance from "../../../services/axiosInstance";

const AddToCartPage = () => {
  const { id } = useParams(); // Lấy ID sản phẩm từ URL
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [selectedSize, setSelectedSize] = useState("");
  const [availableColors, setAvailableColors] = useState([]);
  const [selectedColor, setSelectedColor] = useState("");
  const [selectedVariant, setSelectedVariant] = useState(null);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axiosInstance.get(`/products/${id}`);
        console.log("📦 Dữ liệu sản phẩm:", res.data);
        setProduct(res.data);
      } catch (error) {
        console.error("❌ Lỗi khi lấy sản phẩm:", error);
      }
    };
    fetchProduct();
  }, [id]);

  if (!product) return <p className="text-center text-gray-500">Đang tải...</p>;

  // Lấy danh sách size từ variants
  const sizes = [...new Set(product.variants?.map(v => v.size))] || [];

  // Khi chọn size, cập nhật danh sách màu tương ứng
  const handleSizeSelect = (size) => {
    setSelectedSize(size);
    setSelectedColor(""); // Reset màu khi chọn size mới
    setSelectedVariant(null);

    // Lọc ra các màu có sẵn cho size này
    const colorsForSize = [...new Set(product.variants
      .filter(v => v.size === size)
      .map(v => v.color)
    )];

    setAvailableColors(colorsForSize);
  };

  // Khi chọn màu, tìm đúng biến thể để lấy giá và tồn kho
  const handleColorSelect = (color) => {
    setSelectedColor(color);
    const variant = product.variants.find(v => v.size === selectedSize && v.color === color);
    setSelectedVariant(variant);
    setQuantity(1); // Reset số lượng khi đổi màu
  };

  const handleAddToCart = () => {
    if (!selectedSize || !selectedColor || !selectedVariant) {
      alert("Vui lòng chọn size và màu trước khi thêm vào giỏ hàng!");
      return;
    }
    if (quantity > selectedVariant.stock) {
      alert(`Sản phẩm chỉ còn ${selectedVariant.stock} sản phẩm trong kho!`);
      return;
    }

    const cartItem = {
      _id: product._id,
      name: product.name,
      image: product.images?.[0] || "/default-image.jpg",
      size: selectedVariant.size,
      color: selectedVariant.color,
      price: selectedVariant.price,
      quantity,
    };

    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart.push(cartItem);
    localStorage.setItem("cart", JSON.stringify(cart));

    alert("✅ Sản phẩm đã được thêm vào giỏ hàng!");
    navigate("/cart");
  };

  return (
    <div className="max-w-3xl p-6 mx-auto bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold">{product.name}</h1>
      <img src={product.images?.[0] || "/default-image.jpg"} alt={product.name} className="object-cover w-full h-64 mt-4" />

      {/* Hiển thị giá theo biến thể */}
      <p className="mt-2 text-xl font-bold text-red-500">
        {selectedVariant ? selectedVariant.price.toLocaleString() : "Chọn size & màu để hiển thị giá"} VNĐ
      </p>

      {/* Chọn size */}
      <div className="mt-4">
        <h3 className="text-lg font-semibold">Chọn size:</h3>
        <div className="flex gap-2 mt-2">
          {sizes.length > 0 ? (
            sizes.map((size) => (
              <button
                key={size}
                className={`px-4 py-2 border rounded ${selectedSize === size ? "bg-blue-500 text-white" : "bg-gray-100"}`}
                onClick={() => handleSizeSelect(size)}
              >
                {size}
              </button>
            ))
          ) : (
            <p className="text-gray-500">Không có size khả dụng.</p>
          )}
        </div>
      </div>

      {/* Chọn màu (chỉ hiển thị sau khi chọn size) */}
      {selectedSize && (
        <div className="mt-4">
          <h3 className="text-lg font-semibold">Chọn màu:</h3>
          <div className="flex gap-2 mt-2">
            {availableColors.length > 0 ? (
              availableColors.map((color) => (
                <button
                  key={color}
                  className={`px-4 py-2 border rounded ${selectedColor === color ? "bg-green-500 text-white" : "bg-gray-100"}`}
                  onClick={() => handleColorSelect(color)}
                >
                  {color}
                </button>
              ))
            ) : (
              <p className="text-gray-500">Không có màu nào cho size này.</p>
            )}
          </div>
        </div>
      )}

      {/* Chọn số lượng */}
      {selectedVariant && (
        <div className="mt-4">
          <h3 className="text-lg font-semibold">Số lượng:</h3>
          <input
            type="number"
            min="1"
            max={selectedVariant.stock}
            value={quantity}
            onChange={(e) => setQuantity(Math.max(1, Math.min(selectedVariant.stock, Number(e.target.value))))}
            className="w-16 p-2 mt-2 border rounded"
          />
          {selectedVariant.stock < 5 && (
            <p className="mt-1 text-sm text-red-500">⚠ Chỉ còn {selectedVariant.stock} sản phẩm!</p>
          )}
        </div>
      )}

      {/* Nút thêm vào giỏ hàng */}
      <button
        onClick={handleAddToCart}
        disabled={!selectedVariant}
        className={`w-full p-3 mt-6 text-white rounded ${selectedVariant ? "bg-blue-500 hover:bg-blue-600" : "bg-gray-400 cursor-not-allowed"
          }`}
      >
        Thêm vào giỏ hàng
      </button>
    </div>
  );
};

export default AddToCartPage;
