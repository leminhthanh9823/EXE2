import express from 'express';
import { getAllMeals, createMeal, getMealById, updateMeal, deleteMeal } from '../controllers/menu.controller.js';

const router = express.Router();

// Lấy danh sách các bữa ăn
router.get('/', getAllMeals);

// Thêm một bữa ăn mới
router.post('/', createMeal);

// Lấy chi tiết một bữa ăn theo id
router.get('/:id', getMealById);

// Cập nhật một bữa ăn theo id
router.put('/:id', updateMeal);

// Xoá một bữa ăn theo id
router.delete('/:id', deleteMeal);

export default router;
