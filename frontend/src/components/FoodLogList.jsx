import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "./FoodLogList.css";
import FoodLogModal from "./FoodLogModal";

const API_URL = "http://localhost:5000/api/logs/food-log";

const FoodLogList = () => {
  const [foodLogs, setFoodLogs] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedLog, setSelectedLog] = useState(null);
  const [refresh, setRefresh] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFoodLogs = async () => {
      try {
        setLoading(true);
        const response = await axios.get(API_URL);
        setFoodLogs(response.data.data);
      } catch (error) {
        toast.error("Lỗi khi lấy dữ liệu nhật ký ăn uống!");
      } finally {
        setLoading(false);
      }
    };

    fetchFoodLogs();
  }, [refresh]);

  const handleOpenModal = (log = null) => {
    setSelectedLog(log); // Set log for editing
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedLog(null);
  };

  const handleDeleteLog = async (logId) => {
    try {
      await axios.delete(`${API_URL}/${logId}`);
      toast.success("Nhật ký đã được xóa!");
      setRefresh(!refresh);
    } catch (error) {
      toast.error("Lỗi khi xóa nhật ký!");
    }
  };

  return (
    <div className="food-log-container">
      <h2>Nhật Ký Ăn Uống</h2>
      <div className="timeline"></div>

      {loading ? (
        <p>Đang tải dữ liệu...</p>
      ) : (
        foodLogs.map((log, index) => (
          <div
            key={log._id}
            className={`log-entry ${index % 2 === 0 ? "left" : "right"}`}
            onClick={() => handleOpenModal(log)}
          >
            <div className="log-content">
              <h3>Ngày: {log.date}</h3>
              <p>Menu ID: {log.menuId || "Không có"}</p>
              <p>Thời gian nhập: {new Date(log.createdAt).toLocaleString()}</p>
              {log.meals?.map((meal, mealIndex) => (
                <div key={mealIndex}>
                  <h3>
                    <strong>{meal.name}</strong>
                  </h3>
                  <ul>
                    {meal.foods?.map((food, foodIndex) => (
                      <li key={foodIndex}>
                        {food.name}
                        <div className="food-images">
                          {food.filePath && ( // Chỉ hiển thị ảnh nếu filePath có giá trị
                            <img
                              src={`http://localhost:5000/uploads/${food.filePath}`}
                              alt={`${food.name}`}
                              width="100"
                            />
                          )}
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
            <button
              className="delete-btn"
              onClick={(e) => {
                e.stopPropagation();
                handleDeleteLog(log._id);
              }}
            >
              ❌
            </button>
          </div>
        ))
      )}

      {/* Nút thêm mới */}
      <div className="log-entry add-log" onClick={() => handleOpenModal()}>
        <span>+</span>
      </div>

      {/* Modal nhập dữ liệu */}
      {isModalOpen && (
        <FoodLogModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          logData={selectedLog}
          onSuccess={() => setRefresh(!refresh)}
        />
      )}
    </div>
  );
};

export default FoodLogList;
