import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Container,
  Typography,
  TextField,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Grid,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  IconButton,
  Stack,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import '../admin/css/menu.css'

const AdminMeals = () => {
  const [meals, setMeals] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    category: 'Breakfast',
    calories: '',
    ingredients: '',
    instructions: '',
  });
  const [editingMeal, setEditingMeal] = useState(null);

  // Lấy danh sách các bữa ăn từ API
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

  // Xử lý thay đổi dữ liệu form
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Xử lý submit form để tạo hoặc cập nhật meal
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let response;
      const payload = {
        ...formData,
        calories: Number(formData.calories),
        ingredients: formData.ingredients.split(',').map((i) => i.trim()),
      };

      if (editingMeal) {
        response = await axios.put(`http://localhost:5000/api/menu/${editingMeal._id}`, payload);
        setMeals(meals.map((meal) => (meal._id === editingMeal._id ? response.data : meal)));
        setEditingMeal(null);
      } else {
        response = await axios.post('http://localhost:5000/api/menu', payload);
        setMeals([...meals, response.data]);
      }
      // Reset form
      setFormData({
        name: '',
        description: '',
        category: 'Breakfast',
        calories: '',
        ingredients: '',
        instructions: '',
      });
    } catch (error) {
      console.error('Error saving meal:', error);
    }
  };

  // Chuẩn bị form để chỉnh sửa meal
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
  };

  // Xoá meal
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/menu/${id}`);
      setMeals(meals.filter((meal) => meal._id !== id));
    } catch (error) {
      console.error('Error deleting meal:', error);
    }
  };

  return (
    <Container maxWidth="lg" sx={{ marginTop: 4 }}>
      <Typography variant="h4" gutterBottom align="center">
        Quản lý Meal
      </Typography>

      {/* Form tạo / cập nhật meal */}
      <Paper sx={{ padding: 3, marginBottom: 4 }}>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Tên món ăn"
                variant="outlined"
                fullWidth
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth required>
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
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Mô tả"
                variant="outlined"
                fullWidth
                multiline
                rows={3}
                name="description"
                value={formData.description}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                label="Calories"
                variant="outlined"
                fullWidth
                name="calories"
                type="number"
                value={formData.calories}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={8}>
              <TextField
                label="Thành phần (cách nhau bởi dấu phẩy)"
                variant="outlined"
                fullWidth
                name="ingredients"
                value={formData.ingredients}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Hướng dẫn"
                variant="outlined"
                fullWidth
                multiline
                rows={3}
                name="instructions"
                value={formData.instructions}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <Stack direction="row" spacing={2} justifyContent="center">
                <Button variant="contained" color="primary" type="submit">
                  {editingMeal ? 'Cập nhật' : 'Thêm mới'}
                </Button>
                {editingMeal && (
                  <Button
                    variant="outlined"
                    color="secondary"
                    onClick={() => {
                      setEditingMeal(null);
                      setFormData({
                        name: '',
                        description: '',
                        category: 'Breakfast',
                        calories: '',
                        ingredients: '',
                        instructions: '',
                      });
                    }}
                  >
                    Hủy
                  </Button>
                )}
              </Stack>
            </Grid>
          </Grid>
        </form>
      </Paper>

      {/* Bảng hiển thị danh sách meal */}
      <Paper sx={{ padding: 2 }}>
        <Typography variant="h6" gutterBottom>
          Danh sách Meal
        </Typography>
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
            {meals.map((meal) => (
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
                  <IconButton color="error" onClick={() => handleDelete(meal._id)}>
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
      <br></br>
    </Container>
  );
};

export default AdminMeals;
