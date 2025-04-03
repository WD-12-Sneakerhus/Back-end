// src/pages/admin/users/UserList.jsx
import { useEffect, useState } from "react";
import axiosInstance from "../../../services/axiosInstance";
import { FaTrash } from "react-icons/fa";

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axiosInstance.get("/users");
      setUsers(response.data);
    } catch (error) {
      console.error("Lỗi khi lấy danh sách người dùng:", error);
      setError("Không thể tải danh sách người dùng");
    } finally {
      setLoading(false);
    }
  };

  // Xóa tài khoản
  const deleteUser = async (id) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa tài khoản này?")) {
      try {
        await axiosInstance.delete(`/users/${id}`);
        setUsers((prevUsers) => prevUsers.filter((user) => user._id !== id));
      } catch (error) {
        console.error("Lỗi khi xóa người dùng:", error);
      }
    }
  };
  const toggleBlockUser = async (id, isBlocked) => {
    if (window.confirm(`Bạn có chắc chắn muốn ${isBlocked ? "bỏ chặn" : "chặn"} tài khoản này?`)) {
      try {
        await axiosInstance.put(`/users/${id}/block`);
        setUsers((prevUsers) =>
          prevUsers.map((user) =>
            user._id === id ? { ...user, isBlocked: !isBlocked } : user
          )
        );
      } catch (error) {
        console.error("Lỗi khi cập nhật trạng thái:", error.response?.data || error);
      }
    }
  };

  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.fullname.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.phone.includes(searchTerm);

    const matchesStatus =
      roleFilter === "all" ||
      (roleFilter === "active" && !user.isBlocked) ||
      (roleFilter === "blocked" && user.isBlocked);

    return matchesSearch && matchesStatus;
  });




  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);
  const displayedUsers = filteredUsers.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h2 className="mb-4 text-2xl font-bold">Danh sách người dùng</h2>

      {/* Ô tìm kiếm và bộ lọc */}
      <div className="flex items-center gap-4 mb-4">
        <input
          type="text"
          placeholder="Tìm theo tên, email, username hoặc số điện thoại..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-md"
        />

        <select
          value={roleFilter}
          onChange={(e) => setRoleFilter(e.target.value)}
          className="p-2 border border-gray-300 rounded-md"
        >
          <option value="all">Tất cả</option>
          <option value="active">Đang hoạt động</option>
          <option value="blocked">Đã bị chặn</option>
        </select>

      </div>

      {/* Hiển thị dữ liệu */}
      {loading ? (
        <p className="text-center text-gray-500">Đang tải dữ liệu...</p>
      ) : error ? (
        <p className="text-center text-red-500">{error}</p>
      ) : filteredUsers.length === 0 ? (
        <p className="text-center text-gray-500">Không có người dùng nào</p>
      ) : (
        <>
          <table className="w-full border border-gray-300 rounded-md">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-2 text-left">Họ và Tên</th>
                <th className="p-2 text-left">Email</th>
                <th className="p-2 text-left">Username</th>
                <th className="p-2 text-left">Số điện thoại</th>
                <th className="p-2 text-left">Vai trò</th>
                <th className="p-2 text-left">Hành động</th>
              </tr>
            </thead>
            <tbody>
              {displayedUsers.map((user) => (
                <tr key={user._id} className="border-b hover:bg-gray-50">
                  <td className="p-2">{user.fullname}</td>
                  <td className="p-2">{user.email}</td>
                  <td className="p-2">{user.username}</td>
                  <td className="p-2">{user.phone}</td>
                  <td
                    className={`p-2 ${user.role === "admin" ? "text-blue-500" : "text-gray-500"
                      }`}
                  >
                    {user.role === "admin" ? "Admin" : "User"}
                  </td>
                  <td className="flex p-2 space-x-2">
                    {/* Nút Xóa */}
                    <button
                      onClick={() => deleteUser(user._id)}
                      className="flex items-center px-3 py-1 text-white bg-gray-500 rounded-md hover:bg-gray-600"
                    >
                      <FaTrash className="mr-1" />
                      Xóa
                    </button>
                    <button
                      onClick={() => toggleBlockUser(user._id, user.isBlocked)}
                      className={`px-3 py-1 rounded-md text-white ${user.isBlocked ? "bg-green-500 hover:bg-green-600" : "bg-red-500 hover:bg-red-600"
                        }`}
                    >
                      {user.isBlocked ? "Bỏ chặn" : "Chặn"}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Phân trang */}
          <div className="flex justify-center mt-4 space-x-2">
            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i}
                onClick={() => setCurrentPage(i + 1)}
                className={`px-3 py-1 border rounded-md ${currentPage === i + 1 ? "bg-blue-500 text-white" : "bg-gray-200"
                  }`}
              >
                {i + 1}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default UserList;
