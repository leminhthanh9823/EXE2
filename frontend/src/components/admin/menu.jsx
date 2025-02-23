import React, { useState, useEffect } from 'react';
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
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  IconButton,
  TablePagination,
  Stack,
  Fade,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import axios from 'axios';
import './css/menu.css';
import Header from '../header/header';

// Style cho modal thêm/chỉnh sửa
const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  outline: 'none',
};

// Style cho Confirm Modal
const confirmModalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 350,
  outline: 'none',
};

const AdminMeals = () => {
  const [meals, setMeals] = useState([]);
  const [open, setOpen] = useState(false);
  const [editingMeal, setEditingMeal] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    category: 'Breakfast',
    calories: '',
    ingredients: '',
    instructions: '',
  });
  
  // State cho phân trang
  const [page, setPage] = useState(0);
  const rowsPerPage = 8;

  // State cho Confirm Modal khi xoá
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [mealToDelete, setMealToDelete] = useState(null);

  // Lấy danh sách meal từ API
  const fetchMeals = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/menu');
      setMeals(res.data);
    } catch (error) {
      console.error('Error fetching meals:', error);
    }
  };

  useEffect(() => {
    fetchMeals();
  }, []);

  // Mở, đóng modal thêm/chỉnh sửa
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setEditingMeal(null);
    setFormData({
      name: '',
      description: '',
      category: 'Breakfast',
      calories: '',
      ingredients: '',
      instructions: '',
    });
  };

  // Xử lý thay đổi dữ liệu form
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Xử lý submit form: thêm mới nếu không chỉnh sửa, hoặc cập nhật nếu đang chỉnh sửa
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        ...formData,
        calories: Number(formData.calories),
        ingredients: formData.ingredients.split(',').map((item) => item.trim()),
      };

      if (editingMeal) {
        // Cập nhật meal
        const res = await axios.put(`http://localhost:5000/api/menu/${editingMeal._id}`, payload);
        setMeals(meals.map((meal) => (meal._id === editingMeal._id ? res.data : meal)));
      } else {
        // Thêm meal mới
        const res = await axios.post('http://localhost:5000/api/menu', payload);
        setMeals([...meals, res.data]);
      }
      handleClose();
    } catch (error) {
      console.error('Error saving meal:', error);
    }
  };

  // Chuẩn bị chỉnh sửa meal
  const handleEdit = (meal) => {
    setEditingMeal(meal);
    setFormData({
      name: meal.name,
      description: meal.description,
      category: meal.category,
      calories: meal.calories,
      ingredients: meal.ingredients.join(', '),
      instructions: meal.instructions,
    });
    handleOpen();
  };

  // Mở confirm modal để xoá meal
  const openConfirmModal = (meal) => {
    setMealToDelete(meal);
    setConfirmOpen(true);
  };

  // Xác nhận xoá meal
  const confirmDelete = async () => {
    if (!mealToDelete) return;
    try {
      await axios.delete(`http://localhost:5000/api/menu/${mealToDelete._id}`);
      setMeals(meals.filter((meal) => meal._id !== mealToDelete._id));
      setConfirmOpen(false);
      setMealToDelete(null);
    } catch (error) {
      console.error('Error deleting meal:', error);
    }
  };

  // Xử lý chuyển trang
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  return (
    <Container maxWidth="lg" className="admin-container">
        <Header/>
      
      <Stack direction="row" justifyContent="flex-start" sx={{ mb: 2 }}>
        <Button variant="contained" color="primary" onClick={handleOpen}>
          Thêm mới
        </Button>
      </Stack>
      <TableContainer component={Paper} className="tableContainer">
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Tên món ăn</TableCell>
              <TableCell>Loại</TableCell>
              <TableCell>Calories</TableCell>
              <TableCell>Mô tả</TableCell>
              <TableCell>Thành phần</TableCell>
              <TableCell>Hướng dẫn</TableCell>
              <TableCell align="center">Hành động</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {meals.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((meal) => (
              <TableRow key={meal._id}>
                <TableCell>{meal.name}</TableCell>
                <TableCell>{meal.category}</TableCell>
                <TableCell>{meal.calories}</TableCell>
                <TableCell>{meal.description}</TableCell>
                <TableCell>{meal.ingredients.join(', ')}</TableCell>
                <TableCell>{meal.instructions}</TableCell>
                <TableCell align="center">
                  <IconButton color="primary" onClick={() => handleEdit(meal)}>
                    <EditIcon />
                  </IconButton>
                  <IconButton color="error" onClick={() => openConfirmModal(meal)}>
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <TablePagination
          component="div"
          count={meals.length}
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
              {editingMeal ? 'Chỉnh sửa Meal' : 'Thêm mới Meal'}
            </Typography>
            <form onSubmit={handleSubmit}>
              <TextField
                label="Tên món ăn"
                name="name"
                value={formData.name}
                onChange={handleChange}
                fullWidth
                required
                margin="normal"
              />
              <TextField
                label="Mô tả"
                name="description"
                value={formData.description}
                onChange={handleChange}
                fullWidth
                multiline
                rows={2}
                margin="normal"
              />
              <FormControl fullWidth margin="normal">
                <InputLabel>Loại bữa ăn</InputLabel>
                <Select
                  name="category"
                  value={formData.category}
                  label="Loại bữa ăn"
                  onChange={handleChange}
                >
                  <MenuItem value="Breakfast">Breakfast</MenuItem>
                  <MenuItem value="Lunch">Lunch</MenuItem>
                  <MenuItem value="Dinner">Dinner</MenuItem>
                  <MenuItem value="Snack">Snack</MenuItem>
                </Select>
              </FormControl>
              <TextField
                label="Calories"
                name="calories"
                type="number"
                value={formData.calories}
                onChange={handleChange}
                fullWidth
                margin="normal"
              />
              <TextField
                label="Thành phần (cách nhau bởi dấu phẩy)"
                name="ingredients"
                value={formData.ingredients}
                onChange={handleChange}
                fullWidth
                margin="normal"
              />
              <TextField
                label="Hướng dẫn"
                name="instructions"
                value={formData.instructions}
                onChange={handleChange}
                fullWidth
                multiline
                rows={3}
                margin="normal"
              />
              <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
                <Button onClick={handleClose} sx={{ mr: 2 }}>
                  Hủy
                </Button>
                <Button variant="contained" color="primary" type="submit">
                  {editingMeal ? 'Cập nhật' : 'Thêm'}
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
              Bạn có chắc muốn xoá meal này không?
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

export default AdminMeals;
