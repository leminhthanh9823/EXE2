import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
const MenuDetails = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { menu } = location.state || {};

  const [currentDayIndex, setCurrentDayIndex] = useState(0);

  useEffect(() => {
    if (menu) {
      const storedDayIndex = localStorage.getItem(
        `currentDayIndex_${menu.name}`
      );
      setCurrentDayIndex(storedDayIndex ? parseInt(storedDayIndex, 10) : 0);
    }
  }, [menu]);

  const handlePurchase = async () => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      let amount = menu.price;

      // Nếu price là chuỗi có dấu phẩy (VD: "699,000"), chuyển thành số
      if (typeof amount === "string") {
        amount = parseInt(amount.replace(/,/g, ""), 10);
      }

      console.log("Sending transaction:", {
        userId: user._id,
        amount,
        code: uuidv4(),
      });

      const response = await axios.post(
        "http://localhost:5000/api/transactions/create",
        {
          userId: user._id,
          amount,
          code: uuidv4(),
        }
      );

      console.log("API Response:", response.data);
      if (response.data.success) {
        // Điều hướng đến trang QR kèm transactionId
        navigate(`/qr/${response.data.transaction._id}`);
      } else {
        console.error("Transaction creation failed:", response.data);
      }
    } catch (error) {
      console.error("Lỗi khi tạo giao dịch:", error);
    }
  };

  if (!menu)
    return (
      <div className="p-6 max-w-4xl mx-auto">Không tìm thấy thực đơn!</div>
    );

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">{menu.name}</h1>

      {menu.price ? (
        <div className="bg-gray-100 p-4 rounded-lg shadow-md">
          <p className="text-lg font-medium text-gray-800 mb-2">
            <span className="font-semibold text-blue-600">Mô tả:</span>{" "}
            {menu.details}
          </p>
          <p className="text-lg font-semibold text-red-500">
            Giá: {menu.price}
          </p>
          <button
            onClick={handlePurchase}
            className="bg-orange-500 text-white px-6 py-3 rounded-lg shadow-md hover:bg-orange-600 transition-all mt-4"
          >
            Mua Ngay
          </button>
        </div>
      ) : (
        menu.days.map((day, index) => (
          <div key={index} className="mb-6">
            <h2
              className="text-xl font-semibold mb-2 cursor-pointer"
              onClick={() => setCurrentDayIndex(index)}
            >
              {day.day} {index === currentDayIndex && "⭐"}
            </h2>
            {day.meals.map((meal, idx) => (
              <div key={idx} className="border p-4 mb-2 rounded-lg shadow">
                <h3 className="text-lg font-semibold">
                  {meal.meal}: {meal.dish}
                </h3>
                <p className="text-gray-700 text-sm">{meal.recipe}</p>
              </div>
            ))}
          </div>
        ))
      )}
    </div>
  );
};

export default MenuDetails;
