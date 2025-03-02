import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const PaymentFailed = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timeout = setTimeout(() => {
      navigate("/"); // Quay về trang chủ sau 5s
    }, 5000);

    return () => clearTimeout(timeout);
  }, [navigate]);

  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <h2 style={{ color: "red" }}>❌ Thanh toán thất bại!</h2>
      <p>Vui lòng kiểm tra lại thông tin hoặc thử lại sau.</p>
      <p>Hệ thống sẽ tự động quay về trang chủ trong 5 giây...</p>
    </div>
  );
};

export default PaymentFailed;
