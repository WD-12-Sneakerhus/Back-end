// src/components/Logo.jsx
import React from "react";

const LogoAdmin = () => {
  return (
    <div className="flex items-center p-4">
      <div className="flex items-center justify-center w-10 h-10 text-white bg-blue-600 rounded-full">
        🌍
      </div>
      <span className="ml-2 text-xl font-bold text-blue-600">Acme</span>
    </div>
  );
};

export default LogoAdmin;
