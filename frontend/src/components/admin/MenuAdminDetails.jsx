import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const MenuAdminDetails = () => {
  const { id } = useParams();
  const [menu, setMenu] = useState(null);
  const [selectedDay, setSelectedDay] = useState(null);
  const [availableMeals, setAvailableMeals] = useState([]);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/menus/${id}`)
      .then((response) => setMenu(response.data))
      .catch((error) => console.error("Lỗi khi lấy chi tiết menu:", error));
  }, [id]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/meals") // API lấy danh sách các bữa ăn có sẵn
      .then((response) => setAvailableMeals(response.data))
      .catch((error) => console.error("Lỗi khi lấy danh sách bữa ăn:", error));
  }, []);

  const handleDayClick = (day) => {
    setSelectedDay(day);
  };

  const handleMealChange = (mealType, mealId) => {
    if (selectedDay) {
      setSelectedDay((prev) => ({
        ...prev,
        meals: {
          ...prev.meals,
          [mealType]: availableMeals.find((m) => m._id === mealId),
        },
      }));
    }
  };

  const handleSave = () => {
    if (menu && selectedDay) {
      const updatedDays = menu.days.map((day) =>
        day.day === selectedDay.day ? selectedDay : day
      );

      // Cập nhật frontend
      setMenu({ ...menu, days: updatedDays });

      // Gửi yêu cầu cập nhật lên backend
      axios
        .put(`http://localhost:5000/api/menus/${id}`, { days: updatedDays })
        .then((response) => {
          console.log("Cập nhật menu thành công:", response.data);
          setSelectedDay(null); // Đóng modal sau khi lưu thành công
        })
        .catch((error) => {
          console.error("Lỗi khi cập nhật menu:", error);
        });
    }
  };

  if (!menu) return <div className="p-6 max-w-4xl mx-auto">Đang tải...</div>;

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">{menu.menuPackage}</h1>
      <p className="text-lg font-semibold text-red-500">
        Giá: {menu.price} VND
      </p>
      <div className="mt-4">
        {menu.days.map((day) => (
          <div
            key={day.day}
            className="mb-6 cursor-pointer"
            onClick={() => handleDayClick(day)}
          >
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

      {selectedDay && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-xl font-bold mb-4">
              Chỉnh sửa bữa ăn - Ngày {selectedDay.day}
            </h2>
            {["breakfast", "lunch", "dinner"].map((mealType) => (
              <div key={mealType} className="mb-4">
                <label className="block font-semibold">{mealType}</label>
                <select
                  className="w-full p-2 border rounded"
                  onChange={(e) => handleMealChange(mealType, e.target.value)}
                >
                  <option value="">Chọn món ăn</option>
                  {availableMeals.map((meal) => (
                    <option key={meal._id} value={meal._id}>
                      {meal.name}
                    </option>
                  ))}
                </select>
              </div>
            ))}
            <div className="flex justify-end">
              <button
                className="bg-gray-300 px-4 py-2 mr-2 rounded"
                onClick={() => setSelectedDay(null)}
              >
                Hủy
              </button>
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded"
                onClick={handleSave}
              >
                Lưu
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MenuAdminDetails;
