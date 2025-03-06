import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const MenuList = () => {
  const [menus, setMenus] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/menus/admins")
      .then((response) => setMenus(response.data))
      .catch((error) => console.error("Lỗi khi lấy danh sách menu:", error));
  }, []);

  const handleViewMenu = (menu) => {
    const menuId = menu._id;
    navigate(`/admin/menus/${menuId}`, { state: { menu } });
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold">Danh Sách Menu</h1>
        <button
          onClick={() => navigate("/admin/menus/create")}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
        >
          Thêm Mới
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {menus.map((menu) => (
          <div key={menu._id} className="border p-4 rounded-lg shadow-md">
            <h2 className="text-lg font-semibold">{menu.menuPackage}</h2>
            <p className="text-gray-700">Giá: {menu.price} VND</p>
            <p className="text-gray-700">
              Email Người dùng:{" "}
              {menu.userEmail?.toLowerCase() || "Không có email"}
            </p>
            <button
              onClick={() => handleViewMenu(menu)}
              className="mt-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Xem Chi Tiết
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MenuList;
