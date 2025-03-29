import { useState, useEffect } from "react";
import { FiShoppingCart } from "react-icons/fi"; // Import icon giỏ hàng
import axiosInstance from "../../services/axiosInstance";

const categories = [
  { id: 1, name: "Giày Nam", gender: "male", image: "/images/cat-men.jpg" },
  { id: 2, name: "Giày Nữ", gender: "female", image: "/images/cat-women.jpg" },
  { id: 3, name: "Giày Unisex", gender: "unisex", image: "/images/cat-unisex.jpg" },
];

const FeaturedCategories = () => {
  const [products, setProducts] = useState([]);
  const [selectedGender, setSelectedGender] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axiosInstance.get("/products");
        console.log("✅ Dữ liệu sản phẩm từ API:", res.data);
        setProducts(res.data);
      } catch (error) {
        console.error("❌ Lỗi khi lấy sản phẩm:", error);
      }
    };

    fetchProducts();
  }, []);

  const filteredProducts = selectedGender
    ? products.filter(
      (product) => product.gender?.toLowerCase() === selectedGender?.toLowerCase()
    )
    : products;

  console.log("🔥 Giới tính được chọn:", selectedGender);
  console.log("🎯 Sản phẩm sau khi lọc:", filteredProducts);

  return (
    <div className="py-8">
      <h2 className="mb-6 text-2xl font-bold text-center">Danh mục nổi bật</h2>

      {/* Danh mục sản phẩm */}
      <div className="grid grid-cols-3 gap-4 px-4">
        {categories.map((cat) => (
          <div
            key={cat.id}
            className="relative cursor-pointer group"
            onClick={() => setSelectedGender(cat.gender)}
          >
            <img
              src={cat.image}
              alt={cat.name}
              className="object-cover w-full rounded-lg h-60"
            />
            <div className="absolute inset-0 flex items-center justify-center transition bg-black opacity-0 bg-opacity-40 group-hover:opacity-100">
              <span className="text-lg font-bold text-white">{cat.name}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Danh sách sản phẩm */}
      <div className="mt-8">
        <h3 className="mb-4 text-xl font-semibold text-center">
          {selectedGender
            ? `Sản phẩm dành cho ${categories.find((c) => c.gender === selectedGender)?.name}`
            : "Tất cả sản phẩm"}
        </h3>

        <div className="grid grid-cols-3 gap-4 px-4">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => {
              const imageUrl = product.images?.[0] || "/default-image.jpg";
              const price = product.basePrice || product.variants?.[0]?.price || 0;

              return (
                <div key={product._id} className="p-4 border rounded-lg shadow">
                  <img src={imageUrl} alt={product.name} className="object-cover w-full h-40" />
                  <h4 className="mt-2 text-lg font-semibold">{product.name}</h4>

                  {/* Giá tiền & Giỏ hàng */}
                  <div className="flex items-center justify-between mt-2">
                    <p className="font-bold text-red-500">{price.toLocaleString()} VNĐ</p>
                    <button className="p-2 text-white bg-blue-500 rounded hover:bg-blue-600">
                      <FiShoppingCart size={20} />
                    </button>
                  </div>
                </div>
              );
            })
          ) : (
            <p className="col-span-3 text-center text-gray-500">Không có sản phẩm nào.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default FeaturedCategories;
