import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const CartPage = () => {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(storedCart);
  }, []);

  // Xóa sản phẩm khỏi giỏ hàng
  const removeItem = (index) => {
    const newCart = [...cart];
    newCart.splice(index, 1);
    setCart(newCart);
    localStorage.setItem("cart", JSON.stringify(newCart));
  };

  return (
    <div className="container p-6 mx-auto">
      <h2 className="mb-4 text-2xl font-bold">🛒 Giỏ hàng của bạn</h2>

      {cart.length > 0 ? (
        <div className="grid gap-4">
          {cart.map((item, index) => (
            <div key={index} className="flex items-center justify-between p-4 bg-white rounded-md shadow-md">
              <div className="flex items-center">
                <img src={item.images[0]} alt={item.name} className="w-16 h-16 rounded" />
                <div className="ml-4">
                  <h3 className="text-lg font-semibold">{item.name}</h3>
                  <p className="text-gray-600">Size: {item.size}, Màu: {item.color}</p>
                  <p className="font-bold text-red-500">{item.price.toLocaleString()} VNĐ</p>
                </div>
              </div>
              <button
                className="text-red-500 hover:text-red-700"
                onClick={() => removeItem(index)}
              >
                ❌ Xóa
              </button>
            </div>
          ))}
          <Link to="/checkout" className="block p-3 text-center text-white bg-green-500 rounded hover:bg-green-600">
            Thanh toán ngay
          </Link>
        </div>
      ) : (
        <p className="text-gray-500">Bạn chưa có sản phẩm nào trong giỏ hàng.</p>
      )}
    </div>
  );
};

export default CartPage;
