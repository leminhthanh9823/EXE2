import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";

const MenuDetails = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { menu } = location.state || {};
  const user = JSON.parse(localStorage.getItem("user"));

  if (!menu || !menu.days) {
    return (
      <div className="p-6 max-w-4xl mx-auto text-center">
        <p className="text-red-500">Không tìm thấy thực đơn!</p>
        <button
          className="text-blue-500 underline mt-4"
          onClick={() => navigate("/")}
        >
          Quay lại
        </button>
      </div>
    );
  }

  const createdAt = new Date(menu.createdAt);
  const today = new Date();
  createdAt.setHours(0, 0, 0, 0);
  today.setHours(0, 0, 0, 0);

  const diffTime = today - createdAt;
  const todayIndex = Math.floor(diffTime / (1000 * 60 * 60 * 24));

  const [currentDayIndex, setCurrentDayIndex] = useState(
    todayIndex < menu.days.length ? todayIndex : 0
  );

  const [headerColor, setHeaderColor] = useState("");

  useEffect(() => {
    // Danh sách màu header ngẫu nhiên
    const colors = ["bg-red-400", "bg-green-400", "bg-blue-400", "bg-yellow-400", "bg-purple-400"];
    setHeaderColor(colors[Math.floor(Math.random() * colors.length)]);
  }, [currentDayIndex]); // Mỗi lần đổi ngày, màu header sẽ thay đổi

  const handlePrevDay = () => {
    setCurrentDayIndex((prevIndex) =>
      prevIndex > 0 ? prevIndex - 1 : menu.days.length - 1
    );
  };

  const handleNextDay = () => {
    setCurrentDayIndex((prevIndex) =>
      prevIndex < menu.days.length - 1 ? prevIndex + 1 : 0
    );
  };

  const handlePurchase = async () => {
    try {
      let amount = menu.price;
      if (typeof amount === "string") {
        amount = parseInt(amount.replace(/,/g, ""), 10);
      }

      const response = await axios.post(
        "http://localhost:5000/api/transactions/create",
        {
          userId: user._id,
          amount,
          code: uuidv4(),
        }
      );

      if (response.data.success) {
        navigate(`/qr/${response.data.transaction._id}`);
      } else {
        console.error("Transaction creation failed:", response.data);
      }
    } catch (error) {
      console.error("Lỗi khi tạo giao dịch:", error);
    }
  };

  const currentDayData = menu.days[currentDayIndex];

  return (
    <div className="p-6 max-w-4xl mx-auto flex flex-col items-center">
      <h1 className="text-2xl font-bold mb-4">{menu.name}</h1>
      <p>{menu.details}</p>

      {user._id !== menu.userId && (
        <button
          onClick={handlePurchase}
          className="bg-orange-500 text-white px-6 py-3 rounded-lg shadow-md hover:bg-orange-600 transition-all mt-4"
        >
          Mua Ngay
        </button>
      )}

      {/* Khu vực chứa ô vuông + nút */}
      <div className="flex items-center justify-center w-full mt-6">
        {/* Nút TRƯỚC */}
        <button
          onClick={handlePrevDay}
          className="bg-blue-500 text-white px-4 py-2 rounded-full shadow-md hover:bg-blue-600 transition-all"
          style={{ width: "50px", height: "50px" }}
        >
          ←
        </button>

        {/* Ô vuông to chứa thông tin ngày */}
        <div className="w-80 h-80 flex flex-col justify-between border-2 border-gray-400 bg-gray-100 rounded-lg mx-6">
          {/* Header với màu ngẫu nhiên */}
          <div className={`w-full py-3 text-center text-white font-bold ${headerColor} border-b-2 border-gray-300`}>
            Ngày {currentDayData.day} {currentDayIndex === todayIndex ? "(Hôm nay)" : ""}
          </div>

          {/* Nội dung bữa ăn */}
          <div className="flex flex-col justify-center items-center flex-grow px-4 text-center">
            <p>
              <strong>Sáng:</strong> {currentDayData.meals.breakfast?.name || "Không có"}
            </p>
            <p>
              <strong>Trưa:</strong> {currentDayData.meals.lunch?.name || "Không có"}
            </p>
            <p>
              <strong>Tối:</strong> {currentDayData.meals.dinner?.name || "Không có"}
            </p>
          </div>
        </div>

        {/* Nút TIẾP */}
        <button
          onClick={handleNextDay}
          className="bg-blue-500 text-white px-4 py-2 rounded-full shadow-md hover:bg-blue-600 transition-all"
          style={{ width: "50px", height: "50px" }}
        >
          →
        </button>
      </div>

      <button
        className="bg-gray-500 text-white px-4 py-2 mt-4"
        onClick={() => navigate("/")}
      >
        Quay lại
      </button>
    </div>
  );
};

export default MenuDetails;
