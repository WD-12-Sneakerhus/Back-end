import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createVoucher } from "../../../services/voucherService";

const VoucherAdd = () => {
  const [voucher, setVoucher] = useState({
    code: "",
    discountType: "percent",
    discountValue: "",
    minOrderValue: "",
    quantity: "",
    expirationDate: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setVoucher({ ...voucher, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await createVoucher(voucher);
    navigate("/admin/vouchers");
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h2 className="mb-4 text-2xl font-bold">Thêm Voucher</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="code" placeholder="Mã" onChange={handleChange} required className="w-full p-2 mb-2 border" />
        <select name="discountType" onChange={handleChange} className="w-full p-2 mb-2 border">
          <option value="percent">Giảm %</option>
          <option value="fixed">Giảm tiền</option>
        </select>
        <input type="number" name="discountValue" placeholder="Giá trị" onChange={handleChange} required className="w-full p-2 mb-2 border" />
        <input type="number" name="minOrderValue" placeholder="Giá trị đơn hàng tối thiểu" onChange={handleChange} required className="w-full p-2 mb-2 border" />
        <input type="number" name="quantity" placeholder="Số lượng" onChange={handleChange} required className="w-full p-2 mb-2 border" />
        <input type="date" name="expirationDate" onChange={handleChange} required className="w-full p-2 mb-2 border" />
        <button type="submit" className="px-4 py-2 text-white bg-blue-500 rounded-md">Thêm</button>
      </form>
    </div>
  );
};

export default VoucherAdd;
