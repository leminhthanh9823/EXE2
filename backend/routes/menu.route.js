const express = require('express');
const router = express.Router();
const mealController = require('../controllers/menu.controller');

// Lấy danh sách các bữa ăn
router.get('/', mealController.getAllMeals);

// Thêm một bữa ăn mới
router.post('/', mealController.createMeal);

// Lấy chi tiết một bữa ăn theo id
router.get('/:id', mealController.getMealById);

// Cập nhật một bữa ăn theo id
router.put('/:id', mealController.updateMeal);

// Xoá một bữa ăn theo id
router.delete('/:id', mealController.deleteMeal);

module.exports = router;
