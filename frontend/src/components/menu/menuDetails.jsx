import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";

const MenuDetails = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { menu } = location.state || {};
  const user = JSON.parse(localStorage.getItem("user")) || {};

  const [currentDayIndex, setCurrentDayIndex] = useState(0);
  const [headerColor, setHeaderColor] = useState("");
  const [selectedDay, setSelectedDay] = useState(null);
  const [userVouchers, setUserVouchers] = useState([]);

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

  const createdAt = new Date(menu.createdAt);
  const today = new Date();
  createdAt.setHours(0, 0, 0, 0);
  today.setHours(0, 0, 0, 0);

  const todayIndex = Math.floor((today - createdAt) / (1000 * 60 * 60 * 24));
  useEffect(() => {
    setCurrentDayIndex(todayIndex < menu.days.length ? todayIndex : 0);
  }, [menu.days.length, todayIndex]);

  useEffect(() => {
    if (selectedDay) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [selectedDay]);

  useEffect(() => {
    const fetchUserVouchers = async () => {
      try {
        console.log("Menu detail user._id", user._id);
        const response = await axios.get(`http://localhost:5000/api/vouchers/user-vouchers/${user._id}`);
        console.log("User vouchers:", response.data);
        setUserVouchers(response.data);
      } catch (error) {
        console.error("Error fetching user vouchers:", error);
      }
    };
    fetchUserVouchers();
  }, [user._id]);

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

  const handlePrevDay = () => {
    setCurrentDayIndex((prev) => (prev > 0 ? prev - 1 : menu.days.length - 1));
  };

  const handleNextDay = () => {
    setCurrentDayIndex((prev) => (prev < menu.days.length - 1 ? prev + 1 : 0));
  };

  const handlePurchase = async () => {
    try {
      const priceString = String(menu.price); // Chuyển thành string để tránh lỗi
      const amount = parseInt(priceString.replace(/,/g, ""), 10) || 0;

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

  const handlePurchaseWithVoucher = async (voucherCode) => {
    try {
      const priceString = String(menu.price);
      let amount = parseInt(priceString.replace(/,/g, ""), 10) || 0;

      if (voucherCode === "DISCOUNT10") {
        amount = amount * 0.9; // Apply 10% discount
      }

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
      console.error("Error creating transaction:", error);
    }
  };

  const handleNavigateBack = () => {
    window.scrollTo(0, 0); // Scroll to top
    navigate("/my-menu");
  };

  const handleBlurClick = (e) => {
    if (user._id !== menu.userId) {
      e.preventDefault();
      e.stopPropagation();
    }
  };

  const currentDayData = menu.days[currentDayIndex];

  return (
    <div className={`p-6 max-w-4xl mx-auto flex flex-col items-center bg-white shadow-lg rounded-lg`}>
      <h1 className="text-3xl font-bold mb-4 text-gray-800">{menu.name}</h1>
      <p className="text-gray-600 mb-6">{menu.details}</p>

      {user._id !== menu.userId && (
        <>
          <p className="text-red-500 text-center">
            <strong><i>Mua thực đơn để xem chi tiết!.</i></strong>
          </p>
          <button
            onClick={handlePurchase}
            className="bg-orange-500 text-white px-6 py-3 rounded-lg shadow-md hover:bg-orange-600 transition-all mt-4"
          >
            Mua Ngay
          </button>
          <div className="mt-4">
            <h3 className="text-lg font-semibold">Sử dụng Voucher:</h3>
            {userVouchers.map((voucher) => (
              <button
                key={voucher._id}
                onClick={() => handlePurchaseWithVoucher(voucher.voucherId.code)}
                className="bg-green-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-green-600 transition-all mt-2 text-center"
              >
                {voucher.voucherId.code}
              </button>
            ))}
          </div>
        </>
      )}

      <div
        className={`flex items-center justify-center w-full mt-6 ${user._id !== menu.userId ? 'filter blur-sm pointer-events-none' : ''}`}
        onClick={handleBlurClick}
      >
        <button
          onClick={handlePrevDay}
          className="bg-blue-500 text-white px-4 py-2 rounded-full shadow-md hover:bg-blue-600 transition-all w-12 h-12"
        >
          ←
        </button>

        <div
          className="w-80 h-80 flex flex-col justify-between border-2 border-gray-400 bg-gray-100 rounded-lg mx-6 cursor-pointer hover:shadow-lg transition-shadow"
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
              <p key={mealType} className="text-gray-700">
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
        className="bg-gray-500 text-white px-4 py-2 mt-4 rounded-lg shadow-md hover:bg-gray-600 transition-all"
        onClick={handleNavigateBack}
      >
        Quay lại
      </button>

      {/* chi tiết thực đơn theo ngày */}
      {selectedDay && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 p-4 z-50 mt-6">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-xl max-h-[80vh] overflow-y-auto">
            <h2 className="text-xl font-bold mb-4 text-center text-gray-800">
              Chi tiết ngày {selectedDay.day}
            </h2>
            <div className="space-y-4">
              {Object.entries(selectedDay.meals).map(([mealType, meal]) => (
                <div key={mealType} className="text-gray-700 border-b pb-4 mb-4">
                  <p className="text-lg font-semibold">
                    {mealType === "breakfast"
                      ? "Sáng"
                      : mealType === "lunch"
                      ? "Trưa"
                      : "Tối"}
                    :
                  </p>
                  <p className="mt-2">
                    <strong>Tên món:</strong> {meal?.name || "Không có"}
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
                  {meal?.recipe && (
                    <p>
                      <strong>Công thức:</strong><br></br> {meal.recipe}
                    </p>
                  )}
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
