// src/pages/user/orders/OrderHistoryPage.jsx

import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axiosInstance from "../../../services/axiosInstance";

const OrderHistoryPage = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await axiosInstance.get("/orders"); // API lấy danh sách đơn hàng của user
        setOrders(res.data);
      } catch (error) {
        console.error("❌ Lỗi khi lấy danh sách đơn hàng:", error);
      }
    };

    fetchOrders();
  }, []);

  return (
    <div className="container px-4 py-6 mx-auto">
      <h2 className="mb-4 text-2xl font-bold">Lịch sử đơn hàng</h2>

      {orders.length > 0 ? (
        <div className="grid gap-4">
          {orders.map((order) => (
            <div key={order._id} className="p-4 border rounded-lg shadow-md">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-semibold">Mã đơn hàng: {order._id}</p>
                  <p className="text-sm text-gray-600">
                    Ngày đặt: {new Date(order.createdAt).toLocaleDateString()}
                  </p>
                  <p className="text-sm text-gray-600">
                    Tổng tiền: {order.totalPrice.toLocaleString()} VNĐ
                  </p>
                  <p
                    className={`text-sm font-semibold mt-1 ${order.status === "Chờ xác nhận"
                        ? "text-yellow-500"
                        : "text-green-600"
                      }`}
                  >
                    {order.status}
                  </p>
                </div>
                <Link
                  to={`/orders/${order._id}`}
                  className="text-blue-500 hover:underline"
                >
                  Xem chi tiết
                </Link>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500">Bạn chưa có đơn hàng nào.</p>
      )}
    </div>
  );
};

export default OrderHistoryPage;
