import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AdminLayout from "./layouts/AdminLayout";
import ProductList from "./pages/admin/products/ProductList";
import ProductAdd from "./pages/admin/products/ProductAdd";
import ProductEdit from "./pages/admin/products/ProductEdit";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/admin" element={<AdminLayout />}>
          <Route path="products" element={<ProductList />} />
          <Route path="products/add" element={<ProductAdd />} />
          <Route path="products/edit/:id" element={<ProductEdit />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;    
