// src/pages/user/orders/OrderHistory.jsx

import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axiosInstance from "../../../services/axiosInstance";

const OrderHistory = () => {
  const [orders, setOrders] = useState([]);
  const userId = "user_id_tạm_thời"; // Cần lấy từ context hoặc localStorage

  useEffect(() => {
    fetchCompletedOrders();
  }, []);

  const fetchCompletedOrders = async () => {
    try {
      const res = await axiosInstance.get(`/api/orders/user/${userId}`);
      const completedOrders = res.data.orders.filter(order => order.status === "completed");
      setOrders(completedOrders);
    } catch (error) {
      console.error("Lỗi khi lấy lịch sử đơn hàng", error);
    }
  };

  return (
    <div className="p-6">
      <h2 className="mb-4 text-xl font-bold">Lịch Sử Đơn Hàng</h2>

      {orders.length === 0 ? (
        <p>Không có đơn hàng nào đã hoàn thành.</p>
      ) : (
        <div className="grid gap-4">
          {orders.map((order) => (
            <div key={order._id} className="p-4 border rounded shadow">
              <h3 className="font-bold">Mã: {order._id}</h3>
              <p>Tổng tiền: {order.totalPrice} VNĐ</p>
              <Link
                to={`/user/orders/${order._id}`}
                className="block mt-2 text-blue-500 hover:underline"
              >
                Xem chi tiết
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default OrderHistory;
