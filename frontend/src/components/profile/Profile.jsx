import React, { useState, useEffect } from "react";
import { useAuthStore } from "../../store/authStore";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./profile.css";

export default function Profile() {
  const { user, isAuthenticated, logout } = useAuthStore();
  const navigate = useNavigate();

  const defaultUserData = {
    userId: "",
    name: "",
    email: "",
    lastLoginDate: "",
    isVerified: false,
    isAdmin: false,
    height: 0,
    weight: 0,
    age: 0,
    sex: "khác",
    health_goals: "",
    exercises: [{ exercise_time: 0, exercise_type: "nhẹ" }],
    current_job: "",
    goal_weight: 0,
    health_base: {
      food_allergies: [],
      underlying_conditions: [],
    },
  };

  const [formData, setFormData] = useState(defaultUserData);

  useEffect(() => {
    if (isAuthenticated && user) {
      setFormData({
        userId: user._id || "",
        name: user.name || "",
        email: user.email || "",
        lastLoginDate: new Date(user.lastLoginDate).toLocaleString() || "",
        isVerified: user.isVerified || false,
        isAdmin: user.isAdmin || false,
        height: user.height || 0,
        weight: user.weight || 0,
        age: user.age || 0,
        sex: user.sex || "khác",
        health_goals: user.health_goals || "",
        exercises: user.exercises?.length
          ? user.exercises
          : [{ exercise_time: 0, exercise_type: "nhẹ" }],
        current_job: user.current_job || "",
        goal_weight: user.goal_weight || 0,
        health_base: {
          food_allergies: user.health_base?.food_allergies || [],
          underlying_conditions: user.health_base?.underlying_conditions || [],
        },
      });
    } else {
      navigate("/login");
    }
  }, [isAuthenticated, user, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleExerciseChange = (index, e) => {
    const { name, value } = e.target;
    const updatedExercises = [...formData.exercises];
    updatedExercises[index][name] = value;
    setFormData({ ...formData, exercises: updatedExercises });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:5000/api/auth/update`, formData);
      alert("Profile updated successfully!");
    } catch (error) {
      console.error("Update error:", error.response?.data || error.message);
      alert(error.response?.data?.message || "Error updating profile");
    }
  };

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="profile-container">
      <h1><strong>Hồ sơ người dùng</strong></h1>
      <form onSubmit={handleSubmit} className="profile-form">
        <div className="form-column">
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />

          <label>Email:</label>
          <input type="email" name="email" value={formData.email} readOnly />

          <label>Sex:</label>
          <select
            name="sex"
            style={{
              border: "1px solid #ccc",
              padding: "8px",
              borderRadius: "4px",
            }}
            value={formData.sex}
            onChange={handleChange}
          >
            <option value="nam">Nam</option>
            <option value="nữ">Nữ</option>
            <option value="khác">Khác</option>
          </select>

          <label>Health Goals:</label>
          <select
            name="health_goals"
            style={{
              border: "1px solid #ccc",
              padding: "8px",
              borderRadius: "4px",
            }}
            value={formData.health_goals}
            onChange={handleChange}
          >
            <option value="">Select a goal</option>
            <option value="giảm cân">Giảm cân</option>
            <option value="tăng cân">Tăng cân</option>
            <option value="tăng cơ">Tăng cơ</option>
            <option value="duy trì sức khỏe">Duy trì sức khỏe</option>
            <option value="cải thiện năng lượng">Cải thiện năng lượng</option>
          </select>

          <label>Height (cm):</label>
          <input
            type="number"
            name="height"
            min="50"
            max="250"
            value={formData.height}
            onChange={handleChange}
          />

          <label>Weight (kg):</label>
          <input
            type="number"
            name="weight"
            min="10"
            max="500"
            value={formData.weight}
            onChange={handleChange}
          />
        </div>
        <div className="form-column">
          <label>Age:</label>
          <input
            type="number"
            name="age"
            min="1"
            max="120"
            value={formData.age}
            onChange={handleChange}
          />

          <label>Goal Weight (kg):</label>
          <input
            type="number"
            name="goal_weight"
            min="10"
            max="500"
            value={formData.goal_weight}
            onChange={handleChange}
          />

          <label>Current Job:</label>
          <input
            type="text"
            name="current_job"
            value={formData.current_job}
            onChange={handleChange}
          />

          <h3 style={{ fontWeight: "bolder", fontSize: "20px" }}>
            Hoạt động thể dục, thể thao:
          </h3>
          {formData.exercises.map((exercise, index) => (
            <div key={index} className="exercise-entry">
              <label>Tần Suất Tập Thể Dục (số ngày trong tuần):</label>
              <input
                type="number"
                name="exercise_time"
                min="0"
                max="7"
                value={exercise.exercise_time}
                onChange={(e) => handleExerciseChange(index, e)}
              />

              <label>Loại vận động:</label>
              <select
                name="exercise_type"
                style={{
                  width: "100%",
                  padding: "8px",
                  border: "1px solid #ccc",
                  borderRadius: "4px",
                }}
                value={exercise.exercise_type}
                onChange={(e) => handleExerciseChange(index, e)}
              >
                <option value="nhẹ">Nhẹ</option>
                <option value="vừa">Vừa</option>
                <option value="nặng">Nặng</option>
              </select>
            </div>
          ))}

          <label>Last Login:</label>
          <input
            type="text"
            name="lastLoginDate"
            value={formData.lastLoginDate}
            readOnly
            disabled
          />

          <button type="submit" className="update-btn">
            Update
          </button>
        </div>
      </form>

      <button onClick={handleLogout} className="logout-btn" style={{width:'50%', marginTop:'20px'}}>
        Logout
      </button>
    </div>
  );
}
