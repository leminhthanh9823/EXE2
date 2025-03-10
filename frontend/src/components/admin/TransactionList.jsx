import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { DataGrid } from "@mui/x-data-grid";
import {
  Container,
  Typography,
  Button,
  Box,
  CircularProgress,
} from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";

const API_URL = "http://localhost:5000/api/transactions";

const TransactionList = () => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTransactions();
  }, []);

  const fetchTransactions = async () => {
    setLoading(true);
    try {
      const response = await axios.get(API_URL);
      console.log("Danh sách giao dịch:", response.data);
      
      setTransactions(response.data);
    } catch (error) {
      console.error("Lỗi khi tải giao dịch:", error);
      toast.error("Không thể tải danh sách giao dịch!");
    } finally {
      setLoading(false);
    }
  };

  const updateTransactionStatus = async (id, status) => {
    try {
      await axios.put(`${API_URL}/${id}`, { status });
      toast.success(`Cập nhật trạng thái thành công: ${status}`);
      fetchTransactions();
    } catch (error) {
      console.error("Lỗi khi cập nhật trạng thái:", error);
      toast.error("Không thể cập nhật trạng thái!");
    }
  };

  if (loading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="80vh"
      >
        <CircularProgress />
      </Box>
    );
  }

  const columns = [
    { field: "code", headerName: "Mã giao dịch", flex: 1 },
    { field: "email", headerName: "Người dùng", flex: 1 },
    { field: "menuTitle", headerName: "Menu", flex: 1 },
    { field: "amount", headerName: "Số tiền (VND)", flex: 1 },
    { field: "status", headerName: "Trạng thái", flex: 1 },
    {
      field: "actions",
      headerName: "Hành động",
      flex: 1,
      renderCell: (params) => (
        <>
          {params.row.status === "pending" && (
            <>
              <Button
                variant="contained"
                color="success"
                size="small"
                startIcon={<CheckIcon />}
                onClick={() =>
                  updateTransactionStatus(params.row.id, "completed")
                }
                sx={{ mr: 1 }}
              >
                Hoàn thành
              </Button>
              <Button
                variant="contained"
                color="error"
                size="small"
                startIcon={<CloseIcon />}
                onClick={() => updateTransactionStatus(params.row.id, "failed")}
              >
                Thất bại
              </Button>
            </>
          )}
        </>
      ),
    },
  ];

  const rows = transactions.map((tx) => ({
    id: tx._id,
    code: tx.code,
    email: tx.userId?.email || "N/A",
    menuTitle: tx.menuId?.menuPackage || "N/A",
    amount: tx.amount,
    status: tx.status,
  }));

  return (
    <Container maxWidth="lg">
      <Typography
        variant="h4"
        gutterBottom
        sx={{ mt: 3, mb: 2, textAlign: "center" }}
      >
        Quản lý Giao dịch
      </Typography>
      <Box
        sx={{
          height: 500,
          width: "100%",
          backgroundColor: "white",
          borderRadius: 2,
          boxShadow: 3,
        }}
      >
        <DataGrid
          rows={rows}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5, 10, 20]}
          disableSelectionOnClick
        />
      </Box>
    </Container>
  );
};

export default TransactionList;
