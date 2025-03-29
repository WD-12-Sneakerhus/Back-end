// src/pages/admin/orders/OrderDetail.jsx

import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";

const OrderDetail = () => {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrderDetail = async () => {
      try {
        const res = await axios.get(`/api/orders/detail/${id}`);
        setOrder(res.data.order);
      } catch (error) {
        console.error("Lỗi khi lấy chi tiết đơn hàng", error);
      } finally {
        setLoading(false);
      }
    };
    fetchOrderDetail();
  }, [id]);

  if (loading) return <p>Đang tải...</p>;

  if (!order)
    return <p className="text-red-500">Không tìm thấy đơn hàng!</p>;

  return (
    <div className="p-6">
      <h2 className="mb-4 text-xl font-bold">Chi Tiết Đơn Hàng</h2>
      <p><strong>Mã đơn hàng:</strong> {order._id}</p>
      <p><strong>Trạng thái:</strong> {order.status}</p>
      <p><strong>Tổng tiền:</strong> {order.totalPrice} VNĐ</p>

      <h3 className="mt-4 text-lg font-bold">Sản phẩm trong đơn</h3>
      <ul className="pl-5 list-disc">
        {order.orderItems.map((item) => (
          <li key={item._id}>
            {item.product.name} - {item.quantity} x {item.product.price} VNĐ
          </li>
        ))}
      </ul>

      <Link to="/admin/orders" className="block mt-4 text-blue-500 hover:underline">
        Quay lại danh sách đơn hàng
      </Link>
    </div>
  );
};

export default OrderDetail;
