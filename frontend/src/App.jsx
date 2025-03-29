import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AdminLayout from "./layouts/AdminLayout";
import UserLayout from "./layouts/UserLayout";

import ProductList from "./pages/admin/products/ProductList";
import ProductAdd from "./pages/admin/products/ProductAdd";
import ProductEdit from "./pages/admin/products/ProductEdit";
import OrderList from "./pages/admin/orders/OrderList";
import OrderDetail from "./pages/admin/orders/OrderDetail";
import AdminLogin from "./pages/admin/login/AdminLogin";
import UserList from "./pages/admin/user/UserList";
import VoucherList from "./pages/admin/vouchers/VoucherList";
import VoucherAdd from "./pages/admin/vouchers/VoucherAdd";


import Home from "./pages/user/Home";
import CartPage from "./pages/user/cart/CartPage";
import CheckoutPage from "./pages/checkout/CheckoutPage";
function App() {
  return (
    <Router>
      <Routes>
        {/* Đăng nhập Admin */}
        <Route path="/admin/login" element={<AdminLogin />} />

        {/* Layout Admin */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route path="products" element={<ProductList />} />
          <Route path="products/add" element={<ProductAdd />} />
          <Route path="products/edit/:id" element={<ProductEdit />} />

          <Route path="orders" element={<OrderList />} />
          <Route path="orders/:id" element={<OrderDetail />} />

          <Route path="users" element={<UserList />} />

          <Route path="vouchers" element={<VoucherList />} />
          <Route path="vouchers/add" element={<VoucherAdd />} />
        </Route>

        {/* Layout User */}
        <Route path="/" element={<UserLayout />}>
          <Route index element={<Home />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
