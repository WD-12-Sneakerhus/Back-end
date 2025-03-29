import { useEffect, useState } from "react";
import axiosInstance from "../../services/axiosInstance";

const NewArrivals = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchNewArrivals = async () => {
      try {
        const res = await axiosInstance.get("/products?sort=new");
        setProducts(res.data);
      } catch (error) {
        console.error("Lỗi khi lấy sản phẩm mới:", error);
      }
    };

    fetchNewArrivals();
  }, []);

  return (
    <div className="py-8 bg-white">
      <h2 className="mb-6 text-2xl font-bold text-center">Sản phẩm mới nhất</h2>
      <div className="grid grid-cols-4 gap-4 px-4">
        {products.length > 0 ? (
          products.map((product) => {
            const imageUrl = product.images?.length > 0 ? product.images[0] : "/default-image.jpg";
            const price = product.basePrice || product.variants?.[0]?.price || 0; // Kiểm tra giá

            return (
              <div key={product._id} className="p-4 bg-gray-200 rounded-lg shadow-md">
                <img
                  src={imageUrl}
                  alt={product.name}
                  className="object-cover w-full h-40 rounded"
                />
                <h3 className="mt-2 text-lg font-semibold">{product.name}</h3>
                <p className="font-bold text-red-500">
                  {price ? price.toLocaleString() : "Chưa có giá"}₫
                </p>
              </div>
            );
          })
        ) : (
          <p className="col-span-4 text-center text-gray-500">Không có sản phẩm mới</p>
        )}
      </div>
    </div>
  );
};

export default NewArrivals;
