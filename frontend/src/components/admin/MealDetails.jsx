import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const MealDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [meal, setMeal] = useState(null);
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    recipe: "",
    category: "",
    calories: "",
    image: "",
  });

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/meals/${id}`)
      .then((response) => {
        setMeal(response.data);
        setFormData(response.data); // Điền dữ liệu vào form
      })
      .catch((error) => console.error("Lỗi khi lấy món ăn:", error));
  }, [id]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    axios
      .put(`http://localhost:5000/api/meals/${id}`, formData)
      .then((response) => {
        setMeal(response.data);
        setEditing(false);
      })
      .catch((error) => console.error("Lỗi khi cập nhật món ăn:", error));
  };

  if (!meal) {
    return <div className="text-center py-10">Đang tải...</div>;
  }

  return (
    <div className="p-6 max-w-3xl mx-auto">
      {editing ? (
        <>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full border p-2 mb-2"
          />
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="w-full border p-2 mb-2"
          />
          <textarea
            name="recipe"
            value={formData.recipe}
            onChange={handleChange}
            className="w-full border p-2 mb-2"
          />
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="w-full border p-2 mb-2"
          >
            <option value="breakfast">Breakfast</option>
            <option value="lunch">Lunch</option>
            <option value="dinner">Dinner</option>
          </select>
          <input
            type="number"
            name="calories"
            value={formData.calories}
            onChange={handleChange}
            className="w-full border p-2 mb-2"
          />
          <input
            type="text"
            name="image"
            value={formData.image}
            onChange={handleChange}
            className="w-full border p-2 mb-2"
          />
          <button
            className="bg-green-500 text-white px-4 py-2 rounded mr-2"
            onClick={handleSave}
          >
            Lưu
          </button>
          <button
            className="bg-gray-500 text-white px-4 py-2 rounded"
            onClick={() => setEditing(false)}
          >
            Hủy
          </button>
        </>
      ) : (
        <>
          <h1 className="text-3xl font-bold">{meal.name}</h1>
          <p className="text-gray-600 mt-2">{meal.description}</p>
          <p className="text-gray-600 mt-2 whitespace-pre-line">
            <strong>Công thức:</strong>
            <br /> {meal.recipe || "Không có"}
          </p>
          <p>
            <strong>Loại:</strong> {meal.category}
          </p>
          <p>
            <strong>Calo:</strong> {meal.calories} kcal
          </p>
          {meal.image && (
            <img
              src={meal.image}
              alt={meal.name}
              className="w-full h-60 object-cover mt-4 rounded"
            />
          )}
          <button
            className="bg-blue-500 text-white px-4 py-2 mt-4 rounded mr-2"
            onClick={() => setEditing(true)}
          >
            Chỉnh sửa
          </button>
          <button
            className="bg-gray-500 text-white px-4 py-2 mt-4 rounded"
            onClick={() => navigate(-1)}
          >
            Quay lại
          </button>
        </>
      )}
    </div>
  );
};

export default MealDetail;
