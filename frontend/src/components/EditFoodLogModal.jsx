import React, { useState, useEffect } from "react";
import axios from "axios";

const EditFoodLogModal = ({ foodLogId, onClose, onUpdate }) => {
  const [formData, setFormData] = useState({
    menuId: "",
    date: "",
    meals: [],
  });

  useEffect(() => {
    axios.get(`/api/food-log/${foodLogId}`).then((res) => {
      setFormData(res.data);
    });
  }, [foodLogId]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e, mealIndex, foodIndex) => {
    const updatedMeals = [...formData.meals];
    updatedMeals[mealIndex].foods[foodIndex].file = e.target.files[0];
    setFormData({ ...formData, meals: updatedMeals });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = new FormData();
    form.append("menuId", formData.menuId);
    form.append("date", formData.date);
    form.append("meals", JSON.stringify(formData.meals));

    formData.meals.forEach((meal, mealIndex) => {
      meal.foods.forEach((food, foodIndex) => {
        if (food.file) {
          form.append(`meal-${mealIndex}-${foodIndex}`, food.file);
        }
      });
    });

    await axios.put(`/api/food-log/${foodLogId}`, form);
    onUpdate();
    onClose();
  };

  return (
    <div className="modal">
      <h2>Edit Food Log</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="menuId"
          value={formData.menuId}
          onChange={handleChange}
          required
        />
        <input
          type="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
          required
        />
        {formData.meals.map((meal, mealIndex) => (
          <div key={mealIndex}>
            <h4>Meal {mealIndex + 1}</h4>
            {meal.foods.map((food, foodIndex) => (
              <div key={foodIndex}>
                <input
                  type="file"
                  onChange={(e) => handleFileChange(e, mealIndex, foodIndex)}
                />
              </div>
            ))}
          </div>
        ))}
        <button type="submit">Update</button>
        <button type="button" onClick={onClose}>
          Cancel
        </button>
      </form>
    </div>
  );
};

export default EditFoodLogModal;
