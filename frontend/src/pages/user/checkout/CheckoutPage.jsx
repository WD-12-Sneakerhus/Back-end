import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const CheckoutPage = () => {
  const [cart, setCart] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [deliveryDate, setDeliveryDate] = useState("");
  const [customerInfo, setCustomerInfo] = useState({
    name: "",
    phone: "",
    address: "",
  });

  const navigate = useNavigate();

  useEffect(() => {
    // Lấy giỏ hàng từ localStorage
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(storedCart);

    // Tính tổng tiền
    const total = storedCart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    setTotalPrice(total);

    // Tính ngày giao hàng dự kiến (3 ngày sau hôm nay)
    const currentDate = new Date();
    currentDate.setDate(currentDate.getDate() + 3);
    setDeliveryDate(currentDate.toLocaleDateString("vi-VN"));
  }, []);

  // Xử lý thay đổi thông tin khách hàng
  const handleChange = (e) => {
    setCustomerInfo({ ...customerInfo, [e.target.name]: e.target.value });
  };

  // Xử lý đặt hàng
  const handleOrder = () => {
    if (!customerInfo.name || !customerInfo.phone || !customerInfo.address) {
      alert("Vui lòng nhập đầy đủ thông tin giao hàng!");
      return;
    }

    // Tạo đơn hàng
    const orderData = {
      customer: customerInfo,
      items: cart,
      total: totalPrice,
      deliveryDate: deliveryDate,
      status: "Chờ xác nhận",
    };

    console.log("🛒 Đơn hàng đã đặt:", orderData);

    // Xóa giỏ hàng sau khi đặt hàng thành công
    localStorage.removeItem("cart");
    setCart([]);
    alert("Đặt hàng thành công!");

    // Chuyển hướng về trang chủ
    navigate("/");
  };

  return (
    <div className="container p-6 mx-auto">
      <h2 className="mb-4 text-2xl font-bold">📦 Thanh toán</h2>

      {/* Danh sách sản phẩm */}
      {cart.length > 0 ? (
        <>
          <div className="grid gap-4 mb-6">
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
                <p className="text-gray-700">x{item.quantity}</p>
              </div>
            ))}
          </div>

          {/* Thông tin khách hàng */}
          <div className="p-4 mb-6 bg-white rounded-md shadow-md">
            <h3 className="mb-2 text-lg font-semibold">Thông tin giao hàng</h3>
            <input
              type="text"
              name="name"
              placeholder="Họ và tên"
              value={customerInfo.name}
              onChange={handleChange}
              className="w-full p-2 mb-2 border rounded"
            />
            <input
              type="text"
              name="phone"
              placeholder="Số điện thoại"
              value={customerInfo.phone}
              onChange={handleChange}
              className="w-full p-2 mb-2 border rounded"
            />
            <input
              type="text"
              name="address"
              placeholder="Địa chỉ giao hàng"
              value={customerInfo.address}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            />
          </div>

          {/* Tổng tiền và đặt hàng */}
          <div className="p-4 bg-white rounded-md shadow-md">
            <p className="text-lg font-semibold">Tổng tiền: <span className="text-red-500">{totalPrice.toLocaleString()} VNĐ</span></p>
            <p className="text-gray-600">📅 Ngày dự kiến giao hàng: <b>{deliveryDate}</b></p>
            <button
              onClick={handleOrder}
              className="w-full p-3 mt-4 text-white bg-green-500 rounded hover:bg-green-600"
            >
              Đặt hàng ngay
            </button>
          </div>
        </>
      ) : (
        <p className="text-gray-500">Không có sản phẩm nào để thanh toán.</p>
      )}
    </div>
  );
};

export default CheckoutPage;
