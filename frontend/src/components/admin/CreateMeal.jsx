import React, { useState } from "react";
import axios from "axios";

const CreateMeal = () => {
  const [meal, setMeal] = useState({
    name: "",
    description: "",
    category: "breakfast",
    calories: "",
    image: "",
    recipe: "",
  });

  const handleCreateMeal = async () => {
    try {
      await axios.post("http://localhost:5000/api/meals/create", meal);
      alert("Món ăn đã được tạo!");
    } catch (error) {
      alert("Lỗi khi tạo món ăn");
    }
  };

  return (
    <div className="p-6 max-w-lg mx-auto">
      <h1 className="text-2xl font-bold mb-4">Tạo Món Ăn</h1>
      <input
        type="text"
        placeholder="Tên món"
        value={meal.name}
        onChange={(e) => setMeal({ ...meal, name: e.target.value })}
        className="border p-2 w-full mb-2"
      />
      <input
        type="text"
        placeholder="Mô tả"
        value={meal.description}
        onChange={(e) => setMeal({ ...meal, description: e.target.value })}
        className="border p-2 w-full mb-2"
      />
      <input
        type="text"
        placeholder="Công thức nấu ăn"
        value={meal.recipe}
        onChange={(e) => setMeal({ ...meal, recipe: e.target.value })}
        className="border p-2 w-full mb-2"
      />
      <select
        value={meal.category}
        onChange={(e) => setMeal({ ...meal, category: e.target.value })}
        className="border p-2 w-full mb-2"
      >
        <option value="breakfast">Sáng</option>
        <option value="lunch">Trưa</option>
        <option value="dinner">Tối</option>
      </select>
      <input
        type="number"
        placeholder="Calories"
        value={meal.calories}
        onChange={(e) => setMeal({ ...meal, calories: e.target.value })}
        className="border p-2 w-full mb-2"
      />
      <input
        type="text"
        placeholder="URL Ảnh"
        value={meal.image}
        onChange={(e) => setMeal({ ...meal, image: e.target.value })}
        className="border p-2 w-full mb-2"
      />
      <button
        onClick={handleCreateMeal}
        className="bg-green-500 text-white px-4 py-2 rounded"
      >
        Tạo Món
      </button>
    </div>
  );
};

export default CreateMeal;
