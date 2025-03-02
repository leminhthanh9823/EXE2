import { useState, useEffect } from "react";

const TransactionList = () => {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    fetchTransactions();
  }, []);

  const fetchTransactions = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/transactions");
      const data = await response.json();
      setTransactions(data);
    } catch (error) {
      console.error("Lỗi khi lấy danh sách giao dịch:", error);
    }
  };

  const checkTransactionStatus = async (transactionId) => {
    try {
      const response = await fetch(`http://localhost:5000/api/zalopay/status/${transactionId}`);
      const data = await response.json();

      alert(
        data.status === "completed" ? "✅ Giao dịch thành công!" :
        data.status === "failed" ? "❌ Giao dịch thất bại!" :
        "⏳ Giao dịch đang xử lý..."
      );

      fetchTransactions();
    } catch (error) {
      alert("⚠ Không thể kiểm tra giao dịch!");
    }
  };

  return (
    <div>
      <h2>Danh Sách Giao Dịch</h2>
      <ul>
        {transactions.map((t) => (
          <li key={t._id}>
            {t.code} - {t.amount} VND - {t.status}
            <button onClick={() => checkTransactionStatus(t.code)}>Kiểm Tra</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TransactionList;
