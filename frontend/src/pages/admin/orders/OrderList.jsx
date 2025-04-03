// src/pages/admin/orders/OrderList.jsx

import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const OrderList = () => {
  const [orders, setOrders] = useState([]);
  const [status, setStatus] = useState("all");
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const ordersPerPage = 5;

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const res = await axios.get("/api/orders");
      setOrders(res.data.orders);
    } catch (error) {
      console.error("Lỗi khi lấy danh sách đơn hàng", error);
    }
  };

  const updateOrderStatus = async (orderId, newStatus) => {
    try {
      await axios.put(`/api/orders/${orderId}`, { status: newStatus });
      fetchOrders(); // Cập nhật lại danh sách sau khi thay đổi trạng thái
    } catch (error) {
      console.error("Lỗi khi cập nhật trạng thái đơn hàng", error);
    }
  };

  const filteredOrders = orders.filter((order) => {
    return (
      (status === "all" || order.status === status) &&
      order._id.includes(search)
    );
  });

  const totalPages = Math.ceil(filteredOrders.length / ordersPerPage);
  const paginatedOrders = filteredOrders.slice(
    (currentPage - 1) * ordersPerPage,
    currentPage * ordersPerPage
  );

  return (
    <div className="p-6">
      <h2 className="mb-4 text-xl font-bold">Danh Sách Đơn Hàng</h2>
      <div className="flex gap-4 mb-4">
        <input
          type="text"
          placeholder="Tìm kiếm mã đơn hàng"
          className="flex-1 p-2 border"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select
          className="p-2 border"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        >
          <option value="all">Tất cả</option>
          <option value="pending">Chờ xác nhận</option>
          <option value="confirmed">Đã xác nhận</option>
          <option value="shipping">Đang giao hàng</option>
          <option value="completed">Đã hoàn thành</option>
        </select>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {paginatedOrders.map((order) => (
          <div key={order._id} className="p-4 border rounded shadow">
            <h3 className="font-bold">Mã: {order._id}</h3>
            <p>Trạng thái: {order.status}</p>
            <p>Tổng tiền: {order.totalPrice} VNĐ</p>

            {/* Nút cập nhật trạng thái */}
            {order.status === "pending" && (
              <button
                className="px-4 py-2 mt-2 text-white bg-blue-500 rounded"
                onClick={() => updateOrderStatus(order._id, "confirmed")}
              >
                Xác nhận đơn
              </button>
            )}
            {order.status === "confirmed" && (
              <button
                className="px-4 py-2 mt-2 text-white bg-green-500 rounded"
                onClick={() => updateOrderStatus(order._id, "shipping")}
              >
                Giao hàng
              </button>
            )}
            {order.status === "shipping" && (
              <button
                className="px-4 py-2 mt-2 text-white bg-purple-500 rounded"
                onClick={() => updateOrderStatus(order._id, "completed")}
              >
                Đã giao hàng
              </button>
            )}

            <Link
              to={`/admin/orders/${order._id}`}
              className="block mt-2 text-blue-500 hover:underline"
            >
              Xem chi tiết
            </Link>
          </div>
        ))}
      </div>

      {/* Phân trang */}
      <div className="flex justify-center gap-4 mt-4">
        <button
          className="p-2 border"
          disabled={currentPage === 1}
          onClick={() => setCurrentPage((prev) => prev - 1)}
        >
          Trang trước
        </button>
        <span>Trang {currentPage} / {totalPages}</span>
        <button
          className="p-2 border"
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage((prev) => prev + 1)}
        >
          Trang sau
        </button>
      </div>
    </div>
  );
};

export default OrderList;
