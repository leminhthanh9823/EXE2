  import React, { useState, useEffect } from "react";
  import { useAuthStore } from "../../store/authStore";
  import { useNavigate } from "react-router-dom";
  import axios from "axios";
  import "./profile.css";

  export default function Profile() {
    const { user, isAuthenticated, logout } = useAuthStore();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
      userId: "",
      name: "",
      email: "",
      lastLoginDate: "",
      isVerified: false,
      isAdmin: false,
      height: 0,
      weight: 0,
      age: 0,
    });

    useEffect(() => {
      if (isAuthenticated && user) {
        setFormData({
          userId: user._id,
          name: user.name,
          email: user.email,
          lastLoginDate: new Date(user.lastLoginDate).toLocaleString(),
          isVerified: user.isVerified,
          isAdmin: user.isAdmin,
          height: user.height || 0,
          weight: user.weight || 0,
          age: user.age || 0,
        });
      } else {
        navigate("/login");
      }
    }, [isAuthenticated, user, navigate]);

    const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        await axios.put("http://localhost:5000/api/auth/update", formData);
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
        <h2>Profile</h2>
        <form onSubmit={handleSubmit} className="profile-form">
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />

          <label>Email:</label>
          <input type="email" name="email" value={formData.email} readOnly />

          <label htmlFor="height">Chiều cao (m):</label>
          <input
            type="number"
            id="height"
            name="height"
            min="0"
            step="0.1"
            value={formData.height}
            onChange={handleChange}
          />

          <label htmlFor="weight">Weight (kg):</label>
          <input
            type="number"
            id="weight"
            name="weight"
            min="0"
            step="0.1"
            value={formData.weight}
            onChange={handleChange}
          />

          <label>Độ tuổi:</label>
          <input
            type="number"
            name="age"
            value={formData.age}
            onChange={handleChange}
          />

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
        </form>
        <button onClick={handleLogout} className="logout-btn">
          Logout
        </button>
      </div>
    );
  }
