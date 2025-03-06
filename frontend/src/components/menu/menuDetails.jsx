import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";

const MenuDetails = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { menu } = location.state || {};
  const user = JSON.parse(localStorage.getItem("user")) || {};

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

  const todayIndex = Math.floor((today - createdAt) / (1000 * 60 * 60 * 24));
  const [currentDayIndex, setCurrentDayIndex] = useState(
    todayIndex < menu.days.length ? todayIndex : 0
  );
  const [headerColor, setHeaderColor] = useState("");
  const [selectedDay, setSelectedDay] = useState(null);

  useEffect(() => {
    const colors = [
      "bg-red-400",
      "bg-green-400",
      "bg-blue-400",
      "bg-yellow-400",
      "bg-purple-400",
    ];
    setHeaderColor(colors[Math.floor(Math.random() * colors.length)]);
  }, [currentDayIndex]);

  const handlePrevDay = () => {
    setCurrentDayIndex((prev) => (prev > 0 ? prev - 1 : menu.days.length - 1));
  };

  const handleNextDay = () => {
    setCurrentDayIndex((prev) => (prev < menu.days.length - 1 ? prev + 1 : 0));
  };

  const handlePurchase = async () => {
    try {
      const amount = parseInt(menu.price.replace(/,/g, ""), 10) || 0;
      const response = await axios.post(
        "http://localhost:5000/api/transactions/create",
        {
          userId: user._id,
          menuId: menu._id,
          amount,
          code: uuidv4(),
        }
      );

      if (response.data.success) {
        navigate(`/qr/${response.data.transaction._id}`, {
          state: { userId: user._id, menuId: menu._id },
        });
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

      <div className="flex items-center justify-center w-full mt-6">
        <button
          onClick={handlePrevDay}
          className="bg-blue-500 text-white px-4 py-2 rounded-full shadow-md hover:bg-blue-600 transition-all w-12 h-12"
        >
          ←
        </button>

        <div
          className="w-80 h-80 flex flex-col justify-between border-2 border-gray-400 bg-gray-100 rounded-lg mx-6 cursor-pointer"
          onClick={() => setSelectedDay(currentDayData)}
        >
          <div
            className={`w-full py-3 text-center text-white font-bold ${headerColor} border-b-2 border-gray-300`}
          >
            Ngày {currentDayData.day}{" "}
            {currentDayIndex === todayIndex ? "(Hôm nay)" : ""}
          </div>
          <div className="flex flex-col justify-center items-center flex-grow px-4 text-center">
            {Object.entries(currentDayData.meals).map(([mealType, meal]) => (
              <p key={mealType}>
                <strong>
                  {mealType === "breakfast"
                    ? "Sáng"
                    : mealType === "lunch"
                    ? "Trưa"
                    : "Tối"}
                  :
                </strong>{" "}
                {meal?.name || "Không có"}
              </p>
            ))}
          </div>
        </div>

        <button
          onClick={handleNextDay}
          className="bg-blue-500 text-white px-4 py-2 rounded-full shadow-md hover:bg-blue-600 transition-all w-12 h-12"
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

      {selectedDay && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 p-4">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-xl max-h-[80vh] overflow-y-auto">
            <h2 className="text-xl font-bold mb-4 text-center">
              Chi tiết ngày {selectedDay.day}
            </h2>
            <div className="space-y-4">
              {Object.entries(selectedDay.meals).map(([mealType, meal]) => (
                <div key={mealType}>
                  <p>
                    <strong>
                      {mealType === "breakfast"
                        ? "Sáng"
                        : mealType === "lunch"
                        ? "Trưa"
                        : "Tối"}
                      :
                    </strong>{" "}
                    {meal?.name || "Không có"}
                  </p>
                  {meal?.image && (
                    <img
                      src={meal.image}
                      alt=""
                      className="w-full h-40 object-cover my-2 rounded-md"
                    />
                  )}
                  <p>
                    <strong>Mô tả:</strong> {meal?.description || "Không có"}
                  </p>
                </div>
              ))}
            </div>
            <div className="mt-6 text-center">
              <button
                onClick={() => setSelectedDay(null)}
                className="bg-gray-500 text-white px-6 py-2 rounded-md hover:bg-gray-600 transition"
              >
                Đóng
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MenuDetails;
