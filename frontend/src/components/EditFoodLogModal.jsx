import React, { useState, useEffect } from "react";
import axios from "axios";
import { Modal, Button, Form } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

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
    <Modal show onHide={onClose} centered>
      <Modal.Header closeButton style={{ backgroundColor: "#d4edda" }}>
        <Modal.Title>Edit Food Log</Modal.Title>
      </Modal.Header>
      <Modal.Body style={{ backgroundColor: "#d4edda" }}>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="formMenuId">
            <Form.Label>Menu ID</Form.Label>
            <Form.Control
              type="text"
              name="menuId"
              value={formData.menuId}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group controlId="formDate">
            <Form.Label>Date</Form.Label>
            <Form.Control
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              required
            />
          </Form.Group>
          {formData.meals.map((meal, mealIndex) => (
            <div key={mealIndex}>
              <h4>Meal {mealIndex + 1}</h4>
              {meal.foods.map((food, foodIndex) => (
                <Form.Group key={foodIndex} controlId={`formFile${mealIndex}${foodIndex}`}>
                  <Form.Label>Food {foodIndex + 1}</Form.Label>
                  <Form.Control
                    type="file"
                    onChange={(e) => handleFileChange(e, mealIndex, foodIndex)}
                  />
                </Form.Group>
              ))}
            </div>
          ))}
          <Button variant="success" type="submit">
            Update
          </Button>
          <Button variant="secondary" onClick={onClose}>
            Cancel
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default EditFoodLogModal;
