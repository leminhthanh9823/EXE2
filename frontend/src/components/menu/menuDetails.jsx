import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

const MenuDetails = () => {
  const location = useLocation();
  const { menu } = location.state || {};

  // Lấy trạng thái từ localStorage hoặc mặc định là ngày đầu tiên
  const storedDayIndex = localStorage.getItem(`currentDayIndex_${menu?.name}`);
  const [currentDayIndex, setCurrentDayIndex] = useState(
    storedDayIndex ? parseInt(storedDayIndex, 10) : 0
  );

  // Cập nhật localStorage khi người dùng thay đổi ngày
  useEffect(() => {
    if (menu) {
      localStorage.setItem(`currentDayIndex_${menu.name}`, currentDayIndex);
    }
  }, [currentDayIndex, menu]);

  if (!menu) {
    return (
      <div className="p-6 max-w-4xl mx-auto">Không tìm thấy thực đơn!</div>
    );
  }
  console.log("Mô tả thực đơn:", menu.details);
  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">{menu.name}</h1>

      {/* Nếu có price, chỉ hiển thị price */}
      {menu.price ? (
        <div className="bg-gray-100 p-4 rounded-lg shadow-md">
          <p className="text-lg font-medium text-gray-800 mb-2">
            <span className="font-semibold text-blue-600">Mô tả:</span>{" "}
            {menu.details}
          </p>
          <p className="text-lg font-semibold text-red-500">
            Giá: {menu.price}
          </p>
          <button className="bg-orange-500 text-white px-6 py-3 rounded-lg shadow-md hover:bg-orange-600 transition-all mt-4">
            Mua Ngay
          </button>
        </div>
      ) : (
        // Nếu không có price, hiển thị danh sách ngày và món ăn
        menu.days.map((day, index) => (
          <div key={index} className="mb-6">
            <h2
              className="text-xl font-semibold mb-2 cursor-pointer"
              onClick={() => setCurrentDayIndex(index)} // Đổi ngày đang theo dõi
            >
              {day.day} {index === currentDayIndex && "⭐"}
            </h2>
            {day.meals.map((meal, idx) => (
              <div key={idx} className="border p-4 mb-2 rounded-lg shadow">
                <h3 className="text-lg font-semibold">
                  {meal.meal}: {meal.dish}
                </h3>
                <p className="text-gray-700 text-sm">{meal.recipe}</p>
              </div>
            ))}
          </div>
        ))
      )}
    </div>
  );
};

export default MenuDetails;
