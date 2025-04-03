// src/pages/user/orders/OrderPage.jsx

import { useState, useEffect } from "react";
import axiosInstance from "../../../services/axiosInstance";

const OrderPage = () => {
  const [orders, setOrders] = useState([]);
  const [status, setStatus] = useState("all");
  const userId = "user_id_tạm_thời"; // Cần lấy từ context hoặc localStorage

  useEffect(() => {
    fetchUserOrders();
  }, []);

  const fetchUserOrders = async () => {
    try {
      const res = await axiosInstance.get(`/api/orders/user/${userId}`);
      setOrders(res.data.orders);
    } catch (error) {
      console.error("Lỗi khi lấy đơn hàng của người dùng", error);
    }
  };

  const confirmReceived = async (orderId) => {
    try {
      await axiosInstance.put(`/api/orders/${orderId}`, { status: "completed" });
      fetchUserOrders();
    } catch (error) {
      console.error("Lỗi khi xác nhận đã nhận hàng", error);
    }
  };

  const filteredOrders = orders.filter((order) => {
    return status === "all" || order.status === status;
  });

  return (
    <div className="p-6">
      <h2 className="mb-4 text-xl font-bold">Đơn Hàng Của Tôi</h2>

      <select
        className="p-2 mb-4 border"
        value={status}
        onChange={(e) => setStatus(e.target.value)}
      >
        <option value="all">Tất cả</option>
        <option value="pending">Chờ giao hàng</option>
        <option value="shipping">Đang giao hàng</option>
        <option value="completed">Đã giao hàng / Hoàn thành</option>
      </select>

      <div className="grid gap-4">
        {filteredOrders.map((order) => (
          <div key={order._id} className="p-4 border rounded shadow">
            <h3 className="font-bold">Mã: {order._id}</h3>
            <p>Trạng thái: {order.status}</p>
            <p>Tổng tiền: {order.totalPrice} VNĐ</p>

            {order.status === "shipping" && (
              <button
                className="px-4 py-2 mt-2 text-white bg-green-500 rounded"
                onClick={() => confirmReceived(order._id)}
              >
                Đã nhận hàng
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrderPage;
