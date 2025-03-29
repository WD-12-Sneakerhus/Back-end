import axiosInstance from "./axiosInstance";

export const getVouchers = async () => {
  return axiosInstance.get("/vouchers");
};

export const createVoucher = async (data) => {
  return axiosInstance.post("/vouchers", data);
};

export const updateVoucher = async (id, data) => {
  return axiosInstance.put(`/vouchers/${id}`, data);
};

export const deleteVoucher = async (id) => {
  return axiosInstance.delete(`/vouchers/${id}`);
};

export const toggleVoucherStatus = async (id) => {
  return axiosInstance.patch(`/vouchers/${id}/toggle-status`);
};
