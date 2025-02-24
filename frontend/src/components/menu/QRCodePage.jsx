import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const QRCodePage = () => {
  const { transactionId } = useParams(); // Lấy transactionId từ URL
  const [qrCodeData, setQrCodeData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchQRCode = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/transactions/generate-qr/${transactionId}`);
        console.log("QR Code Response:", response.data);
        
        if (response.data.success) {
          setQrCodeData(response.data.qrCode); // Assuming qrCode contains the base64 image data
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

    if (transactionId) {
      fetchQRCode();
    }
  }, [transactionId]);

  return (
    <div className="container">
      <h2>Quét mã QR để thanh toán</h2>

      {loading && <p>Đang tải...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {qrCodeData && (
        <div>
          <h3>Mã QR:</h3>
          {/* Display the QR code image */}
          <img src={qrCodeData} alt="QR Code" width="200" />
        </div>
      )}
    </div>
  );
};

export default QRCodePage;
