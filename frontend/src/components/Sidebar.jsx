
// src/components/Sidebar.jsx
import React from "react";
import { Link } from "react-router-dom";
// import LogoAdmin from "./Logo";



const Sidebar = () => {
  return (
    <div className="flex flex-col w-64 min-h-screen p-4 bg-white shadow-md">
      {/* <LogoAdmin /> */}
      <nav className="mt-6">
        <ul>
          <li className="mb-2">
            <Link to="/admin" className="flex items-center p-2 text-gray-700 rounded-md hover:bg-gray-100">
              🏠 Home
            </Link>
          </li>
          <li className="mb-2">
            <Link to="/admin/products" className="flex items-center p-2 text-gray-700 rounded-md hover:bg-gray-100">
              📦 Products
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;