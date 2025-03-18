import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { Card, Button } from "react-bootstrap"; // Dùng Bootstrap để tạo Card

const VoucherList = () => {
  const [vouchers, setVouchers] = useState([]);
  const [userPoints, setUserPoints] = useState(0);
  const user = JSON.parse(localStorage.getItem("user")); // Lấy user từ localStorage
  const userId = user ? user._id : null;

  // Lấy danh sách voucher
  const fetchVouchers = useCallback(async () => {
    try {
      const response = await axios.get("http://localhost:5000/vouchers");
      if (response.data && response.data.data) {
        setVouchers(response.data.data);
      }
    } catch (error) {
      console.error("Lỗi khi lấy danh sách voucher:", error);
    }
  }, []);

  // Lấy điểm của user
  const fetchUserPoints = useCallback(async () => {
    if (!userId) {
      console.error("User ID không tồn tại");
      return;
    }

    try {
      const response = await axios.get(
        `http://localhost:5000/api/auth/points/${userId}`
      );
      if (response.data && response.data.points !== undefined) {
        setUserPoints(response.data.points);
      }
    } catch (error) {
      console.error("Lỗi khi lấy điểm người dùng:", error);
    }
  }, [userId]);

  useEffect(() => {
    fetchVouchers();
    fetchUserPoints();
  }, [fetchVouchers, fetchUserPoints]);

  // Đổi voucher
  const redeemVoucher = async (voucherCode, pointsRequired) => {
    if (userPoints < pointsRequired) {
      alert("Bạn không đủ điểm để đổi voucher này!");
      return;
    }

    if (!userId) {
      alert("Không tìm thấy thông tin người dùng!");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:5000/vouchers/redeem",
        {
          userId,
          voucherCode,
        }
      );

      if (response.data.success) {
        alert("Đổi voucher thành công!");
        fetchUserPoints(); // Cập nhật lại điểm
        fetchVouchers(); // Cập nhật lại danh sách voucher
      } else {
        alert(response.data.message || "Đổi voucher không thành công.");
      }
    } catch (error) {
      console.error("Lỗi khi đổi voucher:", error);
      alert("Có lỗi xảy ra khi đổi voucher.");
    }
  };

  return (
    <div className="container mx-auto p-4" style={{ height: "1000px" }}>
      <h2 className="text-2xl font-bold mb-4 text-center">Danh sách Voucher</h2>

      {/* Hiển thị điểm của người dùng */}
      <div className="bg-blue-100 text-blue-800 text-center p-4 rounded-lg mb-4">
        <h4 className="text-lg font-semibold">
          🎯 Số điểm hiện tại: {userPoints}
        </h4>
      </div>

      {/* Hiển thị danh sách voucher */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-1">
        {vouchers.length > 0 ? (
          vouchers.map((voucher) => (
            <div
              key={voucher._id}
              className="text-white p-6 rounded-lg shadow-lg flex transform scale-90"
              style={{ backgroundColor: "#22c1c3" }}
            >
              <img
                src="https://i.postimg.cc/5tVmPW37/surprise.png"
                alt="Voucher"
                className="w-1/5 h-auto mr-4 object-contain"
              />
              <div className="border-l-2 border-white pl-4">
                <h3 className="text-lg font-bold">{voucher.code}</h3>
                <p className="mt-1">{voucher.description}</p>
                <p className="mt-1">
                  <strong>Điểm cần:</strong> {voucher.pointsRequired}
                </p>
                <p className="mt-1">
                  <strong>Hạn sử dụng:</strong>{" "}
                  {new Date(voucher.expirationDate).toLocaleDateString()}
                </p>
                <p className="mt-1">
                  <strong>Trạng thái:</strong>{" "}
                  {voucher.isActive ? "Còn hiệu lực" : "Hết hạn"}
                </p>
                <button
                  className={`mt-4 w-full px-4 py-2 rounded text-white font-semibold 
                  ${
                    !voucher.isActive || userPoints < voucher.pointsRequired
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-blue-500 hover:bg-blue-600"
                  }
                `}
                  onClick={() =>
                    redeemVoucher(voucher.code, voucher.pointsRequired)
                  }
                  disabled={
                    !voucher.isActive || userPoints < voucher.pointsRequired
                  }
                >
                  Đổi Voucher
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center col-span-3 text-gray-600">
            Không có voucher nào.
          </p>
        )}
      </div>
    </div>
  );
};

export default VoucherList;
