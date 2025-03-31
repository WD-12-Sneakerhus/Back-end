// src/pages/user/orders/OrderDetailPage.jsx

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axiosInstance from "../../../services/axiosInstance";

const OrderDetailPage = () => {
  const { id } = useParams(); // Lấy id đơn hàng từ URL
  const [order, setOrder] = useState(null);

  useEffect(() => {
    const fetchOrderDetail = async () => {
      try {
        const res = await axiosInstance.get(`/orders/${id}`);
        setOrder(res.data);
      } catch (error) {
        console.error("❌ Lỗi khi lấy chi tiết đơn hàng:", error);
      }
    };

    fetchOrderDetail();
  }, [id]);

  if (!order) {
    return <p className="text-center">Đang tải dữ liệu...</p>;
  }

  return (
    <div className="container px-4 py-6 mx-auto">
      <h2 className="mb-4 text-2xl font-bold">Chi tiết đơn hàng</h2>

      <div className="p-4 border rounded-lg shadow-md">
        <p className="font-semibold">Mã đơn hàng: {order._id}</p>
        <p className="text-sm text-gray-600">
          Ngày đặt: {new Date(order.createdAt).toLocaleDateString()}
        </p>
        <p className="text-sm text-gray-600">
          Tổng tiền: {order.totalPrice.toLocaleString()} VNĐ
        </p>
        <p
          className={`text-sm font-semibold ${order.status === "Chờ xác nhận"
              ? "text-yellow-500"
              : "text-green-600"
            }`}
        >
          Trạng thái: {order.status}
        </p>
      </div>

      {/* Danh sách sản phẩm trong đơn hàng */}
      <h3 className="mt-6 text-xl font-semibold">Sản phẩm trong đơn</h3>
      <div className="grid gap-4 mt-2">
        {order.items.map((item) => (
          <div
            key={item._id}
            className="flex items-center p-4 border rounded-lg shadow-md"
          >
            <img
              src={item.product.images[0]}
              alt={item.product.name}
              className="object-cover w-20 h-20 rounded"
            />
            <div className="ml-4">
              <p className="font-semibold">{item.product.name}</p>
              <p className="text-sm text-gray-600">
                Số lượng: {item.quantity} | Size: {item.size} | Màu: {item.color}
              </p>
              <p className="text-sm text-gray-600">
                Giá: {item.price.toLocaleString()} VNĐ
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrderDetailPage;
