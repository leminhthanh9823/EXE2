import React, { useEffect, useState } from "react";
import { useLocation, useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const QRCodePage = () => {
  const { transactionId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { userId, menuId } = location.state || {};

  const [qrCodeData, setQrCodeData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [countdown, setCountdown] = useState(120);

  useEffect(() => {
    if (!transactionId) return;

    const fetchQRCode = async () => {
      try {
        const response = await axios.get(
          `https://fitmenu.store/api/transactions/generate-qr/${transactionId}`
        );

        if (response.data.success) {
          setQrCodeData(response.data.qrCode);
        } else {
          setError("Không thể lấy mã QR");
        }
      } catch (err) {
        setError("Lỗi khi lấy mã QR");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchQRCode();

    // Kiểm tra trạng thái giao dịch mỗi 5s
    const intervalId = setInterval(async () => {
      console.log("Checking transaction status:", {
        transactionId,
        userId,
        menuId,
      });
      try {
        const response = await axios.get(
          `https://fitmenu.store/api/transactions/status/${transactionId}?userId=${userId}&menuId=${menuId}`
        );

        if (response.data.status === "completed") {
          clearInterval(intervalId);
          navigate("/payment/success");
        } else if (response.data.status === "failed") {
          clearInterval(intervalId);
          navigate("/payment/failed");
        }
      } catch (err) {
        console.error(err);
      }
    }, 5000);

    // Bộ đếm thời gian 120s
    const countdownInterval = setInterval(() => {
      setCountdown((prev) => prev - 1);
    }, 1000);

    const timeoutId = setTimeout(() => {
      clearInterval(intervalId);
      navigate("/");
    }, 120000);

    return () => {
      clearInterval(intervalId);
      clearInterval(countdownInterval);
      clearTimeout(timeoutId);
    };
  }, [transactionId, userId, menuId, navigate]);

  return (
    <div>
      <h2>Quét mã QR để thanh toán</h2>
      {loading ? (
        <p>Đang tải mã QR...</p>
      ) : error ? (
        <p style={{ color: "red" }}>{error}</p>
      ) : (
        <img src={qrCodeData} alt="QR Code" width="200" />
      )}
      <p>Thời gian còn lại: {countdown}s</p>
    </div>
  );
};

export default QRCodePage;
