import { useEffect, useState } from "react";
import { getVouchers, deleteVoucher, toggleVoucherStatus } from "../../../services/voucherService";
import { Link } from "react-router-dom";

const VoucherList = () => {
  const [vouchers, setVouchers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchVouchers();
  }, []);

  const fetchVouchers = async () => {
    try {
      const response = await getVouchers();
      setVouchers(response.data);
    } catch (error) {
      console.error("Lỗi khi tải voucher:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa voucher này?")) {
      await deleteVoucher(id);
      fetchVouchers();
    }
  };

  const handleToggleStatus = async (id) => {
    await toggleVoucherStatus(id);
    fetchVouchers();
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h2 className="mb-4 text-2xl font-bold">Danh sách Voucher</h2>

      <Link to="/admin/vouchers/add" className="px-4 py-2 text-white bg-blue-500 rounded-md">
        + Thêm Voucher
      </Link>

      {loading ? (
        <p className="mt-4 text-gray-500">Đang tải...</p>
      ) : (
        <table className="w-full mt-4 border border-gray-300 rounded-md">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-2">Mã</th>
              <th className="p-2">Loại</th>
              <th className="p-2">Giá trị</th>
              <th className="p-2">Hạn sử dụng</th>
              <th className="p-2">Trạng thái</th>
              <th className="p-2">Hành động</th>
            </tr>
          </thead>
          <tbody>
            {vouchers.map((voucher) => (
              <tr key={voucher._id} className="border-b">
                <td className="p-2">{voucher.code}</td>
                <td className="p-2">{voucher.discountType === "percent" ? "%" : "VND"}</td>
                <td className="p-2">{voucher.discountValue}</td>
                <td className="p-2">{new Date(voucher.expirationDate).toLocaleDateString()}</td>
                <td className="p-2">
                  <button
                    onClick={() => handleToggleStatus(voucher._id)}
                    className={`px-3 py-1 rounded-md ${voucher.isActive ? "bg-green-500 text-white" : "bg-gray-500 text-white"}`}
                  >
                    {voucher.isActive ? "Kích hoạt" : "Vô hiệu"}
                  </button>
                </td>
                <td className="p-2">
                  <Link to={`/admin/vouchers/edit/${voucher._id}`} className="px-3 py-1 text-white bg-yellow-500 rounded-md">
                    Sửa
                  </Link>
                  <button
                    onClick={() => handleDelete(voucher._id)}
                    className="px-3 py-1 ml-2 text-white bg-red-500 rounded-md"
                  >
                    Xóa
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default VoucherList;
