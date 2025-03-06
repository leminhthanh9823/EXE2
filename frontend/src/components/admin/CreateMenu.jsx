import React, { useState, useEffect } from "react";
import axios from "axios";

const CreateMenu = () => {
  const [menuPackage, setMenuPackage] = useState("7-day");
  const [meals, setMeals] = useState([]);
  const [mealOptions, setMealOptions] = useState([]);

  const user = JSON.parse(localStorage.getItem("user"));
  const userId = user ? user._id : null;

  // Lấy danh sách món ăn từ API
  useEffect(() => {
    axios
      .get("http://localhost:5000/api/meals")
      .then((response) => setMealOptions(response.data))
      .catch((error) => console.error("Lỗi khi tải danh sách món ăn", error));
  }, []);

  // Khởi tạo danh sách thực đơn theo gói menu
  useEffect(() => {
    const daysCount = menuPackage === "7-day" ? 7 : 10;
    setMeals(
      Array.from({ length: daysCount }, () => ({
        breakfast: "",
        lunch: "",
        dinner: "",
      }))
    );
  }, [menuPackage]);

  // Hàm cập nhật món ăn cho từng bữa của từng ngày
  const handleMealChange = (dayIndex, mealType, mealId) => {
    setMeals((prevMeals) => {
      const updatedMeals = [...prevMeals]; // Tạo bản sao của mảng
      updatedMeals[dayIndex] = {
        ...updatedMeals[dayIndex],
        [mealType]: mealId,
      }; // Cập nhật đúng phần tử
      return updatedMeals;
    });
  };

  // Hàm gửi dữ liệu lên server
  const handleSubmit = async () => {
    try {
      await axios.post("http://localhost:5000/api/menus/create", {
        userId,
        menuPackage,
        meals,
      });
      alert("Tạo menu thành công!");
    } catch (error) {
      console.error("Lỗi khi tạo menu", error);
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Tạo Menu</h1>

      {/* Chọn gói thực đơn */}
      <label className="block mb-4">
        <span className="font-semibold">Chọn gói thực đơn:</span>
        <select
          value={menuPackage}
          onChange={(e) => setMenuPackage(e.target.value)}
          className="block w-full p-2 border rounded"
        >
          <option value="7-day">7 ngày</option>
          <option value="10-day">10 ngày</option>
        </select>
      </label>

      {/* Danh sách ngày và bữa ăn */}
      <div className="mt-4">
        {meals.map((day, index) => (
          <div key={index} className="mb-6 border p-4 rounded shadow">
            <h2 className="text-lg font-semibold">Ngày {index + 1}</h2>
            {["breakfast", "lunch", "dinner"].map((mealType) => (
              <div key={mealType} className="mt-2">
                <label className="block font-semibold">
                  {mealType.toUpperCase()}:
                </label>
                <select
                  value={day[mealType]}
                  onChange={(e) =>
                    handleMealChange(index, mealType, e.target.value)
                  }
                  className="block w-full p-2 border rounded"
                >
                  <option value="">Chọn món</option>
                  {mealOptions.map((meal) => (
                    <option key={meal._id} value={meal._id}>
                      {meal.name}
                    </option>
                  ))}
                </select>
              </div>
            ))}
          </div>
        ))}
      </div>

      {/* Nút tạo menu */}
      <button
        onClick={handleSubmit}
        className="bg-blue-500 text-white px-4 py-2 mt-4 rounded"
      >
        Tạo Menu
      </button>
    </div>
  );
};

export default CreateMenu;
