import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "./FoodLogList.css";

const API_URL = "http://localhost:5000/api/logs/food-log";

const FoodLogModal = ({ isOpen, onClose, logData, onSuccess }) => {
  const [log, setLog] = useState({
    date: "",
    menuId: "",
    meals: [
      { name: "Breakfast", foods: [] },
      { name: "Lunch", foods: [] },
      { name: "Dinner", foods: [] },
    ],
    notes: "",
    calories: "",
  });

  useEffect(() => {
    const defaultMeals = [
      { name: "Breakfast", foods: [] },
      { name: "Lunch", foods: [] },
      { name: "Dinner", foods: [] },
    ];

    setLog(
      logData
        ? {
            ...logData,
            meals: defaultMeals.map(
              (defaultMeal) =>
                logData.meals.find((meal) => meal.name === defaultMeal.name) ||
                defaultMeal
            ),
          }
        : {
            date: "",
            menuId: "",
            meals: defaultMeals,
            notes: "",
            calories: "",
          }
    );
  }, [logData]);

  const handleFileChange = (mealIndex, foodIndex, event) => {
    const updatedMeals = [...log.meals];
    const file = event.target.files[0];
    if (file) {
      updatedMeals[mealIndex].foods[foodIndex].file = file;
    }
    setLog({ ...log, meals: updatedMeals });
  };

  const handleFoodChange = (mealIndex, foodIndex, value) => {
    const updatedMeals = [...log.meals];
    updatedMeals[mealIndex].foods[foodIndex].name = value;
    setLog({ ...log, meals: updatedMeals });
  };

  const addFood = (mealIndex) => {
    const updatedMeals = [...log.meals];
    updatedMeals[mealIndex].foods.push({ name: "", file: null });
    setLog({ ...log, meals: updatedMeals });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      if (!user || !user._id) {
        toast.error("Không tìm thấy thông tin người dùng!");
        return;
      }

      const filteredMeals = log.meals.filter((meal) => meal.foods.length > 0);
      if (filteredMeals.length === 0) {
        toast.error("Vui lòng thêm ít nhất một món ăn!");
        return;
      }

      const formData = new FormData();
      formData.append("userId", user._id);
      formData.append(
        "date",
        log.date || new Date().toISOString().split("T")[0]
      );
      formData.append("meals", JSON.stringify(filteredMeals));
      formData.append("notes", log.notes);
      formData.append("calories", log.calories);

      filteredMeals.forEach((meal, mealIndex) => {
        meal.foods.forEach((food, foodIndex) => {
          if (food.file) {
            formData.append(`meal-${mealIndex}-${foodIndex}`, food.file);
          }
        });
      });

      toast.info("Đang xử lý, vui lòng đợi...");

      if (logData) {
        await axios.put(`${API_URL}/${logData._id}`, formData);
        toast.success("Nhật ký ăn uống đã được cập nhật!");
      } else {
        await axios.post(API_URL, formData);
        toast.success("Nhật ký ăn uống đã được lưu!");
      }

      onSuccess();
      onClose();
    } catch (error) {
      console.error("Lỗi khi lưu nhật ký:", error);
      if (error.response) {
        toast.error(`Lỗi: ${error.response.data.message}`);
      } else {
        toast.error("Lỗi khi lưu nhật ký!");
      }
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>{logData ? "Chỉnh sửa Nhật Ký" : "Thêm Nhật Ký"}</h2>
        <form onSubmit={handleSubmit}>
          <input
            hidden
            type="date"
            value={log.date || new Date().toISOString().split("T")[0]}
            onChange={(e) => setLog({ ...log, date: e.target.value })}
            required
          />

          {log.meals.map((meal, mealIndex) => (
            <div key={mealIndex}>
              <h4>{meal.name}</h4>
              {meal.foods.map((food, foodIndex) => (
                <div key={foodIndex}>
                  <input
                    type="text"
                    placeholder="Tên món ăn"
                    value={food.name}
                    onChange={(e) =>
                      handleFoodChange(mealIndex, foodIndex, e.target.value)
                    }
                  />
                  <input
                    type="file"
                    onChange={(e) => handleFileChange(mealIndex, foodIndex, e)}
                  />
                </div>
              ))}
              <button type="button" onClick={() => addFood(mealIndex)}>
                + Thêm món
              </button>
            </div>
          ))}

          <label>Ghi chú:</label>
          <textarea
            value={log.notes}
            onChange={(e) => setLog({ ...log, notes: e.target.value })}
          />

          <div className="modal-actions">
            <button type="submit">Lưu</button>
            <button type="button" onClick={onClose}>
              Hủy
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FoodLogModal;
