import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const PaymentSuccess = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timeout = setTimeout(() => {
      navigate("/"); // Quay về trang chủ sau 5s
    }, 5000);

    return () => clearTimeout(timeout);
  }, [navigate]);

  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <h2 style={{ color: "green" }}>✅ Thanh toán thành công!</h2>
      <p>Cảm ơn bạn đã sử dụng dịch vụ của chúng tôi.</p>
      <p>Hệ thống sẽ tự động quay về trang chủ trong 5 giây...</p>
    </div>
  );
};

export default PaymentSuccess;
