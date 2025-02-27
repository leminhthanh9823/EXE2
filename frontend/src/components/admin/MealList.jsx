import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const MealList = () => {
  const [meals, setMeals] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/meals")
      .then((response) => setMeals(response.data))
      .catch((error) => console.error("Lỗi khi lấy danh sách món ăn:", error));
  }, []);

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Danh Sách Món Ăn</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {meals.map((meal) => (
          <div
            key={meal._id}
            className="border p-4 rounded-lg shadow-md cursor-pointer hover:bg-gray-100"
            onClick={() => navigate(`/admin/meals/${meal._id}`)}
          >
            <h2 className="text-lg font-semibold">{meal.name}</h2>
            <p className="text-gray-700">Loại: {meal.category}</p>
            <p className="text-gray-700">Calo: {meal.calories} kcal</p>
            {meal.image && (
              <img
                src={meal.image}
                alt={meal.name}
                className="w-full h-32 object-cover mt-2 rounded"
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default MealList;
