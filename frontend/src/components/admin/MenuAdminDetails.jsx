import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const MenuAdminDetails = () => {
  const { id } = useParams();
  const [menu, setMenu] = useState(null);

  useEffect(() => {
    axios
      .get(`https://fitmenu.store/api/menus/${id}`)
      .then((response) => setMenu(response.data))
      .catch((error) => console.error("Lỗi khi lấy chi tiết menu:", error));
  }, [id]);

  if (!menu) return <div className="p-6 max-w-4xl mx-auto">Đang tải...</div>;

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">{menu.menuPackage}</h1>
      <p className="text-lg font-semibold text-red-500">
        Giá: {menu.price} VND
      </p>
      <div className="mt-4">
        {menu.days.map((day, index) => (
          <div key={index} className="mb-6">
            <h2 className="text-xl font-semibold">Ngày {day.day}</h2>
            <div className="border p-4 rounded-lg shadow-md">
              <p>
                <strong>Bữa sáng:</strong>{" "}
                {day.meals.breakfast?.name || "Không có"}
              </p>
              <p>
                <strong>Bữa trưa:</strong> {day.meals.lunch?.name || "Không có"}
              </p>
              <p>
                <strong>Bữa tối:</strong> {day.meals.dinner?.name || "Không có"}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MenuAdminDetails;
