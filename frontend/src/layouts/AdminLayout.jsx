import { Outlet, Link } from "react-router-dom";

function AdminLayout() {
  return (
    <div className="flex">
      {/* Sidebar */}
      <aside className="w-1/4 bg-gray-800 text-white h-screen p-4">
        <h2 className="text-lg font-bold">Admin Dashboard</h2>
        <nav className="mt-4">
          <Link
            to="/admin/products"
            className="block py-2 px-4 hover:bg-gray-600"
          >
            Quản lý sản phẩm
          </Link>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="w-3/4 p-4">
        <Outlet />
      </main>
    </div>
  );
}

export default AdminLayout;
