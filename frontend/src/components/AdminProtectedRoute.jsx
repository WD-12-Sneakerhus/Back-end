import { Navigate } from "react-router-dom";

const AdminProtectedRoute = ({ children }) => {
  const isAdmin = localStorage.getItem("role") === "admin"; // Kiểm tra quyền admin
  return isAdmin ? children : <Navigate to="/admin/login" />;
};

export default AdminProtectedRoute;
