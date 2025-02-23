import React, { useState, useEffect } from "react";
import {
  Container,
  Typography,
  Button,
  Modal,
  Box,
  TextField,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  TablePagination,
  Stack,
  Fade,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import axios from "axios";
import "./css/usermanage.css";

// Style cho modal thêm/chỉnh sửa
const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  outline: "none",
};

// Style cho Confirm Modal
const confirmModalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 350,
  outline: "none",
};

const AdminUsers = () => {
  const [users, setUsers] = useState([]);
  const [open, setOpen] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    isVerified: false,
  });

  // State cho phân trang
  const [page, setPage] = useState(0);
  const rowsPerPage = 8;

  // State cho Confirm Modal khi xoá
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);

  // Lấy danh sách người dùng từ API
  const fetchUsers = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/users");
      setUsers(res.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setEditingUser(null);
    setFormData({ name: "", email: "", password: "", isVerified: false });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Submit form: nếu có editingUser thì cập nhật, nếu không thì tạo mới
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingUser) {
        const res = await axios.put(
          `http://localhost:5000/api/users/${editingUser._id}`,
          formData
        );
        setUsers(users.map((user) => (user._id === editingUser._id ? res.data : user)));
      } else {
        const res = await axios.post("http://localhost:5000/api/users", formData);
        setUsers([...users, res.data]);
      }
      handleClose();
    } catch (error) {
      console.error("Error saving user:", error);
    }
  };

  const handleEdit = (user) => {
    setEditingUser(user);
    setFormData({
      name: user.name,
      email: user.email,
      password: "", // không hiển thị mật khẩu
      isVerified: user.isVerified,
    });
    handleOpen();
  };

  const openConfirmModal = (user) => {
    setUserToDelete(user);
    setConfirmOpen(true);
  };

  const confirmDelete = async () => {
    if (!userToDelete) return;
    try {
      await axios.delete(`http://localhost:5000/api/users/${userToDelete._id}`);
      setUsers(users.filter((user) => user._id !== userToDelete._id));
      setConfirmOpen(false);
      setUserToDelete(null);
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  const handleChangePage = (event, newPage) => setPage(newPage);

  return (
    <Container maxWidth="lg" className="admin-container">
      <Typography variant="h4" gutterBottom align="center" className="header">
        Quản lý Người dùng
      </Typography>
      <Stack direction="row" justifyContent="flex-start" sx={{ mb: 2 }}>
        <Button variant="contained" color="primary" onClick={handleOpen}>
          Thêm mới
        </Button>
      </Stack>
      <TableContainer component={Paper} className="tableContainer">
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Tên</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Verified</TableCell>
              <TableCell>Last Login</TableCell>
              <TableCell align="center">Hành động</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((user) => (
              <TableRow key={user._id}>
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.isVerified ? "Yes" : "No"}</TableCell>
                <TableCell>{new Date(user.lastLoginDate).toLocaleString()}</TableCell>
                <TableCell align="center">
                  <IconButton color="primary" onClick={() => handleEdit(user)}>
                    <EditIcon />
                  </IconButton>
                  <IconButton color="error" onClick={() => openConfirmModal(user)}>
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <TablePagination
          component="div"
          count={users.length}
          page={page}
          onPageChange={handleChangePage}
          rowsPerPage={rowsPerPage}
          rowsPerPageOptions={[rowsPerPage]}
        />
      </TableContainer>

      {/* Modal thêm/chỉnh sửa */}
      <Modal open={open} onClose={handleClose} closeAfterTransition>
        <Fade in={open}>
          <Box sx={modalStyle} className="modalContent">
            <Typography variant="h6" gutterBottom>
              {editingUser ? "Chỉnh sửa Người dùng" : "Thêm mới Người dùng"}
            </Typography>
            <form onSubmit={handleSubmit}>
              <TextField
                label="Tên"
                name="name"
                value={formData.name}
                onChange={handleChange}
                fullWidth
                required
                margin="normal"
              />
              <TextField
                label="Email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                fullWidth
                required
                margin="normal"
              />
              {!editingUser && (
                <TextField
                  label="Mật khẩu"
                  name="password"
                  type="password"
                  value={formData.password}
                  onChange={handleChange}
                  fullWidth
                  required
                  margin="normal"
                />
              )}
              <FormControl fullWidth margin="normal">
                <InputLabel>Verified</InputLabel>
                <Select
                  name="isVerified"
                  value={formData.isVerified}
                  label="Verified"
                  onChange={(e) =>
                    setFormData({ ...formData, isVerified: e.target.value })
                  }
                >
                  <MenuItem value={true}>Yes</MenuItem>
                  <MenuItem value={false}>No</MenuItem>
                </Select>
              </FormControl>
              <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 2 }}>
                <Button onClick={handleClose} sx={{ mr: 2 }}>
                  Hủy
                </Button>
                <Button variant="contained" color="primary" type="submit">
                  {editingUser ? "Cập nhật" : "Thêm"}
                </Button>
              </Box>
            </form>
          </Box>
        </Fade>
      </Modal>

      {/* Confirm Modal cho xoá */}
      <Modal open={confirmOpen} onClose={() => setConfirmOpen(false)} closeAfterTransition>
        <Fade in={confirmOpen}>
          <Box sx={confirmModalStyle} className="confirmModal">
            <Typography variant="h6" gutterBottom>
              Xác nhận xoá
            </Typography>
            <Typography variant="body1" sx={{ mb: 2 }}>
              Bạn có chắc muốn xoá người dùng này không?
            </Typography>
            <Stack direction="row" justifyContent="center" spacing={2}>
              <Button variant="outlined" color="secondary" onClick={() => setConfirmOpen(false)}>
                Hủy
              </Button>
              <Button variant="contained" color="error" onClick={confirmDelete}>
                Xoá
              </Button>
            </Stack>
          </Box>
        </Fade>
      </Modal>
    </Container>
  );
};

export default AdminUsers;
